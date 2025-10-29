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
    // D  public/intelligence/briefs/ = Deleted brief files (REMOVED briefs)
    const briefPattern = /^(\?\?|A\s|M\s|D\s)\s*public\/intelligence\/briefs\//;
    
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

  // If already processed and successful, skip
  if (state.ingested[folderName] && state.ingested[folderName].pushStatus === 'success') {
    logWithTimestamp(`⏭️  Skipping ${folderName} - already processed successfully.`);
    return;
  }

  // If it failed before, retry it
  if (state.ingested[folderName] && state.ingested[folderName].pushStatus === 'failed') {
    logWithTimestamp(`🔄 Retrying failed brief: ${folderName} (previous error: ${state.ingested[folderName].pushError || 'unknown'})`);
    // Clear the failed status so we can retry
    delete state.ingested[folderName];
    saveState();
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

const deleteBriefForFolder = (folderName) => {
  const briefDate = getBriefDateFromFolderName(folderName);
  
  if (!briefDate) {
    logWithTimestamp(`⚠️  Could not infer date from removed folder: ${folderName}. Skipping deletion.`);
    return;
  }

  const briefDir = path.join(process.cwd(), 'public', 'intelligence', 'briefs', briefDate);
  
  if (!fs.existsSync(briefDir)) {
    logWithTimestamp(`ℹ️  No website brief found for ${briefDate}. Cleaning up state entry.`);
    // Clean up state even if directory doesn't exist
    if (state.ingested[folderName]) {
      delete state.ingested[folderName];
      saveState();
    }
    return;
  }

  try {
    logWithTimestamp(`🗑️  Source folder removed: ${folderName}. Deleting brief ${briefDate} from website...`);

    // Stage the deletion (git rm)
    const briefPath = `public/intelligence/briefs/${briefDate}`;
    if (!runGitCommand(`git rm -r "${briefPath}"`, `Staging deletion of ${briefDate} brief`)) {
      logWithTimestamp(`⚠️  Failed to stage deletion for ${briefDate}`);
      return;
    }

    // Check git status to ensure only allowed changes
    if (!checkGitStatus()) {
      // Rollback: unstage the deletion and restore files
      execSync(`git reset HEAD "${briefPath}"`, { stdio: 'ignore' });
      try {
        execSync(`git checkout -- "${briefPath}"`, { stdio: 'ignore' });
      } catch {
        // If checkout fails, files might already be gone, that's okay
      }
      logWithTimestamp(`⚠️  Aborted deletion for ${briefDate} due to disallowed changes in working directory`);
      return;
    }

    // Commit the deletion
    const commitMessage = `Remove intelligence brief for ${briefDate}`;
    if (!runGitCommand(`git commit -m "${commitMessage}"`, `Committing removal of ${briefDate} brief`)) {
      // Rollback on commit failure
      execSync(`git reset HEAD "${briefPath}"`, { stdio: 'ignore' });
      try {
        execSync(`git checkout -- "${briefPath}"`, { stdio: 'ignore' });
      } catch {
        // Files may already be deleted, that's okay
      }
      return;
    }

    // Push to main
    if (!runGitCommand('git push origin main', `Pushing removal of ${briefDate} brief to main`)) {
      logWithTimestamp(`⚠️  Failed to push deletion for ${briefDate}. Commit was successful locally.`);
      return;
    }

    // Update state - remove the ingested entry
    if (state.ingested[folderName]) {
      delete state.ingested[folderName];
      saveState();
    }

    logWithTimestamp(`✅ Successfully removed brief ${briefDate} from website`);
    logWithTimestamp(`📱 Vercel will update automatically (~2 minutes)`);

  } catch (error) {
    logWithTimestamp(`❌ Error removing brief for ${folderName}: ${error.message}`);
    
    // Attempt to restore files if deletion was staged but failed
    const briefPath = `public/intelligence/briefs/${briefDate}`;
    try {
      execSync(`git reset HEAD "${briefPath}"`, { stdio: 'ignore' });
      try {
        execSync(`git checkout -- "${briefPath}"`, { stdio: 'ignore' });
      } catch {
        // Files may not exist, that's okay
      }
    } catch {
      // If restore fails, continue anyway
    }
  }
};

let timeoutId;
let deleteTimeoutId;
const handleFsEvent = (eventType, filename) => {
  if (!filename) return;

  const fullPath = path.join(SOURCE_DIR, filename);
  
  // Check if the path exists and is a directory
  let exists = false;
  let isDirectory = false;
  
  try {
    const stat = fs.statSync(fullPath);
    exists = true;
    isDirectory = stat.isDirectory();
  } catch {
    exists = false; // Path doesn't exist (likely deleted)
  }

  if (eventType === 'rename') {
    if (exists && isDirectory) {
      // New folder created or moved in
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => processNewBrief(filename), DEBOUNCE_DELAY);
    } else if (!exists) {
      // Folder deleted or moved out
      clearTimeout(deleteTimeoutId);
      deleteTimeoutId = setTimeout(() => deleteBriefForFolder(filename), DEBOUNCE_DELAY);
    }
  }
};

// Retry failed operations from previous runs
const retryFailedOperations = async () => {
  const failedBriefs = Object.entries(state.ingested).filter(
    ([_, info]) => info.pushStatus === 'failed'
  );

  if (failedBriefs.length === 0) {
    return;
  }

  logWithTimestamp(`🔄 Found ${failedBriefs.length} failed operation(s) from previous runs. Retrying...`);

  for (const [folderName, info] of failedBriefs) {
    const sourcePath = path.join(SOURCE_DIR, folderName);
    const briefDir = path.join(process.cwd(), info.targetDir);

    // Check if source folder still exists (for additions that failed)
    if (fs.existsSync(sourcePath)) {
      logWithTimestamp(`🔄 Retrying failed brief: ${folderName}`);
      // Check if brief files already exist (ingestion succeeded but git failed)
      if (fs.existsSync(briefDir)) {
        // Brief was ingested but git operations failed - retry git operations only
        logWithTimestamp(`📁 Brief files already exist, retrying git operations...`);
        const briefDate = getBriefDateFromFolderName(folderName);
        if (briefDate) {
          // Retry from the git add step
          const briefPath = `public/intelligence/briefs/${briefDate}*`;
          if (!runGitCommand(`git add "${briefPath}"`, `Retrying: Adding ${briefDate} brief files`)) {
            continue;
          }
          if (!checkGitStatus()) {
            execSync(`git reset HEAD "${briefPath}"`, { stdio: 'ignore' });
            continue;
          }
          const commitMessage = `Add intelligence brief for ${briefDate}`;
          if (!runGitCommand(`git commit -m "${commitMessage}"`, `Retrying: Committing ${briefDate} brief`)) {
            continue;
          }
          if (!runGitCommand('git push origin main', `Retrying: Pushing ${briefDate} brief to main`)) {
            continue;
          }
          // Success!
          state.ingested[folderName].pushStatus = 'success';
          state.ingested[folderName].pushedAt = new Date().toISOString();
          saveState();
          logWithTimestamp(`✅ Successfully retried and pushed ${briefDate}`);
          continue;
        }
      }
      // Brief doesn't exist yet, retry full process
      delete state.ingested[folderName];
      saveState();
      await new Promise(resolve => setTimeout(resolve, 2000)); // Delay between retries
      processNewBrief(folderName);
    } 
    // Check if brief directory exists but source doesn't (for deletions that failed)
    else if (!fs.existsSync(sourcePath) && fs.existsSync(briefDir)) {
      logWithTimestamp(`🔄 Retrying failed deletion: ${folderName}`);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Delay between retries
      deleteBriefForFolder(folderName);
    }
  }
};

const runWatcher = async () => {
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

  // Retry any failed operations from previous runs
  await retryFailedOperations();

  // Handle Ctrl+C gracefully
  process.on('SIGINT', () => {
    logWithTimestamp(`🛑 Stopping auto-push watcher...`);
    process.exit(0);
  });

  fs.watch(SOURCE_DIR, { recursive: false }, handleFsEvent);
};

runWatcher();