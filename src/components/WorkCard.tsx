import { cn } from "../lib/cn";
import { Badge } from "./ui/Badge";
import Image from "next/image";

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
    <div className={cn("group rounded-2xl overflow-hidden bg-white/80 dark:bg-white/5 p-2 border border-[var(--border)]") }>
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
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
        <span className="font-mono">{role}</span>
        <span>•</span>
        <span className="font-mono">{year}</span>
        {outcome ? (
          <Badge className="ml-0 sm:ml-auto bg-white/60 text-[var(--brand)] dark:bg-white/10">{outcome}</Badge>
        ) : null}
      </div>
      <h3 className="mt-1 text-lg font-semibold">{title}</h3>
    </div>
  );
  return href ? (
    <a href={href} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] rounded-2xl">{content}</a>
  ) : (
    content
  );
}


