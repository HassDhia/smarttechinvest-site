import { cn } from "../lib/cn";
import { Badge } from "./ui/Badge";
import { Info, FileText, BarChart3, Clock, HelpCircle } from "lucide-react";
import type { Brief } from "../lib/content";

export function BriefSpecs({
  brief,
  className,
}: {
  brief: Brief;
  className?: string;
}) {
  const formatCoverageWindow = (window: {start: string; end: string}) => {
    const start = new Date(window.start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const end = new Date(window.end).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `${start}–${end}`;
  };

  return (
    <div className={cn(
      "rounded-2xl p-4 bg-card text-[hsl(var(--card-foreground))] border border-[hsl(var(--border))] shadow-sm",
      className
    )}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <Info size={16} className="text-[hsl(var(--muted-foreground))]" />
        <h3 className="text-sm font-semibold text-foreground">Brief Specs</h3>
      </div>
      
      {/* Specs definition list */}
      <div className="space-y-3 mb-4">
        {/* Coverage window */}
        {brief.coverageWindow && (
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[hsl(var(--muted))] flex-shrink-0">
              <Clock size={14} className="text-[hsl(var(--muted-foreground))]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-[hsl(var(--muted-foreground))] mb-0.5">Coverage Window</div>
              <div className="text-sm font-medium text-foreground">
                {formatCoverageWindow(brief.coverageWindow)}
              </div>
            </div>
          </div>
        )}
        
        {/* Sources count */}
        {brief.metadata && (
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[hsl(var(--muted))] flex-shrink-0">
              <FileText size={14} className="text-[hsl(var(--muted-foreground))]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-[hsl(var(--muted-foreground))] mb-0.5">Sources</div>
              <div className="text-sm font-medium text-foreground">
                {brief.metadata.sources_count}
                <a 
                  href={`${brief.href}#sources`} 
                  className="ml-1 text-[hsl(var(--primary))] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2"
                >
                  (view)
                </a>
              </div>
            </div>
          </div>
        )}
        
        {/* Confidence score */}
        {brief.metadata && (
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[hsl(var(--muted))] flex-shrink-0">
              <BarChart3 size={14} className="text-[hsl(var(--muted-foreground))]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-[hsl(var(--muted-foreground))] mb-0.5">Confidence</div>
              <div className="text-sm font-medium text-foreground flex items-center gap-2">
                {brief.metadata.confidence_score}%
                <div className="group relative">
                  <HelpCircle size={12} className="text-[hsl(var(--muted-foreground))] cursor-help" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-[hsl(var(--popover))] text-[hsl(var(--popover-foreground))] text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    Weighted by source quality + internal checks
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Methodology note */}
      <div className="pt-2 border-t border-[hsl(var(--border))]">
        <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed">
          Forecast items are labeled; vendor-asserted stats are disclosed.
        </p>
      </div>
    </div>
  );
}
