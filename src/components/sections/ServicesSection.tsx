import Link from 'next/link'
import Image from 'next/image'
import { localePath, type Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n'

interface Service {
  _id: string
  title: string
  slug?: { current: string }
  excerpt?: string
  icon?: string
  cardImageUrl?: string
  specChips?: string[]
}

/** Fallbacks shown when Sanity has no featured services configured. */
function defaultServices(t: Dictionary['services']): Service[] {
  const d = t.defaults
  return [
    { _id: '1', icon: 'waste',     title: d.scrap.title,     excerpt: d.scrap.excerpt,     specChips: [...d.scrap.chips] },
    { _id: '2', icon: 'steel',     title: d.steel.title,     excerpt: d.steel.excerpt,     specChips: [...d.steel.chips] },
    { _id: '3', icon: 'logistics', title: d.logistics.title, excerpt: d.logistics.excerpt, specChips: [...d.logistics.chips] },
    { _id: '4', icon: 'hardware',  title: d.vendor.title,    excerpt: d.vendor.excerpt,    specChips: [...d.vendor.chips] },
  ]
}

const SERVICE_IMAGES: Record<string, string> = {
  waste:     '/images/company/wastee.jpg',
  steel:     '/images/randos/molten_steel.jpeg',
  logistics: '/images/company/trans-large.jpg',
  hardware:  '/images/company/hardware.jpg',
}

/* Large watermark SVG icons per service category */
const SERVICE_ICONS: Record<string, React.ReactNode> = {
  waste: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" rx="1"/>
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
      <circle cx="5.5" cy="18.5" r="2.5"/>
      <circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  ),
  steel: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A6.5 6.5 0 0 0 15 21a6.5 6.5 0 0 0 0-13C12 8 9 5 9 2c0 0-3.5 4-3.5 7.5a5.5 5.5 0 0 0 3 4.9"/>
      <path d="M11.5 17.5A3 3 0 0 0 15 20a3 3 0 0 0 3-3c0-1.5-1.5-3-3-3s-3-1.5-3-3"/>
    </svg>
  ),
  logistics: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
      <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  ),
  hardware: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
}

export default function ServicesSection({
  services,
  locale,
  t,
}: {
  services?: Service[]
  locale: Locale
  t: Dictionary['services']
}) {
  const data = services?.length ? services.slice(0, 4) : defaultServices(t)
  const serviceHref = (s: Service) =>
    localePath(locale, s.slug ? `/services/${s.slug.current}` : '/services')

  return (
    <section
      className="relative overflow-hidden"
      id="services"
      style={{ background: '#FAF7F2' }}
      aria-label={t.sectionLabel}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 reveal">
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-gold mb-4">{t.eyebrow}</p>
            <h2 className="font-black text-[clamp(36px,5vw,72px)] text-ink leading-none tracking-tight">
              {t.headingLine1}<br />{t.headingLine2}
            </h2>
          </div>
          <Link
            href={localePath(locale, '/services')}
            className="flex-shrink-0 self-start sm:self-end inline-flex items-center gap-2 text-gold hover:text-gold-dark font-semibold text-[13px] border-b border-gold/30 hover:border-gold pb-0.5 transition-all duration-200 cursor-pointer"
          >
            {t.allServices}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
        </div>

        {/*
          Fixed asymmetric grid:
          md:grid-cols-2 with card 0 spanning 2 rows on md+
          Card 3 spans full width at bottom
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 stagger">

          {/* Card 0 — tall, spans 2 rows on md+ */}
          {data[0] && (() => {
            const s = data[0]
            const imgSrc = s.cardImageUrl ?? SERVICE_IMAGES[s.icon ?? 'steel']
            const icon = SERVICE_ICONS[s.icon ?? 'steel']
            return (
              <Link
                href={serviceHref(s)}
                className="group relative overflow-hidden md:row-span-2 min-h-[380px] md:min-h-[560px] flex flex-col justify-end cursor-pointer"
                style={{ background: 'var(--navy)' }}
              >
                {imgSrc && (
                  <Image
                    src={imgSrc}
                    alt={s.title}
                    fill className="object-cover opacity-45 transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-navy/10" />
                {/* Watermark icon */}
                <div className="absolute top-8 right-8 w-24 h-24 text-inverse/5 pointer-events-none select-none">
                  {icon}
                </div>
                <div className="relative p-8">
                  <p className="font-mono text-[10px] tracking-[0.18em] text-gold/60 uppercase mb-3">01</p>
                  <h3 className="font-black text-[clamp(24px,3vw,40px)] text-inverse leading-tight mb-3 group-hover:text-gold transition-colors duration-300">
                    {s.title}
                  </h3>
                  <p className="text-[14px] text-inverse/60 max-w-md leading-relaxed mb-4">{s.excerpt}</p>
                  {s.specChips?.length && (
                    <div className="flex flex-wrap gap-2">
                      {s.specChips.slice(0, 2).map((c) => (
                        <span key={c} className="text-[10px] font-semibold px-2.5 py-1 border border-gold/25 text-gold/70 tracking-wide">
                          {c}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            )
          })()}

          {/* Cards 1 & 2 — stacked right column */}
          {data.slice(1, 3).map((s, idx) => {
            const imgSrc = s.cardImageUrl ?? SERVICE_IMAGES[s.icon ?? 'steel']
            const icon = SERVICE_ICONS[s.icon ?? 'steel']
            return (
              <Link
                key={s._id}
                href={serviceHref(s)}
                className="group relative overflow-hidden min-h-[260px] flex flex-col justify-end cursor-pointer"
                style={{ background: 'var(--navy)' }}
              >
                {imgSrc && (
                  <Image
                    src={imgSrc}
                    alt={s.title}
                    fill className="object-cover opacity-40 transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
                {/* Watermark icon */}
                <div className="absolute top-5 right-5 w-16 h-16 text-inverse/5 pointer-events-none select-none">
                  {icon}
                </div>
                <div className="relative p-6">
                  <p className="font-mono text-[10px] tracking-[0.18em] text-gold/50 uppercase mb-2">
                    {String(idx + 2).padStart(2, '0')}
                  </p>
                  <h3 className="font-black text-[20px] sm:text-[22px] text-inverse leading-tight mb-2 group-hover:text-gold transition-colors duration-300">
                    {s.title}
                  </h3>
                  <p className="text-[13px] text-inverse/55 leading-relaxed line-clamp-2">{s.excerpt}</p>
                  {s.specChips?.length && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {s.specChips.slice(0, 2).map((c) => (
                        <span key={c} className="text-[10px] font-semibold px-2 py-0.5 border border-gold/20 text-gold/60 tracking-wide">
                          {c}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            )
          })}

          {/* Card 3 — full-width bottom, horizontal split */}
          {data[3] && (() => {
            const s = data[3]
            const imgSrc = s.cardImageUrl ?? SERVICE_IMAGES[s.icon ?? 'steel']
            const icon = SERVICE_ICONS[s.icon ?? 'steel']
            return (
              <Link
                key={s._id}
                href={serviceHref(s)}
                className="group relative overflow-hidden md:col-span-2 min-h-[200px] flex flex-col sm:flex-row cursor-pointer"
                style={{ background: 'var(--navy)' }}
              >
                {/* Image half */}
                <div className="relative w-full sm:w-2/5 min-h-[200px] overflow-hidden flex-shrink-0">
                  {imgSrc && (
                    <Image
                      src={imgSrc}
                      alt={s.title}
                      fill className="object-cover opacity-65 transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 40vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-navy/90 sm:block hidden" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-navy/90 sm:hidden" />
                  {/* Watermark icon */}
                  <div className="absolute top-5 left-5 w-16 h-16 text-inverse/8 pointer-events-none select-none">
                    {icon}
                  </div>
                </div>
                {/* Content half */}
                <div className="flex flex-col justify-center px-8 py-8 flex-1">
                  <p className="font-mono text-[10px] tracking-[0.18em] text-gold/50 uppercase mb-3">04</p>
                  <h3 className="font-black text-[clamp(20px,2.5vw,34px)] text-inverse leading-tight mb-3 group-hover:text-gold transition-colors duration-300">
                    {s.title}
                  </h3>
                  <p className="text-[14px] text-inverse/60 max-w-md leading-relaxed mb-4">{s.excerpt}</p>
                  {s.specChips?.length && (
                    <div className="flex flex-wrap gap-2">
                      {s.specChips.slice(0, 2).map((c) => (
                        <span key={c} className="text-[10px] font-semibold px-2.5 py-1 border border-gold/20 text-gold/60 tracking-wide">
                          {c}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            )
          })()}
        </div>
      </div>
    </section>
  )
}
