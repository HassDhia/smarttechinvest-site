"use client";
import { useMemo } from "react";
import { SectionHeader } from "../../components/SectionHeader";

export default function SimulatorPage() {
  const src = useMemo(() => {
    if (typeof window === "undefined") return "";
    const env = process.env.NEXT_PUBLIC_SIMULATOR_URL;
    return env && env.length > 0 ? env : "/simulator/index.html";
  }, []);

  return (
    <section className="container section">
      <SectionHeader kicker="Tool" title="Offer Uplift Simulator" subtitle="Model pricing, conversion, and margin sensitivities." useGradientTitle />
      <div className="rounded-2xl overflow-hidden bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] border border-[hsl(var(--border))] shadow-sm">
        <div className="aspect-[16/10] w-full">
          <iframe
            title="Offer Uplift Simulator"
            src={src}
            className="w-full h-full"
            loading="eager"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
      <p className="mt-3 text-xs text-[hsl(var(--muted-foreground))]">
        If the simulator does not load, open it directly in a new tab.
      </p>
    </section>
  );
}


