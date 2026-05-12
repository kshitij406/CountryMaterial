import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { allServicesQuery } from '@/sanity/lib/queries'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Our Services — Circular Steel & Logistics',
  description: "Scrap collection, certified steel manufacturing, vendor platform, and fleet logistics — Tanzania's most integrated steel supply chain.",
}

const SERVICES_STATIC = [
  {
    _id: 's1',
    slug: { current: 'waste-management' },
    title: 'Scrap Collection & Recycling',
    tagline: 'Where it all begins.',
    excerpt: "Tanzania's largest organised scrap collection network. 5,000+ vendors, verified daily through our mobile platform. We collect from workshops, construction sites, and industrial estates — anywhere scrap accumulates.",
    icon: 'waste',
    displayOrder: 1,
    specChips: ['5,000+ vendors', 'Mobile-enabled', 'Nationwide pickup', 'Fair market pricing'],
    cardImageUrl: '/images/company/wastee.jpg',
    highlights: [
      'Real-time weight verification at point of collection',
      'Instant mobile money payment to vendors',
      'Sorted by grade at our central yards',
      'Full traceability from source to furnace',
    ],
  },
  {
    _id: 's2',
    slug: { current: 'steel' },
    title: 'Certified Steel Manufacturing',
    tagline: 'Scrap becomes structure.',
    excerpt: "Electric arc furnace technology producing BS 500-certified TMT rebar and billets. Every batch is laboratory-tested. Every tonne traceable to its scrap input. We don't ship steel we wouldn't build with.",
    icon: 'steel',
    displayOrder: 2,
    specChips: ['BS 500B certified', 'TBS compliant', 'ISO 9001 process', 'Lab-tested batches'],
    cardImageUrl: '/images/randos/molten_steel.jpeg',
    highlights: [
      'Electric arc furnace — 1,600°C controlled melt',
      'Continuous casting to billets',
      'Hot-rolled to BS 500B rebar in 8–32mm',
      'Mill certificates on every shipment',
    ],
  },
  {
    _id: 's3',
    slug: { current: 'hardware' },
    title: 'Vendor Platform & Procurement',
    tagline: 'Technology meets supply chain.',
    excerpt: "Our proprietary mobile platform connects 5,000+ scrap vendors, 320+ construction clients, and our own operations on a single digital infrastructure — eliminating middlemen, bringing price transparency to an opaque market.",
    icon: 'hardware',
    displayOrder: 3,
    specChips: ['5,000+ active vendors', 'Real-time pricing', 'Digital payments', 'Trade accounts'],
    cardImageUrl: '/images/company/hardware.jpg',
    highlights: [
      'Vendor registration and KYC entirely on mobile',
      'Live scrap commodity pricing, updated daily',
      'Digital order management for construction buyers',
      'Bulk procurement and credit terms for contractors',
    ],
  },
  {
    _id: 's4',
    slug: { current: 'transportation' },
    title: 'Fleet Logistics & Distribution',
    tagline: 'From yard to site. Same day.',
    excerpt: "30+ in-house trucks operating 24 hours across 5 regional branches. We move scrap in and finished steel out — no third-party logistics risk, no delay chains. Same-day dispatch on in-stock rebar.",
    icon: 'logistics',
    displayOrder: 4,
    specChips: ['30+ owned vehicles', '24/7 operations', '5 regional branches', 'Same-day dispatch'],
    cardImageUrl: '/images/company/trans-large.jpg',
    highlights: [
      'Owned fleet — no outsourced haulage risk',
      'GPS-tracked deliveries across Tanzania',
      'Branches: DSM, Mbeya, Dodoma, Kahama, Pwani',
      'Heavy-load rated for direct site delivery',
    ],
  },
]

export default async function ServicesPage() {
  const rawServices = await client.fetch(allServicesQuery).catch(() => null)
  const services: typeof SERVICES_STATIC = rawServices?.length
    ? rawServices.map((svc: any) => {
        const match = SERVICES_STATIC.find((s) => s.slug.current === svc.slug?.current)
        return {
          ...match,
          ...svc,
          cardImageUrl: svc.cardImageUrl ?? match?.cardImageUrl,
          highlights: match?.highlights ?? [],
          tagline: match?.tagline ?? '',
          specChips: svc.specChips ?? match?.specChips ?? [],
        }
      })
    : SERVICES_STATIC

  return (
    <>
      {/* Page hero */}
      <section
        className="relative min-h-[52vh] flex flex-col justify-end overflow-hidden bg-navy pt-20"
        aria-label="Services page hero"
      >
        <div className="absolute inset-0">
          <Image
            src="/images/stock/services-industrial.jpg"
            alt="Country Materials industrial operations"
            fill className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/50 to-navy" />
          <div className="absolute inset-0 bg-steel-texture" aria-hidden="true" />
        </div>
        <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pb-16 sm:pb-24 pt-12">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-gold mb-6">What We Do</p>
          <h1 className="font-black text-[clamp(48px,8vw,110px)] leading-[0.92] tracking-tight text-white">
            Practical services.<br />
            <span className="text-gold">Real infrastructure.</span>
          </h1>
          <p className="mt-6 text-[17px] text-white/55 max-w-xl leading-relaxed">
            Not consultants. Not aggregators. We own the trucks, run the furnaces, and pay the vendors directly.
          </p>
        </div>
      </section>

      {/* Quick-jump index */}
      <div className="bg-navy-mid border-b border-white/[0.06]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex overflow-x-auto scrollbar-hide">
            {services.slice(0, 4).map((svc, i) => (
              <a
                key={svc._id}
                href={`#service-${i + 1}`}
                className="flex-shrink-0 flex items-center gap-3 py-4 pr-10 text-white/45 hover:text-white transition-colors duration-200 cursor-pointer group"
              >
                <span className="font-mono text-[10px] text-gold/50 group-hover:text-gold transition-colors">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[13px] font-semibold tracking-wide whitespace-nowrap">{svc.title}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Alternating editorial service sections */}
      {services.slice(0, 4).map((svc, i) => {
        const isEven = i % 2 === 0   // dark bg on even (0, 2), light bg on odd (1, 3)
        const imgSrc = svc.cardImageUrl

        return (
          <section
            key={svc._id}
            id={`service-${i + 1}`}
            className="relative overflow-hidden"
            style={{ background: isEven ? '#0B1D3A' : '#FAF7F2' }}
            aria-label={svc.title}
          >
            <div className="max-w-[1440px] mx-auto">
              <div className={`grid grid-cols-1 lg:grid-cols-2 min-h-[580px]`}>

                {/* Image panel — right on even, left on odd */}
                <div
                  className={`relative min-h-[340px] lg:min-h-0 overflow-hidden ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
                >
                  {imgSrc ? (
                    <Image
                      src={imgSrc}
                      alt={svc.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-navy-mid" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  {/* Watermark number */}
                  <span
                    className="absolute bottom-4 right-6 font-mono font-bold text-[96px] leading-none select-none pointer-events-none text-white/10"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Content panel */}
                <div
                  className={`flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20 py-16 lg:py-24 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                  style={{ background: isEven ? '#0B1D3A' : '#FAF7F2' }}
                >
                  {/* Eyebrow */}
                  <div className="flex items-center gap-3 mb-7">
                    <span className="font-mono text-[10px] text-gold tracking-[0.22em]">{String(i + 1).padStart(2, '0')}</span>
                    <span className="w-8 h-px bg-gold/60" aria-hidden="true" />
                    <span className={`text-[11px] font-medium tracking-widest uppercase ${isEven ? 'text-white/40' : 'text-slate/50'}`}>
                      {svc.tagline}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className={`font-black text-[clamp(28px,3vw,46px)] leading-tight mb-5 ${isEven ? 'text-white' : 'text-ink'}`}>
                    {svc.title}
                  </h2>

                  {/* Body */}
                  <p className={`text-[15px] leading-relaxed mb-8 max-w-md ${isEven ? 'text-white/55' : 'text-slate/70'}`}>
                    {svc.excerpt}
                  </p>

                  {/* Highlights list */}
                  {svc.highlights.length > 0 && (
                    <ul className="flex flex-col gap-3 mb-8" aria-label={`${svc.title} highlights`}>
                      {svc.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full border border-gold/50 flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                          </span>
                          <span className={`text-[13.5px] leading-snug ${isEven ? 'text-white/50' : 'text-slate/65'}`}>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Spec chips */}
                  {svc.specChips.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-9">
                      {svc.specChips.map((chip) => (
                        <span
                          key={chip}
                          className={`text-[11px] font-semibold px-3 py-1.5 tracking-wide border ${
                            isEven
                              ? 'border-gold/25 text-gold/80 bg-gold/8'
                              : 'border-sand text-gold-dark bg-gold/6'
                          }`}
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* CTA */}
                  <Link
                    href={`/services/${svc.slug.current}`}
                    className={`self-start inline-flex items-center gap-2 font-semibold text-[13px] tracking-wide border-b pb-0.5 transition-all duration-200 cursor-pointer group ${
                      isEven
                        ? 'text-gold border-gold/30 hover:border-gold'
                        : 'text-gold-dark border-gold/40 hover:border-gold-dark'
                    }`}
                  >
                    Learn more
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* Contact CTA */}
      <section className="py-20 sm:py-24 bg-navy-mid" aria-label="Contact call to action">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-black text-[clamp(28px,4vw,56px)] text-white leading-tight mb-5">
              Need a tailored solution?<br />
              <span className="text-gold">Talk to our team.</span>
            </h2>
            <p className="text-[15px] text-white/45 max-w-md mx-auto mb-8">
              From bespoke vendor programmes to bulk steel contracts — we respond within 24 hours.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold text-[15px] px-8 py-4 transition-colors duration-200 cursor-pointer">
                Contact Us
              </Link>
              <Link href="/shop" className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold text-[15px] px-8 py-4 transition-all duration-200 cursor-pointer">
                View Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
