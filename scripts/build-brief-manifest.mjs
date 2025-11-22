import fs from 'node:fs';
import path from 'node:path';
import { buildManifestEntryFromDir, writeManifest } from './lib/brief-manifest.mjs';

const BRIEFS_DIR = path.join(process.cwd(), 'public', 'intelligence', 'briefs');

function isBriefDir(name) {
  return /^\d{4}-\d{2}-\d{2}-\d{6}$/.test(name);
}

function main() {
  if (!fs.existsSync(BRIEFS_DIR)) {
    console.error(`Briefs directory not found: ${BRIEFS_DIR}`);
    process.exit(1);
  }

  const dirs = fs.readdirSync(BRIEFS_DIR)
    .filter((name) => fs.statSync(path.join(BRIEFS_DIR, name)).isDirectory())
    .filter(isBriefDir);

  const manifest = [];
  for (const dir of dirs) {
    try {
      const entry = buildManifestEntryFromDir(dir);
      manifest.push(entry);
      console.log(`✅ Added ${dir} to manifest`);
    } catch (error) {
      console.warn(`⚠️  Skipped ${dir}: ${error.message}`);
    }
  }

  writeManifest(manifest);
  console.log(`\n🧾 Manifest updated with ${manifest.length} brief(s).`);
}

main();
