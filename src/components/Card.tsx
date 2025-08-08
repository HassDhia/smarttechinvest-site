import { cn } from "../lib/cn";
import type { LucideIcon } from "lucide-react";

export function Card({
  title,
  description,
  href,
  className,
  icon: IconCmp,
}: {
  title: string;
  description?: string;
  href?: string;
  className?: string;
  icon?: LucideIcon;
}) {
  const content = (
    <div className={cn(
      "rounded-xl p-5 bg-card/90 text-[hsl(var(--card-foreground))] border border-[hsl(var(--border)/0.6)] shadow-sm",
      "transition-[transform,box-shadow,background-color] duration-[var(--dur-200)] ease-[var(--ease-standard)]",
      "hover:-translate-y-0.5 hover:shadow-[var(--shadow)] hover:bg-accent/40",
      className
    )}>
      {IconCmp ? (
        <div className="mb-2 text-foreground/90 dark:text-foreground/90"><IconCmp className="lucide" aria-hidden /></div>
      ) : null}
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="mt-1 text-sm leading-6 text-[hsl(var(--muted-foreground))]">
          {description}
        </p>
      )}
      {href ? (
        <div className="mt-2 text-sm font-semibold">
          <span className="link-underline text-foreground/80 hover:text-foreground">Learn more →</span>
        </div>
      ) : null}
    </div>
  );
  return href ? (
    <a href={href} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))] rounded-xl">
      {content}
    </a>
  ) : (
    content
  );
}


