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
      "rounded-[30px] p-6 bg-gradient-to-br from-[#0c1532] via-[#070d1d] to-[#040812] text-white border border-white/15 shadow-[0_25px_70px_rgba(1,3,10,0.6)]",
      className
    )}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 text-white/80">
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[color-mix(in_srgb,_var(--text-primary)_15%,_transparent)] border border-[color-mix(in_srgb,_var(--text-primary)_30%,_transparent)]">
          <Download size={18} className="text-white/70" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.45em] text-white/60">Download</p>
          <h3 className="text-sm font-semibold">Market-Path Assets</h3>
        </div>
      </div>
      
      {/* Download buttons */}
      <div className="space-y-2">
        {/* Market-Path HTML */}
        <Button asChild variant="gradient" size="md" className="w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 uppercase tracking-[0.3em]">
          <a href={dossierHref} target="_blank" rel="noopener noreferrer" className="w-full justify-center text-sm">
            <ExternalLink size={16} className="mr-2" />
            Open Market-Path Report
          </a>
        </Button>
        
        {/* Intelligence HTML */}
        {hasIntelligenceHtml ? (
          <Button asChild variant="ghost" size="sm" className="w-full justify-between text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2">
            <a href={brief.intelligenceHtml!} target="_blank" rel="noopener noreferrer">
              <FileText size={14} className="mr-2" />
              Open Intelligence Report
            </a>
          </Button>
        ) : (
          <div className="text-xs text-white/60 px-2 py-1 rounded-md border border-dashed border-white/20">
            Intelligence HTML will appear when supplied for this drop.
          </div>
        )}
      </div>
      
      {/* Footer note */}
      <div className="mt-5 pt-3 border-t border-white/10">
        <p className="text-xs text-white/60">
          Share with partners, media, and BD teams.
        </p>
      </div>
    </div>
  );
}
