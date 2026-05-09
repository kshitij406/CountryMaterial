import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { serviceBySlugQuery, allServicesQuery } from '@/sanity/lib/queries'
import CtaBanner from '@/components/sections/CtaBanner'

export const revalidate = 60

const staticServices: Record<string, {
  title: string; excerpt: string; label: string; intro: string
  features: string[]; highlights: Array<{ stat: string; label: string }>
}> = {
  transportation: {
    title: 'Logistics & Fleet Operations',
    label: 'Logistics',
    excerpt: 'Fleet operations supporting scrap movement, yard logistics, and dispatch coordination across Tanzania.',
    intro: 'Our in-house logistics capability supports scrap movement, yard operations, and dispatch coordination across branches and client sites. We focus on safety, reliability, and consistent throughput.',
    features: ['Scrap collection and dispatch coordination', 'In-house fleet operations (30+ vehicles)', 'Inter-branch transfers and route planning', 'Yard logistics support and scheduling', 'Project delivery coordination (where applicable)'],
    highlights: [{ stat: '30+', label: 'In-House Vehicles' }, { stat: '5', label: 'Branches' }, { stat: '24hrs', label: 'Operations' }],
  },
  hardware: {
    title: 'Vendor Platform & Procurement',
    label: 'Platform',
    excerpt: 'Proprietary mobile platform digitizing 5,000+ scrap vendors to improve transparency, pricing, and sourcing efficiency.',
    intro: 'Our proprietary mobile platform digitizes the scrap supply chain, improving transparency, traceability, and throughput. It helps vendors participate consistently and supports reliable sourcing for certified steel production.',
    features: ['Digitized vendor onboarding and management', 'Transparent sourcing and procurement workflows', 'Supply coordination from collection to processing', 'Traceability and reporting support (where applicable)'],
    highlights: [{ stat: '5,000+', label: 'Vendors' }, { stat: '100%', label: 'Local Scrap' }, { stat: '320+', label: 'Active Clients' }],
  },
  steel: {
    title: 'Certified Steel Products',
    label: 'Steel',
    excerpt: 'BS 500 certified steel and TMT rebar for reliable construction. Billets and finished products supported by traceable sourcing.',
    intro: 'We transform locally sourced scrap into high-quality, BS 500 certified steel products that support affordable construction and long-term durability. Full specifications, sizes, MOQ, and pricing are available on request (TBC).',
    features: ['BS 500 certified steel / TMT rebar', 'Steel billets and finished steel products', 'Clear specifications and traceable sourcing', 'Project coordination for supply planning (TBC)'],
    highlights: [{ stat: 'BS 500', label: 'Certified Steel' }, { stat: '50,000+', label: 'Metric Tons Recycled' }, { stat: '320+', label: 'Clients' }],
  },
  'waste-management': {
    title: 'Scrap Collection & Recycling',
    label: 'Recycling',
    excerpt: 'Scrap collection, sorting, and recycling that turns local waste into high-quality, certified steel.',
    intro: 'Our recycling operations bridge informal scrap vendors, industrial generators, and steel production into a single circular supply chain. The result is a more efficient, transparent, and environmentally responsible model for steel in Tanzania and beyond.',
    features: ['Scrap metal collection and aggregation', 'Industrial scrap sorting and processing', 'Material recovery and recycling operations', 'Compliance documentation and reporting (where applicable)'],
    highlights: [{ stat: '50,000+', label: 'Metric Tons Recycled' }, { stat: '5,000+', label: 'Vendors on Platform' }, { stat: '104', label: 'Staff' }],
  },
}

export async function generateStaticParams() {
  const services = await client.fetch(allServicesQuery).catch(() => null)

  const slugs = new Set<string>()
  for (const s of services ?? []) {
    const slug = s?.slug?.current
    if (slug) slugs.add(slug)
  }
  for (const slug of Object.keys(staticServices)) slugs.add(slug)
  return Array.from(slugs).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const sanity = await client.fetch(serviceBySlugQuery, { slug: params.slug }).catch(() => null)
  const fallback = staticServices[params.slug]
  const title = sanity?.title ?? fallback?.title
  const description = sanity?.excerpt ?? fallback?.excerpt
  if (!title) return {}
  return { title, description }
}

function ptToText(blocks: any[]): string {
  if (!blocks?.length) return ''
  return blocks.map((b: any) => b.children?.map((c: any) => c.text).join('') ?? '').join('\n\n')
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const sanity = await client.fetch(serviceBySlugQuery, { slug: params.slug }).catch(() => null)
  const fallback = staticServices[params.slug]

  if (!sanity && !fallback) notFound()

  const title = sanity?.title ?? fallback?.title
  const excerpt = sanity?.excerpt ?? fallback?.excerpt
  const label = fallback?.label ?? title
  const intro = sanity?.contentSections?.[0]?.body
    ? ptToText(sanity.contentSections[0].body)
    : fallback?.intro ?? ''

  const features: string[] = sanity?.features?.length ? sanity.features : (fallback?.features ?? [])
  const highlights: Array<{ stat: string; label: string }> =
    sanity?.highlights?.length ? sanity.highlights : (fallback?.highlights ?? [])

  const sanitySection = sanity?.contentSections?.length > 1 ? sanity.contentSections[1] : null
  const section2Text = sanitySection?.body ? ptToText(sanitySection.body) : null

  return (
    <>
      <section className="relative overflow-hidden pt-[150px] pb-[90px] px-8 lg:px-16 bg-navy" style={{ borderBottom: '1px solid rgba(216,224,231,.4)' }}>
        <div className="relative max-w-[1440px] mx-auto">
          <div className="flex items-center gap-3.5 mb-7">
            <Link href="/services" className="font-condensed text-[12px] tracking-[0.18em] uppercase text-white/70 hover:text-white transition-colors duration-200">Services</Link>
            <span className="text-white/40">/</span>
            <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold-light">{label}</span>
          </div>
          <h1 className="font-display text-[clamp(44px,7vw,98px)] leading-[0.9] tracking-[0.03em] uppercase text-white max-w-4xl">
            {title}
          </h1>
          {excerpt && (
            <p className="mt-8 font-barlow text-[17px] text-white/75 max-w-2xl leading-[1.65]">{excerpt}</p>
          )}
        </div>
      </section>

      <section className="relative py-[100px] px-8 lg:px-16 bg-white" style={{ borderBottom: '1px solid #D8E0E7' }}>
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div className="reveal">
            <div className="flex items-center gap-3.5 mb-7">
              <span className="block h-px w-10 bg-gold" />
              <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold">Overview</span>
            </div>
            <h2 className="font-display text-[clamp(32px,3.5vw,56px)] leading-[0.95] tracking-[0.03em] uppercase text-slate mb-8">
              What This Service <span className="text-gold">Covers</span>
            </h2>
            <p className="font-barlow text-[16px] text-slate/75 leading-[1.7] mb-5">{intro}</p>
            {section2Text && (
              <p className="font-barlow text-[16px] text-slate/75 leading-[1.7] mb-8">{section2Text}</p>
            )}
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-3 overflow-hidden px-[34px] py-[16px] bg-gold text-white font-condensed text-[14px] tracking-[0.22em] uppercase font-semibold"
            >
              <span className="relative z-10">Request a Quote</span>
              <svg className="relative z-10 w-3.5 h-3.5 transition-all duration-300 group-hover:translate-x-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
              <span className="absolute inset-0 bg-gold-dim -translate-x-full group-hover:translate-x-0 transition-transform duration-500" style={{ transitionTimingFunction: 'cubic-bezier(.16,1,.3,1)' }} />
            </Link>
          </div>

          {features.length > 0 && (
            <div className="reveal p-8 bg-charcoal" style={{ border: '1px solid #D8E0E7' }}>
              <h3 className="font-display text-[clamp(20px,2vw,28px)] leading-[1] tracking-[0.04em] uppercase text-slate mb-8">
                Key <span className="text-gold">Capabilities</span>
              </h3>
              <ul style={{ borderTop: '1px solid #D8E0E7' }}>
                {features.map((f, i) => (
                  <li key={i} className="flex items-start gap-5 py-4" style={{ borderBottom: '1px solid #D8E0E7' }}>
                    <span className="shrink-0 w-6 h-6 grid place-items-center bg-gold text-white font-space text-[11px] font-semibold mt-0.5">
                      {i + 1}
                    </span>
                    <span className="font-barlow text-[15px] text-slate/75 leading-[1.6]">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {highlights.length > 0 && (
        <section className="relative py-[80px] px-8 lg:px-16 bg-charcoal" style={{ borderBottom: '1px solid #D8E0E7' }}>
          <div className="relative max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5">
            {highlights.map((item, i) => (
              <div key={i} className="text-center py-10 bg-white" style={{ border: '1px solid #D8E0E7' }}>
                <div className="font-display text-[clamp(40px,5vw,72px)] leading-none text-gold mb-2">{item.stat}</div>
                <div className="font-condensed text-[11px] tracking-[0.22em] uppercase text-slate/60">{item.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      <CtaBanner
        heading="Ready to Use\nOur Services?"
        subtext="Get in touch with our team for a custom quote or to discuss your specific requirements."
        primaryLabel="Get in Touch"
        primaryHref="/contact"
        secondaryLabel="All Services"
        secondaryHref="/services"
      />
    </>
  )
}
