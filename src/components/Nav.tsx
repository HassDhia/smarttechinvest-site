"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "../lib/nav-links";
import { ThemeToggle } from "./ThemeToggle";

export function Nav() {
  const pathname = usePathname();
  const currentPath = pathname ?? "/";

  return (
    <header className="hidden lg:block sticky top-0 z-[45] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] shadow-[0_1px_0_rgba(0,0,0,0.9)]">
      <div className="container flex h-12 items-center justify-between gap-8 uppercase text-[hsl(var(--foreground))]">
        <Link
          href="/"
          className="headline-label tracking-[0.02em]"
          aria-label="Smart Technology Investments"
        >
          Smart Technology Investments
        </Link>
        <nav aria-label="Primary" className="flex-1">
          <ul className="flex items-center justify-center gap-8 text-[0.75rem] font-semibold tracking-[0.02em] text-[hsl(var(--foreground-secondary))]">
            {navLinks.map(({ href, label }) => {
              const isAnchor = href.includes("#");
              const active = !isAnchor && (currentPath === href || currentPath.startsWith(`${href}/`));
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`relative transition-colors group ${active ? "text-[hsl(var(--foreground))]" : "hover:text-[hsl(var(--foreground))]"}`}
                    aria-current={active ? "page" : undefined}
                  >
                    {label}
                    <span
                      className={`absolute inset-x-0 -bottom-2 mx-auto h-px w-6 rounded-full bg-[color-mix(in_srgb,_hsl(var(--foreground))_70%,_transparent)] transition-opacity ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                      aria-hidden
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex items-center justify-end">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
