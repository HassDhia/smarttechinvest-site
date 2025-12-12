"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "../lib/cn";

type Audience = "operators" | "brands";

const AUDIENCE_CONFIG: Record<
  Audience,
  {
    segmentLabel: string;
    primaryLabel: string;
    primaryHref: string;
    secondarySwitchLabel: string;
    secondarySwitchTo: Audience;
  }
> = {
  operators: {
    segmentLabel: "Operators",
    primaryLabel: "Request a collaboration review",
    primaryHref:
      "mailto:partnerships@smarttechinvest.com?subject=STI%20Collaboration%20Review%20%7C%20Operator",
    secondarySwitchLabel: "For Brands",
    secondarySwitchTo: "brands",
  },
  brands: {
    segmentLabel: "Brands",
    primaryLabel: "Request the Local Partner Pack",
    primaryHref:
      "mailto:partnerships@smarttechinvest.com?subject=STI%20Local%20Partner%20Pack%20Request%20%7C%20Brand",
    secondarySwitchLabel: "For Operators",
    secondarySwitchTo: "operators",
  },
};

export function HeroAudienceCta({ defaultAudience = "operators" }: { defaultAudience?: Audience }) {
  const [audience, setAudience] = useState<Audience>(defaultAudience);
  const config = AUDIENCE_CONFIG[audience];

  return (
    <div className="space-y-3 sm:space-y-4">
      <div
        role="radiogroup"
        aria-label="Select audience"
        className="inline-flex rounded-full border border-white/20 bg-black/30 p-1 text-[11px] uppercase tracking-[0.35em] text-white/70"
      >
        {(Object.keys(AUDIENCE_CONFIG) as Audience[]).map((value) => {
          const selected = value === audience;
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setAudience(value)}
              className={cn(
                "rounded-full px-4 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
                selected ? "bg-white/10 text-white shadow-sm" : "hover:text-white"
              )}
            >
              {AUDIENCE_CONFIG[value].segmentLabel}
            </button>
          );
        })}
      </div>

      <a
        href={config.primaryHref}
        className="inline-flex w-full items-center justify-center rounded-md bg-[#1F4FFF] px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-[0_10px_30px_rgba(31,79,255,0.35)] sm:w-auto sm:tracking-[0.3em]"
      >
        {config.primaryLabel}
      </a>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <button
          type="button"
          onClick={() => setAudience(config.secondarySwitchTo)}
          className="inline-flex items-center justify-center text-sm font-semibold text-white/85 underline-offset-4 hover:text-white hover:underline transition"
        >
          {config.secondarySwitchLabel}
        </button>
        <Link
          href="/intelligence"
          className="inline-flex items-center justify-center rounded-full border border-white/30 bg-black/30 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/95 shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070E]"
        >
          Read Intelligence →
        </Link>
      </div>
    </div>
  );
}
