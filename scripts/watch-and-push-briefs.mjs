import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const SOURCE_DIR = '/Users/hass/Desktop/02_Projects/Deep Agent STI/sti_reports';
const STATE_FILE = path.join(process.cwd(), '.brief-ingest-state.json');
const DEBOUNCE_DELAY = 30000; // 30 seconds to batch multiple reports

let state = { ingested: {} };
if (fs.existsSync(STATE_FILE)) {
  state = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
}

const saveState = () => {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
};

const getBriefDateFromFolderName = (folderName) => {
  const m = folderName.match(/_(\d{8})_/);
  if (!m) return null;
  const YYYY = m[1].slice(0,4), MM = m[1].slice(4,6), DD = m[1].slice(6,8);
  return `${YYYY}-${MM}-${DD}`;
};

const logWithTimestamp = (message) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
};

const runGitCommand = (command, description) => {
  try {
    logWithTimestamp(`🔄 ${description}...`);
    execSync(command, { stdio: 'inherit' });
    logWithTimestamp(`✅ ${description} completed`);
    return true;
  } catch (error) {
    logWithTimestamp(`❌ ${description} failed: ${error.message}`);
    return false;
  }
};

const checkGitStatus = () => {
  try {
    // Check if we're on main branch
    const currentBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
    if (currentBranch !== 'main') {
      logWithTimestamp(`⚠️  Not on main branch (currently on ${currentBranch}). Skipping push.`);
      return false;
    }

    // Check if working directory is clean (except for new briefs)
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    const lines = status.trim().split('\n').filter(line => line.length > 0);
    
    // Allow only new files in public/intelligence/briefs/
    const allowedPattern = /^A\s+public\/intelligence\/briefs\//;
    const hasUnallowedChanges = lines.some(line => !allowedPattern.test(line));
    
    if (hasUnallowedChanges) {
      logWithTimestamp(`⚠️  Working directory has uncommitted changes outside briefs. Skipping push.`);
      return false;
    }

    return true;
  } catch (error) {
    logWithTimestamp(`❌ Git status check failed: ${error.message}`);
    return false;
  }
};

const processNewBrief = (folderName) => {
  const fullPath = path.join(SOURCE_DIR, folderName);
  const briefDate = getBriefDateFromFolderName(folderName);

  if (!briefDate) {
    logWithTimestamp(`⚠️  Could not infer date from folder: ${folderName}. Skipping.`);
    return;
  }

  if (state.ingested[folderName]) {
    logWithTimestamp(`⏭️  Skipping ${folderName} - already processed.`);
    return;
  }

  try {
    logWithTimestamp(`🚀 New brief detected: ${folderName}. Ingesting...`);
    
    // Ingest the brief
    execSync(`node scripts/ingest-brief.mjs "${fullPath}" --watch-mode`, { stdio: 'inherit' });
    
    // Update state with ingestion info
    state.ingested[folderName] = {
      date: briefDate,
      ingestedAt: new Date().toISOString(),
      pushStatus: 'pending',
      targetDir: path.relative(process.cwd(), path.join('public/intelligence/briefs', briefDate)),
    };
    saveState();

    logWithTimestamp(`✅ Successfully ingested ${folderName}.`);

    // Now handle Git operations
    if (!checkGitStatus()) {
      state.ingested[folderName].pushStatus = 'failed';
      state.ingested[folderName].pushError = 'Git status check failed';
      saveState();
      return;
    }

    // Add the brief files
    const briefPath = `public/intelligence/briefs/${briefDate}`;
    if (!runGitCommand(`git add ${briefPath}`, `Adding ${briefDate} brief files`)) {
      state.ingested[folderName].pushStatus = 'failed';
      state.ingested[folderName].pushError = 'Git add failed';
      saveState();
      return;
    }

    // Commit the brief
    const commitMessage = `Add intelligence brief for ${briefDate}`;
    if (!runGitCommand(`git commit -m "${commitMessage}"`, `Committing ${briefDate} brief`)) {
      state.ingested[folderName].pushStatus = 'failed';
      state.ingested[folderName].pushError = 'Git commit failed';
      saveState();
      return;
    }

    // Get commit hash
    try {
      const commitHash = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
      state.ingested[folderName].commitHash = commitHash;
    } catch (error) {
      logWithTimestamp(`⚠️  Could not get commit hash: ${error.message}`);
    }

    // Push to main
    if (!runGitCommand('git push origin main', `Pushing ${briefDate} brief to main`)) {
      state.ingested[folderName].pushStatus = 'failed';
      state.ingested[folderName].pushError = 'Git push failed';
      saveState();
      return;
    }

    // Success!
    state.ingested[folderName].pushStatus = 'success';
    state.ingested[folderName].pushedAt = new Date().toISOString();
    saveState();

    logWithTimestamp(`🎉 Brief ${briefDate} successfully pushed to production!`);
    logWithTimestamp(`📱 Vercel will deploy automatically (~2 minutes)`);
    logWithTimestamp(`📄 PDF will be generated via GitHub Actions (~1 minute)`);

  } catch (error) {
    logWithTimestamp(`❌ Error processing ${folderName}: ${error.message}`);
    if (state.ingested[folderName]) {
      state.ingested[folderName].pushStatus = 'failed';
      state.ingested[folderName].pushError = error.message;
      saveState();
    }
  }
};

let timeoutId;
const handleFsEvent = (eventType, filename) => {
  if (filename && fs.statSync(path.join(SOURCE_DIR, filename)).isDirectory()) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => processNewBrief(filename), DEBOUNCE_DELAY);
  }
};

const runWatcher = () => {
  if (!fs.existsSync(SOURCE_DIR)) {
    logWithTimestamp(`❌ Source directory not found: ${SOURCE_DIR}. Please create it.`);
    process.exit(1);
  }

  logWithTimestamp(`👀 Starting auto-push brief watcher...`);
  logWithTimestamp(`📁 Watching: ${SOURCE_DIR}`);
  logWithTimestamp(`📊 State file: ${STATE_FILE}`);
  logWithTimestamp(`⏱️  Debounce delay: ${DEBOUNCE_DELAY / 1000}s`);
  logWithTimestamp(`🛑 Press Ctrl+C to stop`);

  const ingestedCount = Object.keys(state.ingested).length;
  logWithTimestamp(`📈 Previously processed: ${ingestedCount} briefs`);

  // Handle Ctrl+C gracefully
  process.on('SIGINT', () => {
    logWithTimestamp(`🛑 Stopping auto-push watcher...`);
    process.exit(0);
  });

  fs.watch(SOURCE_DIR, { recursive: false }, handleFsEvent);
};

runWatcher();
