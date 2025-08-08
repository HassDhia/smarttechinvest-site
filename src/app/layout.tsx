import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "../components/Nav";
import { ParallaxBG } from "../components/ParallaxBG";
import { PageTransition } from "../components/PageTransition";
import { BackToTop } from "../components/BackToTop";

export const metadata: Metadata = {
  title: "Smart Technology Investments",
  description: "Fractional Chief of Strategy for SMBs",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <meta name="theme-color" content="#f5f7fb" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0b1220" media="(prefers-color-scheme: dark)" />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-3 focus:py-2 focus:rounded-md focus:bg-[var(--brand)] focus:text-white">Skip to content</a>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => { try { const saved = localStorage.getItem('theme'); const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches; const useDark = saved ? saved === 'dark' : prefersDark; document.documentElement.classList.toggle('dark', useDark); } catch (_) {} })();`,
          }}
        />
        <ParallaxBG />
        <div className="grid min-h-screen grid-cols-[260px_1fr]" style={{ background: "transparent" }}>
          <aside className="sticky top-0 h-svh bg-transparent">
            <Nav />
          </aside>
          <main id="main" className="min-w-0">
            <PageTransition>{children}</PageTransition>
            <footer className="max-w-screen-xl mx-auto px-4 py-8 text-sm text-slate-500">© {new Date().getFullYear()} Smart Technology Investments</footer>
          </main>
        </div>
        <a href="/schedule" className="fixed right-5 bottom-5 px-4 py-2 rounded-full bg-[var(--brand)] text-white shadow hover:shadow-lg transition" style={{ transitionTimingFunction: "var(--ease-standard)", transitionDuration: "var(--dur-200)" }}>Book Call</a>
        <BackToTop />
      </body>
    </html>
  );
}
