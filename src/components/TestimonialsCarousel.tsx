"use client";
import { useState } from "react";
import { Button } from "./ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "We added 20% in margin through pricing and packaged offers within 60 days.",
    author: "Maya Torres, CEO — Ridgefield Services",
  },
  {
    quote: "Pipeline clarity + outbound automations doubled qualified demos.",
    author: "Jordan Patel, Founder — ClearStack SaaS",
  },
  {
    quote: "Weekly operating cadence removed chaos—we finally execute the plan.",
    author: "Elena Brooks, Managing Partner — Harbor & Co. Agency",
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
      className="relative overflow-hidden max-w-3xl mx-auto rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] shadow-[var(--shadow-sm)] md:shadow-[var(--shadow)] p-6 md:p-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      }}
    >
      <blockquote className="text-base md:text-lg leading-relaxed">“{t.quote}”</blockquote>
      <div className="mt-3 text-sm font-semibold text-[hsl(var(--muted-foreground))]">{t.author}</div>
      <div className="absolute inset-y-0 left-0 flex items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={prev}
          aria-label="Previous"
          className="m-2 h-8 w-8 p-0 rounded-full bg-[hsl(var(--accent)/0.4)] hover:bg-[hsl(var(--accent))]"
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
          className="m-2 h-8 w-8 p-0 rounded-full bg-[hsl(var(--accent)/0.4)] hover:bg-[hsl(var(--accent))]"
        >
          <ChevronRight size={18} strokeWidth={1.5} aria-hidden />
        </Button>
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-noise opacity-40" />
    </div>
  );
}


