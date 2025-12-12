import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const STI_REPORTS_DIR = '/Users/hass/Documents/Projects/Deep Agent STI/sti_reports';
const BRIEFS_DIR = path.join(process.cwd(), 'public/intelligence/briefs');
const STATE_FILE = '.brief-ingest-state.json';

// Load or create state file
function loadState() {
  try {
    if (fs.existsSync(STATE_FILE)) {
      return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
    }
  } catch (e) {
    console.warn('Could not load state file, starting fresh');
  }
  return { ingested: {} };
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

// Get existing brief dates from website
function getExistingBriefDates() {
  try {
    if (!fs.existsSync(BRIEFS_DIR)) return new Set();
    return new Set(fs.readdirSync(BRIEFS_DIR)
      .filter(dir => fs.statSync(path.join(BRIEFS_DIR, dir)).isDirectory()));
  } catch {
    return new Set();
  }
}

// Find all report folders in sti_reports
function findReportFolders() {
  try {
    if (!fs.existsSync(STI_REPORTS_DIR)) {
      console.error(`STI reports directory not found: ${STI_REPORTS_DIR}`);
      return [];
    }
    
    return fs.readdirSync(STI_REPORTS_DIR)
      .filter(item => {
        const fullPath = path.join(STI_REPORTS_DIR, item);
        return fs.statSync(fullPath).isDirectory() && 
               item.match(/^sti_(?:enhanced|operator)_output_\d{8}_/);
      })
      .sort();
  } catch (e) {
    console.error('Error reading sti_reports directory:', e.message);
    return [];
  }
}

// Extract date from folder name
function extractDate(folderName) {
  const match = folderName.match(/sti_(?:enhanced|operator)_output_(\d{8})_/);
  if (!match) return null;
  
  const dateStr = match[1];
  const YYYY = dateStr.slice(0,4);
  const MM = dateStr.slice(4,6);
  const DD = dateStr.slice(6,8);
  return `${YYYY}-${MM}-${DD}`;
}

// Check if folder has required files
function hasRequiredFiles(folderPath) {
  const htmlCandidates = ['intelligence_report.html', 'report.html'];
  const hasHtml = htmlCandidates.some(file => fs.existsSync(path.join(folderPath, file)));
  if (!hasHtml) return false;
  
  const metadataPath = path.join(folderPath, 'metadata.json');
  if (!fs.existsSync(metadataPath)) return false;
  
  const summaryPath = path.join(folderPath, 'executive_summary.txt');
  if (fs.existsSync(summaryPath)) return true;
  
  try {
    const meta = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    return typeof meta.executive_summary === 'string' && meta.executive_summary.trim().length > 0;
  } catch {
    return false;
  }
}

// Run ingest for a single folder
function ingestFolder(folderName) {
  return new Promise((resolve) => {
    const folderPath = path.join(STI_REPORTS_DIR, folderName);
    const ingestScript = path.join(process.cwd(), 'scripts/ingest-brief.mjs');
    
    console.log(`📥 Ingesting ${folderName}...`);
    
    const child = spawn('node', [ingestScript, folderPath], {
      stdio: ['inherit', 'pipe', 'pipe']
    });
    
    let stdout = '';
    let stderr = '';
    
    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });
    
    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ Successfully ingested ${folderName}`);
        resolve({ success: true, folder: folderName, output: stdout });
      } else {
        console.error(`❌ Failed to ingest ${folderName}: ${stderr}`);
        resolve({ success: false, folder: folderName, error: stderr });
      }
    });
  });
}

async function main() {
  console.log('🔄 Starting batch sync of intelligence briefs...\n');
  
  const state = loadState();
  const existingDates = getExistingBriefDates();
  const reportFolders = findReportFolders();
  
  console.log(`📁 Found ${reportFolders.length} report folders in sti_reports`);
  console.log(`📊 Found ${existingDates.size} existing briefs on website\n`);
  
  let newCount = 0;
  let existingCount = 0;
  let errorCount = 0;
  const results = [];
  
  for (const folderName of reportFolders) {
    const folderPath = path.join(STI_REPORTS_DIR, folderName);
    const date = extractDate(folderName);
    
    if (!date) {
      console.warn(`⚠️  Skipping ${folderName} - invalid date format`);
      continue;
    }
    
    if (!hasRequiredFiles(folderPath)) {
      console.warn(`⚠️  Skipping ${folderName} - missing required files`);
      continue;
    }
    
    // Check if already ingested
    if (state.ingested[folderName] || existingDates.has(date)) {
      console.log(`⏭️  Skipping ${folderName} - already ingested (${date})`);
      existingCount++;
      continue;
    }
    
    // Ingest the folder
    const result = await ingestFolder(folderName);
    results.push(result);
    
    if (result.success) {
      // Update state
      state.ingested[folderName] = {
        date: date,
        ingestedAt: new Date().toISOString(),
        targetDir: `public/intelligence/briefs/${date}`
      };
      newCount++;
    } else {
      errorCount++;
    }
  }
  
  // Save updated state
  saveState(state);
  
  console.log('\n📈 Sync Summary:');
  console.log(`   ✅ New briefs ingested: ${newCount}`);
  console.log(`   ⏭️  Already existed: ${existingCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   📁 Total processed: ${reportFolders.length}`);
  
  if (newCount > 0) {
    console.log('\n🎉 New briefs are now available on the website!');
    console.log('💡 Run "npm run pdf:render" to generate PDFs for new briefs');
  }
  
  if (errorCount > 0) {
    console.log('\n⚠️  Some briefs failed to ingest. Check the errors above.');
    process.exit(1);
  }
}

main().catch(console.error);
