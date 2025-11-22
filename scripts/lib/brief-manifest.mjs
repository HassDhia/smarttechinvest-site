import fs from 'node:fs';
import path from 'node:path';

const BRIEFS_DIR = path.join(process.cwd(), 'public', 'intelligence', 'briefs');
const MANIFEST_PATH = path.join(BRIEFS_DIR, 'manifest.json');

const truncate = (text, length = 260) => {
  if (!text) return '';
  const trimmed = text.trim().replace(/\s+/g, ' ');
  return trimmed.length > length ? `${trimmed.slice(0, length).trim()}…` : trimmed;
};

const normalizeConfidence = (value) => {
  if (typeof value === 'number') {
    return value <= 1 ? Math.round(value * 100) : Math.round(value);
  }
  return 0;
};

const pull = (obj, paths, defaultValue = 0) => {
  for (const p of paths) {
    const parts = p.split('.');
    let current = obj;
    for (const part of parts) {
      if (!current || typeof current !== 'object') {
        current = undefined;
        break;
      }
      current = current[part];
    }
    if (typeof current === 'number') return current;
  }
  return defaultValue;
};

export function readManifest() {
  try {
    if (!fs.existsSync(MANIFEST_PATH)) return [];
    return JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  } catch {
    return [];
  }
}

export function writeManifest(entries) {
  const sorted = entries.sort((a, b) => b.date.localeCompare(a.date));
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(sorted, null, 2));
}

export function buildManifestEntryFromDir(dateDir) {
  const briefDir = path.join(BRIEFS_DIR, dateDir);
  if (!fs.existsSync(briefDir)) {
    throw new Error(`Brief directory not found: ${briefDir}`);
  }

  const metaPath = path.join(briefDir, 'metadata.json');
  const summaryPath = path.join(briefDir, 'executive_summary.txt');
  const sourcesPath = path.join(briefDir, 'sources.json');
  const imagesDir = path.join(briefDir, 'images');

  const metadata = fs.existsSync(metaPath)
    ? JSON.parse(fs.readFileSync(metaPath, 'utf8'))
    : {};

  let summary = '';
  if (fs.existsSync(summaryPath)) {
    summary = fs.readFileSync(summaryPath, 'utf8');
  } else if (typeof metadata.executive_summary === 'string') {
    summary = metadata.executive_summary;
  }

  let heroImage;
  if (fs.existsSync(imagesDir)) {
    try {
      const files = fs.readdirSync(imagesDir);
      const hero = files.find((file) => file.startsWith('hero_')) || files[0];
      if (hero) {
        heroImage = `/intelligence/briefs/${dateDir}/images/${hero}`;
      }
    } catch {
      heroImage = undefined;
    }
  }

  const keySignals = [];
  if (fs.existsSync(sourcesPath)) {
    try {
      const sources = JSON.parse(fs.readFileSync(sourcesPath, 'utf8'));
      if (Array.isArray(sources)) {
        for (const source of sources) {
          if (keySignals.length >= 2) break;
          const headline = source?.title || source?.headline;
          if (headline) {
            keySignals.push(headline);
          }
        }
      }
    } catch {
      // ignore malformed signals
    }
  }

  const sourcesCount = pull(metadata, [
    'sources_count',
    'statistics.source_count',
    'agent_stats.validated_sources_count',
  ]);

  const confidenceScore = normalizeConfidence(
    pull(metadata, ['confidence_score', 'confidence.score', 'confidence.display'])
  );

  const wordCount = pull(metadata, [
    'statistics.word_count',
    'word_count',
    'report_stats.word_count',
  ]);

  return {
    date: dateDir,
    href: `/intelligence/briefs/${dateDir}/report.html`,
    pdf: `/intelligence/briefs/${dateDir}/brief.pdf`,
    og: `/intelligence/briefs/${dateDir}/og.png`,
    heroImage,
    title: metadata.title || metadata.query,
    summary: truncate(summary),
    metadata: {
      sources_count: sourcesCount,
      confidence_score: confidenceScore,
      word_count: wordCount,
    },
    keySignals: keySignals.length ? keySignals : undefined,
  };
}

export function upsertManifestEntry(entry) {
  const manifest = readManifest().filter((item) => item.date !== entry.date);
  manifest.push(entry);
  writeManifest(manifest);
}
