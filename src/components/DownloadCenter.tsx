import { cn } from "../lib/cn";
import { Button } from "./ui/Button";
import { FileText, ExternalLink, Download } from "lucide-react";
import type { Brief } from "../lib/content";

export function DownloadCenter({
  brief,
  className,
}: {
  brief: Brief;
  className?: string;
}) {
  const dossierHref = brief.marketPathHtml || brief.href;
  const hasIntelligenceHtml = Boolean(brief.intelligenceHtml);

  return (
    <div className={cn(
      "rounded-[28px] p-5 bg-[#060b17] text-white border border-white/10 shadow-[0_15px_50px_rgba(0,0,0,0.45)]",
      className
    )}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-3 text-white/80">
        <Download size={16} className="text-white/60" />
        <h3 className="text-sm font-semibold">Download Center</h3>
      </div>
      
      {/* Download buttons */}
      <div className="space-y-2">
        {/* Market-Path HTML */}
        <Button asChild variant="gradient" size="md" className="w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2">
          <a href={dossierHref} target="_blank" rel="noopener noreferrer" className="w-full justify-center text-sm uppercase tracking-[0.2em]">
            <ExternalLink size={16} className="mr-2" />
            Open Market-Path Report
          </a>
        </Button>
        
        {/* Intelligence HTML */}
        {hasIntelligenceHtml ? (
          <Button asChild variant="ghost" size="sm" className="w-full justify-start text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2">
            <a href={brief.intelligenceHtml!} target="_blank" rel="noopener noreferrer">
              <FileText size={14} className="mr-2" />
              Open Intelligence Report
            </a>
          </Button>
        ) : (
          <div className="text-xs text-white/60 px-2 py-1">
            Intelligence HTML will appear when supplied for this drop.
          </div>
        )}
      </div>
      
      {/* Footer note */}
      <div className="mt-3 pt-2 border-t border-[hsl(var(--border))]">
        <p className="text-xs text-white/60">
          Share with partners, media, and BD teams
        </p>
      </div>
    </div>
  );
}
