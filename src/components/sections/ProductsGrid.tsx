import Image from 'next/image'
import Link from 'next/link'

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

const FALLBACK_PRODUCTS: Product[] = [
  {
    _id: 'rb-8',
    name: 'TMT Rebar — 8mm',
    slug: { current: 'tmt-rebar-8mm' },
    grade: 'BS 500B',
    unit: 'Per tonne',
    description: 'High-strength deformed rebar for slab reinforcement, columns, and foundations. Compliant with BS 500B and TBS.',
    inStock: true,
    standards: ['BS 500B', 'TBS 1257'],
    specSheet: [{ key: 'Diameter', value: '8mm' }, { key: 'Length', value: '12m' }],
    images: [{ asset: { url: '/images/stock/products/tmt-rebar-1.jpg' } }],
  },
  {
    _id: 'rb-10',
    name: 'TMT Rebar — 10mm',
    slug: { current: 'tmt-rebar-10mm' },
    grade: 'BS 500B',
    unit: 'Per tonne',
    description: 'Standard 10mm deformed rebar for residential and commercial concrete reinforcement. Available in 12m lengths.',
    inStock: true,
    standards: ['BS 500B', 'TBS 1257'],
    specSheet: [{ key: 'Diameter', value: '10mm' }, { key: 'Length', value: '12m' }],
    images: [{ asset: { url: '/images/stock/products/tmt-rebar-2.jpg' } }],
  },
  {
    _id: 'rb-12',
    name: 'TMT Rebar — 12mm',
    slug: { current: 'tmt-rebar-12mm' },
    grade: 'BS 500B',
    unit: 'Per tonne',
    description: '12mm TMT rebar for medium and heavy construction. Consistent rib pattern ensures superior concrete bond strength.',
    inStock: true,
    standards: ['BS 500B', 'TBS 1257'],
    specSheet: [{ key: 'Diameter', value: '12mm' }, { key: 'Length', value: '12m' }],
    images: [{ asset: { url: '/images/stock/products/tmt-rebar-3.jpg' } }],
  },
  {
    _id: 'rb-16',
    name: 'TMT Rebar — 16mm',
    slug: { current: 'tmt-rebar-16mm' },
    grade: 'BS 500B',
    unit: 'Per tonne',
    description: 'Heavy-duty 16mm deformed rebar for bridges, high-rises, and infrastructure projects. ISO process controlled.',
    inStock: true,
    standards: ['BS 500B', 'TBS 1257'],
    specSheet: [{ key: 'Diameter', value: '16mm' }, { key: 'Length', value: '12m' }],
    images: [{ asset: { url: '/images/stock/products/tmt-rebar-1.jpg' } }],
  },
  {
    _id: 'billet-sq',
    name: 'Steel Billets',
    slug: { current: 'steel-billets' },
    grade: 'Q235',
    unit: 'Per tonne',
    description: 'Square billets produced from 100% recycled scrap. Used as feedstock for rolling mills. Available in 100mm and 125mm sections.',
    inStock: true,
    standards: ['BS EN 10025', 'ISO 9001'],
    specSheet: [{ key: 'Section', value: '100 / 125mm sq.' }, { key: 'Length', value: '6–12m' }],
    images: [{ asset: { url: '/images/stock/products/steel-billets.jpg' } }],
  },
  {
    _id: 'rb-20',
    name: 'TMT Rebar — 20mm',
    slug: { current: 'tmt-rebar-20mm' },
    grade: 'BS 500B',
    unit: 'Per tonne',
    description: 'Extra-heavy 20mm TMT rebar for pile caps, retaining walls, and large infrastructure. Bulk pricing available.',
    inStock: true,
    standards: ['BS 500B', 'TBS 1257'],
    specSheet: [{ key: 'Diameter', value: '20mm' }, { key: 'Length', value: '12m' }],
    images: [{ asset: { url: '/images/stock/products/tmt-rebar-2.jpg' } }],
  },
]

export default function ProductsGrid({ products }: { products?: Product[] }) {
  const data = products?.length ? products.slice(0, 6) : FALLBACK_PRODUCTS

  return (
    <section
      className="relative overflow-hidden"
      id="products"
      style={{ background: '#0B1D3A' }}
      aria-label="Product catalogue"
    >
      <div className="absolute inset-0 bg-steel-texture" aria-hidden="true" />

      <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28">

        {/* Asymmetric header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 reveal">
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-gold mb-4">Product Catalogue</p>
            <h2 className="font-black text-[clamp(36px,5vw,72px)] text-white leading-none tracking-tight">
              Certified steel,<br />ready to ship.
            </h2>
          </div>
          <Link
            href="/shop"
            className="flex-shrink-0 self-start sm:self-end inline-flex items-center gap-2 text-gold hover:text-gold-light font-semibold text-[13px] border-b border-gold/30 hover:border-gold pb-0.5 transition-all duration-200 cursor-pointer"
          >
            Full catalogue
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
                href={product.slug ? `/shop/${product.slug.current}` : '/shop'}
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
                    {product.inStock !== false ? 'In Stock' : 'Contact Us'}
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
                        <p className="text-[13px] font-semibold text-gold">Contact for pricing</p>
                      )}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-gold/60 group-hover:text-gold transition-colors duration-200">
                      Details
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
            Need custom sizes, bulk pricing, or scheduled delivery? Our steel team responds within 24 hours.
          </p>
          <Link
            href="/contact"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold text-[14px] px-8 py-4 transition-colors duration-200 cursor-pointer"
          >
            Talk to Our Steel Team
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
