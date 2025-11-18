#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const projectRoot = process.cwd();
const watchScript = path.join(projectRoot, 'scripts', 'watch-and-push-briefs.mjs');
const logDir = path.join(projectRoot, 'logs');
const logFile = path.join(logDir, 'brief-autopush.log');
const pidFile = path.join(logDir, 'brief-autopush.pid');
const command = process.argv[2] ?? 'status';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function ensureWatchScript() {
  if (!fs.existsSync(watchScript)) {
    console.error(`❌ Watcher script not found at ${watchScript}`);
    process.exit(1);
  }
}

function ensureLogDir() {
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
}

function readPid() {
  if (!fs.existsSync(pidFile)) {
    return null;
  }

  const raw = fs.readFileSync(pidFile, 'utf8').trim();
  const pid = Number.parseInt(raw, 10);
  if (Number.isNaN(pid)) {
    fs.unlinkSync(pidFile);
    return null;
  }
  return pid;
}

function isRunning(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    if (error.code === 'EPERM') {
      return true;
    }
    if (error.code === 'ESRCH') {
      return false;
    }
    throw error;
  }
}

function removePidFile() {
  if (fs.existsSync(pidFile)) {
    fs.unlinkSync(pidFile);
  }
}

function startWatcher() {
  ensureWatchScript();
  ensureLogDir();

  const existingPid = readPid();
  if (existingPid && isRunning(existingPid)) {
    console.log(`👉 Brief watcher already running (pid ${existingPid}).`);
    console.log(`   Logs: ${path.relative(projectRoot, logFile)}`);
    return;
  }

  const outFd = fs.openSync(logFile, 'a');
  const errFd = fs.openSync(logFile, 'a');

  const child = spawn(process.execPath, [watchScript], {
    cwd: projectRoot,
    detached: true,
    stdio: ['ignore', outFd, errFd],
    env: {
      ...process.env,
      BRIEF_WATCHER_DAEMON: '1'
    }
  });

  child.unref();

  fs.closeSync(outFd);
  fs.closeSync(errFd);
  fs.writeFileSync(pidFile, String(child.pid), 'utf8');

  console.log(`✅ Started brief watcher (pid ${child.pid}).`);
  console.log(`   Logs: ${path.relative(projectRoot, logFile)}`);
}

async function stopWatcher() {
  const pid = readPid();
  if (!pid) {
    console.log('ℹ️  Brief watcher is not running.');
    return;
  }

  if (!isRunning(pid)) {
    console.log('ℹ️  Brief watcher is not running (stale pid file removed).');
    removePidFile();
    return;
  }

  console.log(`🛑 Stopping brief watcher (pid ${pid})...`);
  try {
    process.kill(pid, 'SIGTERM');
  } catch (error) {
    if (error.code !== 'ESRCH') {
      throw error;
    }
  }

  const timeoutMs = 5000;
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    await delay(250);
    if (!isRunning(pid)) {
      console.log('✅ Brief watcher stopped.');
      removePidFile();
      return;
    }
  }

  console.log('⚠️  Watcher did not stop in time. Sending SIGKILL...');
  try {
    process.kill(pid, 'SIGKILL');
  } catch (error) {
    if (error.code !== 'ESRCH') {
      throw error;
    }
  }

  await delay(250);
  if (!isRunning(pid)) {
    console.log('✅ Brief watcher force-stopped.');
  } else {
    console.warn('⚠️  Unable to confirm watcher termination. You may need to stop it manually.');
  }

  removePidFile();
}

function statusWatcher() {
  const pid = readPid();
  if (pid && isRunning(pid)) {
    console.log(`✅ Brief watcher running (pid ${pid}).`);
    console.log(`   Logs: ${path.relative(projectRoot, logFile)}`);
    return;
  }

  if (pid && !isRunning(pid)) {
    console.log('⚠️  Brief watcher pid file exists but process is not running. Cleaning up stale pid file.');
    removePidFile();
  }

  console.log('ℹ️  Brief watcher is not running.');
  console.log(`   Logs: ${path.relative(projectRoot, logFile)}`);
}

async function restartWatcher() {
  await stopWatcher();
  startWatcher();
}

async function main() {
  switch (command) {
    case 'start':
      startWatcher();
      break;
    case 'stop':
      await stopWatcher();
      break;
    case 'restart':
      await restartWatcher();
      break;
    case 'status':
      statusWatcher();
      break;
    default:
      console.error(`Usage: node scripts/manage-brief-watcher.mjs <start|stop|restart|status>`);
      process.exit(1);
  }
}

main().catch((error) => {
  console.error('❌ Brief watcher manager error:', error);
  process.exit(1);
});
