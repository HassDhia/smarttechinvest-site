import { cn } from "../lib/cn";
import { Button } from "./ui/Button";
import { CheckCircle, ArrowRight } from "lucide-react";
import type { Brief } from "../lib/content";

export function OperatorQuickWins({
  brief,
  className,
}: {
  brief: Brief;
  className?: string;
}) {
  if (!brief.operatorActions || brief.operatorActions.length === 0) {
    return null;
  }

  return (
    <div className={cn(
      "rounded-xl p-4 bg-card text-[hsl(var(--card-foreground))] border border-[hsl(var(--border))] shadow-sm",
      className
    )}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <CheckCircle size={16} className="text-green-600" />
        <h3 className="text-sm font-semibold text-foreground">Operator Quick Wins</h3>
      </div>
      
      {/* Action bullets */}
      <div className="space-y-2 mb-4">
        {brief.operatorActions.slice(0, 3).map((action, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))] mt-2 flex-shrink-0" />
            <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed">
              {action}
            </p>
          </div>
        ))}
      </div>
      
      {/* CTA */}
      <Button asChild variant="gradient" size="sm" className="w-full">
        <a href="/apply">
          <ArrowRight size={14} className="mr-2" />
          Request consideration
        </a>
      </Button>
      
      {/* Footer note */}
      <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2 text-center">
        Results in 30 days
      </p>
    </div>
  );
}
