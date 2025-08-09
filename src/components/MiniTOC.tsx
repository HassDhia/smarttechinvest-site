"use client";
import { useScrollspy } from "../hooks/useScrollspy";

export function MiniTOC({
  sections,
}: {
  sections: { id: string; label: string }[];
}) {
  const active = useScrollspy(sections.map((s) => s.id));
  return (
    <nav className="hidden xl:block fixed right-4 top-28 z-20">
      <ul className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] p-2 space-y-1">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`block px-3 py-1.5 rounded-lg text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))] ${
                active === s.id
                  ? "font-semibold text-[hsl(var(--foreground))] bg-[hsl(var(--accent))]"
                  : "text-[hsl(var(--foreground)/0.7)] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--accent))]"
              }`}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}


