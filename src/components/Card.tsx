import { cn } from "../lib/cn";
import type { LucideIcon } from "lucide-react";

export function Card({
  title,
  description,
  href,
  className,
  icon: IconCmp,
  highlight,
}: {
  title: string;
  description?: string;
  href?: string;
  className?: string;
  icon?: LucideIcon;
  highlight?: boolean;
}) {
  const baseClasses = cn(
    "rounded-xl p-6 bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] border border-[hsl(var(--border))]",
    "shadow-[var(--shadow-sm)] transition-[box-shadow,transform,border-color] duration-[var(--dur-200)] ease-[var(--ease-standard)]",
    href && "hover:-translate-y-[2px] hover:shadow-[var(--shadow-lg)] hover:border-[hsl(var(--primary)/0.3)]",
    highlight && "bg-gradient-to-br from-[hsl(var(--primary)/0.05)] to-[hsl(var(--primary)/0.02)] border-[hsl(var(--primary)/0.2)] hover:border-[hsl(var(--primary)/0.4)]",
    className
  );

  const content = (
    <div className={baseClasses}>
      {IconCmp ? (
        <div className="mb-3 text-[hsl(var(--foreground))] opacity-90">
          <IconCmp className="lucide" aria-hidden />
        </div>
      ) : null}
      <h3 className="text-lg font-semibold text-[hsl(var(--foreground))]">{title}</h3>
      {description && (
        <p className="mt-2 text-sm leading-6 text-[hsl(var(--foreground-secondary))]">
          {description}
        </p>
      )}
      {href ? (
        <div className="mt-3 text-sm font-semibold">
          <span className="link-underline text-[hsl(var(--foreground)/0.7)] hover:text-[hsl(var(--foreground))] transition-colors">
            Learn more →
          </span>
        </div>
      ) : null}
    </div>
  );

  return href ? (
    <a
      href={href}
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))] rounded-xl"
    >
      {content}
    </a>
  ) : (
    content
  );
}


