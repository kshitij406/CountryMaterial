import Image from 'next/image'
import Link from 'next/link'

// Gradient backgrounds cycled when products don't have images
const BG_GRADIENTS = [
  'radial-gradient(ellipse at 60% 40%,rgba(200,150,46,.3),transparent 60%),linear-gradient(160deg,#3a2810,#0B1D3A)',
  'radial-gradient(ellipse at 40% 60%,rgba(232,184,75,.18),transparent 55%),linear-gradient(140deg,#1c2940,#0B1D3A)',
  'radial-gradient(ellipse at 30% 30%,rgba(200,150,46,.22),transparent 60%),linear-gradient(180deg,#1a1a2e,#0B1D3A)',
  'radial-gradient(ellipse at 70% 50%,rgba(232,184,75,.25),transparent 55%),linear-gradient(200deg,#251a0c,#162D56)',
  'radial-gradient(ellipse at 50% 70%,rgba(200,150,46,.18),transparent 60%),linear-gradient(120deg,#0f1828,#1A1A2E)',
  'radial-gradient(ellipse at 20% 40%,rgba(200,150,46,.3),transparent 55%),linear-gradient(160deg,#2a1a08,#0B1D3A)',
]

// 12-col span pattern on desktop: 6, 3, 3, 4, 4, 4
const SPAN_CLASSES = ['lg:col-span-6', 'lg:col-span-3', 'lg:col-span-3', 'lg:col-span-4', 'lg:col-span-4', 'lg:col-span-4']
const HEIGHT_CLASSES = ['lg:min-h-[440px]', 'lg:min-h-[360px]', 'lg:min-h-[360px]', 'lg:min-h-[360px]', 'lg:min-h-[360px]', 'lg:min-h-[360px]']

const DEFAULT_PRODUCTS = [
  { _id: 'p1', category: { name: 'Steel / Reinforcement' }, name: 'TMT Rebar Y12 – Y32',    priceRange: '2,450/KG', price: null, hasVariants: true,  inStock: true, description: 'BS 4449 · Fe500D', images: [] },
  { _id: 'p2', category: { name: 'Structural' },            name: 'H-Beams',                 priceRange: null,       price: null, hasVariants: false, inStock: true, description: '150 – 600mm · S275JR', images: [] },
  { _id: 'p3', category: { name: 'Wire' },                  name: 'Binding Wire',             priceRange: null,       price: null, hasVariants: false, inStock: true, description: '16 – 22 gauge · GALV', images: [] },
  { _id: 'p4', category: { name: 'Roofing' },               name: 'Corrugated Sheet',         priceRange: null,       price: null, hasVariants: false, inStock: true, description: '0.35 – 0.5mm · AZ150', images: [] },
  { _id: 'p5', category: { name: 'Cementitious' },          name: 'Portland Cement 42.5N',    priceRange: null,       price: 18900, hasVariants: false, inStock: true, description: '50kg sack', images: [] },
  { _id: 'p6', category: { name: 'Tooling' },               name: 'Power & Hand Tools',       priceRange: null,       price: null, hasVariants: false, inStock: true, description: '1,400 SKUs in stock', images: [] },
]

interface Product {
  _id: string
  name: string
  slug?: { current: string }
  price?: number | null
  priceRange?: string | null
  hasVariants?: boolean
  inStock?: boolean
  description?: string
  images?: Array<{ asset?: { url?: string } }>
  category?: { name: string }
}

function priceLabel(p: Product) {
  if (p.hasVariants && p.priceRange) return `TZS ${p.priceRange}`
  if (p.price) return `TZS ${p.price.toLocaleString()}`
  return null
}

export default function ProductsGrid({ products }: { products?: Product[] }) {
  const data = (products?.length ? products : DEFAULT_PRODUCTS).slice(0, 6)

  return (
    <section className="relative bg-navy py-20 sm:py-24 lg:py-[140px] px-5 sm:px-8 lg:px-16 overflow-hidden" id="products">
      <span className="absolute top-10 sm:top-14 right-5 sm:right-8 lg:right-16 font-space text-[11px] sm:text-[12px] text-gold tracking-[0.2em]">
        05 / PRODUCTS
      </span>

      <div className="max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-14 mb-12 sm:mb-20 items-end reveal">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="block h-px w-10 bg-gold" />
              <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold">The catalogue</span>
            </div>
            <h2 className="font-display text-[clamp(34px,6.5vw,96px)] leading-[0.9] tracking-[0.03em] uppercase text-cream">
              Materials,<br />specified <span className="text-gold">precisely.</span>
            </h2>
          </div>
          <p className="font-barlow text-[15px] sm:text-[17px] text-cream/65 max-w-[480px]">
            Everything we carry is specified, certified and traceable to source. Browse a selection below — request the full catalogue for tender pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 stagger">
          {data.map((p, i) => {
            const imageUrl = p.images?.[0]?.asset?.url
            const bg = BG_GRADIENTS[i % BG_GRADIENTS.length]
            const price = priceLabel(p)

            return (
              <article
                key={p._id}
                className={`prod-card group relative overflow-hidden flex flex-col justify-end p-5 sm:p-7 cursor-pointer col-span-1 ${SPAN_CLASSES[i] ?? 'lg:col-span-4'} ${HEIGHT_CLASSES[i] ?? 'lg:min-h-[360px]'}`}
                style={{
                  minHeight: 280,
                  border: '1px solid rgba(200,150,46,.14)',
                }}
              >
                {/* Background */}
                <div className="prod-bg absolute inset-0" style={{ background: bg }}>
                  {imageUrl && (
                    <Image src={imageUrl} alt={p.name} fill className="object-cover mix-blend-overlay opacity-50" />
                  )}
                  <div className="absolute inset-0 mix-blend-overlay" style={{ background: 'repeating-linear-gradient(45deg,transparent 0 40px,rgba(0,0,0,.15) 40px 41px)' }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(11,29,58,.2) 0%,rgba(5,16,31,.95) 100%)' }} />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {p.category && (
                    <div className="flex items-center gap-2.5 mb-3.5">
                      <span className="block w-2 h-2 flex-shrink-0" style={{ border: '1px solid #C8962E', transform: 'rotate(45deg)' }} />
                      <span className="font-condensed text-[12px] tracking-[0.22em] uppercase text-gold">{p.category.name}</span>
                    </div>
                  )}
                  <h4 className="font-display text-[32px] tracking-[0.03em] uppercase text-cream leading-[0.95]">{p.name}</h4>
                  <div className="mt-3 flex items-center justify-between font-space text-[11px] tracking-[0.1em] text-cream/55">
                    {p.description && <span>{p.description}</span>}
                    {price && <span className="text-gold-light">{price}</span>}
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-16 reveal">
          <Link
            href="/shop"
            className="group relative inline-flex items-center gap-3 overflow-hidden px-[34px] py-[18px] border border-gold text-gold font-condensed text-[14px] tracking-[0.22em] uppercase font-semibold"
          >
            <span className="relative z-10 group-hover:text-navy transition-colors duration-300">Browse full catalogue</span>
            <svg className="relative z-10 w-3.5 h-3.5 group-hover:text-navy transition-all duration-400 group-hover:translate-x-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
            <span className="absolute inset-0 bg-gold -translate-x-full group-hover:translate-x-0 transition-transform duration-500" style={{ transitionTimingFunction: 'cubic-bezier(.16,1,.3,1)' }} />
          </Link>
        </div>
      </div>
    </section>
  )
}
