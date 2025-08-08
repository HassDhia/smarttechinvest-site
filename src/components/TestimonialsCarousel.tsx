"use client";
import { useState } from "react";

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
    <div className="relative max-w-3xl mx-auto rounded-2xl border bg-white/80 dark:bg-white/5 backdrop-blur-md p-6" style={{ borderColor: "var(--border)" }}>
      <blockquote className="text-lg leading-relaxed text-slate-800 dark:text-slate-200">“{t.quote}”</blockquote>
      <div className="mt-3 text-sm font-semibold text-slate-600 dark:text-slate-300">{t.author}</div>
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button aria-label="Previous" onClick={prev} className="m-2 rounded-full px-2 py-1 text-sm bg-black/5 dark:bg-white/10">‹</button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button aria-label="Next" onClick={next} className="m-2 rounded-full px-2 py-1 text-sm bg-black/5 dark:bg-white/10">›</button>
      </div>
    </div>
  );
}


