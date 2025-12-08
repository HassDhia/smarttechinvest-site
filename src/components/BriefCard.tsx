import { cn } from "../lib/cn";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Calendar, Download, ExternalLink, BarChart3, FileText, Target } from "lucide-react";
import type { Brief } from "../lib/content";
import Image from "next/image";
import { getSignalStrengthLabel, getSignalStrengthHelperText } from "../lib/signal-strength";

export function BriefCard({
  brief,
  highlight = false,
  className,
  hideMetadata = false,
}: {
  brief: Brief;
  highlight?: boolean;
  className?: string;
  hideMetadata?: boolean;
}) {
  // Use displayDate if available, otherwise extract from full date string
  const dateStr = brief.displayDate || brief.date.slice(0, 10);
  const formattedDate = new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const signalStrengthLabel = getSignalStrengthLabel(brief.metadata?.confidence_score);

  return (
    <div className={cn(
      "rounded-xl overflow-hidden bg-card text-[hsl(var(--card-foreground))] border border-[hsl(var(--border))] shadow-sm",
      "transition-[transform,box-shadow,background-color] duration-[var(--dur-200)] ease-[var(--ease-standard)]",
      "hover:-translate-y-0.5 hover:shadow-[var(--shadow)] hover:bg-[hsl(var(--accent)/0.4)]",
      highlight && "border-[hsl(var(--ring))] shadow-[var(--shadow)]",
      className
    )}>
      {/* Hero Image */}
      {brief.heroImage && (
        <div className="relative w-full aspect-video overflow-hidden">
          <Image
            src={brief.heroImage}
            alt={brief.title || 'Intelligence Brief'}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
            priority={highlight}
          />
        </div>
      )}
      
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
        <Badge variant="brand">{brief.hasMarketPath ? 'Market-Path Dossier' : 'Weekly Brief'}</Badge>
        <div className="flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))]">
          <Calendar size={12} />
          <time dateTime={dateStr}>{formattedDate}</time>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-foreground mb-3">
        {brief.title || 'Intelligence Brief'}
      </h3>
      
      {/* Executive Summary / Preview Text */}
      {brief.summary && (
        <div className="mb-4">
          <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed line-clamp-3">
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
      {brief.metadata && !hideMetadata && (
        <div className="mb-4">
          <div className="flex flex-wrap items-center gap-4 text-xs text-[hsl(var(--muted-foreground))]">
            <div className="flex items-center gap-1">
              <FileText size={12} />
              <span>{brief.metadata.sources_count} sources</span>
            </div>
            {signalStrengthLabel && (
              <div className="flex items-center gap-1">
                <BarChart3 size={12} />
                <span>Signal Strength: {signalStrengthLabel}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Target size={12} />
              <span>{brief.metadata.word_count.toLocaleString()} words</span>
            </div>
          </div>
          {signalStrengthLabel && (
            <p className="mt-2 text-[11px] text-[hsl(var(--muted-foreground))] leading-relaxed">
              {getSignalStrengthHelperText()}
            </p>
          )}
        </div>
      )}
      
      <div className="flex gap-2">
        <Button asChild variant="gradient" size="sm">
          <a href={brief.href}>
            <ExternalLink size={14} className="mr-1" />
            Read Full Brief
          </a>
        </Button>
        
        {brief.marketPathHtml && (
          <Button asChild variant="secondary" size="sm">
            <a href={brief.marketPathHtml} target="_blank" rel="noopener noreferrer">
              <Download size={14} className="mr-1" />
              Open HTML
            </a>
          </Button>
        )}
      </div>
      </div>
    </div>
  );
}
