import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const DAILY_DIR = path.join(process.cwd(), 'src/content/daily');
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const BRIEF_MANIFEST = path.join(PUBLIC_DIR, 'intelligence/briefs', 'manifest.json');

export type DailyFrontmatter = {
  title: string;
  date: string;      // ISO 8601
  summary: string;
  tags?: string[];
  og?: string;       // /intelligence/og/...
};

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

export function getDailySlugs(): string[] {
  try {
    if (!fs.existsSync(DAILY_DIR)) {
      return [];
    }
    return fs.readdirSync(DAILY_DIR)
      .filter(f => f.endsWith('.mdx'))
      .map(f => f.replace(/\.mdx$/, ''));
  } catch {
    return [];
  }
}

export function getDailyBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, '');
  const filePath = path.join(DAILY_DIR, realSlug + '.mdx');
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`Daily post not found: ${slug}`);
  }
  
  const file = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(file);
  
  return { 
    slug: realSlug, 
    frontmatter: data as DailyFrontmatter, 
    content 
  };
}

export function getAllDailies() {
  const slugs = getDailySlugs();
  return slugs
    .map(slug => {
      try {
        const { frontmatter } = getDailyBySlug(slug);
        return {
          slug,
          frontmatter,
          href: `/intelligence/daily/${slug}`
        };
      } catch {
        return null;
      }
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
}

function readManifest(): BriefManifestEntry[] {
  try {
    if (!fs.existsSync(BRIEF_MANIFEST)) {
      return [];
    }
    const raw = fs.readFileSync(BRIEF_MANIFEST, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
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

export function getLatestDailies(count: number = 6) {
  const allDailies = getAllDailies();
  return allDailies.slice(0, count);
}

// Additional helper utilities were removed to keep runtime bundles lightweight.
