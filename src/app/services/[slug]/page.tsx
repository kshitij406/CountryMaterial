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
    title: 'Transportation & Logistics',
    label: 'Logistics',
    excerpt: 'End-to-end freight forwarding, warehousing, and last-mile distribution across Tanzania and the region.',
    intro: 'Our transportation division provides reliable, efficient movement of goods across Tanzania. From bulk freight to time-sensitive deliveries, we offer a full spectrum of logistics services backed by an experienced team and a growing fleet.',
    features: ['Freight forwarding — domestic and regional', 'Warehousing and storage solutions', 'Last-mile delivery across Dar es Salaam', 'Heavy-load transportation for construction materials', 'Supply chain coordination and tracking', 'Cross-border logistics support'],
    highlights: [{ stat: '100+', label: 'Deliveries Per Month' }, { stat: '10+', label: 'Routes Covered' }, { stat: '99%', label: 'On-Time Rate' }],
  },
  hardware: {
    title: 'Hardware & Steel Materials',
    label: 'Hardware',
    excerpt: 'Quality construction materials — color paints, hardware supplies, and high-tensile reinforcement bars.',
    intro: 'We supply a comprehensive range of hardware materials for construction, industrial, and commercial projects. Our stock includes BS 500 high-tensile reinforcement bars, color paints, and essential hardware — all sourced from certified manufacturers and available at competitive prices.',
    features: ['High Tensile Reinforcement Bars (BS 500 compliant)', 'Color paints — interior and exterior grades', 'Gypsum boards and ceiling materials', 'Marine plywood and timber products', 'General hardware supplies and fasteners', 'Bulk and project-quantity procurement'],
    highlights: [{ stat: '50+', label: 'Products Stocked' }, { stat: '6+', label: 'Partner Manufacturers' }, { stat: 'BS 500', label: 'Steel Standard' }],
  },
  'waste-management': {
    title: 'Waste Management',
    label: 'Environment',
    excerpt: 'Comprehensive scrap collection, sorting, recycling, and waste-to-energy services for industry and communities.',
    intro: 'Our waste management division sits at the core of our mission. We bridge the gap between informal scrap vendors, industrial generators, and recycling facilities — creating an efficient, transparent, and environmentally responsible value chain for steel and industrial waste in Tanzania.',
    features: ['Scrap metal collection and aggregation', 'Industrial waste sorting and processing', 'Steel recycling and material recovery', 'Waste-to-energy program development', 'Community waste collection partnerships', 'Compliance documentation and reporting'],
    highlights: [{ stat: '∞', label: 'Recyclable Materials' }, { stat: 'Zero', label: 'Waste-to-Landfill Goal' }, { stat: 'CO₂', label: 'Reduction Focus' }],
  },
}

export async function generateStaticParams() {
  const services = await client.fetch(allServicesQuery).catch(() => null)
  if (services?.length) return services.map((s: any) => ({ slug: s.slug.current }))
  return Object.keys(staticServices).map((slug) => ({ slug }))
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
        {/* Gold left stripe */}
        <div className="absolute top-0 left-0 bottom-0 w-1 bg-gold" />

        <div className="relative max-w-[1440px] mx-auto">
          <div className="flex items-center gap-3.5 mb-7">
            <Link href="/services" className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold/60 hover:text-gold transition-colors duration-200">Services</Link>
            <span className="text-gold/30">→</span>
            <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold">{label}</span>
          </div>
          <h1 className="font-display text-[clamp(48px,7vw,112px)] leading-[0.9] tracking-[0.03em] uppercase text-cream max-w-4xl">
            {title}
          </h1>
          {excerpt && (
            <p className="mt-8 font-barlow text-[17px] text-cream/55 max-w-2xl leading-[1.65]">{excerpt}</p>
          )}
        </div>
      </section>

      {/* Overview + Features */}
      <section
        className="relative py-[120px] px-8 lg:px-16"
        style={{ background: '#0B1D3A', borderBottom: '1px solid rgba(200,150,46,.15)' }}
      >
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-20 items-start">
          <div className="reveal">
            <div className="flex items-center gap-3.5 mb-7">
              <span className="block h-px w-10 bg-gold" />
              <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold">Overview</span>
            </div>
            <h2 className="font-display text-[clamp(32px,3.5vw,56px)] leading-[0.95] tracking-[0.03em] uppercase text-cream mb-8">
              What This Service <span className="text-gold">Covers</span>
            </h2>
            <p className="font-barlow text-[16px] text-cream/60 leading-[1.7] mb-5">{intro}</p>
            {section2Text && (
              <p className="font-barlow text-[16px] text-cream/60 leading-[1.7] mb-8">{section2Text}</p>
            )}
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-3 overflow-hidden px-[34px] py-[18px] border border-gold text-gold font-condensed text-[14px] tracking-[0.22em] uppercase font-semibold"
            >
              <span className="relative z-10 group-hover:text-navy transition-colors duration-300">Request a Quote</span>
              <svg className="relative z-10 w-3.5 h-3.5 group-hover:text-navy transition-all duration-400 group-hover:translate-x-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
              <span className="absolute inset-0 bg-gold -translate-x-full group-hover:translate-x-0 transition-transform duration-500" style={{ transitionTimingFunction: 'cubic-bezier(.16,1,.3,1)' }} />
            </Link>
          </div>

          {features.length > 0 && (
            <div
              className="reveal p-10"
              style={{ border: '1px solid rgba(200,150,46,.2)', background: '#05101f' }}
            >
              <h3 className="font-display text-[clamp(20px,2vw,28px)] leading-[1] tracking-[0.04em] uppercase text-cream mb-8">
                Key <span className="text-gold">Capabilities</span>
              </h3>
              <ul style={{ borderTop: '1px solid rgba(200,150,46,.2)' }}>
                {features.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-5 py-4"
                    style={{ borderBottom: '1px solid rgba(200,150,46,.1)' }}
                  >
                    <span className="shrink-0 w-6 h-6 grid place-items-center bg-gold text-navy font-space text-[11px] font-semibold mt-0.5">
                      {i + 1}
                    </span>
                    <span className="font-barlow text-[15px] text-cream/60 leading-[1.6]">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Highlights */}
      {highlights.length > 0 && (
        <section
          className="relative py-[80px] px-8 lg:px-16"
          style={{ background: '#05101f', borderBottom: '1px solid rgba(200,150,46,.15)' }}
        >
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 100%,rgba(200,150,46,.1),transparent 55%)' }}
          />
          <div className="relative max-w-[1440px] mx-auto grid grid-cols-3 gap-0" style={{ borderTop: '1px solid rgba(200,150,46,.2)' }}>
            {highlights.map((item, i) => (
              <div
                key={i}
                className="text-center py-12"
                style={{ borderRight: i < highlights.length - 1 ? '1px solid rgba(200,150,46,.15)' : undefined }}
              >
                <div className="font-display text-[clamp(40px,5vw,80px)] leading-none text-gold mb-2">{item.stat}</div>
                <div className="font-condensed text-[11px] tracking-[0.22em] uppercase text-cream/45">{item.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      <CtaBanner
        heading={`Ready to Use\nOur Services?`}
        subtext="Get in touch with our team for a custom quote or to discuss your specific requirements."
        primaryLabel="Get in Touch"
        primaryHref="/contact"
        secondaryLabel="All Services"
        secondaryHref="/services"
      />
    </>
  )
}
