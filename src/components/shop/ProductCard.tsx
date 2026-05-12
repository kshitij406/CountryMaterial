import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images?.[0]?.asset?.url
  const slug = product.slug?.current ?? 'catalog-item'
  const enquireHref = `/contact?product=${slug}`

  const displayPrice = product.priceRange
    ? `TZS ${product.priceRange}`
    : product.price
    ? `TZS ${product.price.toLocaleString()}`
    : null

  return (
    <div
      className="group flex flex-col overflow-hidden border transition-all duration-300 cursor-default"
      style={{ background: '#FAF7F2', borderColor: '#E8DED1' }}
    >

      {/* Image panel */}
      <div className="relative h-52 overflow-hidden flex-shrink-0" style={{ background: '#0B1D3A' }}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 48 48" fill="none" className="w-14 h-14 text-white/10" stroke="currentColor" strokeWidth="1.5">
              <rect x="6" y="18" width="36" height="8" rx="4"/><rect x="6" y="28" width="36" height="8" rx="4"/><rect x="6" y="8" width="36" height="8" rx="4"/>
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />

        {product.grade && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-navy/80 border border-gold/40 text-gold text-[10px] font-bold tracking-wide font-mono">
            {product.grade}
          </span>
        )}
        {product.category && (
          <span className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 text-ink text-[10px] font-semibold">
            {product.category.name}
          </span>
        )}
        <div className="absolute bottom-3 left-3">
          <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 border ${
            product.inStock !== false
              ? 'bg-emerald-DEFAULT/20 border-emerald-DEFAULT/40 text-emerald-DEFAULT'
              : 'bg-white/10 border-white/20 text-white/50'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${product.inStock !== false ? 'bg-emerald-DEFAULT' : 'bg-white/30'}`} />
            {product.inStock !== false ? 'In stock' : 'Contact us'}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-[16px] font-black text-ink leading-snug group-hover:text-gold-dark transition-colors duration-200">
          {product.name}
        </h3>

        {product.standards && product.standards.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {product.standards.map((std) => (
              <span key={std} className="text-[10px] font-semibold px-2.5 py-0.5 border border-gold/30 text-gold-dark tracking-wider uppercase">
                {std}
              </span>
            ))}
          </div>
        )}

        {product.description && (
          <p className="mt-3 text-[13px] text-slate/65 leading-relaxed line-clamp-2 flex-1">
            {typeof product.description === 'string' ? product.description : ''}
          </p>
        )}

        {product.specSheet && product.specSheet.length > 0 && (
          <div className="mt-3 pt-3 flex flex-col gap-1.5" style={{ borderTop: '1px solid #E8DED1' }}>
            {product.specSheet.slice(0, 2).map((spec) => (
              <div key={spec.key} className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold text-slate/50 uppercase tracking-wider">{spec.key}</span>
                <span className="font-mono text-[11px] text-slate/70">{spec.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Price + CTA */}
        <div className="mt-4 pt-4 flex items-end justify-between gap-3" style={{ borderTop: '1px solid #E8DED1' }}>
          <div>
            {product.unit && (
              <p className="text-[10px] font-semibold text-slate/40 uppercase tracking-wider mb-0.5">{product.unit}</p>
            )}
            {displayPrice ? (
              <p className="text-[15px] font-bold text-ink">{displayPrice}</p>
            ) : (
              <p className="text-[13px] font-semibold text-gold-dark">Contact for pricing</p>
            )}
          </div>
          <Link
            href={enquireHref}
            className="flex-shrink-0 inline-flex items-center gap-1 bg-gold hover:bg-gold-light text-white text-[12px] font-semibold px-4 py-2.5 transition-colors duration-200 cursor-pointer"
          >
            Enquire
          </Link>
        </div>
      </div>
    </div>
  )
}
