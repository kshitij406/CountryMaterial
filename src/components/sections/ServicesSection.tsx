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
  { _id: '1', icon: 'steel',    title: 'Steel & Reinforcement', excerpt: 'TMT rebar, structural beams, wire rod. Tested to BS 4449 and ISO 6935-2 from our Pwani mill.', slug: { current: 'steel' } },
  { _id: '2', icon: 'hardware', title: 'Hardware & Tooling',    excerpt: 'Fasteners, fixings, power tools and construction consumables — from ten warehouses across Tanzania.', slug: { current: 'hardware' } },
  { _id: '3', icon: 'waste',    title: 'Waste Management',      excerpt: 'Industrial collection, transfer, recovery. Licensed under NEMC for hazardous and scrap material handling.', slug: { current: 'waste-management' } },
  { _id: '4', icon: 'logistics',title: 'Logistics & Haulage',   excerpt: 'Sixty-vehicle fleet moving bulk steel, containers and project cargo across Tanzania, Zambia, DRC and Rwanda.', slug: { current: 'logistics' } },
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
    <section className="relative bg-navy py-20 sm:py-24 lg:py-[140px] px-5 sm:px-8 lg:px-16 overflow-hidden" id="services">
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
            <h2 className="font-display text-[clamp(34px,6.5vw,96px)] leading-[0.9] tracking-[0.03em] uppercase text-cream">
              Four divisions.<br />One <span className="text-gold">discipline.</span>
            </h2>
          </div>
          <p className="font-barlow text-[15px] sm:text-[17px] text-cream/65 max-w-[480px]">
            From reinforcement bar forged in our Pwani mill to sealed logistics across East Africa — Country Materials owns every link in the chain.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 stagger">
          {data.map((svc, i) => (
            <article
              key={svc._id}
              className="service-card group relative flex flex-col min-h-[330px] lg:min-h-[420px] p-7 sm:p-9 lg:p-11 pt-7 sm:pt-9 lg:pt-10 bg-navy-light"
              style={{ border: '1px solid rgba(200,150,46,.18)', borderLeft: '3px solid #C8962E' }}
            >
              <span className="font-space text-[11px] text-gold/50 tracking-[0.2em]">/ {String(i + 1).padStart(2, '0')}</span>

              <div className="mt-7">
                {ICONS[svc.icon ?? ''] ?? DEFAULT_ICON}
              </div>

              <h3 className="mt-auto pt-10 font-display text-[34px] tracking-[0.04em] uppercase text-cream leading-[0.95]">
                {svc.title}
              </h3>
              {svc.excerpt && (
                <p className="mt-4 font-barlow text-[15px] text-cream/62 leading-[1.55]">{svc.excerpt}</p>
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
