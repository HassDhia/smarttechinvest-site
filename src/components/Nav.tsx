"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "../lib/nav-links";

export function Nav() {
  const pathname = usePathname();
  const currentPath = pathname ?? "/";

  return (
    <header className="hidden lg:block sticky top-0 z-[45] border-b border-white/10 bg-[#03050c]/95 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between gap-10 uppercase">
        <Link
          href="/"
          className="headline-label text-white"
          aria-label="Smart Technology Investments"
        >
          Smart Technology Investments
        </Link>
        <nav aria-label="Primary" className="flex-1">
          <ul className="flex items-center justify-center gap-8 text-[0.75rem] font-semibold tracking-[0.45em] text-white/70">
            {navLinks.map(({ href, label }) => {
              const active = currentPath === href || currentPath.startsWith(`${href}/`);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`relative transition-colors ${active ? "text-white" : "hover:text-white"}`}
                    aria-current={active ? "page" : undefined}
                  >
                    {label}
                    {active ? (
                      <span className="absolute inset-x-0 -bottom-2 mx-auto h-0.5 w-6 rounded-full bg-white" aria-hidden />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="w-[140px]" />
      </div>
    </header>
  );
}
