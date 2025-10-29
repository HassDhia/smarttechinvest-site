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

export type Brief = {
  date: string;
  href: string;
  pdf: string;
  og: string;
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

export function listBriefs(): Brief[] {
  try {
    if (!fs.existsSync(BRIEFS_DIR)) {
      return [];
    }
    
    return fs.readdirSync(BRIEFS_DIR)
      .filter(dir => fs.statSync(path.join(BRIEFS_DIR, dir)).isDirectory())
      .sort()
      .reverse()
      .map(dateDir => ({
        date: dateDir,
        href: `/intelligence/briefs/${dateDir}/`,
        pdf: `/intelligence/briefs/${dateDir}/brief.pdf`,
        og: `/intelligence/briefs/${dateDir}/og.png`,
      }));
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
