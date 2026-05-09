import Image from 'next/image'
import Link from 'next/link'

const PLACEHOLDER_IMAGES = [
  '/images/hero-steel-placeholder.svg',
  '/images/about-main.svg',
  '/images/intro-main.svg',
]

const DEFAULT_PRODUCTS = [
  { _id: 'p1', category: { name: 'Steel' }, name: 'BS 500 Certified TMT Rebar', priceRange: null, price: null, hasVariants: true, inStock: true, description: 'Certified BS 500 steel reinforcement. Sizes and specifications TBC.', images: [] },
  { _id: 'p2', category: { name: 'Steel' }, name: 'Steel Billets', priceRange: null, price: null, hasVariants: false, inStock: true, description: 'Billets produced from locally sourced scrap. Specs and pricing TBC.', images: [] },
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
  return 'Request quote'
}

export default function ProductsGrid({ products }: { products?: Product[] }) {
  const data = (products?.length ? products : DEFAULT_PRODUCTS).slice(0, 6)

  return (
    <section className="relative bg-white py-20 sm:py-24 lg:py-[120px] px-5 sm:px-8 lg:px-16" id="products">
      <span className="absolute top-10 sm:top-14 right-5 sm:right-8 lg:right-16 font-space text-[11px] sm:text-[12px] text-gold tracking-[0.2em]">
        05 / PRODUCTS
      </span>

      <div className="max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-14 mb-12 sm:mb-16 items-end reveal">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="block h-px w-10 bg-gold" />
              <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold">Product lines</span>
            </div>
            <h2 className="font-display text-[clamp(34px,6.5vw,88px)] leading-[0.92] tracking-[0.03em] uppercase text-slate">
              Materials for
              <br />
              <span className="text-gold">Real Job Sites.</span>
            </h2>
          </div>
          <p className="font-barlow text-[15px] sm:text-[17px] text-slate/75 max-w-[520px]">
            Browse our featured steel and industrial products. Each item includes practical specs to help teams make faster purchasing decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 stagger">
          {data.map((p, i) => {
            const imageUrl = p.images?.[0]?.asset?.url ?? PLACEHOLDER_IMAGES[i % PLACEHOLDER_IMAGES.length]
            const price = priceLabel(p)

            return (
              <article
                key={p._id}
                className="prod-card group overflow-hidden bg-white"
                style={{ border: '1px solid #D8E0E7' }}
              >
                <div className="relative h-52 sm:h-56 bg-charcoal overflow-hidden">
                  <Image src={imageUrl} alt={p.name} fill className="prod-bg object-cover" />
                  {p.category && (
                    <span className="absolute top-3 left-3 bg-white/95 px-3 py-1 font-condensed text-[10px] tracking-[0.18em] uppercase text-gold">
                      {p.category.name}
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <h4 className="font-display text-[30px] tracking-[0.03em] uppercase text-slate leading-[0.95]">{p.name}</h4>
                  {p.description && (
                    <p className="mt-3 font-barlow text-[14px] text-slate/70 leading-[1.55]">{p.description}</p>
                  )}

                  <div className="mt-5 pt-4 flex items-center justify-between" style={{ borderTop: '1px solid #E6ECF1' }}>
                    <span className="font-space text-[11px] tracking-[0.1em] text-slate/65">{price}</span>
                    <Link href="/shop" className="font-condensed text-[12px] tracking-[0.2em] uppercase text-gold inline-flex items-center gap-2">
                      Learn more
                      <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-14 reveal">
          <Link
            href="/shop"
            className="group relative inline-flex items-center gap-3 overflow-hidden px-[34px] py-[16px] bg-gold text-white font-condensed text-[14px] tracking-[0.22em] uppercase font-semibold"
          >
            <span className="relative z-10">Browse full catalogue</span>
            <svg className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
            <span className="absolute inset-0 bg-gold-dim -translate-x-full group-hover:translate-x-0 transition-transform duration-500" style={{ transitionTimingFunction: 'cubic-bezier(.16,1,.3,1)' }} />
          </Link>
        </div>
      </div>
    </section>
  )
}
