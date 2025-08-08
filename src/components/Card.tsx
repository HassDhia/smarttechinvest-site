import { cn } from "../lib/cn";

export function Card({
  title,
  description,
  href,
  className,
  icon: Icon,
}: {
  title: string;
  description?: string;
  href?: string;
  className?: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}) {
  const content = (
    <div className={cn(
      "rounded-xl p-5 bg-white/75 dark:bg-white/5 border",
      "transition-transform duration-200",
      "hover:-translate-y-0.5",
      className
    )} style={{ borderColor: "var(--border)" }}>
      {Icon ? (
        <div className="mb-2 text-[var(--brand)] dark:text-white/80"><Icon size={16} /></div>
      ) : null}
      <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
      {description && (
        <p className="mt-1 text-sm leading-6" style={{ color: "var(--muted)" }}>
          {description}
        </p>
      )}
      {href ? (
        <div className="mt-2 text-sm font-semibold">
          <span className="link-underline">Learn more →</span>
        </div>
      ) : null}
    </div>
  );
  return href ? (
    <a href={href} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] rounded-xl">
      {content}
    </a>
  ) : (
    content
  );
}


