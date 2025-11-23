"use client";

export function SocialProofStrip() {
  const partners = ["Studios", "Retail", "Hospitality", "Streaming", "Agencies"];

  return (
    <div className="border-y border-[color-mix(in srgb, hsl(var(--foreground)) 12%, transparent)] bg-[color-mix(in srgb, hsl(var(--background)) 80%, hsl(var(--card)) 20%)] py-5 backdrop-blur">
      <div className="container">
        <div className="flex flex-wrap items-center justify-center gap-6 text-[0.6rem] tracking-[0.4em] uppercase text-[hsl(var(--foreground)/0.55)]">
          {partners.map((partner, index) => (
            <span key={partner} className="flex items-center gap-6">
              <span>{partner}</span>
              {index < partners.length - 1 && (
                <span className="h-1 w-1 rounded-full bg-[hsl(var(--foreground)/0.25)]" aria-hidden />
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
