export function SectionHeader({
  title,
  subtitle,
  subtitleClassName,
  kicker,
  number,
  useGradientTitle = false,
}: {
  title: string;
  subtitle?: string;
  subtitleClassName?: string;
  kicker?: string;
  number?: string;
  useGradientTitle?: boolean;
}) {
  return (
    <div className="mb-12 mt-24 first:mt-0 vt-section">
      {number ? (
        <div className="font-mono uppercase tracking-[0.2em] text-[10px] font-medium mb-3 text-[hsl(var(--muted-foreground))] vt-reveal">
          {number}
        </div>
      ) : kicker ? (
        <div className="uppercase tracking-[0.15em] text-[10px] font-medium mb-3 text-[hsl(var(--muted-foreground))] vt-reveal">{kicker}</div>
      ) : null}
      <h2 className={`font-semibold tracking-tight fs-step-3 ${useGradientTitle ? "text-gradient" : "text-foreground"} vt-reveal`}>{title}</h2>
      {subtitle ? (
        <p className={`mt-3 fs-step-0 max-w-2xl vt-reveal ${subtitleClassName ?? "text-foreground/80"}`}>{subtitle}</p>
      ) : null}
    </div>
  );
}

