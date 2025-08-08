"use client";
import Link from "next/link";
import { Home, NotebookText, Rocket, Layers, FileText, Phone, SunMoon } from "lucide-react";
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
  const activeSection = useScrollspy(["how", "work", "outcomes"]);
  return (
    <nav className="h-full py-6">
      <div className="mx-4 rounded-3xl bg-transparent p-3 flex flex-col items-center gap-3" style={{ position: "sticky", top: 24 }}>
        <ul className="flex flex-col gap-3">
        {links.map(({ href, label, icon: Icon, external }) => {
          const active = !external && (pathname === href || pathname.startsWith(href + "/"));
          const Anchor = (external ? ("a" as const) : Link) as unknown as React.ElementType;
          return (
              <li key={href} className="flex">
                <Anchor
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener" : undefined}
                  data-nav={href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] ${active ? "text-[var(--brand)] dark:text-white" : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white/90"} ${href === "/offers" && activeSection === "how" ? "font-semibold" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Anchor>
            </li>
          );
        })}
        </ul>
        <div className="w-full pt-2">
          <ThemeToggle>
            <div className="flex items-center justify-center w-full gap-2 px-3 py-2 rounded-xl bg-black/[0.05] text-slate-900 dark:bg-white/10 dark:text-white/90">
              <SunMoon size={16} /> <span>Theme</span>
            </div>
          </ThemeToggle>
        </div>
      </div>
    </nav>
  );
}


