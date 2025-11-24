import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "../components/Nav";
import { MobileNav } from "../components/MobileNav";
import { ParallaxBG } from "../components/ParallaxBG";
import { PageTransition } from "../components/PageTransition";
import { BackToTop } from "../components/BackToTop";
import Script from "next/script";
import { ToastProvider } from "../components/ui/Toast";
import { MotionProvider } from "../components/ClientMotionProvider";

export const metadata: Metadata = {
  title: "Smart Technology Investments",
  description: "Partnership Pitch Engine: cinematic decks, activation concepts, and strategic narratives that make brands say 'yes.'",
  icons: {
    icon: [
      { url: "/sti_favicon.webp", type: "image/webp" },
      { url: "/favicon.ico", rel: "icon", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Smart Technology Investments",
    description: "Partnership Pitch Engine: cinematic decks, activation concepts, and strategic narratives that make brands say 'yes.'",
    type: "website",
    images: ["/sti_favicon.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Technology Investments",
    description: "Partnership Pitch Engine: cinematic decks, activation concepts, and strategic narratives that make brands say 'yes.'",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className="antialiased bg-[#03060C] text-white">
        <meta name="theme-color" content="#f5f7fb" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0b1220" media="(prefers-color-scheme: dark)" />
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-3 focus:py-2 focus:rounded-md focus:bg-[hsl(var(--primary))] focus:text-[hsl(var(--primary-foreground))]">Skip to content</a>
        <Script id="theme-init" strategy="beforeInteractive">{`
          (function(){
            try {
              var saved = localStorage.getItem('theme');
              var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
              var useDark = saved ? saved === 'dark' : prefersDark || true;
              document.documentElement.classList.toggle('dark', useDark);
            } catch (e) {}
          })();
        `}</Script>
        <MotionProvider>
          <ParallaxBG />
          <div className="progress fixed inset-x-0 top-0 h-1 bg-[hsl(var(--primary))] z-[41] pointer-events-none" />
          <ToastProvider>
            <div className="flex min-h-screen flex-col bg-transparent">
              <MobileNav />
              <Nav />
              <main id="main" className="flex-1 pt-[calc(env(safe-area-inset-top)+3.5rem)] lg:pt-0">
                <PageTransition>{children}</PageTransition>
                <footer className="max-w-screen-xl mx-auto px-4 py-8 text-sm text-[hsl(var(--foreground)/0.6)]">
                  © {new Date().getFullYear()} Smart Technology Investments ·{" "}
                  <a
                    href="https://www.linkedin.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[hsl(var(--foreground)/0.7)] hover:text-[hsl(var(--foreground))] transition-colors"
                  >
                    Follow on LinkedIn
                  </a>
                </footer>
              </main>
            </div>
            <BackToTop />
          </ToastProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
