"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Home, NotebookText, Rocket, Layers, FileText, Phone, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/offers", label: "Offers", icon: Rocket },
  { href: "/diagnostic", label: "Diagnostic", icon: NotebookText },
  { href: "/resources", label: "Resources", icon: Layers },
  { href: "/schedule", label: "Schedule", icon: Phone },
  { href: "https://linkedin.com", label: "Blog", icon: FileText, external: true },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  useEffect(() => { if (open) closeRef.current?.focus(); }, [open]);
  return (
    <div className="lg:hidden">
      {/* Top bar */}
      <div className="fixed top-0 inset-x-0 z-40 h-14 bg-[hsl(var(--card)/0.8)] dark:bg-[hsl(var(--card)/0.6)] backdrop-blur-md border-b border-[hsl(var(--border))]">
        <div className="h-full px-4 flex items-center justify-between">
          <Link href="/" className="font-bold [font-family:var(--font-heading)]">STI</Link>
          {open ? (
            <button
              type="button"
              aria-label="Close menu"
              aria-expanded="true"
              aria-controls="mobile-menu"
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/70"
            >
              <X aria-hidden />
            </button>
          ) : (
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded="false"
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
              className="rounded-lg px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/70"
            >
              <Menu aria-hidden />
            </button>
          )}
        </div>
      </div>
      {/* Drawer */}
      {open && (
        <div className="fixed inset-0 z-40" onKeyDown={(e) => { if (e.key === 'Escape') setOpen(false); }}>
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <nav
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
            className="absolute left-0 top-0 h-full w-[80%] max-w-xs bg-white dark:bg-slate-950 shadow-xl p-4 overflow-y-auto outline-none"
            tabIndex={-1}
          >
            <div className="flex items-center justify-between mb-2">
              <span id="mobile-menu-title" className="font-bold [font-family:var(--font-heading)]">Menu</span>
              <button ref={closeRef} type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="rounded-lg p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/70">
                <X aria-hidden />
              </button>
            </div>
            <ul className="flex flex-col gap-2">
              {links.map(({ href, label, icon: Icon, external }) => {
                const Anchor = (external ? ("a" as const) : Link) as unknown as React.ElementType;
                return (
                  <li key={href}>
                    <Anchor href={href} prefetch={external ? undefined : true} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} onClick={() => setOpen(false)} className="flex items-center gap-2 px-2 py-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/60">
                      <Icon aria-hidden />
                      <span>{label}</span>
                    </Anchor>
                  </li>
                );
              })}
            </ul>
            <div className="mt-3">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
      {/* Spacer so content is not hidden under top bar */}
      <div className="h-14" />
    </div>
  );
}


