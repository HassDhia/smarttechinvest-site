export function KPIStat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-xl p-4 bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] border border-[hsl(var(--border))]">
      <div className="text-2xl font-extrabold tracking-tight text-foreground">{value}</div>
      <div className="font-semibold text-foreground/90">{label}</div>
      {hint ? <div className="text-sm text-[hsl(var(--muted-foreground))] mt-0.5">{hint}</div> : null}
    </div>
  );
}


