"use client";
import { useState } from "react";
import { Button } from "./ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "We added 20% in margin through pricing and packaged offers within 60 days.",
    author: "CEO, SMB Services (placeholder)",
  },
  {
    quote: "Pipeline clarity + outbound automations doubled qualified demos.",
    author: "Founder, SaaS (placeholder)",
  },
  {
    quote: "Weekly operating cadence removed chaos—we finally execute the plan.",
    author: "Principal, Agency (placeholder)",
  },
];

export function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((i) => (i + 1) % TESTIMONIALS.length);
  const prev = () => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const t = TESTIMONIALS[index];
  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Testimonials"
      aria-live="polite"
      className="relative max-w-3xl mx-auto rounded-2xl border border-[var(--border)] bg-white/80 dark:bg-[var(--surface)] backdrop-blur-md p-6"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      }}
    >
      <blockquote className="text-lg leading-relaxed text-[var(--foreground)]">“{t.quote}”</blockquote>
      <div className="mt-3 text-sm font-semibold text-slate-700 dark:text-[var(--muted)]">{t.author}</div>
      <div className="absolute inset-y-0 left-0 flex items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={prev}
          aria-label="Previous"
          className="m-2 h-8 w-8 p-0 rounded-full bg-black/5 dark:bg-white/10"
        >
          <ChevronLeft size={18} strokeWidth={1.5} aria-hidden />
        </Button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={next}
          aria-label="Next"
          className="m-2 h-8 w-8 p-0 rounded-full bg-black/5 dark:bg-white/10"
        >
          <ChevronRight size={18} strokeWidth={1.5} aria-hidden />
        </Button>
      </div>
    </div>
  );
}


