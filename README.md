# EventWalaBabu

Luxury wedding & event planning marketing site. React 19 + TypeScript + Vite + Tailwind CSS v4 + Framer Motion.

## Stack

- **React 19** + **React Router 7** (data router, lazy-loaded routes, client-side navigation)
- **Tailwind CSS v4** (token-driven design system in `src/index.css`, light/dark themes)
- **Framer Motion** for scroll reveals, page transitions and micro-interactions
- **react-hook-form + zod** for the multi-step inquiry wizard
- **react-helmet-async** for per-page SEO (title, meta, Open Graph, Twitter Card, JSON-LD)

## Getting started

```bash
npm install
npm run dev       # start dev server
npm run build      # type-check + production build to dist/
npm run preview    # preview the production build locally
npm run lint        # oxlint
```

## Project structure

```
src/
  components/       # ui/ primitives, layout, motion, shared, and per-page section folders
  pages/            # one file per route, lazy-loaded via src/router.tsx
  lib/               # utils, motion tokens, navigation/contact constants, SEO config, structured data
  hooks/             # reduced-motion, media query, scroll position, in-view lazy mount, theme
  context/           # light/dark theme provider (persisted to localStorage, no-flash boot script in index.html)
```

## SEO

Every route renders a `<Seo>` component (`src/components/Seo.tsx`) that sets the page title, meta
description, canonical URL, Open Graph tags, Twitter Card tags, and `robots` directive. Site-wide
`EventPlanningService` (Organization) structured data is injected once in `AppLayout`, and every
`FaqAccordion` instance automatically emits `FAQPage` structured data for its items.

**Before deploying to production**, update the placeholder domain in `src/lib/seo-config.ts`
(`siteUrl`), `index.html` (canonical + OG/Twitter fallback tags), `public/robots.txt` and
`public/sitemap.xml` to the real production URL.

`public/og-image.jpg` is a generated 1200×630 branded share image — swap in real photography
once available, keeping the same dimensions.

## Design system

Design tokens (colors, spacing, radii, motion durations/easings, z-index scale) live in
`src/index.css` under `@theme` and `.dark`. Reusable primitives are in `src/components/ui/`.
Motion tokens and shared variants are centralized in `src/lib/motion.ts` and consumed via the
`<Reveal>` / `<RevealGroup>` wrapper components — all animation respects
`prefers-reduced-motion` automatically.

## Accessibility

- Skip-to-content link, visible focus rings, `aria-live` status regions, keyboard-operable
  lightbox/menus/accordions.
- Color tokens are verified against WCAG AA contrast (`--color-muted-foreground` is tuned to the
  warm onyx scale rather than a generic gray to keep contrast ≥ 4.5:1 on every surface it's used
  against).
- All decorative SVG motifs are `aria-hidden`; interactive controls carry descriptive
  `aria-label`s.

## Performance

- Routes are code-split with `React.lazy` + `Suspense` (see `src/router.tsx`).
- Vendor code is split into cacheable chunks (`vendor-react`, `vendor-router`, `vendor-motion`,
  `vendor-forms`) in `vite.config.ts` so a change to one route doesn't invalidate the whole vendor
  bundle for returning visitors.
- Gallery tiles mount their content lazily via `IntersectionObserver`
  (`src/hooks/use-in-view-lazy.ts`) and show a skeleton until in view.
- The Google Maps embed uses `loading="lazy"`.
