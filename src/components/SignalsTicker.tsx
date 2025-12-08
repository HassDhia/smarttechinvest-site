import { cn } from "../lib/cn";
import { Badge } from "./ui/Badge";
import { TrendingUp, Calendar } from "lucide-react";
import type { Brief } from "../lib/content";
import { getSignalStrengthLabel, getSignalStrengthTier, SignalStrengthTier } from "../lib/signal-strength";

export function SignalsTicker({
  brief,
  className,
}: {
  brief: Brief;
  className?: string;
}) {
  if (!brief.topSignals || brief.topSignals.length === 0) {
    return null;
  }

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return '';
    }
  };

  const isForecast = (dateStr?: string, coverageEnd?: string) => {
    if (!dateStr || !coverageEnd) return false;
    try {
      const signalDate = new Date(dateStr);
      const endDate = new Date(coverageEnd);
      return signalDate > endDate;
    } catch {
      return false;
    }
  };

  const getSignalStrengthBadgeClass = (tier: SignalStrengthTier | null) => {
    switch (tier) {
      case "high":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800";
      case "medium":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800";
      default:
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800";
    }
  };

  return (
    <div className={cn(
      "rounded-2xl p-4 bg-card text-[hsl(var(--card-foreground))] border border-[hsl(var(--border))] shadow-sm",
      className
    )}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp size={16} className="text-[hsl(var(--muted-foreground))]" />
        <h3 className="text-sm font-semibold text-foreground">Key Signals</h3>
      </div>
      
      {/* Signal items */}
      <div className="space-y-3">
        {brief.topSignals.slice(0, 3).map((signal, idx) => (
          <div key={idx} className="pb-3 mb-3 last:pb-0 last:mb-0 last:border-0 border-b border-[hsl(var(--border))]">
            {/* Date on its own line, larger */}
            {signal.date && (
              <div className="flex items-center gap-1.5 text-xs text-[hsl(var(--muted-foreground))] mb-1.5">
                <Calendar size={12} />
                <span className="font-medium">{formatDate(signal.date)}</span>
              </div>
            )}
            
            {/* Headline with better readability */}
            <p className="text-sm text-foreground leading-relaxed mb-2">
              {signal.headline}
            </p>
            
            {/* Badges at the bottom */}
            <div className="flex items-center gap-2">
              {(() => {
                const tier = getSignalStrengthTier(signal.confidence);
                const label = getSignalStrengthLabel(signal.confidence) ?? "Signal";
                return (
                  <Badge
                    variant="outline"
                    size="sm"
                    className={cn("text-xs font-semibold", getSignalStrengthBadgeClass(tier))}
                  >
                    {label}
                  </Badge>
                );
              })()}
              {signal.date && brief.coverageWindow && isForecast(signal.date, brief.coverageWindow.end) && (
                <Badge variant="brand" size="sm" className="text-xs">
                  Forecast
                </Badge>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Footer note */}
      <div className="mt-3 pt-2 border-t border-[hsl(var(--border))]">
        <p className="text-xs text-[hsl(var(--muted-foreground))]">
          Top signals ranked by Signal Strength from {brief.metadata?.sources_count || 0} sources
        </p>
      </div>
    </div>
  );
}
