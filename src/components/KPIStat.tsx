export function KPIStat({ 
  label, 
  value, 
  hint, 
  description,
  comparison 
}: { 
  label: string; 
  value: string; 
  hint?: string;
  description?: string;
  comparison?: string;
}) {
  return (
    <div className="rounded-xl p-4 bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] border border-[hsl(var(--border))]">
      <div className="text-2xl font-extrabold tracking-tight text-foreground">{value}</div>
      <div className="font-semibold text-foreground/90 mt-1">{label}</div>
      {description ? <div className="text-sm text-[hsl(var(--muted-foreground))] mt-1">{description}</div> : null}
      {hint ? <div className="text-sm text-[hsl(var(--muted-foreground))] mt-0.5">{hint}</div> : null}
      {comparison ? <div className="text-xs text-[hsl(var(--muted-foreground))] mt-1 italic">{comparison}</div> : null}
    </div>
  );
}


