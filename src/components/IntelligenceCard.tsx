import { cn } from "../lib/cn";
import { Badge } from "./ui/Badge";
import { Calendar } from "lucide-react";

export function IntelligenceCard({
  title,
  date,
  summary,
  href,
  type,
  className,
}: {
  title: string;
  date: string;
  summary: string;
  href: string;
  type: "daily" | "brief";
  className?: string;
}) {
  const parseDisplayDate = (raw: string) => {
    const match = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return new Date(raw);
    const [, year, month, day] = match;
    return new Date(Number(year), Number(month) - 1, Number(day));
  };

  const formattedDate = parseDisplayDate(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <a 
      href={href} 
      className={cn(
        "block focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))] rounded-xl",
        className
      )}
    >
      <div className={cn(
        "rounded-xl p-5 bg-card text-[hsl(var(--card-foreground))] border border-[hsl(var(--border))] shadow-sm",
        "transition-[transform,box-shadow,background-color] duration-[var(--dur-200)] ease-[var(--ease-standard)]",
        "hover:-translate-y-0.5 hover:shadow-[var(--shadow)] hover:bg-[hsl(var(--accent)/0.4)]"
      )}>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant={type === "brief" ? "brand" : "neutral"}>
            {type === "brief" ? "Weekly Brief" : "Daily Signal"}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))]">
            <Calendar size={12} />
            <time dateTime={date}>{formattedDate}</time>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        
        <p className="text-sm leading-6 text-[hsl(var(--muted-foreground))] line-clamp-3">
          {summary}
        </p>
        
        <div className="mt-3 text-sm font-semibold">
          <span className="link-underline text-foreground/80 hover:text-foreground">
            {type === "brief" ? "Read full brief →" : "Read full post →"}
          </span>
        </div>
      </div>
    </a>
  );
}
