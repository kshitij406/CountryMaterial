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
      data-reveal
      className="bg-white border border-sand hover:border-gold/40 hover:shadow-xl hover:shadow-navy/8 transition-all duration-400 group flex flex-col"
    >
      {/* Image */}
      <div className="relative h-52 bg-navy/5 flex items-center justify-center overflow-hidden shrink-0">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <span className="font-heading text-8xl text-navy/10 select-none">
            {product.name[0]}
          </span>
        )}

        {/* Category badge */}
        {product.category && (
          <span className="absolute top-3 left-3 font-body text-xs bg-gold text-navy px-3 py-1 tracking-wider uppercase font-semibold">
            {product.category.name}
          </span>
        )}

        {/* Stock badge */}
        <span
          className={`absolute top-3 right-3 font-body text-xs px-2.5 py-1 ${
            product.inStock !== false
              ? 'bg-navy text-white'
              : 'bg-slate/60 text-white'
          }`}
        >
          {product.inStock !== false ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-heading text-xl text-navy mb-2 group-hover:text-gold transition-colors duration-200 leading-snug">
          {product.name}
        </h3>

        {product.description && (
          <p className="font-body text-sm text-slate/70 leading-relaxed mb-4 line-clamp-3 flex-1">
            {product.description}
          </p>
        )}

        <div className="pt-4 border-t border-sand flex items-end justify-between gap-4 mt-auto">
          {/* Price */}
          <div>
            <div className="font-body text-xs text-slate/50 mb-1 uppercase tracking-wide">Price</div>
            {product.hasVariants && product.priceRange ? (
              <div className="font-heading text-lg text-navy">TZS {product.priceRange} /=</div>
            ) : product.price ? (
              <div className="font-heading text-lg text-navy">{formatCurrency(product.price)} /=</div>
            ) : (
              <div className="font-heading text-sm text-slate/50 italic">Contact for price</div>
            )}
          </div>

          {/* Enquire CTA */}
          <Link
            href={enquireHref}
            className="shrink-0 px-5 py-2.5 bg-gold hover:bg-gold-light text-navy font-body text-xs font-semibold tracking-wide transition-colors duration-200"
          >
            Enquire
          </Link>
        </div>
      </div>
    </div>
  )
}
