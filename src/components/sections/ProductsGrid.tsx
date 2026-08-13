import Image from 'next/image'
import Link from 'next/link'
import { localePath, type Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n'

interface Product {
  _id: string
  name: string
  slug?: { current: string }
  price?: number | null
  priceRange?: string | null
  description?: string | null
  inStock?: boolean
  hasVariants?: boolean
  grade?: string | null
  unit?: string | null
  standards?: string[] | null
  specSheet?: Array<{ key: string; value: string }> | null
  images?: Array<{ asset?: { url: string } }> | null
  category?: { name: string } | null
}

/** Grades, standards, dimensions and images are the same in both languages. */
const FALLBACK_SPECS = [
  { _id: 'rb-8',     slug: 'tmt-rebar-8mm',  grade: 'BS 500B', standards: ['BS 500B', 'TBS 1257'],     dims: ['8mm', '12m'],             img: 'tmt-rebar-1.jpg' },
  { _id: 'rb-10',    slug: 'tmt-rebar-10mm', grade: 'BS 500B', standards: ['BS 500B', 'TBS 1257'],     dims: ['10mm', '12m'],            img: 'tmt-rebar-2.jpg' },
  { _id: 'rb-12',    slug: 'tmt-rebar-12mm', grade: 'BS 500B', standards: ['BS 500B', 'TBS 1257'],     dims: ['12mm', '12m'],            img: 'tmt-rebar-3.jpg' },
  { _id: 'rb-16',    slug: 'tmt-rebar-16mm', grade: 'BS 500B', standards: ['BS 500B', 'TBS 1257'],     dims: ['16mm', '12m'],            img: 'tmt-rebar-1.jpg' },
  { _id: 'billet-sq', slug: 'steel-billets', grade: 'Q235',    standards: ['BS EN 10025', 'ISO 9001'], dims: ['100 / 125mm sq.', '6–12m'], img: 'steel-billets.jpg', sectionSpec: true },
  { _id: 'rb-20',    slug: 'tmt-rebar-20mm', grade: 'BS 500B', standards: ['BS 500B', 'TBS 1257'],     dims: ['20mm', '12m'],            img: 'tmt-rebar-2.jpg' },
]

function fallbackProducts(t: Dictionary['products']): Product[] {
  return FALLBACK_SPECS.map((s, i) => ({
    _id: s._id,
    name: t.fallback[i].name,
    description: t.fallback[i].description,
    slug: { current: s.slug },
    grade: s.grade,
    unit: t.perTonne,
    inStock: true,
    standards: s.standards,
    specSheet: [
      { key: s.sectionSpec ? t.specSection : t.specDiameter, value: s.dims[0] },
      { key: t.specLength, value: s.dims[1] },
    ],
    images: [{ asset: { url: `/images/stock/products/${s.img}` } }],
  }))
}

export default function ProductsGrid({
  products,
  locale,
  t,
}: {
  products?: Product[]
  locale: Locale
  t: Dictionary['products']
}) {
  const data = products?.length ? products.slice(0, 6) : fallbackProducts(t)

  return (
    <section
      className="relative overflow-hidden"
      id="products"
      style={{ background: '#0B1D3A' }}
      aria-label={t.sectionLabel}
    >
      <div className="absolute inset-0 bg-steel-texture" aria-hidden="true" />

      <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28">

        {/* Asymmetric header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 reveal">
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-gold mb-4">{t.eyebrow}</p>
            <h2 className="font-black text-[clamp(36px,5vw,72px)] text-white leading-none tracking-tight">
              {t.headingLine1}<br />{t.headingLine2}
            </h2>
          </div>
          <Link
            href={localePath(locale, '/shop')}
            className="flex-shrink-0 self-start sm:self-end inline-flex items-center gap-2 text-gold hover:text-gold-light font-semibold text-[13px] border-b border-gold/30 hover:border-gold pb-0.5 transition-all duration-200 cursor-pointer"
          >
            {t.fullCatalogue}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-px stagger" style={{ background: 'rgba(200,150,46,0.08)' }}>
          {data.map((product) => {
            const imgSrc = product.images?.[0]?.asset?.url
            const displayPrice = product.priceRange ?? (product.price ? `TZS ${product.price.toLocaleString()}` : null)

            return (
              <Link
                key={product._id}
                href={localePath(locale, product.slug ? `/shop/${product.slug.current}` : '/shop')}
                className="group flex flex-col overflow-hidden transition-all duration-300 cursor-pointer"
                style={{ background: '#0B1D3A' }}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden flex-shrink-0" style={{ background: '#070F1E' }}>
                  {imgSrc ? (
                    <Image
                      src={imgSrc}
                      alt={product.name}
                      fill
                      className="object-cover opacity-75 transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg viewBox="0 0 48 48" fill="none" className="w-16 h-16 text-white/10" stroke="currentColor" strokeWidth="1.5">
                        <rect x="6" y="18" width="36" height="8" rx="4"/><rect x="6" y="28" width="36" height="8" rx="4"/><rect x="6" y="8" width="36" height="8" rx="4"/>
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />

                  {/* Grade badge */}
                  {product.grade && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-navy/80 border border-gold/40 text-gold text-[10px] font-bold tracking-wide font-mono">
                      {product.grade}
                    </div>
                  )}

                  {/* Stock badge */}
                  <div className={`absolute top-3 right-3 px-2.5 py-1 text-[10px] font-bold tracking-wide border ${
                    product.inStock !== false
                      ? 'bg-emerald-DEFAULT/20 border-emerald-DEFAULT/40 text-emerald-DEFAULT'
                      : 'bg-white/10 border-white/20 text-white/50'
                  }`}>
                    {product.inStock !== false ? t.inStock : t.contactUs}
                  </div>
                </div>

                {/* Body */}
                <div className="flex-1 flex flex-col p-6 border-t border-gold/10">
                  <h3 className="text-[15px] font-black text-white leading-snug mb-3 group-hover:text-gold transition-colors duration-300">
                    {product.name}
                  </h3>

                  {/* Spec row */}
                  {product.specSheet?.length && (
                    <div className="flex flex-wrap gap-4 mb-3">
                      {product.specSheet.slice(0, 2).map((spec) => (
                        <span key={spec.key} className="font-mono text-[11px] text-white/40">
                          {spec.key}: <strong className="text-white/60">{spec.value}</strong>
                        </span>
                      ))}
                    </div>
                  )}

                  {product.description && (
                    <p className="text-[13px] text-white/40 leading-relaxed line-clamp-2 flex-1">{product.description}</p>
                  )}

                  {/* Standards */}
                  {product.standards?.length && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {product.standards.slice(0, 3).map((s) => (
                        <span key={s} className="text-[10px] font-semibold px-2.5 py-1 border border-gold/20 text-gold/60 tracking-wider uppercase">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Price + CTA */}
                  <div className="mt-5 flex items-center justify-between pt-4 border-t border-white/[0.07]">
                    <div>
                      {product.unit && <p className="text-[10px] text-white/30 font-mono uppercase tracking-wider">{product.unit}</p>}
                      {displayPrice ? (
                        <p className="text-[15px] font-bold text-white">{displayPrice}</p>
                      ) : (
                        <p className="text-[13px] font-semibold text-gold">{t.contactForPricing}</p>
                      )}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-gold/60 group-hover:text-gold transition-colors duration-200">
                      {t.details}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 px-7 py-6 border-l-4 border-gold reveal" style={{ background: 'rgba(200,150,46,0.06)' }}>
          <p className="text-[14px] text-white/50 max-w-sm leading-relaxed">
            {t.ctaBody}
          </p>
          <Link
            href={localePath(locale, '/contact')}
            className="flex-shrink-0 inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold text-[14px] px-8 py-4 transition-colors duration-200 cursor-pointer"
          >
            {t.ctaButton}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
