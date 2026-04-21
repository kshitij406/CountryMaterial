import Link from 'next/link'
import type { Product } from '@/types'
import { formatCurrency } from '@/lib/utils'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images?.[0]?.asset?.url
  const enquireHref = `/contact?product=${product.slug.current}`

  return (
    <div
      className="prod-card group flex flex-col"
      style={{ border: '1px solid rgba(200,150,46,.2)', background: '#05101f', transition: 'border-color .25s' }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden shrink-0" style={{ background: '#0B1D3A' }}>
        <img
          src={imageUrl ?? '/images/product-placeholder.svg'}
          alt={product.name}
          className="prod-bg w-full h-full object-cover transition-transform duration-500"
        />

        {product.category && (
          <span className="absolute top-3 left-3 font-condensed text-[10px] tracking-[0.15em] uppercase bg-gold text-navy px-3 py-1">
            {product.category.name}
          </span>
        )}

        <span
          className={`absolute top-3 right-3 font-condensed text-[10px] tracking-[0.12em] uppercase px-2.5 py-1 ${
            product.inStock !== false ? 'text-gold' : 'text-cream/40'
          }`}
          style={{ border: `1px solid ${product.inStock !== false ? 'rgba(200,150,46,.4)' : 'rgba(200,150,46,.15)'}` }}
        >
          {product.inStock !== false ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display text-[clamp(18px,1.8vw,24px)] leading-[1] tracking-[0.04em] uppercase text-cream group-hover:text-gold transition-colors duration-200 mb-3">
          {product.name}
        </h3>

        {product.description && (
          <p className="font-barlow text-[14px] text-cream/45 leading-[1.65] line-clamp-3 flex-1 mb-4">
            {typeof product.description === 'string' ? product.description : ''}
          </p>
        )}

        <div className="pt-4 flex items-end justify-between gap-4 mt-auto" style={{ borderTop: '1px solid rgba(200,150,46,.15)' }}>
          <div>
            <div className="font-condensed text-[10px] tracking-[0.18em] uppercase text-cream/35 mb-1">Price</div>
            {product.hasVariants && product.priceRange ? (
              <div className="font-display text-[18px] tracking-[0.04em] uppercase text-cream">TZS {product.priceRange}</div>
            ) : product.price ? (
              <div className="font-display text-[18px] tracking-[0.04em] uppercase text-cream">{formatCurrency(product.price)}</div>
            ) : (
              <div className="font-condensed text-[12px] tracking-[0.12em] uppercase text-cream/40">Contact for price</div>
            )}
          </div>

          <Link
            href={enquireHref}
            className="shrink-0 px-5 py-2.5 bg-gold text-navy font-condensed text-[12px] tracking-[0.18em] uppercase font-semibold hover:bg-gold-light transition-colors duration-200"
          >
            Enquire
          </Link>
        </div>
      </div>
    </div>
  )
}
