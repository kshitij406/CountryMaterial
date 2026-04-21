import type { Metadata } from 'next'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { allServicesQuery } from '@/sanity/lib/queries'
import CtaBanner from '@/components/sections/CtaBanner'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Our Services',
    description:
      "Explore Country Materials' full range of services: transportation & logistics, hardware materials, and waste management in Tanzania.",
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
    slug: { current: 'transportation' },
    title: 'Transportation & Logistics',
    excerpt: 'From freight forwarding to last-mile delivery, we manage the movement of goods efficiently across Tanzania. Our fleet and partner network ensures your materials arrive on time, every time.',
    icon: 'logistics',
  },
  {
    _id: 's2',
    slug: { current: 'hardware' },
    title: 'Hardware & Steel Materials',
    excerpt: 'We supply a comprehensive range of construction materials — including high-tensile BS 500 reinforcement bars, color paints, and hardware essentials. Quality sourced, competitively priced.',
    icon: 'steel',
  },
  {
    _id: 's3',
    slug: { current: 'waste-management' },
    title: 'Waste Management',
    excerpt: 'Our waste management division handles collection, sorting, recycling, and waste-to-energy processing. We turn industrial waste into resource, reducing environmental impact while creating value.',
    icon: 'waste',
  },
]

export default async function ServicesPage() {
  const rawServices = await client.fetch(allServicesQuery).catch(() => null)
  const services = rawServices?.length ? rawServices : staticServices

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden pt-[160px] pb-[100px] px-8 lg:px-16"
        style={{ background: '#05101f', borderBottom: '1px solid rgba(200,150,46,.2)' }}
      >
        <div aria-hidden className="grain-overlay absolute inset-0 pointer-events-none z-0" />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'repeating-linear-gradient(90deg,transparent 0 120px,rgba(200,150,46,.04) 120px 121px)' }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 70% 50%,rgba(200,150,46,.12),transparent 55%)' }}
        />

        <div className="relative max-w-[1440px] mx-auto grid lg:grid-cols-[1.3fr_1fr] gap-16 items-end">
          <div>
            <div className="flex items-center gap-3.5 mb-7">
              <span className="block h-px w-10 bg-gold" />
              <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold">What We Do</span>
            </div>
            <h1 className="font-display text-[clamp(48px,7vw,112px)] leading-[0.9] tracking-[0.03em] uppercase text-cream">
              Services Built for <span className="text-gold">Africa</span>
            </h1>
          </div>

          <div className="space-y-0 reveal" style={{ borderTop: '1px solid rgba(200,150,46,.2)' }}>
            {services.slice(0, 3).map((svc: any, i: number) => (
              <Link
                key={svc._id ?? i}
                href={`/services/${svc.slug.current}`}
                className="group flex items-center gap-5 py-5 transition-all duration-300 hover:pl-3"
                style={{ borderBottom: '1px solid rgba(200,150,46,.15)' }}
              >
                <span className="font-space text-[13px] text-gold/40 group-hover:text-gold transition-colors duration-300 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-condensed text-[15px] tracking-[0.12em] uppercase text-cream/70 group-hover:text-cream transition-colors duration-300">
                  {svc.title}
                </span>
                <svg className="w-3.5 h-3.5 ml-auto text-gold/20 group-hover:text-gold transition-colors duration-300 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section
        className="relative py-[120px] px-8 lg:px-16"
        style={{ background: '#0B1D3A', borderBottom: '1px solid rgba(200,150,46,.15)' }}
      >
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-8 mb-16 reveal">
            <h2 className="font-display text-[clamp(36px,4vw,64px)] leading-[0.9] tracking-[0.03em] uppercase text-cream">
              Comprehensive <span className="text-gold">Industrial</span><br />Solutions
            </h2>
            <span className="font-space text-[12px] text-gold/50 tracking-[0.2em]">{'// SERVICE LINES'}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 stagger" style={{ borderTop: '1px solid rgba(200,150,46,.2)' }}>
            {services.map((svc: any, i: number) => (
              <Link
                key={svc._id ?? i}
                href={`/services/${svc.slug.current}`}
                className="service-card group block py-12 px-8"
                style={{ borderRight: i < services.length - 1 ? '1px solid rgba(200,150,46,.15)' : undefined }}
              >
                <div className="text-gold mb-6 transition-transform duration-300 group-hover:scale-110 inline-block">
                  {ICON_MAP[svc.icon] ?? ICON_MAP.hardware}
                </div>
                <h3 className="font-display text-[clamp(22px,2.2vw,32px)] leading-[1] tracking-[0.04em] uppercase text-cream mb-4 group-hover:text-gold transition-colors duration-200">
                  {svc.title}
                </h3>
                <p className="font-barlow text-[15px] text-cream/50 leading-[1.65] mb-6">{svc.excerpt}</p>
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

      {/* Detail callouts */}
      <section
        className="relative py-[120px] px-8 lg:px-16"
        style={{ background: '#05101f', borderBottom: '1px solid rgba(200,150,46,.15)' }}
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 100%,rgba(200,150,46,.1),transparent 55%)' }}
        />
        <div className="relative max-w-[1440px] mx-auto">
          <div className="flex items-center gap-3.5 mb-16 reveal">
            <span className="block h-px w-10 bg-gold" />
            <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold">In Detail</span>
          </div>
          <div
            className="grid lg:grid-cols-3 stagger"
            style={{ borderTop: '1px solid rgba(200,150,46,.2)', borderLeft: '1px solid rgba(200,150,46,.2)' }}
          >
            {services.slice(0, 3).map((svc: any, i: number) => (
              <div
                key={svc._id ?? i}
                className="p-10"
                style={{ borderRight: '1px solid rgba(200,150,46,.2)', borderBottom: '1px solid rgba(200,150,46,.2)' }}
              >
                <span className="font-display text-[80px] leading-none text-gold/10">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-display text-[clamp(22px,2vw,32px)] leading-[1] tracking-[0.04em] uppercase text-cream mt-2 mb-4">{svc.title}</h3>
                <p className="font-barlow text-[15px] text-cream/50 leading-[1.65] mb-6">{svc.excerpt}</p>
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
