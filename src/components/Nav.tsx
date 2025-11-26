"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "../lib/nav-links";

export function Nav() {
  const pathname = usePathname();
  const currentPath = pathname ?? "/";

  return (
    <header className="hidden lg:block sticky top-0 z-[45] border-b border-white/10 bg-[#070707]/95 backdrop-blur-xl">
      <div className="container flex h-12 items-center justify-between gap-8 uppercase">
        <Link
          href="/"
          className="headline-label text-white tracking-[0.02em]"
          aria-label="Smart Technology Investments"
        >
          Smart Technology Investments
        </Link>
        <nav aria-label="Primary" className="flex-1">
          <ul className="flex items-center justify-center gap-8 text-[0.75rem] font-semibold tracking-[0.02em] text-white/85">
            {navLinks.map(({ href, label }) => {
              const active = currentPath === href || currentPath.startsWith(`${href}/`);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`relative transition-colors group ${active ? "text-white" : "hover:text-white"}`}
                    aria-current={active ? "page" : undefined}
                  >
                    {label}
                    <span
                      className={`absolute inset-x-0 -bottom-2 mx-auto h-px w-6 rounded-full bg-white/20 transition-opacity ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                      aria-hidden
                    />
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
