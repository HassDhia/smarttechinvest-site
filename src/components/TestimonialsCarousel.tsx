"use client";
import { useState } from "react";
import { Button } from "./ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "STI identified a market signal we'd missed — the shift from vendor relationships to strategic partnerships. Their signal-driven positioning opened doors we'd been knocking on for months — we closed our first partnership in 18 days instead of 90.",
    author: "Sarah Chen",
    role: "Founder & CEO, Artisan Goods Co.",
  },
  {
    quote: "STI analyzed behavioral patterns in partnership responses and built a narrative framework around those signals. The result: $850K in ARR pipeline from just 3 pitches. The signals told the story.",
    author: "Marcus Rodriguez",
    role: "VP Marketing, Urban Retail Collective",
  },
  {
    quote: "STI's signal analysis revealed gaps in our partner narrative that we couldn't see. After they redesigned it based on those behavioral signals, response rates tripled — and we went from 2–3 warm intros per quarter to 2–4 per month.",
    author: "Jennifer Park",
    role: "COO, CloudScale Solutions",
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
      <blockquote className="text-base md:text-lg leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
      <div className="mt-3 text-sm font-semibold text-[hsl(var(--muted-foreground))]">
        {t.author}
        {t.role ? <span className="font-normal"> — {t.role}</span> : null}
      </div>
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


