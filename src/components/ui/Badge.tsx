import { cn } from "../../lib/cn";

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[var(--border)] bg-slate-50 px-2 py-0.5 text-xs font-semibold text-[var(--brand)]",
        "dark:bg-slate-900/40",
        className
      )}
    >
      {children}
    </span>
  );
}


