import Link from 'next/link'
import type { Product } from '@/types'
import { formatCurrency } from '@/lib/utils'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images?.[0]?.asset?.url
  const slug = product.slug?.current ?? 'catalog-item'
  const enquireHref = `/contact?product=${slug}`

  return (
    <div className="prod-card group flex flex-col bg-white" style={{ border: '1px solid #D8E0E7', transition: 'border-color .25s' }}>
      <div className="relative h-48 overflow-hidden shrink-0" style={{ background: '#EEF2F5' }}>
        <img
          src={imageUrl ?? '/images/product-placeholder.svg'}
          alt={product.name}
          className="prod-bg w-full h-full object-cover transition-transform duration-500"
        />

        {product.category && (
          <span className="absolute top-3 left-3 font-condensed text-[10px] tracking-[0.15em] uppercase bg-white text-gold px-3 py-1" style={{ border: '1px solid #D8E0E7' }}>
            {product.category.name}
          </span>
        )}

        <span
          className={`absolute top-3 right-3 font-condensed text-[10px] tracking-[0.12em] uppercase px-2.5 py-1 ${
            product.inStock !== false ? 'text-gold' : 'text-slate/45'
          }`}
          style={{ border: `1px solid ${product.inStock !== false ? '#B9D1E4' : '#D8E0E7'}`, background: 'rgba(255,255,255,.9)' }}
        >
          {product.inStock !== false ? 'In stock' : 'Out of stock'}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display text-[clamp(18px,1.8vw,24px)] leading-[1] tracking-[0.04em] uppercase text-slate group-hover:text-gold transition-colors duration-200 mb-3">
          {product.name}
        </h3>

        {product.description && (
          <p className="font-barlow text-[14px] text-slate/70 leading-[1.65] line-clamp-3 flex-1 mb-4">
            {typeof product.description === 'string' ? product.description : ''}
          </p>
        )}

        <div className="pt-4 flex items-end justify-between gap-4 mt-auto" style={{ borderTop: '1px solid #E6ECF1' }}>
          <div>
            <div className="font-condensed text-[10px] tracking-[0.18em] uppercase text-slate/45 mb-1">Price</div>
            {product.hasVariants && product.priceRange ? (
              <div className="font-display text-[18px] tracking-[0.04em] uppercase text-slate">TZS {product.priceRange}</div>
            ) : product.price ? (
              <div className="font-display text-[18px] tracking-[0.04em] uppercase text-slate">{formatCurrency(product.price)}</div>
            ) : (
              <div className="font-condensed text-[12px] tracking-[0.12em] uppercase text-slate/50">Contact for price</div>
            )}
          </div>

          <Link
            href={enquireHref}
            className="shrink-0 px-5 py-2.5 bg-gold text-white font-condensed text-[12px] tracking-[0.18em] uppercase font-semibold hover:bg-gold-dim transition-colors duration-200"
          >
            Enquire
          </Link>
        </div>
      </div>
    </div>
  )
}
