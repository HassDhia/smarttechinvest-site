import { cn } from "../lib/cn";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Calendar, Download, ExternalLink, BarChart3, FileText, Target } from "lucide-react";
import type { Brief } from "../lib/content";

export function BriefCard({
  brief,
  highlight = false,
  className,
}: {
  brief: Brief;
  highlight?: boolean;
  className?: string;
}) {
  // Use displayDate if available, otherwise extract from full date string
  const dateStr = brief.displayDate || brief.date.slice(0, 10);
  const formattedDate = new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className={cn(
      "rounded-xl p-5 bg-card text-[hsl(var(--card-foreground))] border border-[hsl(var(--border))] shadow-sm",
      "transition-[transform,box-shadow,background-color] duration-[var(--dur-200)] ease-[var(--ease-standard)]",
      "hover:-translate-y-0.5 hover:shadow-[var(--shadow)] hover:bg-[hsl(var(--accent)/0.4)]",
      highlight && "border-[hsl(var(--ring))] shadow-[var(--shadow)]",
      className
    )}>
      <div className="flex items-center gap-2 mb-3">
        <Badge variant="brand">Weekly Brief</Badge>
        <div className="flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))]">
          <Calendar size={12} />
          <time dateTime={dateStr}>{formattedDate}</time>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-foreground mb-3">
        {brief.title || 'Intelligence Brief'}
      </h3>
      
      {/* Executive Summary */}
      {brief.summary && (
        <div className="mb-4">
          <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
            {brief.summary}
          </p>
        </div>
      )}
      
      {/* Key Signals */}
      {brief.keySignals && brief.keySignals.length > 0 && (
        <div className="space-y-2 mb-4">
          {brief.keySignals.slice(0, 2).map((signal, idx) => (
            <p key={idx} className="text-sm text-[hsl(var(--muted-foreground))]">
              • {signal}
            </p>
          ))}
        </div>
      )}
      
      {/* Metadata Stats */}
      {brief.metadata && (
        <div className="flex items-center gap-4 mb-4 text-xs text-[hsl(var(--muted-foreground))]">
          <div className="flex items-center gap-1">
            <FileText size={12} />
            <span>{brief.metadata.sources_count} sources</span>
          </div>
          <div className="flex items-center gap-1">
            <BarChart3 size={12} />
            <span>{brief.metadata.confidence_score}% confidence</span>
          </div>
          <div className="flex items-center gap-1">
            <Target size={12} />
            <span>{brief.metadata.word_count.toLocaleString()} words</span>
          </div>
        </div>
      )}
      
      <div className="flex gap-2">
        <Button asChild variant="gradient" size="sm">
          <a href={brief.href}>
            <ExternalLink size={14} className="mr-1" />
            Read Full Brief
          </a>
        </Button>
        
        <Button asChild variant="secondary" size="sm">
          <a href={brief.pdf} target="_blank" rel="noopener noreferrer">
            <Download size={14} className="mr-1" />
            PDF
          </a>
        </Button>
      </div>
    </div>
  );
}
