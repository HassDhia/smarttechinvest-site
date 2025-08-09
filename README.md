# Smart Technology Investments – UI System Notes

## Tokens
- Colors via CSS variables in `src/app/globals.css` (`--background`, `--foreground`, `--surface`, `--border`, `--brand`, `--muted`, semantic statuses).
- Motion: `--dur-100/200/300/500`, `--ease-standard`.
- Focus: `--ring`, `--ring-color`, `--ring-offset`.
- Radii: `--radius-sm`, `--radius`, `--radius-lg`.
- Shadows: `--shadow-sm`, `--shadow`, `--shadow-lg`.
- Z-index: `--z-nav`, `--z-overlay`, `--z-toast`.

## Primitives
- Button: `src/components/ui/Button.tsx` (`variant`: primary/secondary/ghost/destructive; `size`: sm/md/lg; `asChild`; `isLoading`).
- Input: `src/components/ui/Input.tsx` (`variant`: default/subtle; `size`: sm/md/lg).
- Tooltip: `src/components/ui/Tooltip.tsx` (Radix; collision padding; `data-[state=open]`).
- Dialog: `src/components/ui/Dialog.tsx` (Radix + Framer motion; overlay/panel variants).
- Icon: `src/components/ui/Icon.tsx` (Lucide facade; respects global `.lucide` defaults; allows overrides).

## Layout
- Use `.container` and `.section` utilities for page sections.

## Motion
- `LazyMotion` provided at root in `src/app/layout.tsx`.
- Helpers in `src/components/motion.tsx` (`FadeIn`, `RiseIn`, overlay/panel variants).

## Accessibility
- Global focus-visible rings via tokens; keyboard navigation in carousel and mobile menu; tooltip and dialog use Radix semantics.

This is a [Next.js](https://nextjs.org) project for Smart Technology Investments, using Tailwind CSS, Lucide, Radix Icons, and Framer Motion.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

Tech stack: Next.js App Router, Tailwind v4, Framer Motion, Lucide, Radix Icons. Fonts via `@fontsource`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy

- Install Vercel CLI: `npm i -g vercel`
- Build locally: `npm run build`
- Deploy: `npm run deploy` (prompts the first time to link project)

## Style guide (utilities and best practices)

- Typography scale utilities: `fs-step--1`, `fs-step-0`, `fs-step-1`, `fs-step-2`, `fs-step-3`, `fs-step-4`.
- Color helpers: `text-brand`, `text-muted`. Prefer tokens over raw hex.
- Gradients:
  - Text: `text-gradient` (uses `--gradient-text` per theme)
  - Buttons: `<Button variant="gradient" />` (uses `--gradient-accent`)
  - Background accents: `bg-aurora`, `bg-conic-beam`, `bg-glow`, `bg-grid`, `bg-noise`
  - Dividers: `divide-gradient`
- Cards:
  - Standard card uses `bg-card` and tokenized borders.
  - Optional emphasis via `card-gradient` or `highlight` prop on `Card`/`WorkCard`.
- Parallax background: uses CSS variables (`--ty`, `--alpha`) set by refs. Avoid inline JSX styles.
- Reduced motion: complex animations disable automatically via media queries.

When adding components, avoid inline `style={{ ... }}` for static values. Prefer utilities in `globals.css` or Tailwind classes referencing design tokens.
