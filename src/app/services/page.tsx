import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import { client } from '@/sanity/lib/client'
import { allServicesQuery } from '@/sanity/lib/queries'
import CtaBanner from '@/components/sections/CtaBanner'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Our Services',
    description:
      'Explore our integrated services across scrap collection and recycling, certified steel products, vendor-enabled procurement, and logistics support across Tanzania.',
  }
}

const ICON_MAP: Record<string, React.ReactNode> = {
  steel: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M4 4h16v4H4zM4 10h16v4H4zM4 16h16v4H4z" />
    </svg>
  ),
  hardware: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  waste: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
    </svg>
  ),
  logistics: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <rect x="1" y="3" width="15" height="13" />
      <path d="M16 8h4l3 5v3h-7V8zM5.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
    </svg>
  ),
}

const staticServices = [
  {
    _id: 's1',
    slug: { current: 'waste-management' },
    title: 'Scrap Collection & Recycling',
    excerpt: 'Scrap collection, sorting, and recycling that turns local waste into high-quality, certified steel.',
    icon: 'waste',
    displayOrder: 1,
  },
  {
    _id: 's2',
    slug: { current: 'steel' },
    title: 'Certified Steel Products',
    excerpt: 'BS 500 certified steel and TMT rebar for reliable construction. Billets and finished products supported by traceable sourcing.',
    icon: 'steel',
    displayOrder: 2,
  },
  {
    _id: 's3',
    slug: { current: 'transportation' },
    title: 'Logistics & Fleet Operations',
    excerpt: '30+ in-house vehicles supporting scrap movement, yard operations, and delivery coordination across key regions.',
    icon: 'logistics',
    displayOrder: 4,
  },
  {
    _id: 's4',
    slug: { current: 'hardware' },
    title: 'Vendor Platform & Procurement',
    excerpt: 'Proprietary mobile platform digitizing 5,000+ scrap vendors to improve transparency, pricing, and sourcing efficiency.',
    icon: 'hardware',
    displayOrder: 3,
  },
]

export default async function ServicesPage() {
  const rawServices = await client.fetch(allServicesQuery).catch(() => null)
  const services = rawServices?.length ? rawServices : staticServices

  // `allServicesQuery` fetches icon now, but older datasets may not have it.
  const mergedServices = (() => {
    if (!rawServices?.length) return services

    const bySlug = new Map<string, any>()
    for (const s of services) bySlug.set(s?.slug?.current, s)
    for (const fallback of staticServices) {
      const slug = fallback?.slug?.current
      if (slug && !bySlug.has(slug)) bySlug.set(slug, fallback)
    }
    return Array.from(bySlug.values()).sort((a: any, b: any) => {
      const ao = typeof a?.displayOrder === 'number' ? a.displayOrder : Number.POSITIVE_INFINITY
      const bo = typeof b?.displayOrder === 'number' ? b.displayOrder : Number.POSITIVE_INFINITY
      return ao - bo
    })
  })()

  const servicesWithIcons = mergedServices.map((svc: any) => {
    if (svc?.icon) return svc
    const slug = svc?.slug?.current
    const iconBySlug: Record<string, keyof typeof ICON_MAP> = {
      transportation: 'logistics',
      'waste-management': 'waste',
      steel: 'steel',
      hardware: 'hardware',
    }
    return { ...svc, icon: iconBySlug[slug] }
  })

  return (
    <>
      <section className="relative overflow-hidden pt-[150px] pb-[90px] px-8 lg:px-16 bg-navy" style={{ borderBottom: '1px solid rgba(216,224,231,.4)' }}>
        <div className="relative max-w-[1440px] mx-auto grid lg:grid-cols-[1.3fr_1fr] gap-16 items-end">
          <div>
            <div className="flex items-center gap-3.5 mb-7">
              <span className="block h-px w-10 bg-gold" />
              <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-white/90">What We Do</span>
            </div>
            <h1 className="font-display text-[clamp(44px,7vw,102px)] leading-[0.9] tracking-[0.03em] uppercase text-white">
              Practical Services for
              <span className="text-gold-light"> Steel and Scrap</span>
            </h1>
          </div>

          <div className="space-y-0 reveal" style={{ borderTop: '1px solid rgba(216,224,231,.35)' }}>
            {servicesWithIcons.slice(0, 4).map((svc: any, i: number) => (
              <Link
                key={svc._id ?? i}
                href={`/services/${svc.slug.current}`}
                className="group flex items-center gap-5 py-5 transition-all duration-300 hover:pl-3"
                style={{ borderBottom: '1px solid rgba(216,224,231,.3)' }}
              >
                <span className="font-space text-[13px] text-white/50 group-hover:text-gold-light transition-colors duration-300 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-condensed text-[15px] tracking-[0.12em] uppercase text-white/80 group-hover:text-white transition-colors duration-300">
                  {svc.title}
                </span>
                <svg className="w-3.5 h-3.5 ml-auto text-white/35 group-hover:text-gold-light transition-colors duration-300 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-[100px] px-8 lg:px-16 bg-white" style={{ borderBottom: '1px solid #D8E0E7' }}>
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-8 mb-14 reveal">
            <h2 className="font-display text-[clamp(34px,4vw,60px)] leading-[0.9] tracking-[0.03em] uppercase text-slate">
              Comprehensive
              <span className="text-gold"> Industrial Support</span>
            </h2>
            <span className="font-space text-[12px] text-gold tracking-[0.2em]">{'// SERVICE LINES'}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 stagger">
            {servicesWithIcons.map((svc: any, i: number) => (
              <Link
                key={svc._id ?? i}
                href={`/services/${svc.slug.current}`}
                className="service-card group block p-8 bg-charcoal"
                style={{ border: '1px solid #D8E0E7' }}
              >
                <div className="text-gold mb-6 transition-transform duration-300 group-hover:scale-110 inline-block">
                  {ICON_MAP[svc.icon] ?? ICON_MAP.steel}
                </div>
                <h3 className="font-display text-[clamp(22px,2.2vw,32px)] leading-[1] tracking-[0.04em] uppercase text-slate mb-4 group-hover:text-gold transition-colors duration-200">
                  {svc.title}
                </h3>
                <p className="font-barlow text-[15px] text-slate/70 leading-[1.65] mb-6">{svc.excerpt}</p>
                <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold flex items-center gap-2">
                  Learn More
                  <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-[100px] px-8 lg:px-16 bg-charcoal" style={{ borderBottom: '1px solid #D8E0E7' }}>
        <div className="relative max-w-[1440px] mx-auto">
          <div className="flex items-center gap-3.5 mb-12 reveal">
            <span className="block h-px w-10 bg-gold" />
            <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold">In Detail</span>
          </div>
          <div className="grid lg:grid-cols-3 gap-5 stagger">
            {servicesWithIcons.slice(0, 4).map((svc: any, i: number) => (
              <div key={svc._id ?? i} className="p-8 bg-white" style={{ border: '1px solid #D8E0E7' }}>
                <span className="font-display text-[72px] leading-none text-gold/20">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-display text-[clamp(22px,2vw,30px)] leading-[1] tracking-[0.04em] uppercase text-slate mt-2 mb-4">{svc.title}</h3>
                <p className="font-barlow text-[15px] text-slate/70 leading-[1.65] mb-6">{svc.excerpt}</p>
                <Link
                  href={`/services/${svc.slug.current}`}
                  className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold flex items-center gap-2 hover:gap-4 transition-all duration-300"
                >
                  Learn More
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        heading="Need a Custom\nSolution?"
        subtext="Our team is ready to discuss your specific requirements and build a tailored service plan."
        primaryLabel="Talk to Us"
        primaryHref="/contact"
        secondaryLabel="Our Products"
        secondaryHref="/shop"
      />
    </>
  )
}
