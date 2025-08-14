## Smart Technology Investments (STI) – Website

Production website for Smart Technology Investments. Built with Next.js App Router, Tailwind CSS v4, Framer Motion, and a small design system of reusable UI primitives.

— Production domain: `smarttechinvest.com` (configured via Vercel)


### Features

- **Framework**: Next.js 15 + React 19 (App Router)
- **Styling**: Tailwind CSS v4 with tokenized design system (`src/app/globals.css`)
- **Motion**: Framer Motion animations and page transitions
- **UI**: Radix primitives (Dialog, Tooltip, Toast) + Lucide icons
- **UX**: Responsive layout, desktop sidebar nav, mobile menu, parallax background, gradients, dark mode
- **Booking**: Calendly embed
- **Leads**: `/api/lead` endpoint using Resend
- **SEO/Infra**: Middleware canonicalizes `www` → apex domain in production


### Tech Stack

- **Next.js** `15.4.6`, **React** `19.1.0`
- **Tailwind CSS** `^4` via PostCSS
- **Framer Motion** `^12`
- **Radix UI** (Dialog/Tooltip/Toast), **lucide-react** icons
- **Resend** for transactional email
- **Vercel** for hosting/deployments


### Getting Started

#### Prerequisites

- Node.js >= 18 and npm >= 9 (see `package.json#engines`)

#### Setup

1) Install dependencies

```bash
npm install
```

2) Create `.env.local`

```bash
# Required for /api/lead
RESEND_API_KEY=your_resend_api_key

# Optional overrides
LEAD_NOTIFY_EMAIL=has.dhia@gmail.com
LEADS_FROM_EMAIL=onboarding@resend.dev
```

3) Start the dev server

```bash
npm run dev
```

Open `http://localhost:3000`.


### Scripts

- `npm run dev` – Start local development (Turbopack)
- `npm run build` – Production build
- `npm run start` – Start production server
- `npm run lint` – Lint with Next.js ESLint config
- `npm run deploy` – Deploy to Vercel (`vercel --prod`)


### Environment Variables

Used by `src/app/api/lead/route.ts`:

- `RESEND_API_KEY` (required): API key for Resend; without it, posting a lead returns 500.
- `LEAD_NOTIFY_EMAIL` (optional): Notification recipient. Defaults to `has.dhia@gmail.com`.
- `LEADS_FROM_EMAIL` (optional): From address for Resend. Defaults to `onboarding@resend.dev`.

For the simulator embed (optional):

- `NEXT_PUBLIC_SIMULATOR_URL` (optional): If set, `/simulator` will load this URL in an iframe. If not set, it falls back to `/simulator/index.html` so you can serve a static build under `public/simulator/`.

Define these in `.env.local` for development and in Vercel Project Settings for production.


### Project Structure

```
src/
  app/
    api/lead/route.ts        # POST endpoint – scores diagnostic + emails via Resend
    diagnostic/page.tsx      # Growth diagnostic form (client)
    offers/page.tsx          # Productized offers
    resources/page.tsx       # Strategy OS resources
    schedule/page.tsx        # Calendly booking
    layout.tsx               # Root layout, providers, nav, transitions
    page.tsx                 # Home page
    globals.css              # Tokens + utilities
  components/
    ui/                      # Button, Input, Tooltip, Dialog, Toast, Icon
    ...                      # Hero, SectionHeader, WorkCard, etc.
  lib/                       # Motion helpers, utilities
  middleware.ts              # www -> apex redirect in production
```


### Routes

- `/` – Home
- `/offers` – Productized offers
- `/diagnostic` – Growth diagnostic (client-side form posts to API)
- `/resources` – Strategy OS resources
- `/schedule` – Calendly booking
- `/simulator` – Offer Uplift Simulator (iframe embed)
- `/api/lead` – POST endpoint

Example `POST /api/lead` payload (sent by the diagnostic page):

```json
{
  "icp": "Low|Medium|High",
  "pricing": "Low|Medium|High",
  "pipeline": "Low|Medium|High",
  "ops": "Low|Medium|High",
  "email": "you@example.com",
  "url": "http://localhost:3000/diagnostic",
  "referrer": "",
  "userAgent": "..."
}
```

The API sums a score (1–12), categorizes it (Quick Wins / Good Foundation / High Leverage), and emails the details via Resend.


### Design System

Tokens live in `src/app/globals.css` as CSS variables:

- **Colors**: `--background`, `--foreground`, `--surface`, `--border`, `--brand`, `--muted`, semantic statuses
- **Motion**: `--dur-100`, `--dur-200`, `--dur-300`, `--dur-500`, `--ease-standard`
- **Focus**: `--ring`, `--ring-color`, `--ring-offset`
- **Radii**: `--radius-sm`, `--radius`, `--radius-lg`
- **Shadows**: `--shadow-sm`, `--shadow`, `--shadow-lg`

Core UI primitives (see `src/components/ui/`):

- `Button` – variants: `primary | secondary | ghost | destructive | gradient`; sizes: `sm | md | lg`; supports `asChild`, loading
- `Input` – variants: `default | subtle`; sizes: `sm | md | lg`
- `Tooltip`, `Dialog`, `Toast` – Radix-based components
- `Icon` – Lucide facade honoring global `.lucide` defaults

Layout helpers:

- Use `.container` and `.section` utilities for consistent spacing
- Parallax background and page transitions are wired in `src/app/layout.tsx`

Accessibility:

- Global focus-visible rings via tokens
- Keyboard navigation supported in carousel and menus
- Radix semantics for overlays and tooltips


### Styling Notes

- Tailwind CSS v4 is configured via PostCSS (`@tailwindcss/postcss`).
- Prefer design tokens and utilities over inline styles for static values.
- Gradient utilities: `text-gradient`, `bg-aurora`, `bg-conic-beam`, `bg-glow`, `bg-grid`, `bg-noise`; divider: `divide-gradient`.
- Card surfaces use `bg-card` and tokenized borders; `highlight` prop on cards for emphasis.
- Reduced motion is respected via media queries and motion helpers in `src/components/motion.tsx`.


### Images

Remote images are allowed from the following hosts (see `next.config.ts`):

- `images.unsplash.com`
- `picsum.photos`
- `dummyimage.com`
- `upload.wikimedia.org`


### Deployment (Vercel)

Option A: CLI

```bash
npm run build
npm run deploy
```

Option B: Git integration

- Push to the `main` branch; Vercel builds and deploys automatically.

Domain & middleware

- `src/middleware.ts` redirects `www.smarttechinvest.com` to `smarttechinvest.com` (308). Update these values if the domain changes.


### Maintenance Tips

- Add new pages under `src/app/<route>/page.tsx`.
- Wrap new interactive components with existing providers in `layout.tsx` when needed.
- Keep design tokens centralized in `globals.css`.
- Configure environment variables in Vercel for production parity.


### License

All rights reserved. © Smart Technology Investments.
