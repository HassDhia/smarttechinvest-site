import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const DAILY_DIR = path.join(process.cwd(), 'src/content/daily');
const BRIEFS_DIR = path.join(process.cwd(), 'public/intelligence/briefs');

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
  date: string;
  href: string;
  pdf: string;
  og: string;
  title?: string;
  summary?: string;
  metadata?: BriefMetadata;
  keySignals?: string[];
};

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

export function getBriefMetadata(dateDir: string): BriefMetadata | null {
  try {
    const metaPath = path.join(BRIEFS_DIR, dateDir, 'metadata.json');
    if (!fs.existsSync(metaPath)) return null;
    
    const content = fs.readFileSync(metaPath, 'utf8');
    const metadata = JSON.parse(content);
    
    return {
      sources_count: metadata.sources_count || metadata.agent_stats?.validated_sources_count || 0,
      confidence_score: Math.round((metadata.confidence_score || 0) * 100),
      word_count: metadata.report_stats?.word_count || metadata.word_count || 0,
      title: metadata.title,
      tags: metadata.tags,
      keyPoints: metadata.keyPoints
    };
  } catch {
    return null;
  }
}

export function getBriefSummary(dateDir: string): string | null {
  try {
    const summaryPath = path.join(BRIEFS_DIR, dateDir, 'executive_summary.txt');
    if (!fs.existsSync(summaryPath)) return null;
    
    const content = fs.readFileSync(summaryPath, 'utf8').trim();
    // Return first 200-260 chars, ellipsized
    return content.length > 260 ? content.slice(0, 260) + '...' : content;
  } catch {
    return null;
  }
}

export function getBriefKeySignals(dateDir: string): string[] {
  try {
    const sourcesPath = path.join(BRIEFS_DIR, dateDir, 'sources.json');
    if (!fs.existsSync(sourcesPath)) return [];
    
    const content = fs.readFileSync(sourcesPath, 'utf8');
    const sources = JSON.parse(content);
    
    // Extract first 1-2 headlines/signals from sources
    if (Array.isArray(sources)) {
      return sources.slice(0, 2).map(source => {
        if (typeof source === 'string') return source;
        if (source.title) return source.title;
        if (source.headline) return source.headline;
        return String(source);
      }).filter(Boolean);
    }
    
    return [];
  } catch {
    return [];
  }
}

export function listBriefs(): Brief[] {
  try {
    if (!fs.existsSync(BRIEFS_DIR)) {
      return [];
    }
    
    return fs.readdirSync(BRIEFS_DIR)
      .filter(dir => fs.statSync(path.join(BRIEFS_DIR, dir)).isDirectory())
      .sort()
      .reverse()
      .map(dateDir => {
        const metadata = getBriefMetadata(dateDir);
        const summary = getBriefSummary(dateDir);
        const keySignals = getBriefKeySignals(dateDir);
        
        return {
          date: dateDir,
          href: `/intelligence/briefs/${dateDir}/report.html`,
          pdf: `/intelligence/briefs/${dateDir}/brief.pdf`,
          og: `/intelligence/briefs/${dateDir}/og.png`,
          title: metadata?.title,
          summary: summary || (keySignals.length > 0 ? keySignals.slice(0, 1).join(' • ') : undefined),
          metadata,
          keySignals: keySignals.length > 0 ? keySignals : undefined
        };
      });
  } catch {
    return [];
  }
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
