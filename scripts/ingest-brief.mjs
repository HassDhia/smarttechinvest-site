import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

// Usage: node scripts/ingest-brief.mjs "<path-to-generator-output-folder>" [--watch-mode] [--force]
// Example input folder name: sti_enhanced_output_20251028_165613_llm_driven_robotics_
const args = process.argv.slice(2);
const input = args[0];
const watchMode = args.includes('--watch-mode');
const forceMode = args.includes('--force');

if (!input) {
  console.error('Usage: node scripts/ingest-brief.mjs <path-to-output-folder> [--watch-mode] [--force]');
  process.exit(1);
}

async function ingest() {
  const src = path.resolve(input);
  const base = path.basename(src).replace(/\/+$/, '');
  const m = base.match(/sti_enhanced_output_(\d{8})_(\d{6})_/);
  if (!m) {
    console.error('Cannot infer date and time (YYYYMMDD_HHMMSS) from folder name:', base);
    process.exit(1);
  }
  const YYYY = m[1].slice(0,4), MM = m[1].slice(4,6), DD = m[1].slice(6,8);
  const HH = m[2].slice(0,2), mm = m[2].slice(2,4), ss = m[2].slice(4,6);
  const dateDir = `${YYYY}-${MM}-${DD}-${HH}${mm}${ss}`;

  const dst = path.join(process.cwd(), 'public', 'intelligence', 'briefs', dateDir);

  // Check if already exists and not forcing
  if (fs.existsSync(dst) && !forceMode) {
    if (watchMode) {
      console.log(`⏭️  Skipping ${base} - already exists (${dateDir})`);
      process.exit(0);
    } else {
      console.error(`Brief already exists: ${dateDir}. Use --force to re-ingest.`);
      process.exit(1);
    }
  }

  fs.mkdirSync(dst, { recursive: true });

  // 1) Locate generator outputs (support a couple of filenames)
  const pick = (dir, candidates) => {
    for (const c of candidates) {
      const p = path.join(dir, c);
      if (fs.existsSync(p)) return p;
    }
    return null;
  };

  const htmlPath   = pick(src, ['intelligence_report.html', 'report.html']); // canonical HTML  🔒
  const metaPath   = pick(src, ['metadata.json']);                            // stats          🧭
  const sourcesPath= pick(src, ['sources.json']);                             // signals        🗞️
  const summaryPath= pick(src, ['executive_summary.txt']);                    // teaser/OG desc 🧾
  const mdPath     = pick(src, ['intelligence_report.md']);                   // syndication    ✍️ (optional)
  const socialPostPath = pick(src, ['social_media_post.md']);                 // social post    📱 (optional)
  const socialThreadPath = pick(src, ['social_media_thread.txt']);            // twitter thread 🐦 (optional)
  const socialLinkedinPath = pick(src, ['social_media_linkedin.txt']);        // linkedin post  💼 (optional)

  if (!htmlPath || !metaPath || !summaryPath) {
    const error = 'Missing one or more required files: intelligence_report.html/report.html, metadata.json, executive_summary.txt';
    if (watchMode) {
      console.warn(`⚠️  ${error}`);
      process.exit(0);
    } else {
      console.error(error);
      process.exit(1);
    }
  }

  // 2) Copy with canonical names
  const dstReport = path.join(dst, 'report.html');
  fs.copyFileSync(htmlPath, dstReport);
  fs.copyFileSync(metaPath, path.join(dst, 'metadata.json'));
  if (sourcesPath) fs.copyFileSync(sourcesPath, path.join(dst, 'sources.json'));
  fs.copyFileSync(summaryPath, path.join(dst, 'executive_summary.txt'));
  if (mdPath) fs.copyFileSync(mdPath, path.join(dst, 'intelligence_report.md'));
  if (socialPostPath) fs.copyFileSync(socialPostPath, path.join(dst, 'social_media_post.md'));
  if (socialThreadPath) fs.copyFileSync(socialThreadPath, path.join(dst, 'social_media_thread.txt'));
  if (socialLinkedinPath) fs.copyFileSync(socialLinkedinPath, path.join(dst, 'social_media_linkedin.txt'));

  // 3) Create index.html wrapper that redirects to report.html + declares canonical
  const indexWrapper = `<!doctype html>
<html><head>
<meta charset="utf-8">
<meta http-equiv="refresh" content="0; url=./report.html">
<link rel="canonical" href="./report.html">
<title>Redirecting…</title>
</head><body>
<p>Redirecting to <a href="./report.html">report</a>…</p>
</body></html>`;
  fs.writeFileSync(path.join(dst, 'index.html'), indexWrapper, 'utf8');

  // 4) Minimal validations
  const required = ['report.html','metadata.json','executive_summary.txt','index.html'];
  for (const f of required) {
    const p = path.join(dst, f);
    if (!fs.existsSync(p)) { console.error('Missing required file after copy:', p); process.exit(1); }
  }

  // Validate metadata structure enough for the UI
  let meta = {};
  try {
    meta = JSON.parse(fs.readFileSync(path.join(dst, 'metadata.json'), 'utf8'));
  } catch (e) {
    console.error('metadata.json is not valid JSON');
    process.exit(1);
  }
  if (typeof meta.sources_count !== 'number' || typeof meta.confidence_score !== 'number') {
    const warning = 'metadata.json missing expected fields (sources_count, confidence_score). UI will still render with fallbacks.';
    if (watchMode) {
      console.warn(`⚠️  ${warning}`);
    } else {
      console.warn(warning);
    }
  }

  // 5) Ensure OG image exists (placeholder)
  const og = path.join(dst, 'og.png');
  if (!fs.existsSync(og)) {
    const defaultOg = path.join(process.cwd(), 'public', 'assets', 'og', 'default-brief.png');
    if (fs.existsSync(defaultOg)) {
      fs.copyFileSync(defaultOg, og);
    }
  }

  // 6) Generate PDF from report.html
  const pdfPath = path.join(dst, 'brief.pdf');
  if (!fs.existsSync(pdfPath)) {
    try {
      const browser = await chromium.launch({ headless: true });
      const page = await browser.newPage();
      
      const reportHtmlPath = path.join(dst, 'report.html');
      await page.goto(`file://${path.resolve(reportHtmlPath)}`, { waitUntil: 'load' });
      
      await page.pdf({ 
        path: pdfPath, 
        format: 'Letter', 
        printBackground: true,
        margin: {
          top: '0.5in',
          right: '0.5in',
          bottom: '0.5in',
          left: '0.5in'
        }
      });
      
      await browser.close();
      
      if (watchMode) {
        console.log(`📄 Generated PDF: ${dateDir}/brief.pdf`);
      }
    } catch (error) {
      const warning = `Failed to generate PDF: ${error.message}`;
      if (watchMode) {
        console.warn(`⚠️  ${warning}`);
      } else {
        console.warn(warning);
      }
      // Don't exit - brief is still usable without PDF
    }
  }

  if (watchMode) {
    console.log(`✅ Ingested ${base} → ${dateDir}`);
  } else {
    console.log('Ingested brief into', dst);
  }
}

// Run with error handling
ingest().catch(error => {
  console.error('Ingestion failed:', error);
  process.exit(1);
});
