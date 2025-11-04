export function LogoStrip() {
  // Use simple brand name chips for a cleaner, premium look
  const brands = [
    "Northwind Labs",
    "BluePeak Logistics",
    "Aurora Health",
    "Cinderworks",
    "Helios Cloud"
  ];
  return (
    <div className="container section">
      <div className="text-center mb-6">
        <div className="uppercase tracking-[0.18em] text-xs font-semibold mb-2 text-[hsl(var(--muted-foreground))] vt-reveal">
          Trusted Partners
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {brands.map((name) => (
          <span
            key={name}
            className="uppercase tracking-wide rounded-xl px-4 py-2 text-xs font-semibold text-[hsl(var(--muted-foreground))] border border-[hsl(var(--border))] bg-transparent"
            aria-label={`Partner: ${name}`}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}


