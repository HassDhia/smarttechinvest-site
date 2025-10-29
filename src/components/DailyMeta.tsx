import { Calendar, Clock, Tag } from "lucide-react";
import { Badge } from "./ui/Badge";
import type { DailyFrontmatter } from "../lib/content";

export function DailyMeta({ frontmatter }: { frontmatter: DailyFrontmatter }) {
  const formattedDate = new Date(frontmatter.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Estimate reading time (roughly 200 words per minute)
  const wordCount = frontmatter.summary.split(' ').length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-[hsl(var(--muted-foreground))] mb-6">
      <div className="flex items-center gap-1">
        <Calendar size={14} />
        <time dateTime={frontmatter.date}>{formattedDate}</time>
      </div>
      
      <div className="flex items-center gap-1">
        <Clock size={14} />
        <span>{readingTime} min read</span>
      </div>
      
      {frontmatter.tags && frontmatter.tags.length > 0 && (
        <div className="flex items-center gap-2">
          <Tag size={14} />
          <div className="flex gap-1">
            {frontmatter.tags.map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
