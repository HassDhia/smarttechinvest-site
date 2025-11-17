"use client";
import Link from "next/link";
import { Home, FlaskConical, Briefcase, BookOpen, CalendarClock } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/collab-lab", label: "Collab Lab", icon: FlaskConical },
  { href: "/work", label: "Work", icon: Briefcase },
  { href: "/intelligence", label: "Intelligence", icon: BookOpen },
  { href: "/schedule", label: "Schedule", icon: CalendarClock },
];

export function Nav() {
  const pathname = usePathname();
  const currentPath = pathname ?? "";
  return (
    <nav className="h-full py-6" aria-label="Primary">
      <div className="mx-4 rounded-3xl bg-transparent p-3 flex flex-col items-center gap-3 sticky top-6">
        <ul className="flex flex-col gap-3">
        {links.map(({ href, label, icon: Icon }) => {
          const active = currentPath === href || currentPath.startsWith(href + "/");
          return (
              <li key={href} className="flex">
                <Link
                href={href}
                prefetch={true}
                  data-nav={href}
                  className={`group flex items-center gap-2 px-3 h-9 rounded-md transition-[color,background,transform] duration-[var(--dur-200)] ease-[var(--ease-standard)] motion-reduce:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))] ${active ? "bg-[hsl(var(--accent))] text-[hsl(var(--foreground))]" : "text-[hsl(var(--foreground)/0.7)] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--foreground))]"}`}
                aria-current={active ? "page" : undefined}
              >
                <Icon size={18} strokeWidth={1.5} aria-hidden className="lucide shrink-0 opacity-90 group-hover:opacity-100" />
                <span className="leading-none">{label}</span>
                {active && <span className="ml-auto h-4 w-0.5 rounded bg-[hsl(var(--primary)/0.8)]" />}
              </Link>
            </li>
          );
        })}
        </ul>
        <div className="w-full pt-2">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

