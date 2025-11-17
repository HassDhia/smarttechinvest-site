"use client";
import Image from "next/image";

export function FounderSection() {
  return (
    <div className="grid gap-8 lg:grid-cols-[200px_1fr] items-start">
      <div className="relative aspect-square rounded-2xl overflow-hidden">
        <Image
          src="/headshot.jpeg"
          alt="Hass - Founder, STI"
          fill
          sizes="200px"
          className="object-cover"
        />
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))] mb-2">
          Founder
        </p>
        <h2 className="text-3xl font-semibold text-foreground mb-4">
          Hass — Founder, STI
        </h2>
        <p className="text-base text-foreground/80 max-w-2xl mb-3">
          I build signal-driven collab systems that connect operators, studios, and brands. My background across AI, media, and infrastructure lets me translate behavioral and cultural signals into strategic outcomes — without adding operational chaos.
        </p>
        <p className="text-sm text-[hsl(var(--muted-foreground))] italic">
          Strategic partner for studios, agencies, and operators.
        </p>
      </div>
    </div>
  );
}

