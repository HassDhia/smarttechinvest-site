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
  image,
  href,
}: {
  title: string;
  role: string;
  year: string;
  outcome?: string;
  image?: string;
  href?: string;
}) {
  const content = (
    <div className={cn(
      "group rounded-2xl overflow-hidden p-2 bg-card/90 text-[hsl(var(--card-foreground))] border border-[hsl(var(--border)/0.6)] shadow-[var(--shadow-sm)]",
      "transition-[background,box-shadow,transform] duration-[var(--dur-200)] ease-[var(--ease-standard)] hover:-translate-y-0.5 hover:shadow-[var(--shadow)] hover:bg-accent/40"
    )}>
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
        <Image
          src={image || "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1600&auto=format&fit=crop"}
          alt="Project placeholder"
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          priority={false}
        />
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
        <span className="font-mono">{role}</span>
        <span>•</span>
        <span className="font-mono">{year}</span>
        {outcome ? (
          <Badge className="ml-0 sm:ml-auto">{outcome}</Badge>
        ) : null}
      </div>
      <h3 className="mt-1 text-lg font-semibold text-foreground">{title}</h3>
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


