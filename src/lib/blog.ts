/**
 * Blog utilities for reading and parsing MDX posts
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  description?: string;
  tags?: string[];
  featuredImage?: string;
  author?: string;
  content: string;
}

const blogDirectory = path.join(process.cwd(), 'src/content/blog');

/**
 * Get all blog post slugs
 */
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  const entries = fs.readdirSync(blogDirectory, { withFileTypes: true });
  const slugs: string[] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      // Check for index.mdx in subdirectory
      const indexPath = path.join(blogDirectory, entry.name, 'index.mdx');
      const indexMdPath = path.join(blogDirectory, entry.name, 'index.md');
      if (fs.existsSync(indexPath) || fs.existsSync(indexMdPath)) {
        slugs.push(entry.name);
      }
    } else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) {
      // Direct file
      slugs.push(entry.name.replace(/\.(mdx|md)$/, ''));
    }
  }

  return slugs;
}

/**
 * Get a single blog post by slug
 */
export function getPostBySlug(slug: string): BlogPost | null {
  // Try directory-based post first (with index.mdx)
  let fullPath = path.join(blogDirectory, slug, 'index.mdx');

  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(blogDirectory, slug, 'index.md');
  }

  if (!fs.existsSync(fullPath)) {
    // Try direct file
    fullPath = path.join(blogDirectory, `${slug}.mdx`);
  }

  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(blogDirectory, `${slug}.md`);
  }

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || 'Untitled',
    date: data.date || new Date().toISOString().split('T')[0],
    excerpt: data.excerpt || data.description || '',
    description: data.description,
    tags: data.tags || [],
    featuredImage: data.featuredImage || data.heroImage,
    author: data.author || 'Hass Dhia',
    content,
  };
}

/**
 * Get all blog posts sorted by date (newest first)
 */
export function getAllPosts(): BlogPost[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map(slug => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}
