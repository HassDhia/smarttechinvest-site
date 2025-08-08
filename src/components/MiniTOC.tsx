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
      <ul className="rounded-2xl border bg-white/70 dark:bg-white/5 backdrop-blur-md p-2 space-y-1" style={{ borderColor: "var(--border)" }}>
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`block px-3 py-1.5 rounded-lg text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] ${
                active === s.id ? "font-semibold text-[var(--brand)] dark:text-white" : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
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


