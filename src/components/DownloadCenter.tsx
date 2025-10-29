import { cn } from "../lib/cn";
import { Button } from "./ui/Button";
import { Download, FileText, ExternalLink } from "lucide-react";
import type { Brief } from "../lib/content";

export function DownloadCenter({
  brief,
  className,
}: {
  brief: Brief;
  className?: string;
}) {
  return (
    <div className={cn(
      "rounded-2xl p-4 bg-card text-[hsl(var(--card-foreground))] border border-[hsl(var(--border))] shadow-sm",
      className
    )}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <Download size={16} className="text-[hsl(var(--muted-foreground))]" />
        <h3 className="text-sm font-semibold text-foreground">Download Center</h3>
      </div>
      
      {/* Download buttons */}
      <div className="space-y-2">
        {/* PDF Download - Primary */}
        <Button asChild variant="gradient" size="md" className="w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2">
          <a href={brief.pdf} target="_blank" rel="noopener noreferrer">
            <Download size={16} className="mr-2" />
            Download PDF
          </a>
        </Button>
        
        {/* MD Download - Secondary */}
        <Button asChild variant="ghost" size="sm" className="w-full justify-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2">
          <a href={`/intelligence/briefs/${brief.date}/intelligence_report.md`} target="_blank" rel="noopener noreferrer">
            <FileText size={14} className="mr-2" />
            Markdown Source
          </a>
        </Button>
      </div>
      
      {/* Footer note */}
      <div className="mt-3 pt-2 border-t border-[hsl(var(--border))]">
        <p className="text-xs text-[hsl(var(--muted-foreground))]">
          Share with partners, media, and BD teams
        </p>
      </div>
    </div>
  );
}
