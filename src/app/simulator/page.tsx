"use client";
import { useMemo, useState } from "react";
import { SectionHeader } from "../../components/SectionHeader";
import { Button } from "../../components/ui/Button";

export default function SimulatorPage() {
  const src = useMemo(() => {
    if (typeof window === "undefined") return "";
    const direct = process.env.NEXT_PUBLIC_SIMULATOR_URL;
    if (direct && direct.length > 0) return direct;
    // fallback: proxy via Next.js rewrite if SIMULATOR_PROXY_ORIGIN is set
    return "/simulator-app";
  }, []);

  const [failed, setFailed] = useState(false);

  return (
    <section className="container section">
      <SectionHeader kicker="Tool" title="Offer Uplift Simulator" subtitle="Model pricing, conversion, and margin sensitivities." useGradientTitle />

      {src ? (
        <div className="rounded-2xl overflow-hidden bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] border border-[hsl(var(--border))] shadow-sm">
          <div className="aspect-[16/10] w-full relative">
            <iframe
              title="Offer Uplift Simulator"
              src={src}
              className="w-full h-full"
              loading="eager"
              referrerPolicy="no-referrer"
              onError={() => setFailed(true)}
            />
            {failed && (
              <div className="absolute inset-0 flex items-center justify-center p-6 text-center bg-[hsl(var(--background)/0.7)] backdrop-blur-sm">
                <div>
                  <p className="font-semibold">Could not load the simulator here.</p>
                  <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">Some hosts block embedding. Open it in a new tab instead.</p>
                  <div className="mt-3">
                    <Button asChild variant="gradient"><a href={src} target="_blank" rel="noopener">Open Simulator</a></Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-[hsl(var(--border))] p-5 bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))]">
          <p className="font-semibold">Simulator URL not configured.</p>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
            Set <code>NEXT_PUBLIC_SIMULATOR_URL</code> in your environment to point to the deployed simulator. Alternatively, place a static build under <code>public/simulator/</code> and update this page to reference it.
          </p>
        </div>
      )}

      <p className="mt-3 text-xs text-[hsl(var(--muted-foreground))]">
        If the simulator does not load, open it directly in a new tab.
      </p>
    </section>
  );
}


