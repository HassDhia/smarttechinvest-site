/**
 * Content utilities - Legacy briefs system (disabled)
 * Blog content now uses src/lib/blog.ts
 */

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
  displayDate?: string;
  displayTime?: string | null;
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

// Legacy briefs system disabled - returns empty arrays
export function listBriefs(): Brief[] {
  return [];
}

export function getBriefByDate(_date: string): Brief | null {
  return null;
}

export function getLatestBrief(): Brief | null {
  return null;
}
