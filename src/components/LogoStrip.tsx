export function LogoStrip() {
  // Use brand names with industry descriptors for better context
  const brands = [
    { name: "Summit Operations", industry: "Logistics & Warehousing" },
    { name: "Ridgeway Supply Co.", industry: "Distribution" },
    { name: "Meridian Tech Solutions", industry: "B2B SaaS" },
    { name: "Cascade Retail Group", industry: "Multi-location Retail" },
    { name: "Pinnacle Manufacturing", industry: "Industrial Equipment" }
  ];
  return (
    <div className="container section vt-section">
      <div className="text-center mb-6">
        <div className="uppercase tracking-[0.18em] text-xs font-semibold mb-2 text-[hsl(var(--muted-foreground))] vt-reveal">
          Trusted Partners
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {brands.map((brand) => (
          <span
            key={brand.name}
            className="uppercase tracking-wide rounded-xl px-4 py-2 text-xs font-semibold text-[hsl(var(--muted-foreground))] border border-[hsl(var(--border))] bg-transparent"
            aria-label={`Partner: ${brand.name} — ${brand.industry}`}
            title={`${brand.name} — ${brand.industry}`}
          >
            {brand.name} — {brand.industry}
          </span>
        ))}
      </div>
    </div>
  );
}


