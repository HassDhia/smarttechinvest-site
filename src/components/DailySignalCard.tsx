import { cn } from "../lib/cn";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Calendar, ExternalLink, ArrowRight } from "lucide-react";
import type { DailyFrontmatter } from "../lib/content";

export function DailySignalCard({
  daily,
  socialHook,
  className,
}: {
  daily: {
    slug: string;
    frontmatter: DailyFrontmatter;
    href: string;
  };
  socialHook?: string;
  className?: string;
}) {
  const formattedDate = new Date(daily.frontmatter.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  // Extract hook line - prefer social hook, fallback to first line of summary
  const rawHook = socialHook || daily.frontmatter.summary.split('.')[0] + '.';
  const hookLine = rawHook.length > 150 ? rawHook.slice(0, 150) + '...' : rawHook;

  // Parse MDX content for sensemaking and systemization bullets
  const parseMDXContent = (content: string) => {
    const lines = content.split('\n').map(line => line.trim()).filter(Boolean);
    
    let sensemaking: string[] = [];
    let systemization: string[] = [];
    let currentSection = '';
    
    for (const line of lines) {
      if (line.startsWith('**Sensemaking**')) {
        currentSection = 'sensemaking';
        continue;
      } else if (line.startsWith('**Systemization**')) {
        currentSection = 'systemization';
        continue;
      } else if (line.startsWith('**Shock**')) {
        currentSection = 'shock';
        continue;
      }
      
      if (currentSection === 'sensemaking' && line.startsWith('-')) {
        sensemaking.push(line.replace(/^-\s*/, ''));
      } else if (currentSection === 'systemization' && line.startsWith('-')) {
        systemization.push(line.replace(/^-\s*/, ''));
      }
    }
    
    return { sensemaking, systemization };
  };

  // For now, we'll use the frontmatter summary as fallback bullets
  // In a real implementation, you'd pass the MDX content here
  const sensemakingBullets = daily.frontmatter.summary.split('.').slice(1, 3).filter(Boolean);
  const systemizationBullets = daily.frontmatter.summary.split('.').slice(3, 4).filter(Boolean);

  return (
    <div className={cn(
      "rounded-xl p-4 bg-card text-[hsl(var(--card-foreground))] border border-[hsl(var(--border))] shadow-sm",
      "transition-[transform,box-shadow,background-color] duration-[var(--dur-200)] ease-[var(--ease-standard)]",
      "hover:-translate-y-0.5 hover:shadow-[var(--shadow)] hover:bg-[hsl(var(--accent)/0.4)]",
      className
    )}>
      {/* Header with badge and date */}
      <div className="flex items-center gap-2 mb-3">
        <Badge variant="neutral" size="sm">Daily Signal</Badge>
        <div className="flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))]">
          <Calendar size={12} />
          <time dateTime={daily.frontmatter.date}>{formattedDate}</time>
        </div>
      </div>
      
      {/* Hook line */}
      <h3 className="text-base font-semibold text-foreground mb-3 leading-tight line-clamp-2">
        {hookLine}
      </h3>
      
      {/* Two bullets */}
      <div className="space-y-2 mb-4">
        {/* Sensemaking bullet */}
        {sensemakingBullets.length > 0 && (
          <div className="text-sm text-[hsl(var(--muted-foreground))]">
            <span className="font-medium text-foreground/80">Sensemaking:</span> {sensemakingBullets[0]}
          </div>
        )}
        
        {/* Systemization bullet */}
        {systemizationBullets.length > 0 && (
          <div className="text-sm text-[hsl(var(--muted-foreground))]">
            <span className="font-medium text-foreground/80">Systemization:</span> {systemizationBullets[0]}
          </div>
        )}
      </div>
      
      {/* Tag chips */}
      {daily.frontmatter.tags && daily.frontmatter.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {daily.frontmatter.tags.slice(0, 3).map((tag, idx) => (
            <Badge key={idx} variant="outline" size="sm">
              {tag}
            </Badge>
          ))}
        </div>
      )}
      
      {/* Action buttons */}
      <div className="flex gap-2">
        <Button asChild variant="ghost" size="sm">
          <a href={daily.href}>
            <ExternalLink size={14} className="mr-1" />
            Read Daily
          </a>
        </Button>
        
        {/* Show Full Brief link if this daily references a weekly brief */}
        {daily.href.includes('briefs') && (
          <Button asChild variant="ghost" size="sm">
            <a href="/intelligence/briefs">
              <ArrowRight size={14} className="mr-1" />
              Full Brief
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
