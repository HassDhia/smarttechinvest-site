"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Home, NotebookText, Rocket, Layers, FileText, Phone, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { AnimatePresence, m } from "framer-motion";
import { durations, easings, overlayVariants } from "../lib/motion";

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
    if (open) {
      document.body.style.overflow = "hidden";
      document.documentElement.classList.add("has-drawer");
      return () => {
        document.body.style.removeProperty("overflow");
        document.documentElement.classList.remove("has-drawer");
      };
    }
    // Ensure no stray inline style remains when closed
    document.body.style.removeProperty("overflow");
    document.documentElement.classList.remove("has-drawer");
    return () => {
      document.body.style.removeProperty("overflow");
      document.documentElement.classList.remove("has-drawer");
    };
  }, [open]);
  // Hide main content from assistive tech and interaction when drawer is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    const main = document.getElementById("main");
    if (!main) return;
    if (open) {
      main.setAttribute("aria-hidden", "true");
      main.setAttribute("inert", "");
    } else {
      main.removeAttribute("aria-hidden");
      main.removeAttribute("inert");
    }
  }, [open]);
  useEffect(() => { if (open) closeRef.current?.focus(); }, [open]);
  return (
    <div className="lg:hidden">
      {/* Top bar */}
      <div className="fixed top-0 inset-x-0 z-40 h-14 bg-[hsl(var(--card))] text-[hsl(var(--foreground))] backdrop-blur-md border-b border-[hsl(var(--border))]">
        <div className="h-full px-4 flex items-center justify-between">
          <Link href="/" className="font-bold [font-family:var(--font-heading)] text-[hsl(var(--foreground))]">STI</Link>
          {open ? (
            <button
              type="button"
              aria-label="Close menu"
              aria-expanded="true"
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-1 text-[hsl(var(--foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/70"
            >
              <X aria-hidden />
            </button>
          ) : (
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded="false"
              onClick={() => setOpen(true)}
              className="rounded-lg px-2 py-1 text-[hsl(var(--foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/70"
            >
              <Menu aria-hidden />
            </button>
          )}
        </div>
      </div>
      {/* Drawer */}
        <AnimatePresence>
          {open ? (
            <m.div
              className="fixed inset-0 z-40"
              onKeyDown={(e) => { if (e.key === 'Escape') setOpen(false); }}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <m.div
                key="scrim"
                className="absolute inset-0 bg-black/50 motion-reduce:transition-none"
                onClick={() => setOpen(false)}
                initial="hidden"
                animate="show"
                exit="exit"
                variants={overlayVariants}
              />
              <m.nav
                key="panel"
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-labelledby="mobile-menu-title"
                className="absolute left-0 top-0 h-full w-[80%] max-w-xs bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] border-r border-[hsl(var(--border))] shadow-xl p-4 overflow-y-auto outline-none motion-reduce:transition-none"
                tabIndex={-1}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1, transition: { duration: durations.md, ease: easings.standard } }}
                exit={{ x: -20, opacity: 0, transition: { duration: durations.sm } }}
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
                    <Anchor href={href} prefetch={external ? undefined : true} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} onClick={() => setOpen(false)} className="flex items-center gap-2 px-2 py-2 rounded-lg text-[hsl(var(--foreground)/0.9)] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--foreground))]">
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
              </m.nav>
            </m.div>
          ) : null}
        </AnimatePresence>
      {/* Spacer so content is not hidden under top bar */}
      <div className="h-14" />
    </div>
  );
}


