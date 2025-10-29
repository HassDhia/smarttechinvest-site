import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const STI_REPORTS_DIR = '/Users/hass/Desktop/02_Projects/Deep Agent STI/sti_reports';
const STATE_FILE = '.brief-ingest-state.json';
const LOG_DIR = 'logs';

// Ensure log directory exists
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

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

// Extract date from folder name
function extractDate(folderName) {
  const match = folderName.match(/sti_enhanced_output_(\d{8})_/);
  if (!match) return null;
  
  const dateStr = match[1];
  const YYYY = dateStr.slice(0,4);
  const MM = dateStr.slice(4,6);
  const DD = dateStr.slice(6,8);
  return `${YYYY}-${MM}-${DD}`;
}

// Check if folder has required files
function hasRequiredFiles(folderPath) {
  const required = ['intelligence_report.html', 'metadata.json', 'executive_summary.txt'];
  return required.every(file => fs.existsSync(path.join(folderPath, file)));
}

// Check if brief already exists on website
function briefExists(date) {
  const briefPath = path.join(process.cwd(), 'public', 'intelligence', 'briefs', date);
  return fs.existsSync(briefPath);
}

// Run ingest for a single folder
function ingestFolder(folderName, state) {
  return new Promise((resolve) => {
    const folderPath = path.join(STI_REPORTS_DIR, folderName);
    const ingestScript = path.join(process.cwd(), 'scripts/ingest-brief.mjs');
    
    console.log(`📥 [${new Date().toISOString()}] Ingesting ${folderName}...`);
    
    const child = spawn('node', [ingestScript, folderPath, '--watch-mode'], {
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
        const date = extractDate(folderName);
        if (date) {
          // Update state
          state.ingested[folderName] = {
            date: date,
            ingestedAt: new Date().toISOString(),
            targetDir: `public/intelligence/briefs/${date}`
          };
          saveState(state);
        }
        console.log(`✅ [${new Date().toISOString()}] Successfully ingested ${folderName}`);
        resolve({ success: true, folder: folderName });
      } else {
        console.error(`❌ [${new Date().toISOString()}] Failed to ingest ${folderName}: ${stderr}`);
        resolve({ success: false, folder: folderName, error: stderr });
      }
    });
  });
}

// Process a new folder
async function processNewFolder(folderName, state) {
  const folderPath = path.join(STI_REPORTS_DIR, folderName);
  
  // Check if it's a valid report folder
  if (!folderName.match(/^sti_enhanced_output_\d{8}_/)) {
    return;
  }
  
  // Check if already ingested
  if (state.ingested[folderName]) {
    console.log(`⏭️  [${new Date().toISOString()}] Skipping ${folderName} - already ingested`);
    return;
  }
  
  const date = extractDate(folderName);
  if (!date) {
    console.warn(`⚠️  [${new Date().toISOString()}] Skipping ${folderName} - invalid date format`);
    return;
  }
  
  // Check if brief already exists on website
  if (briefExists(date)) {
    console.log(`⏭️  [${new Date().toISOString()}] Skipping ${folderName} - brief exists on website (${date})`);
    return;
  }
  
  // Check if folder has required files
  if (!hasRequiredFiles(folderPath)) {
    console.warn(`⚠️  [${new Date().toISOString()}] Skipping ${folderName} - missing required files`);
    return;
  }
  
  // Wait a bit for file writes to complete (debouncing)
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Ingest the folder
  await ingestFolder(folderName, state);
}

// Main watch function
function startWatching() {
  console.log('👀 Starting brief watcher...');
  console.log(`📁 Watching: ${STI_REPORTS_DIR}`);
  console.log(`📊 State file: ${STATE_FILE}`);
  console.log('🛑 Press Ctrl+C to stop\n');
  
  const state = loadState();
  console.log(`📈 Previously ingested: ${Object.keys(state.ingested).length} briefs\n`);
  
  // Watch for new directories
  const watcher = fs.watch(STI_REPORTS_DIR, { recursive: false }, async (eventType, filename) => {
    if (eventType === 'rename' && filename) {
      const folderPath = path.join(STI_REPORTS_DIR, filename);
      
      // Check if it's a directory
      try {
        const stat = fs.statSync(folderPath);
        if (stat.isDirectory()) {
          await processNewFolder(filename, state);
        }
      } catch (e) {
        // File might have been deleted or moved, ignore
      }
    }
  });
  
  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n🛑 Stopping brief watcher...');
    watcher.close();
    process.exit(0);
  });
  
  // Keep the process alive
  process.on('SIGTERM', () => {
    console.log('\n🛑 Stopping brief watcher...');
    watcher.close();
    process.exit(0);
  });
}

// Check if sti_reports directory exists
if (!fs.existsSync(STI_REPORTS_DIR)) {
  console.error(`❌ STI reports directory not found: ${STI_REPORTS_DIR}`);
  console.error('Please ensure the directory exists and contains your generated reports.');
  process.exit(1);
}

startWatching();
