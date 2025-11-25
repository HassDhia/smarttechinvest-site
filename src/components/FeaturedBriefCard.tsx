import { cn } from "../lib/cn";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Calendar, Download, ExternalLink, BarChart3, FileText, Target, Clock } from "lucide-react";
import type { Brief } from "../lib/content";
import Image from "next/image";

export function FeaturedBriefCard({
  brief,
  highlight = false,
  className,
}: {
  brief: Brief;
  highlight?: boolean;
  className?: string;
}) {
  const formattedDate = new Date(brief.displayDate || brief.date.slice(0, 10)).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formatCoverageWindow = (window: {start: string; end: string}) => {
    const start = new Date(window.start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const end = new Date(window.end).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `${start}–${end}`;
  };

  const formatWordCount = (count: number) => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  };

  return (
    <div className={cn(
      "rounded-2xl overflow-hidden bg-card text-[hsl(var(--card-foreground))] border border-[hsl(var(--border))] shadow-sm",
      "transition-all duration-200 ease-[var(--ease-standard)]",
      "hover:border-[hsl(var(--ring))] hover:shadow-md",
      highlight && "border-[hsl(var(--ring))] shadow-md",
      className
    )}>
      {/* Hero Image */}
      {brief.heroImage && (
        <div className="relative w-full aspect-video overflow-hidden">
          <Image
            src={brief.heroImage}
            alt={brief.title || 'Intelligence Brief'}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority={highlight}
          />
        </div>
      )}
      
      <div className="p-6 md:p-8">
        {/* Title */}
      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2 leading-tight">
        {brief.title || 'Intelligence Brief'}
      </h2>
      
      {/* Date and badge */}
      <div className="flex items-center gap-3 mb-4 text-sm text-[hsl(var(--muted-foreground))]">
        <time dateTime={brief.displayDate || brief.date.slice(0, 10)} className="flex items-center gap-1.5">
          <Calendar size={14} className="opacity-70" />
          {formattedDate}
        </time>
        <Badge variant="brand" size="sm">
          {brief.hasMarketPath ? 'Market-Path Dossier' : 'Weekly Brief'}
        </Badge>
      </div>
      
      {/* Teaser from executive summary / Preview Text */}
      {brief.summary && (
        <div className="mb-6">
          <p className="text-sm md:text-base text-[hsl(var(--muted-foreground))] leading-relaxed line-clamp-3">
            {brief.summary}
          </p>
        </div>
      )}
      
      {/* Stats grid */}
      {brief.metadata && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 text-xs md:text-sm">
          {brief.coverageWindow && (
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[hsl(var(--muted))]">
                <Clock size={14} className="text-[hsl(var(--muted-foreground))]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-[hsl(var(--muted-foreground))]">Window</span>
                <span className="text-sm font-medium text-foreground">{formatCoverageWindow(brief.coverageWindow)}</span>
              </div>
            </div>
          )}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[hsl(var(--muted))]">
              <FileText size={14} className="text-[hsl(var(--muted-foreground))]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-[hsl(var(--muted-foreground))]">Sources</span>
              <span className="text-sm font-medium text-foreground">{brief.metadata.sources_count}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[hsl(var(--muted))]">
              <BarChart3 size={14} className="text-[hsl(var(--muted-foreground))]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-[hsl(var(--muted-foreground))]">Confidence</span>
              <span className="text-sm font-medium text-foreground">{brief.metadata.confidence_score}%</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[hsl(var(--muted))]">
              <Target size={14} className="text-[hsl(var(--muted-foreground))]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-[hsl(var(--muted-foreground))]">Length</span>
              <span className="text-sm font-medium text-foreground">{formatWordCount(brief.metadata.word_count)} words</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Tag chips */}
      {brief.tags && brief.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {brief.tags.map((tag, idx) => (
            <Badge key={idx} variant="outline" size="sm">
              {tag}
            </Badge>
          ))}
        </div>
      )}
      
      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button asChild variant="gradient" size="lg" className="flex-1 sm:flex-initial focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2">
          <a href={brief.href}>
            <ExternalLink size={18} className="mr-2" />
            Read Full Brief
          </a>
        </Button>
        
        <Button asChild variant="secondary" size="lg" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2">
          <a href={brief.pdf} target="_blank" rel="noopener noreferrer">
            <Download size={18} className="mr-2" />
            Download PDF
          </a>
        </Button>
      </div>
      </div>
    </div>
  );
}
