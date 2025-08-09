"use client";
import Link from "next/link";
import { m } from "framer-motion";
import { microPress } from "../lib/motion";
import { Home, NotebookText, Rocket, Layers, FileText, Phone } from "lucide-react";
// Avoid passing Lucide component classes across the RSC boundary; render directly
import { ThemeToggle } from "./ThemeToggle";
import { useScrollspy } from "../hooks/useScrollspy";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/offers", label: "Offers", icon: Rocket },
  { href: "/diagnostic", label: "Diagnostic", icon: NotebookText },
  { href: "/resources", label: "Resources", icon: Layers },
  { href: "/schedule", label: "Schedule", icon: Phone },
  { href: "https://linkedin.com", label: "Blog", icon: FileText, external: true },
];

export function Nav() {
  const pathname = usePathname();
  const currentPath = pathname ?? "";
  const activeSection = useScrollspy(["how", "work", "outcomes"]);
  return (
    <nav className="h-full py-6" aria-label="Primary">
      <div className="mx-4 rounded-3xl bg-transparent p-3 flex flex-col items-center gap-3 sticky top-6">
        <ul className="flex flex-col gap-3">
        {links.map(({ href, label, icon: Icon, external }) => {
          const active = !external && (currentPath === href || currentPath.startsWith(href + "/"));
          const Anchor = (external ? ("a" as const) : Link) as unknown as React.ElementType;
          return (
              <li key={href} className="flex">
                <Anchor
                href={href}
                prefetch={external ? undefined : true}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                  data-nav={href}
                  className={`group flex items-center gap-2 px-3 h-9 rounded-md transition-[color,background,transform] duration-[var(--dur-200)] ease-[var(--ease-standard)] motion-reduce:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))] ${active ? "bg-[hsl(var(--accent))] text-[hsl(var(--foreground))]" : "text-[hsl(var(--foreground)/0.7)] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--foreground))]"} ${href === "/offers" && activeSection === "how" ? "font-semibold" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                <Icon size={18} strokeWidth={1.5} aria-hidden className="lucide shrink-0 opacity-90 group-hover:opacity-100" />
                <span className="leading-none">{label}</span>
                {active && <span className="ml-auto h-4 w-0.5 rounded bg-[hsl(var(--primary)/0.8)]" />}
              </Anchor>
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


