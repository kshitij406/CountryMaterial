# CLAUDE.md

Guidance for Claude Code when working in this repository. This file describes *conventions and rules* — for current file lists, schema fields, and component inventories, always read the source files directly.

---

## Commands

```bash
pnpm dev          # Dev server at localhost:3000
pnpm build        # Production build (required before pnpm start)
pnpm start        # Serve the production build
pnpm lint         # ESLint via next lint
pnpm seed         # Seed Sanity with initial data (scripts/seed-sanity.ts)
```

`next start` requires a prior `pnpm build` — `.next/` does not exist until then.

---

## Stack

- **Next.js 14** — App Router, TypeScript, `src/` layout
- **Sanity v3** — headless CMS; Studio embedded at `/studio`; config in `src/sanity/`
- **Tailwind CSS 3.4** — all custom tokens in `tailwind.config.ts`
- **GSAP 3** — hero entrance & scroll-trigger animations (client components only)
- **CSS IntersectionObserver** — section scroll reveals via `.reveal` / `.stagger` classes (RSC-safe, no JS in components needed)
- **Resend** — email library (installed, not yet active on contact form)
- **pnpm** — package manager (never use npm or yarn)

---

## Project purpose

Country Materials Ltd — Tanzanian steel, hardware, waste management, and logistics company based in Dar es Salaam. The site markets their services, products, career openings, and company identity. Industrial-luxury aesthetic: dark navy/gold, Bebas Neue display font.

---

## Where things live

| Area | Path |
|---|---|
| Pages | `src/app/**/page.tsx` |
| API routes | `src/app/api/**/route.ts` |
| Section components | `src/components/sections/` |
| UI primitives | `src/components/ui/` |
| Layout (Navbar, Footer) | `src/components/layout/` |
| Animation hooks & wrappers | `src/components/animations/` |
| Sanity schemas | `src/sanity/schemas/` |
| GROQ queries | `src/sanity/lib/queries.ts` |
| Sanity client + `urlFor()` | `src/sanity/lib/client.ts` |
| Sanity Studio config | `src/sanity/sanity.config.ts` |
| Design tokens | `tailwind.config.ts` |
| Allowed image hosts | `next.config.mjs` |
| Placeholder images | `public/images/` |

Before touching any file, read it first. Do not rely on memory of what was there before.

---

## Data flow

Pages are React Server Components (RSCs) that call `client.fetch(query)` from `src/sanity/lib/client.ts` using GROQ queries defined in `src/sanity/lib/queries.ts`.

The homepage (`src/app/page.tsx`) fetches both `homepageQuery` and `siteSettingsQuery` in parallel and passes data down to every section as props. All section components accept optional props and fall back to hardcoded defaults when Sanity data is absent — so the page always renders without a configured CMS.

---

## Sanity schemas

Schema types live in `src/sanity/schemas/` — one file per type. Read those files for current field definitions; do not rely on any cached list here. Singletons (`siteSettings`, `homepage`, `aboutPage`) use a fixed `documentId` in the Studio structure so only one document of each type can exist.

When adding a new schema type: create `src/sanity/schemas/<type>.ts`, export it from `src/sanity/schemas/index.ts`, and add it to the `schema.types` array in `src/sanity/sanity.config.ts`.

### Homepage schema — what the client controls

All fields are optional; sections fall back to hardcoded defaults.

| Field | Section | Notes |
|---|---|---|
| `heroHeading` | Hero | Use `\n` to split into two lines |
| `heroSubheading` | Hero | |
| `heroVideo` | Hero | MP4/WebM file |
| `tickerItems[]` | Ticker strip | `{ num, label }` pairs |
| `featuredServices[]` | Services | References to `service` docs; max 4 |
| `aboutHeading` | About strip | Use `\n` to break into lines |
| `aboutLead` | About strip | Lead paragraph |
| `aboutBody` | About strip | Second paragraph |
| `founderInitials` | About strip | |
| `founderName` | About strip | |
| `founderRole` | About strip | |
| `stats[]` | Stats section | `{ count, suffix, label, sub }`; max 4 |
| `featuredProducts[]` | Products grid | References to `product` docs; max 6 |
| `partnerLogos[]` | Clients marquee | `{ name, sub, logo? }` |
| `contactHeading` | Contact CTA | Use `\n` for line break |
| `contactEyebrow` | Contact CTA | |
| `contactPrimaryLabel` | Contact CTA | |
| `contactSecondaryLabel` | Contact CTA | |

Contact info (phone, email, address) in the Contact CTA comes from **Site Settings**, not the homepage document.

### Service schema — icon field

Services have an `icon` field (select: `steel`, `hardware`, `waste`, `logistics`) that determines which SVG is shown on the homepage services card. The mapping lives in `ServicesSection.tsx`.

### Site Settings — what the client controls

Phone, email, address, P.O. box, city, country, business hours, logo, shop page title/subtitle, and social links (Facebook, Twitter/X, Instagram, LinkedIn). Social links appear in the Footer; contact info flows to the Contact CTA and Footer.

---

## Animation system

Two mechanisms are in use — **do not mix them on the same element**:

- **GSAP** (`src/components/HeroSection.tsx`): entrance sequence for the hero only. Must be inside a `'use client'` component.
- **CSS + IntersectionObserver** (`RevealObserver.tsx` + `globals.css`): any element with class `reveal` fades up on scroll; any element with class `stagger` staggers its direct children. `RevealObserver` is mounted once in the root layout — sections just need the class, no JS required.

`AnimatedSection` (`src/components/animations/AnimatedSection.tsx`) still exists for GSAP-based reveal on other pages if needed.

---

## Design tokens

All tokens are defined in `tailwind.config.ts`. Always use these — never hardcode hex colors or raw spacing in components.

| Token | Hex | Use |
|---|---|---|
| `navy` | `#0B1D3A` | Primary dark background, navbar |
| `navy-light` | `#162D56` | Service cards, elevated navy surfaces |
| `navy-deep` | `#05101f` | Footer, stats section background |
| `charcoal` | `#1A1A2E` | About strip, ticker background |
| `cream` | `#FAF7F2` | Text on dark backgrounds |
| `sand` | `#E8DED1` | Borders, subtle backgrounds |
| `gold` | `#C8962E` | CTAs, accents, highlights |
| `gold-light` | `#E8B84B` | Hover states, counter suffixes |
| `gold-dim` | `#8A6520` | Muted gold |
| `slate` | `#2C3E50` | Body text on light pages |

### Font classes

| Class | Font | Use |
|---|---|---|
| `font-display` | Bebas Neue | All homepage display headings (H1, section titles, stat numbers) |
| `font-condensed` | Barlow Condensed | Nav links, labels, button text, eyebrows |
| `font-barlow` | Barlow | Body/paragraph text in homepage sections |
| `font-space` | Space Mono | Numerical data, coordinates, section numbers |
| `font-heading` | DM Serif Display | Headings on non-homepage pages |
| `font-body` | Outfit | Body text on non-homepage pages |

---

## Component conventions

- **Sections** (`src/components/sections/`): full-width visual blocks. Homepage sections are RSCs — all interactivity via CSS hover (`.service-card`, `.prod-card`, `.logo-tile` in `globals.css`). `StatsSection` is the only homepage section that needs `'use client'` (animated counters).
- **UI primitives** (`src/components/ui/`): reusable atoms (`Button`, `Card`, `SectionLabel`, `PageHeader`). Keep generic and stateless.
- **Layout** (`src/components/layout/`): `Navbar` and `Footer`, rendered once in root layout.
- Page files and non-animated sections remain RSCs. Only add `'use client'` if animation hooks or browser APIs are required.

---

## Image handling

- Sanity images: `urlFor(source).width(w).url()` from `src/sanity/lib/client.ts`
- Remote patterns whitelist: `next.config.mjs` (currently `cdn.sanity.io` and `countrymaterial.com`)
- Static placeholders: `public/images/` referenced by relative path
- When adding a new remote image host, add it to the `remotePatterns` array in `next.config.mjs`

---

## Contact form

`POST /api/contact` lives in `src/app/api/contact/route.ts`. Currently logs submissions to the server console. Resend is installed — to activate email delivery, replace the `console.log` with a `resend.emails.send()` call. Check the route file for current implementation before modifying.

---

## Environment variables

Required variables (see `.env.example`):

```
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
NEXT_PUBLIC_SANITY_API_VERSION
```

The Sanity client falls back to `projectId: 'unconfigured'` when the env var is missing, so the build succeeds without a `.env.local`. All `client.fetch()` calls use `.catch(() => null)` so missing/invalid config degrades gracefully.

Do not commit `.env.local`. When adding new env vars, use `NEXT_PUBLIC_` prefix only for values that must be available in the browser.
