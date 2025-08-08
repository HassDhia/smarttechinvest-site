export function LogoStrip() {
  // Use simple brand name chips for a cleaner, premium look
  const brands = ["ACME", "NOVA", "ZENCO", "ALPHA", "PRIME"];
  return (
    <div className="container section">
      <div className="flex flex-wrap items-center justify-center gap-4">
        {brands.map((name) => (
          <span
            key={name}
            className="uppercase tracking-wide rounded-xl px-4 py-2 text-xs font-semibold bg-white/5 dark:bg-white/5"
            style={{ color: "var(--muted)", border: "1px solid var(--border)" }}
            aria-label={`Logo ${name}`}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}


