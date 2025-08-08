export function SectionHeader({ title, subtitle, kicker }: { title: string; subtitle?: string; kicker?: string }) {
  return (
    <div className="text-center mb-8">
      {kicker ? (
        <div className="uppercase tracking-[0.18em] text-xs font-semibold mb-2 text-[hsl(var(--muted-foreground))]">{kicker}</div>
      ) : null}
      <h2 className="font-extrabold tracking-tight text-foreground" style={{ fontFamily: "var(--font-heading)", fontSize: "var(--step-3)" }}>{title}</h2>
      {subtitle ? (
        <p className="mt-2 text-foreground/90" style={{ fontSize: "var(--step-0)" }}>{subtitle}</p>
      ) : null}
    </div>
  );
}


