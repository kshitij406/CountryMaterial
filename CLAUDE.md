# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server at localhost:3000
pnpm build        # Production build (required before pnpm start)
pnpm start        # Serve the production build
pnpm lint         # ESLint via next lint
```

`next start` requires a prior `pnpm build` — there is no `.next` directory until the build runs.

## Architecture

### Stack
- **Next.js 14** (App Router, TypeScript, `src/` layout)
- **Sanity v3** — headless CMS, embedded Studio at `/studio`
- **Tailwind CSS 3.4** — design tokens defined in `tailwind.config.ts`
- **GSAP 3** — scroll animations (ScrollTrigger); **framer-motion** — used for `AnimatedGroup` only
- **Package manager: pnpm** (not npm/yarn)

### Data flow
All pages are React Server Components that fetch from Sanity at build/request time. GROQ queries live in `src/sanity/lib/queries.ts`. The Sanity client is in `src/sanity/lib/client.ts` and exposes `client` and `urlFor()`. The Studio config and all schemas are in `src/sanity/`.

Currently, most pages use **static fallback data** (hardcoded in the component or page file) rather than live Sanity fetches — the Sanity integration is wired but not yet called from every page. When connecting a page to Sanity, import the relevant query from `queries.ts` and call `client.fetch()` in the RSC.

### Animation system
Two parallel animation libraries are in use — do not mix them on the same component:
- **GSAP** (`src/components/animations/gsap-hooks.ts`): custom hooks (`useGsapFadeUp`, `useGsapStagger`, `useGsapSlideIn`, `useGsapParallax`, `useGsapCounter`, `useGsapHeroEntrance`) used in section components. These hooks require a `ref` passed to a DOM element and must be used in `'use client'` components.
- **framer-motion** (`src/components/ui/animated-group.tsx`): used only by `CustomersSection` / `PartnersSection`.

`AnimatedSection` (`src/components/animations/AnimatedSection.tsx`) is a convenience wrapper around `useGsapFadeUp` — use it for simple scroll-reveal wrappers in RSC-heavy pages.

### Design tokens (Tailwind)
Custom values to use instead of Tailwind defaults:

| Token | Value | Use |
|---|---|---|
| `bg-navy` | `#0B1D3A` | Dark sections, navbar |
| `bg-charcoal` | `#1A1A2E` | Footer |
| `bg-cream` | `#FAF7F2` | Light section backgrounds |
| `bg-sand` | `#E8DED1` | Borders, subtle backgrounds |
| `text-gold` / `bg-gold` | `#C8962E` | CTAs, accents, highlights |
| `text-slate` | `#2C3E50` | Body text |
| `font-heading` | DM Serif Display | All headings |
| `font-body` | Outfit | All body/UI text |
| `py-section` | `6rem` | Standard vertical section padding |
| `max-w-container` | `80rem` | Content column max-width |

### Component conventions
- `src/components/sections/` — full-width page sections, each maps to a visual block on a page
- `src/components/ui/` — reusable primitives (`Button`, `Card`, `SectionLabel`, `PageHeader`) and third-party wrappers (`animated-group`, `customers-section`)
- `src/components/layout/` — `Navbar` and `Footer`, included once in the root layout
- Section components that use GSAP hooks must be `'use client'`; page files and non-animated sections can remain RSCs

### Sanity schemas
Seven document types: `siteSettings` (singleton), `homepage` (singleton), `aboutPage` (singleton), `service`, `product`, `productCategory`, `career`. Singletons use a fixed `documentId` in the Studio structure so only one document of each type can exist.

### Contact form
`POST /api/contact` (`src/app/api/contact/route.ts`) currently logs submissions to the server console. To enable email delivery, replace the `console.log` with a mailing library (e.g. Resend or Nodemailer).

### Image handling
- Remote images from `cdn.sanity.io` and `countrymaterial.com` are whitelisted in `next.config.mjs`
- Use `urlFor(source).width(w).url()` from `src/sanity/lib/client.ts` to generate Sanity image URLs
- Placeholder images live in `public/images/` and are referenced by relative path
