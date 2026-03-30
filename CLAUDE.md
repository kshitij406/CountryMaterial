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
- **GSAP 3** — scroll/entrance animations; **framer-motion** — marquee/partners only
- **Resend** — email library (installed, not yet active on contact form)
- **pnpm** — package manager (never use npm or yarn)

---

## Project purpose

Country Materials Ltd — Tanzanian hardware, waste management, and logistics company based in Dar es Salaam. The site markets their services, products, career openings, and company identity.

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

**Current state:** Some pages still use hardcoded static fallback data instead of live Sanity fetches. When connecting a page to Sanity, import the matching query from `queries.ts` and replace the static data with `await client.fetch(theQuery)` in the RSC. Check `queries.ts` for existing queries before writing new ones.

---

## Sanity schemas

Schema types live in `src/sanity/schemas/` — one file per type. Read those files for current field definitions; do not rely on any cached list here. Singletons (`siteSettings`, `homepage`, `aboutPage`) use a fixed `documentId` in the Studio structure so only one document of each type can exist.

When adding a new schema type: create `src/sanity/schemas/<type>.ts`, export it from `src/sanity/schemas/index.ts`, and add it to the `schema.types` array in `src/sanity/sanity.config.ts`.

---

## Animation system

Two libraries are in use — **do not mix them on the same component**:

- **GSAP** (`src/components/animations/gsap-hooks.ts`): custom hooks for scroll/entrance animations. Requires a `ref` on a DOM element. Must be used inside `'use client'` components.
- **framer-motion** (`src/components/ui/animated-group.tsx`): used only for the partners/customers marquee.

`AnimatedSection` (`src/components/animations/AnimatedSection.tsx`) wraps the main GSAP fade-up hook — use it for simple scroll-reveal on RSC-heavy pages.

Check `gsap-hooks.ts` for the current list of available hooks before writing new ones.

---

## Design tokens

All tokens are defined in `tailwind.config.ts`. Always use these custom values — never hardcode hex colors or raw spacing in components.

| Token | Hex | Use |
|---|---|---|
| `navy` / `bg-navy` | `#0B1D3A` | Dark sections, navbar |
| `charcoal` / `bg-charcoal` | `#1A1A2E` | Footer |
| `cream` / `bg-cream` | `#FAF7F2` | Light section backgrounds |
| `sand` | `#E8DED1` | Borders, subtle backgrounds |
| `gold` / `text-gold` / `bg-gold` | `#C8962E` | CTAs, accents, highlights |
| `slate` / `text-slate` | `#2C3E50` | Body text |
| `font-heading` | DM Serif Display | All headings |
| `font-body` | Outfit | All body/UI text |
| `py-section` / `spacing.section` | `6rem` | Standard vertical section padding |
| `max-w-container` | `80rem` | Content column max-width |

Extended shades (`navy-deep`, `navy-light`, `gold-light`, `gold-pale`, `cream-dark`) are also in `tailwind.config.ts`.

---

## Component conventions

- **Sections** (`src/components/sections/`): full-width visual blocks, one per page section. If a section uses GSAP hooks it must be `'use client'`.
- **UI primitives** (`src/components/ui/`): reusable atoms (`Button`, `Card`, `SectionLabel`, `PageHeader`). Keep these generic and stateless where possible.
- **Layout** (`src/components/layout/`): `Navbar` and `Footer`, rendered once in the root layout.
- Page files (`app/**/page.tsx`) and non-animated sections should remain RSCs — do not add `'use client'` unless animation or browser APIs require it.

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

Required variables (see `.env.local`):

```
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
NEXT_PUBLIC_SANITY_API_VERSION
```

Do not commit `.env.local`. When adding new env vars, use `NEXT_PUBLIC_` prefix only for values that must be available in the browser.
