import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "../components/Nav";
import { MobileNav } from "../components/MobileNav";
import { ParallaxBG } from "../components/ParallaxBG";
import { PageTransition } from "../components/PageTransition";
import { BackToTop } from "../components/BackToTop";
import Script from "next/script";
import { ToastProvider } from "../components/ui/Toast";
import { Button } from "../components/ui/Button";
import { MotionProvider } from "../components/ClientMotionProvider";

export const metadata: Metadata = {
  title: "Smart Technology Investments",
  description: "Fractional Chief of Strategy for SMBs",
  icons: {
    icon: [
      { url: "/sti_favicon.webp", type: "image/webp" },
      { url: "/favicon.ico", rel: "icon", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <meta name="theme-color" content="#f5f7fb" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0b1220" media="(prefers-color-scheme: dark)" />
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-3 focus:py-2 focus:rounded-md focus:bg-[hsl(var(--primary))] focus:text-[hsl(var(--primary-foreground))]">Skip to content</a>
        <Script id="theme-init" strategy="beforeInteractive">{`
          (function(){
            try {
              var saved = localStorage.getItem('theme');
              var useDark = saved ? saved === 'dark' : false; // default LIGHT regardless of system
              document.documentElement.classList.toggle('dark', useDark);
            } catch (e) {}
          })();
        `}</Script>
        <MotionProvider>
          <ParallaxBG />
          {/* Native scroll progress bar (no JS, progressive enhancement) */}
          <div className="progress fixed inset-x-0 top-0 h-1 bg-[hsl(var(--primary))] z-[41] pointer-events-none" />
          <MobileNav />
          <ToastProvider>
            <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[260px_1fr] bg-transparent">
              <aside className="hidden lg:block sticky top-0 h-svh bg-transparent">
                {/* Sidebar: ensure content sits above any fades */}
                <div className="relative h-full">
                  <div className="relative z-10 flex h-full flex-col overflow-y-auto pb-12">
                    <Nav />
                  </div>
                  <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-10 bg-gradient-to-t from-background to-transparent" />
                </div>
              </aside>
              <main id="main" className="min-w-0">
                <PageTransition>{children}</PageTransition>
                <footer className="max-w-screen-xl mx-auto px-4 py-8 text-sm text-slate-500">© {new Date().getFullYear()} Smart Technology Investments</footer>
              </main>
            </div>
            <Button asChild size="lg" variant="gradient" className="hidden lg:inline-flex fixed right-5 bottom-5 hover:shadow">
              <a href="/schedule" aria-label="Book a call">Book Call</a>
            </Button>
            <BackToTop />
          </ToastProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
