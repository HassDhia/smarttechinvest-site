import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
import { buildManifestEntryFromDir, upsertManifestEntry } from './lib/brief-manifest.mjs';

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

function buildHtmlDocumentFromMarkdown(markdown, title = 'Market-Path Report') {
  const body = marked.parse(markdown ?? '', { mangle: false, headerIds: false });
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${title}</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  body {
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    margin: 0;
    padding: 0;
    background: #101010;
    color: #f2f2f2;
  }
  main {
    max-width: 960px;
    margin: 0 auto;
    padding: 40px 24px 80px;
    line-height: 1.7;
  }
  h1, h2, h3, h4, h5, h6 {
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    line-height: 1.2;
  }
  h1 { font-size: 2.25rem; }
  h2 { font-size: 1.75rem; }
  h3 { font-size: 1.35rem; }
  h4 { font-size: 1.15rem; }
  p {
    margin: 1rem 0;
  }
  ul, ol {
    margin: 1rem 0 1rem 1.25rem;
    padding: 0 0 0 1rem;
  }
  li {
    margin: 0.35rem 0;
  }
  strong {
    color: #ffffff;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 2rem 0;
    font-size: 0.95rem;
  }
  th, td {
    border: 1px solid rgba(255,255,255,0.15);
    padding: 0.75rem 1rem;
    text-align: left;
  }
  th {
    background: rgba(255,255,255,0.04);
  }
  code {
    font-family: "IBM Plex Mono", monospace;
    background: rgba(255,255,255,0.08);
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
  }
</style>
</head>
<body>
<main>
${body}
</main>
</body>
</html>`;
}

async function ingest() {
  const src = path.resolve(input);
  const base = path.basename(src).replace(/\/+$/, '');
  const m = base.match(/sti_(?:enhanced|operator)_output_(\d{8})_(\d{6})_/);
  if (!m) {
    console.error('Cannot infer date and time (YYYYMMDD_HHMMSS) from folder name:', base);
    process.exit(1);
  }
  const YYYY = m[1].slice(0,4), MM = m[1].slice(4,6), DD = m[1].slice(6,8);
  const HH = m[2].slice(0,2), mm = m[2].slice(2,4), ss = m[2].slice(4,6);
  const dateDir = `${YYYY}-${MM}-${DD}-${HH}${mm}${ss}`;

  const dst = path.join(process.cwd(), 'public', 'intelligence', 'briefs', dateDir);

  // Check if already exists and has all required files
  if (fs.existsSync(dst) && !forceMode) {
    const requiredFiles = ['report.html', 'metadata.json', 'executive_summary.txt', 'index.html'];
    const hasAllRequired = requiredFiles.every(file => 
      fs.existsSync(path.join(dst, file))
    );
    
    if (hasAllRequired) {
      if (watchMode) {
        console.log(`⏭️  Skipping ${base} - already exists and complete (${dateDir})`);
        process.exit(0);
      } else {
        console.error(`Brief already exists: ${dateDir}. Use --force to re-ingest.`);
        process.exit(1);
      }
    } else {
      // Directory exists but is incomplete - log and continue with ingestion
      if (watchMode) {
        console.log(`⚠️  Directory exists but is incomplete. Re-ingesting ${base}...`);
      }
      // Continue with ingestion (will overwrite/recreate files)
    }
  }

  if (fs.existsSync(dst)) {
    fs.rmSync(dst, { recursive: true, force: true });
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

const htmlPath              = pick(src, ['intelligence_report.html', 'report.html']); // canonical HTML
const metaPath              = pick(src, ['metadata.json']);                            // stats          🧭
const sourcesPath           = pick(src, ['sources.json']);                             // signals        🗞️
const summaryPath           = pick(src, ['executive_summary.txt']);                    // teaser/OG desc 🧾
const marketPathHtmlPath    = pick(src, ['market_path_report.html']);                  // Market-Path HTML dossier
const marketPathMarkdownPath= pick(src, ['market_path_report.md']);
const marketPathPdfPath     = pick(src, ['market_path_report.pdf']);
const intelligenceMarkdownPath = pick(src, ['intelligence_report.md']);
const intelligenceJsonLdPath   = pick(src, ['intelligence_report.jsonld']);

let metadataJson = null;
if (metaPath) {
  try {
    metadataJson = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
  } catch (error) {
    if (watchMode) {
      console.warn(`⚠️  metadata.json exists but parsing failed: ${error.message}`);
    }
  }
}

let summaryFallback = null;
if (!summaryPath && metadataJson && typeof metadataJson.executive_summary === 'string') {
  const trimmed = metadataJson.executive_summary.trim();
  if (trimmed.length > 0) {
    summaryFallback = trimmed;
  }
}

const hasMarketPathContent = Boolean(marketPathHtmlPath || marketPathMarkdownPath);

if (!metaPath || (!summaryPath && !summaryFallback) || !htmlPath || !hasMarketPathContent) {
  const error = 'Missing one or more required files: intelligence_report.html, market_path_report.(html|md), metadata.json, executive_summary';
  // Debug: List what files actually exist in source directory
  if (watchMode) {
    try {
      const existingFiles = fs.readdirSync(src);
      console.warn(`⚠️  ${error}`);
      console.warn(`📁 Debug: Files found in source directory: ${existingFiles.join(', ')}`);
      console.warn(`📁 Debug: Looking for: htmlPath=${htmlPath}, metaPath=${metaPath}, summaryPath=${summaryPath}, summaryFallback=${summaryFallback ? 'metadata.executive_summary' : 'none'}`);
    } catch (e) {
      console.warn(`⚠️  ${error}`);
      console.warn(`📁 Debug: Could not read source directory: ${e.message}`);
    }
  } else {
    console.error(error);
  }
  // Exit with failure code even in watch mode so parent script knows ingestion failed
  process.exit(1);
}

  // 2) Copy with canonical names
const dstReport = path.join(dst, 'report.html');
const dstIntelligenceHtml = path.join(dst, 'intelligence_report.html');
const dstMetadata = path.join(dst, 'metadata.json');
const dstSources = path.join(dst, 'sources.json');
const dstMarketPathHtml = path.join(dst, 'market_path_report.html');

fs.copyFileSync(htmlPath, dstReport);
fs.copyFileSync(htmlPath, dstIntelligenceHtml);
fs.copyFileSync(metaPath, dstMetadata);
if (sourcesPath) fs.copyFileSync(sourcesPath, dstSources);

const dstSummary = path.join(dst, 'executive_summary.txt');
if (summaryPath) {
  fs.copyFileSync(summaryPath, dstSummary);
} else if (summaryFallback) {
  fs.writeFileSync(dstSummary, summaryFallback, 'utf8');
  if (watchMode) {
    console.log('ℹ️  No executive_summary.txt found. Generated from metadata.executive_summary');
  }
}

if (marketPathHtmlPath) {
  fs.copyFileSync(marketPathHtmlPath, dstMarketPathHtml);
} else if (marketPathMarkdownPath) {
  try {
    const markdown = fs.readFileSync(marketPathMarkdownPath, 'utf8');
    const title = metadataJson?.title || metadataJson?.query || 'Market-Path Report';
    const htmlDocument = buildHtmlDocumentFromMarkdown(markdown, title);
    fs.writeFileSync(dstMarketPathHtml, htmlDocument, 'utf8');
    if (watchMode) {
      console.log('📝 Generated market_path_report.html from Markdown source');
    }
  } catch (error) {
    console.error('Failed to generate market_path_report.html from Markdown:', error.message);
    process.exit(1);
  }
}

if (marketPathMarkdownPath) {
  fs.copyFileSync(marketPathMarkdownPath, path.join(dst, 'market_path_report.md'));
}
if (marketPathPdfPath) {
  fs.copyFileSync(marketPathPdfPath, path.join(dst, 'market_path_report.pdf'));
}
if (intelligenceMarkdownPath) {
  fs.copyFileSync(intelligenceMarkdownPath, path.join(dst, 'intelligence_report.md'));
}
if (intelligenceJsonLdPath) {
  fs.copyFileSync(intelligenceJsonLdPath, path.join(dst, 'intelligence_report.jsonld'));
}

  // Check for and copy images folder if it exists
  const imagesSrc = path.join(src, 'images');
  const imagesDst = path.join(dst, 'images');
  if (fs.existsSync(imagesSrc)) {
    try {
      const stat = fs.statSync(imagesSrc);
      if (stat.isDirectory()) {
        if (watchMode) {
          const imageFiles = fs.readdirSync(imagesSrc);
          console.log(`📁 Found images folder with ${imageFiles.length} file(s): ${imageFiles.join(', ')}`);
        }
        fs.cpSync(imagesSrc, imagesDst, { recursive: true });
        if (watchMode) {
          const copiedFiles = fs.readdirSync(imagesDst);
          console.log(`📁 Copied images folder to ${dateDir}/images/ (${copiedFiles.length} file(s))`);
        }
      } else {
        if (watchMode) {
          console.warn(`⚠️  Source has 'images' but it's not a directory (type: ${stat.isFile() ? 'file' : 'other'})`);
        }
      }
    } catch (error) {
      // If images copy fails, warn but don't fail the entire ingestion
      const warning = `Failed to copy images folder: ${error.message}`;
      if (watchMode) {
        console.warn(`⚠️  ${warning}`);
        console.warn(`📁 Debug: imagesSrc=${imagesSrc}, imagesDst=${imagesDst}`);
      } else {
        console.warn(warning);
      }
      // Continue - brief is still usable without images
    }
  } else {
    if (watchMode) {
      console.log(`ℹ️  No images folder found in source (checked: ${imagesSrc})`);
    }
  }

  // 3) Create index.html wrapper that redirects to report.html + declares canonical
  const indexRedirectTarget = './report.html';
  const indexWrapper = `<!doctype html>
<html><head>
<meta charset="utf-8">
<meta http-equiv="refresh" content="0; url=${indexRedirectTarget}">
<link rel="canonical" href="${indexRedirectTarget}">
<title>Redirecting…</title>
</head><body>
<p>Redirecting to <a href="${indexRedirectTarget}">report</a>…</p>
</body></html>`;
  fs.writeFileSync(path.join(dst, 'index.html'), indexWrapper, 'utf8');

  // 4) Minimal validations
  const required = ['report.html','metadata.json','executive_summary.txt','index.html','market_path_report.html','intelligence_report.html'];
  for (const f of required) {
    const p = path.join(dst, f);
    if (!fs.existsSync(p)) { console.error('Missing required file after copy:', p); process.exit(1); }
  }

  // Validate metadata structure enough for the UI
  let meta = metadataJson;
  if (!meta) {
    try {
      meta = JSON.parse(fs.readFileSync(path.join(dst, 'metadata.json'), 'utf8'));
    } catch (e) {
      console.error('metadata.json is not valid JSON');
      process.exit(1);
    }
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

  try {
    const manifestEntry = buildManifestEntryFromDir(dateDir);
    upsertManifestEntry(manifestEntry);
  } catch (error) {
    const warning = `Failed to update manifest for ${dateDir}: ${error.message}`;
    if (watchMode) {
      console.warn(`⚠️  ${warning}`);
    } else {
      console.warn(warning);
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
