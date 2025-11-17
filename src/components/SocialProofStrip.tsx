"use client";

export function SocialProofStrip() {
  const partners = ["Studios", "Retailers", "Hospitality", "Streaming Partners"];

  return (
    <div className="border-y border-[hsl(var(--border))] py-6">
      <div className="container">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[hsl(var(--muted-foreground))]">
          {partners.map((partner, index) => (
            <span key={partner} className="flex items-center gap-4">
              <span className="font-normal">{partner}</span>
              {index < partners.length - 1 && (
                <span className="text-[hsl(var(--border))]" aria-hidden>
                  •
                </span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

