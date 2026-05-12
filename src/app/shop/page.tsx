import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { siteSettingsQuery } from '@/sanity/lib/queries'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Product Catalogue — Steel, Rebar & Hardware',
  description: 'Browse BS 500-certified TMT rebar, steel billets, and hardware from Country Materials Limited. Contact us for pricing and bulk orders.',
}

const PRODUCT_CATEGORIES = [
  {
    id: 'tmt-rebar',
    title: 'TMT Rebar',
    tagline: 'BS 500B. Built to last.',
    excerpt: 'High-yield deformed reinforcement bar in diameters from 8mm to 32mm. Every bundle carries a mill certificate. Produced in our electric arc furnace from 100% recycled scrap — so your project saves steel and reduces waste simultaneously.',
    image: '/images/stock/products/tmt-rebar-1.jpg',
    highlights: [
      'Available in 8mm, 10mm, 12mm, 16mm, 20mm, 25mm, and 32mm',
      'Yield strength ≥ 500 N/mm² — BS 500B compliant',
      'TBS 1257 certified — meets Tanzanian national standards',
      'Mill certificates issued with every shipment',
    ],
    specChips: ['BS 500B', 'TBS 1257', 'ISO 9001 process', '12m standard lengths'],
  },
  {
    id: 'billets',
    title: 'Steel Billets',
    tagline: 'Scrap becomes feedstock.',
    excerpt: 'Square-section billets produced in our electric arc furnace from 100% post-consumer scrap. Suitable as rolling mill feedstock or direct fabrication input. Continuous casting process, chemistry-tested per heat.',
    image: '/images/stock/products/steel-billets.jpg',
    highlights: [
      '100 × 100mm and 125 × 125mm square sections',
      'Q235 grade — consistent per-heat chemistry certification',
      'Available in 6m to 12m cut lengths',
      'Full chain-of-custody traceability from scrap input',
    ],
    specChips: ['Q235 grade', 'BS EN 10025', 'ISO 9001', '100 / 125mm sq.'],
  },
  {
    id: 'hardware',
    title: 'Hardware & Industrial Scrap',
    tagline: 'The other side of the loop.',
    excerpt: 'Industrial hardware supplies for construction buyers and a structured scrap buy-back programme for vendors. We purchase ferrous and non-ferrous scrap from workshops, demolition sites, and factories — graded, weighed, and paid transparently via mobile money.',
    image: '/images/stock/products/hardware-tools.jpg',
    highlights: [
      'Ferrous and non-ferrous scrap accepted at all branches',
      'Real-time commodity pricing — no middlemen',
      'Instant mobile money payment at point of collection',
      'Hardware procurement for large industrial buyers',
    ],
    specChips: ['Ferrous & non-ferrous', 'Mobile money', 'Nationwide coverage', 'Same-day pickup'],
  },
]

export default async function ShopPage() {
  await client.fetch(siteSettingsQuery).catch(() => null)

  return (
    <>
      {/* Page hero */}
      <section
        className="relative min-h-[52vh] flex flex-col justify-end overflow-hidden pt-20"
        style={{ background: '#0B1D3A' }}
        aria-label="Products page hero"
      >
        <div className="absolute inset-0">
          <Image
            src="/images/stock/products/tmt-rebar-3.jpg"
            alt="Country Materials certified steel products"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/50 to-navy" />
          <div className="absolute inset-0 bg-steel-texture" aria-hidden="true" />
        </div>
        <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pb-16 sm:pb-24 pt-12">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-gold mb-6">Product Catalogue</p>
          <h1 className="font-black text-[clamp(48px,8vw,110px)] leading-[0.92] tracking-tight text-white">
            Certified steel.<br />
            <span className="text-gold">Ready to ship.</span>
          </h1>
          <p className="mt-6 text-[17px] text-white/55 max-w-xl leading-relaxed">
            BS 500-grade TMT rebar, steel billets, and hardware for contractors and industrial buyers across Tanzania.
          </p>
        </div>
      </section>

      {/* Quick-jump index strip */}
      <div style={{ background: '#151F2E', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex overflow-x-auto scrollbar-hide">
            {PRODUCT_CATEGORIES.map((cat, i) => (
              <a
                key={cat.id}
                href={`#product-${i + 1}`}
                className="flex-shrink-0 flex items-center gap-3 py-4 pr-10 text-white/40 hover:text-white transition-colors duration-200 cursor-pointer group"
              >
                <span className="font-mono text-[10px] text-gold/50 group-hover:text-gold transition-colors">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[13px] font-semibold tracking-wide whitespace-nowrap">{cat.title}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Editorial product category sections */}
      {PRODUCT_CATEGORIES.map((cat, i) => {
        const isEven = i % 2 === 0

        return (
          <section
            key={cat.id}
            id={`product-${i + 1}`}
            className="relative overflow-hidden"
            style={{ background: isEven ? '#0B1D3A' : '#FAF7F2' }}
            aria-label={cat.title}
          >
            <div className="max-w-[1440px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[560px]">

                {/* Image panel */}
                <div className={`relative min-h-[340px] lg:min-h-0 overflow-hidden ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <span
                    className="absolute bottom-5 right-6 font-mono font-bold text-[96px] leading-none select-none pointer-events-none text-white/10"
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
                      {cat.tagline}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className={`font-black text-[clamp(28px,3vw,46px)] leading-tight mb-5 ${isEven ? 'text-white' : 'text-ink'}`}>
                    {cat.title}
                  </h2>

                  {/* Body */}
                  <p className={`text-[15px] leading-relaxed mb-8 max-w-md ${isEven ? 'text-white/55' : 'text-slate/70'}`}>
                    {cat.excerpt}
                  </p>

                  {/* Highlights */}
                  <ul className="flex flex-col gap-3 mb-8" aria-label={`${cat.title} highlights`}>
                    {cat.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full border border-gold/50 flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                        </span>
                        <span className={`text-[13.5px] leading-snug ${isEven ? 'text-white/50' : 'text-slate/65'}`}>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Spec chips */}
                  <div className="flex flex-wrap gap-2 mb-9">
                    {cat.specChips.map((chip) => (
                      <span
                        key={chip}
                        className={`text-[11px] font-semibold px-3 py-1.5 tracking-wide border ${
                          isEven
                            ? 'border-gold/25 text-gold/80'
                            : 'border-sand text-gold-dark'
                        }`}
                      >
                        {chip}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href="/contact"
                    className={`self-start inline-flex items-center gap-2 font-semibold text-[13px] tracking-wide border-b pb-0.5 transition-all duration-200 cursor-pointer group ${
                      isEven
                        ? 'text-gold border-gold/30 hover:border-gold'
                        : 'text-gold-dark border-gold/40 hover:border-gold-dark'
                    }`}
                  >
                    Request a quote
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* Specs strip */}
      <section
        className="relative overflow-hidden"
        style={{ background: '#FAF7F2', borderTop: '1px solid #E8DED1' }}
        aria-label="Available specifications"
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ background: '#E8DED1' }}>
            <div className="p-8" style={{ background: '#FAF7F2' }}>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-gold mb-4">Available Diameters</p>
              <div className="flex flex-wrap gap-2">
                {['8mm', '10mm', '12mm', '16mm', '20mm', '25mm', '32mm'].map((d) => (
                  <span key={d} className="font-mono text-[13px] font-bold text-ink px-3 py-1 border border-sand">
                    {d}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-8" style={{ background: '#FAF7F2' }}>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-gold mb-4">Certifications Held</p>
              <div className="flex flex-wrap gap-2">
                {['BS 500B', 'TBS 1257', 'ISO 9001', 'BS EN 10025', 'Q235'].map((c) => (
                  <span key={c} className="font-mono text-[13px] font-bold text-ink px-3 py-1 border border-sand">
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-8" style={{ background: '#FAF7F2' }}>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-gold mb-4">Delivery</p>
              <p className="text-[14px] text-slate/65 leading-relaxed">
                Same-day dispatch from in-stock inventory. 5 regional branches across Tanzania. Bulk orders scheduled within 48 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote CTA */}
      <section
        className="py-20 sm:py-24 text-center relative overflow-hidden"
        style={{ background: '#0B1D3A' }}
        aria-label="Quote call to action"
      >
        <div className="absolute inset-0 bg-steel-texture" aria-hidden="true" />
        <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-black text-[clamp(28px,4vw,56px)] text-white leading-tight mb-5">
              Need bulk pricing<br />or a custom quote?
            </h2>
            <p className="text-[15px] text-white/45 mb-10 leading-relaxed max-w-md mx-auto">
              We supply contractors, developers, and businesses at competitive wholesale prices. Our team responds within 24 hours.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold text-[15px] px-8 py-4 transition-colors duration-200 cursor-pointer">
                Request a Quote
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </Link>
              <a href="tel:+255768500555" className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold text-[15px] px-8 py-4 transition-all duration-200 cursor-pointer">
                +255 768 500 555
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
