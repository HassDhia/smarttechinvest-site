export function SectionHeader({ title, subtitle, kicker, useGradientTitle = false }: { title: string; subtitle?: string; kicker?: string; useGradientTitle?: boolean }) {
  return (
    <div className="text-center mb-8 vt-section">
      {kicker ? (
        <div className="uppercase tracking-[0.18em] text-xs font-semibold mb-2 text-[hsl(var(--muted-foreground))] vt-reveal">{kicker}</div>
      ) : null}
      <h2 className={`font-extrabold tracking-tight fs-step-3 ${useGradientTitle ? "text-gradient" : "text-foreground"} vt-reveal`}>{title}</h2>
      {subtitle ? (
        <p className="mt-2 text-foreground/90 fs-step-0 vt-reveal">{subtitle}</p>
      ) : null}
    </div>
  );
}


