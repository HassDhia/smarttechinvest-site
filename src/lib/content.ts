import fs from "node:fs";
import path from "node:path";

import briefManifestJson from "../../public/intelligence/briefs/manifest.json";

const PUBLIC_DIR = path.join(process.cwd(), "public");

export type BriefMetadata = {
  sources_count: number;
  confidence_score: number;
  word_count: number;
  title?: string;
  tags?: string[];
  keyPoints?: string[];
};

export type Brief = {
  date: string; // YYYY-MM-DD or YYYY-MM-DD-HHMMSS
  displayDate?: string; // YYYY-MM-DD
  displayTime?: string | null; // HHMMSS or null
  href: string;
  intelligenceHref?: string;
  marketPathMarkdown?: string;
  intelligenceMarkdown?: string;
  intelligenceHtml?: string;
  marketPathHtml?: string;
  hasMarketPath?: boolean;
  og: string;
  heroImage?: string;
  title?: string;
  summary?: string;
  metadata?: BriefMetadata;
  keySignals?: string[];
  socialHook?: string;
  operatorActions?: string[];
  topSignals?: Array<{headline: string; confidence: number; date?: string}>;
  coverageWindow?: {start: string; end: string};
  tags?: string[];
};

export interface BriefManifestEntry {
  date: string;
  href: string;
  og: string;
  intelligenceHref?: string;
  marketPathMarkdown?: string;
  intelligenceMarkdown?: string;
  intelligenceHtml?: string;
  marketPathHtml?: string;
  hasMarketPath?: boolean;
  heroImage?: string;
  title?: string;
  summary?: string;
  metadata?: BriefMetadata;
  keySignals?: string[];
}

function readManifest(): BriefManifestEntry[] {
  if (!Array.isArray(briefManifestJson)) {
    return [];
  }
  return briefManifestJson as BriefManifestEntry[];
}

export function listBriefs(): Brief[] {
  const manifest = readManifest();

  const briefs: Brief[] = [];

  for (const entry of manifest) {
    const briefDir = path.join(PUBLIC_DIR, 'intelligence', 'briefs', entry.date);
    const marketPathFile = path.join(briefDir, 'market_path_report.html');
    const reportFile = path.join(briefDir, 'report.html');

    const marketPathExists = Boolean(entry.hasMarketPath && fs.existsSync(marketPathFile));
    const intelligenceExists = fs.existsSync(reportFile);

    if (!marketPathExists && !intelligenceExists) {
      continue;
    }

    const displayDate = entry.date.slice(0, 10);
    const hasTimestamp = entry.date.length > 10;
    const displayTime = hasTimestamp ? entry.date.slice(11) : null;

    const marketPathHtml = marketPathExists
      ? entry.marketPathHtml ?? `/intelligence/briefs/${entry.date}/market_path_report.html`
      : undefined;
    const marketPathMarkdown = marketPathExists ? entry.marketPathMarkdown : undefined;

    const intelligenceHtml = intelligenceExists
      ? entry.intelligenceHtml ?? `/intelligence/briefs/${entry.date}/report.html`
      : undefined;
    const intelligenceMarkdown = intelligenceExists ? entry.intelligenceMarkdown : undefined;
    const intelligenceHref = intelligenceExists
      ? entry.intelligenceHref ?? `/intelligence/briefs/${entry.date}/report.html`
      : undefined;

    briefs.push({
      date: entry.date,
      displayDate,
      displayTime,
      href: entry.href,
      intelligenceHref,
      marketPathMarkdown,
      intelligenceMarkdown,
      intelligenceHtml,
      marketPathHtml,
      hasMarketPath: marketPathExists,
      og: entry.og,
      heroImage: entry.heroImage,
      title: entry.title,
      summary: entry.summary,
      metadata: entry.metadata,
      keySignals: entry.keySignals,
    });
  }

  return briefs;
}

export function getBriefByDate(date: string): Brief | null {
  const briefs = listBriefs();
  return briefs.find(b => b.date === date) || null;
}

export function getLatestBrief(): Brief | null {
  const briefs = listBriefs();
  return briefs.length > 0 ? briefs[0] : null;
}

// Additional helper utilities were removed to keep runtime bundles lightweight.
