import Link from 'next/link'

// Icon map keyed to the `icon` field value on the service schema
const ICONS: Record<string, React.ReactNode> = {
  steel: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-11 h-11 text-gold">
      <path d="M6 36h36M10 36V14l14-6 14 6v22M18 36V22h12v14M18 28h12" />
    </svg>
  ),
  hardware: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-11 h-11 text-gold">
      <path d="M6 12h36v24H6zM6 20h36M14 28h4M22 28h4M30 28h4" />
    </svg>
  ),
  waste: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-11 h-11 text-gold">
      <path d="M12 10h24l4 10v22H8V20zM8 20h32M18 28h12" />
      <circle cx="16" cy="36" r="3" /><circle cx="32" cy="36" r="3" />
    </svg>
  ),
  logistics: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-11 h-11 text-gold">
      <path d="M4 30h28V14H4zM32 20h8l4 6v4H32z" />
      <circle cx="14" cy="34" r="4" /><circle cx="36" cy="34" r="4" />
    </svg>
  ),
}

const DEFAULT_ICON = (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-11 h-11 text-gold">
    <rect x="8" y="8" width="32" height="32" rx="2" />
    <path d="M16 24h16M24 16v16" />
  </svg>
)

const DEFAULT_SERVICES = [
  { _id: '1', icon: 'waste',    title: 'Scrap Collection & Recycling', excerpt: '100% locally sourced scrap feeding a fully integrated circular model, from aggregation through processing and recovery.', slug: { current: 'waste-management' } },
  { _id: '2', icon: 'steel',    title: 'Certified Steel Products',     excerpt: 'BS 500 certified steel and TMT rebar for affordable, reliable construction. Billets and finished products supported by traceable sourcing.', slug: { current: 'steel' } },
  { _id: '3', icon: 'hardware', title: 'Vendor Platform & Procurement', excerpt: 'Proprietary mobile platform digitizing 5,000+ scrap vendors, improving pricing transparency, access, and throughput.', slug: { current: 'hardware' } },
  { _id: '4', icon: 'logistics',title: 'Logistics & Fleet Operations',  excerpt: '30+ in-house vehicles supporting scrap movement, yard operations, and delivery coordination across key regions.', slug: { current: 'transportation' } },
]

interface Service {
  _id: string
  title: string
  excerpt?: string
  icon?: string
  slug?: { current: string }
}

export default function ServicesSection({ services }: { services?: Service[] }) {
  const data = services?.length ? services.slice(0, 4) : DEFAULT_SERVICES

  return (
    <section className="relative bg-charcoal py-20 sm:py-24 lg:py-[120px] px-5 sm:px-8 lg:px-16 overflow-hidden" id="services">
      <span className="absolute top-10 sm:top-14 right-5 sm:right-8 lg:right-16 font-space text-[11px] sm:text-[12px] text-gold tracking-[0.2em]">
        02 / SERVICES
      </span>

      <div className="max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-14 mb-12 sm:mb-20 items-end reveal">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="block h-px w-10 bg-gold" />
              <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold">What we do</span>
            </div>
            <h2 className="font-display text-[clamp(34px,6.5vw,88px)] leading-[0.9] tracking-[0.03em] uppercase text-slate">
              Steel, Scrap,
              <br />
              and <span className="text-gold">Industrial Support.</span>
            </h2>
          </div>
          <p className="font-barlow text-[15px] sm:text-[17px] text-slate/75 max-w-[520px]">
            We help contractors, developers, and manufacturers source the right materials and move them reliably. Our services are built for day-to-day project needs, not marketing buzzwords.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 stagger">
          {data.map((svc, i) => (
            <article
              key={svc._id}
              className="service-card group relative flex flex-col min-h-[320px] lg:min-h-[380px] p-7 sm:p-9 bg-white"
              style={{ border: '1px solid #D8E0E7' }}
            >
              <span className="font-space text-[11px] text-gold/70 tracking-[0.2em]">/ {String(i + 1).padStart(2, '0')}</span>

              <div className="mt-7">
                {ICONS[svc.icon ?? ''] ?? DEFAULT_ICON}
              </div>

              <h3 className="mt-auto pt-10 font-display text-[30px] tracking-[0.04em] uppercase text-slate leading-[0.95]">
                {svc.title}
              </h3>
              {svc.excerpt && (
                <p className="mt-4 font-barlow text-[15px] text-slate/70 leading-[1.55]">{svc.excerpt}</p>
              )}

              <Link
                href={svc.slug?.current ? `/services/${svc.slug.current}` : '/services'}
                className="mt-7 inline-flex items-center gap-2.5 font-condensed text-[12px] tracking-[0.22em] uppercase text-gold"
              >
                <span>Learn more</span>
                <svg className="w-3.5 h-3.5 transition-transform duration-400 group-hover:translate-x-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
