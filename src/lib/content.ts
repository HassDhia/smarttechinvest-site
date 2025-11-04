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
  date: string; // YYYY-MM-DD or YYYY-MM-DD-HHMMSS
  displayDate?: string; // YYYY-MM-DD
  displayTime?: string | null; // HHMMSS or null
  href: string;
  pdf: string;
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

// Helper function to convert query to title case
function generateTitleFromQuery(query: string): string | undefined {
  if (!query) return undefined;
  
  // Convert to title case and clean up
  return query
    .split(/[\s_&]+/) // Split on spaces, underscores, and &
    .map(word => {
      // Preserve all-caps acronyms (AI, LLM, etc.)
      if (word.toUpperCase() === word && word.length <= 4) {
        return word.toUpperCase();
      }
      // Title case for regular words
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ')
    .replace(/\s+/g, ' ') // Normalize spaces
    .trim();
}

export function getBriefMetadata(dateDir: string): BriefMetadata | null {
  try {
    const metaPath = path.join(BRIEFS_DIR, dateDir, 'metadata.json');
    if (!fs.existsSync(metaPath)) return null;
    
    const content = fs.readFileSync(metaPath, 'utf8');
    const metadata = JSON.parse(content);
    
    // Generate title from query if title doesn't exist
    const title = metadata.title || generateTitleFromQuery(metadata.query);
    
    return {
      sources_count: metadata.sources_count || metadata.agent_stats?.validated_sources_count || 0,
      confidence_score: Math.round((metadata.confidence_score || 0) * 100),
      word_count: metadata.report_stats?.word_count || metadata.word_count || 0,
      title: title,
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

export function getBriefHeroImage(dateDir: string): string | undefined {
  try {
    const imagesDir = path.join(BRIEFS_DIR, dateDir, 'images');
    if (!fs.existsSync(imagesDir)) {
      return undefined;
    }
    
    const files = fs.readdirSync(imagesDir);
    const heroFile = files.find(file => file.startsWith('hero_') && file.endsWith('.png'));
    
    if (heroFile) {
      return `/intelligence/briefs/${dateDir}/images/${heroFile}`;
    }
    
    return undefined;
  } catch {
    return undefined;
  }
}

export function listBriefs(): Brief[] {
  try {
    if (!fs.existsSync(BRIEFS_DIR)) {
      return [];
    }
    
    return fs.readdirSync(BRIEFS_DIR)
      .filter(dir => fs.statSync(path.join(BRIEFS_DIR, dir)).isDirectory())
      // Match ONLY timestamp format: YYYY-MM-DD-HHMMSS
      .filter(dir => dir.match(/^\d{4}-\d{2}-\d{2}-\d{6}$/))
      .sort()
      .reverse() // Most recent first
      .map(dateDir => {
        const metadata = getBriefMetadata(dateDir);
        const summary = getBriefSummary(dateDir);
        const keySignals = getBriefKeySignals(dateDir);
        const heroImage = getBriefHeroImage(dateDir);
        
        // Extract display components
        const displayDate = dateDir.slice(0, 10); // YYYY-MM-DD
        const hasTimestamp = dateDir.length > 10;
        const displayTime = hasTimestamp ? dateDir.slice(11) : null; // HHMMSS
        
        return {
          date: dateDir, // Full dir name
          displayDate,
          displayTime,
          href: `/intelligence/briefs/${dateDir}/report.html`,
          pdf: `/intelligence/briefs/${dateDir}/brief.pdf`,
          og: `/intelligence/briefs/${dateDir}/og.png`,
          heroImage,
          title: metadata?.title,
          summary: summary || (keySignals.length > 0 ? keySignals.slice(0, 1).join(' • ') : undefined),
          metadata: metadata || undefined,
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

// New utility functions for enhanced card data

export function getBriefSocialPost(dateDir: string): string | null {
  try {
    const socialPath = path.join(BRIEFS_DIR, dateDir, 'social_media_post.md');
    if (!fs.existsSync(socialPath)) return null;
    
    const content = fs.readFileSync(socialPath, 'utf8').trim();
    
    // Skip markdown headers (lines starting with #) and empty lines
    const lines = content.split('\n').filter(line => {
      const trimmed = line.trim();
      return trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('**');
    });
    
    if (lines.length === 0) return null;
    
    // Get first substantial line and extract first sentence
    const firstLine = lines[0].trim();
    const firstSentence = firstLine.split(/[.!?]/)[0];
    
    // Strip markdown formatting
    const cleaned = firstSentence
      .replace(/\*\*/g, '') // Remove bold
      .replace(/\*/g, '')   // Remove italic
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, keep text
      .trim();
    
    return cleaned ? cleaned + '.' : null;
  } catch {
    return null;
  }
}

export function getBriefOperatorActions(dateDir: string): string[] {
  try {
    const summaryPath = path.join(BRIEFS_DIR, dateDir, 'executive_summary.txt');
    if (!fs.existsSync(summaryPath)) return [];
    
    const content = fs.readFileSync(summaryPath, 'utf8');
    
    // Look for "Recommended actions:" section
    const actionsMatch = content.match(/Recommended actions:([\s\S]*?)(?:\n\n|$)/i);
    if (!actionsMatch) return [];
    
    const actionsText = actionsMatch[1].trim();
    
    // Extract bullet points (lines starting with - or •)
    const bullets = actionsText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.startsWith('-') || line.startsWith('•'))
      .map(line => line.replace(/^[-•]\s*/, '').trim())
      .filter(Boolean)
      .slice(0, 3); // Take first 3
    
    return bullets;
  } catch {
    return [];
  }
}

export function getBriefTopSignals(dateDir: string, count: number = 3): Array<{headline: string; confidence: number; date?: string}> {
  try {
    const sourcesPath = path.join(BRIEFS_DIR, dateDir, 'sources.json');
    if (!fs.existsSync(sourcesPath)) return [];
    
    const content = fs.readFileSync(sourcesPath, 'utf8');
    const sources = JSON.parse(content);
    
    if (!Array.isArray(sources)) return [];
    
    // Sort by confidence descending and take top N
    return sources
      .map(source => ({
        headline: source.headline || source.title || String(source),
        confidence: source.confidence || 0,
        date: source.date
      }))
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, count);
  } catch {
    return [];
  }
}

export function getBriefCoverageWindow(dateDir: string): {start: string; end: string} | null {
  try {
    const metaPath = path.join(BRIEFS_DIR, dateDir, 'metadata.json');
    if (!fs.existsSync(metaPath)) return null;
    
    const content = fs.readFileSync(metaPath, 'utf8');
    const metadata = JSON.parse(content);
    
    if (!metadata.generation_timestamp || !metadata.days_back) return null;
    
    const endDate = new Date(metadata.generation_timestamp);
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - metadata.days_back);
    
    return {
      start: startDate.toISOString().split('T')[0],
      end: endDate.toISOString().split('T')[0]
    };
  } catch {
    return null;
  }
}

export function getBriefTags(dateDir: string): string[] {
  try {
    const metaPath = path.join(BRIEFS_DIR, dateDir, 'metadata.json');
    if (!fs.existsSync(metaPath)) return [];
    
    const content = fs.readFileSync(metaPath, 'utf8');
    const metadata = JSON.parse(content);
    
    // Check for explicit tags first
    if (metadata.tags && Array.isArray(metadata.tags)) {
      return metadata.tags;
    }
    
    // Fallback to parsing query string
    if (metadata.query) {
      return metadata.query
        .split(' ')
        .map((word: string) => word.trim())
        .filter((word: string) => word.length > 2)
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .slice(0, 4); // Limit to 4 tags
    }
    
    return [];
  } catch {
    return [];
  }
}

export function enrichBriefData(dateDir: string): Brief | null {
  try {
    const metadata = getBriefMetadata(dateDir);
    const summary = getBriefSummary(dateDir);
    const keySignals = getBriefKeySignals(dateDir);
    const socialHook = getBriefSocialPost(dateDir);
    const operatorActions = getBriefOperatorActions(dateDir);
    const topSignals = getBriefTopSignals(dateDir, 3);
    const coverageWindow = getBriefCoverageWindow(dateDir);
    const tags = getBriefTags(dateDir);
    const heroImage = getBriefHeroImage(dateDir);
    
    // Extract display components
    const displayDate = dateDir.slice(0, 10);
    const hasTimestamp = dateDir.length > 10;
    const displayTime = hasTimestamp ? dateDir.slice(11) : null;
    
    return {
      date: dateDir,
      displayDate,
      displayTime,
      href: `/intelligence/briefs/${dateDir}/report.html`,
      pdf: `/intelligence/briefs/${dateDir}/brief.pdf`,
      og: `/intelligence/briefs/${dateDir}/og.png`,
      heroImage,
      title: metadata?.title, // Generated from query
      summary: summary || (keySignals.length > 0 ? keySignals.slice(0, 1).join(' • ') : undefined),
      metadata: metadata || undefined,
      keySignals: keySignals.length > 0 ? keySignals : undefined,
      socialHook: socialHook || undefined,
      operatorActions: operatorActions.length > 0 ? operatorActions : undefined,
      topSignals: topSignals.length > 0 ? topSignals : undefined,
      coverageWindow: coverageWindow || undefined,
      tags: tags.length > 0 ? tags : undefined
    };
  } catch {
    return null;
  }
}
