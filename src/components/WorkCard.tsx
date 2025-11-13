"use client";
import { cn } from "../lib/cn";
import { Badge } from "./ui/Badge";
import Image from "next/image";
import { m } from "framer-motion";
import { microPress } from "../lib/motion";

export function WorkCard({
  title,
  role,
  year,
  outcome,
  description,
  image,
  href,
  highlight,
}: {
  title: string;
  role: string;
  year: string;
  outcome?: string;
  description?: string;
  image?: string;
  href?: string;
  highlight?: boolean;
}) {
  const content = (
    <div className={cn(
      "group rounded-2xl overflow-hidden p-2 bg-card text-[hsl(var(--card-foreground))] border border-[hsl(var(--border))] shadow-[var(--shadow-sm)]",
      "transition-[background,box-shadow,transform] duration-[var(--dur-200)] ease-[var(--ease-standard)] hover:-translate-y-0.5 hover:shadow-[var(--shadow)] hover:bg-accent/40",
      highlight ? "card-gradient" : ""
    )}>
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
        <Image
          src={image || "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1600&auto=format&fit=crop"}
          alt="Project case study image"
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          priority={false}
        />
      </div>
      <h3 className="mt-3 text-lg font-semibold text-foreground">{title}</h3>
      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
        <span className="font-mono">{role}</span>
        <span>·</span>
        <span className="font-mono">{year}</span>
      </div>
      {outcome ? (
        <div className="mt-2">
          <Badge className="font-semibold">{outcome}</Badge>
        </div>
      ) : null}
      {description ? (
        <p className="mt-1.5 text-xs text-[hsl(var(--muted-foreground))] leading-snug">{description}</p>
      ) : null}
    </div>
  );
  return href ? (
    <m.a
      href={href}
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))] rounded-2xl"
      {...microPress}
    >
      {content}
    </m.a>
  ) : (
    <m.div {...microPress}>{content}</m.div>
  );
}


