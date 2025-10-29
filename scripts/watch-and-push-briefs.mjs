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
  // Match: sti_enhanced_output_YYYYMMDD_HHMMSS_
  const m = folderName.match(/sti_enhanced_output_(\d{8})_(\d{6})_/);
  if (!m) return null;
  
  const dateStr = m[1]; // YYYYMMDD
  const timeStr = m[2]; // HHMMSS
  
  const YYYY = dateStr.slice(0, 4);
  const MM = dateStr.slice(4, 6);
  const DD = dateStr.slice(6, 8);
  const HH = timeStr.slice(0, 2);
  const mm = timeStr.slice(2, 4);
  const ss = timeStr.slice(4, 6);
  
  return `${YYYY}-${MM}-${DD}-${HH}${mm}${ss}`;
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
    logWithTimestamp(`🔍 Checking git status...`);
    
    // Check if we're on main branch
    const currentBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
    logWithTimestamp(`   Branch: ${currentBranch}`);
    
    if (currentBranch !== 'main') {
      logWithTimestamp(`⚠️  Not on main branch. Skipping push.`);
      return false;
    }

    // Get git status
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    
    // If completely clean, that's fine (nothing to push)
    if (!status.trim()) {
      logWithTimestamp(`   ✅ Working directory clean`);
      return true;
    }
    
    const lines = status.trim().split('\n').filter(line => line.length > 0);
    logWithTimestamp(`   Found ${lines.length} change(s) in working directory`);
    
    // Patterns for allowed changes:
    // ?? public/intelligence/briefs/ = Untracked brief files (NEW briefs)
    // A  public/intelligence/briefs/ = Staged brief files
    // M  public/intelligence/briefs/ = Modified brief files (edge case, but allow)
    const briefPattern = /^(\?\?|A\s|M\s)\s*public\/intelligence\/briefs\//;
    
    // Check each line
    for (const line of lines) {
      // If it's a brief file, it's allowed
      if (briefPattern.test(line)) {
        continue;
      }
      
      // If it's the state file, it's allowed (auto-updated by this script)
      if (line.includes('.brief-ingest-state.json')) {
        continue;
      }
      
      // Any other change is not allowed
      logWithTimestamp(`⚠️  Found uncommitted changes outside briefs:`);
      logWithTimestamp(`   ${line}`);
      logWithTimestamp(`⚠️  Please commit or stash these changes. Skipping push.`);
      return false;
    }

    logWithTimestamp(`   ✅ All changes are allowed (briefs + state file)`);
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
      targetDir: `public/intelligence/briefs/${briefDate}`,
    };
    saveState();

    logWithTimestamp(`✅ Successfully ingested ${folderName}.`);

    // Add the brief files FIRST (before checking git status)
    const briefPath = `public/intelligence/briefs/${briefDate}*`; // Use wildcard to catch timestamped dirs
    if (!runGitCommand(`git add "${briefPath}"`, `Adding ${briefDate} brief files`)) {
      state.ingested[folderName].pushStatus = 'failed';
      state.ingested[folderName].pushError = 'Git add failed';
      saveState();
      return;
    }

    // NOW check git status (after staging the brief)
    if (!checkGitStatus()) {
      // If check fails, unstage the brief files
      execSync(`git reset HEAD "${briefPath}"`, { stdio: 'ignore' });
      state.ingested[folderName].pushStatus = 'failed';
      state.ingested[folderName].pushError = 'Git status check failed - working directory not clean';
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