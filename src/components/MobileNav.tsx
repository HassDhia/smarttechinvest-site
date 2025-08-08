"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Home, NotebookText, Rocket, Layers, FileText, Phone, Menu, X, SunMoon } from "lucide-react";
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
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  return (
    <div className="lg:hidden">
      {/* Top bar */}
      <div className="fixed top-0 inset-x-0 z-40 h-14 bg-white/80 dark:bg-slate-950/60 backdrop-blur-md border-b" style={{ borderColor: "var(--border)" }}>
        <div className="h-full px-4 flex items-center justify-between">
          <Link href="/" className="font-bold" style={{ fontFamily: "var(--font-heading)" }}>STI</Link>
          <button aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)} className="rounded-lg px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/70">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {/* Drawer */}
      {open && (
        <div className="fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <nav className="absolute left-0 top-0 h-full w-[80%] max-w-xs bg-white dark:bg-slate-950 shadow-xl p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold" style={{ fontFamily: "var(--font-heading)" }}>Menu</span>
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="rounded-lg p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/70">
                <X />
              </button>
            </div>
            <ul className="flex flex-col gap-2">
              {links.map(({ href, label, icon: Icon, external }) => {
                const Anchor = (external ? ("a" as const) : Link) as unknown as React.ElementType;
                return (
                  <li key={href}>
                    <Anchor href={href} target={external ? "_blank" : undefined} rel={external ? "noopener" : undefined} onClick={() => setOpen(false)} className="flex items-center gap-2 px-2 py-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/60">
                      <Icon size={18} />
                      <span>{label}</span>
                    </Anchor>
                  </li>
                );
              })}
            </ul>
            <div className="mt-3">
              <ThemeToggle>
                <div className="flex items-center justify-center w-full gap-2 px-3 py-2 rounded-xl bg-black/[0.05] text-slate-900 dark:bg-white/10 dark:text-white/90">
                  <SunMoon size={16} /> <span>Theme</span>
                </div>
              </ThemeToggle>
            </div>
          </nav>
        </div>
      )}
      {/* Spacer so content is not hidden under top bar */}
      <div className="h-14" />
    </div>
  );
}


