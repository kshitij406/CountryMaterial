import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/types'
import CopyLinkButton from '@/components/shop/CopyLinkButton'
import { localePath, type Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n'

interface ProductCardProps {
  product: Product
  locale: Locale
  t: Dictionary['productCard']
}

export default function ProductCard({ product, locale, t }: ProductCardProps) {
  const imageUrl = product.images?.[0]?.asset?.url
  const slug = product.slug?.current ?? 'catalog-item'
  const productPath = localePath(locale, `/shop/${slug}`)

  const displayPrice = product.priceRange
    ? `TZS ${product.priceRange}`
    : product.price
    ? `TZS ${product.price.toLocaleString()}`
    : null

  return (
    <div
      className="group flex flex-col overflow-hidden border transition-all duration-300 hover:shadow-lg"
      style={{ background: '#FAF7F2', borderColor: '#E8DED1' }}
    >
      <Link href={productPath} className="contents cursor-pointer">
      {/* Image panel */}
      <div className="relative h-52 overflow-hidden flex-shrink-0" style={{ background: '#0B1D3A' }}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
            {product.inStock !== false ? t.inStock : t.contactUs}
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

        {/* Price */}
        <div className="mt-4 pt-4" style={{ borderTop: '1px solid #E8DED1' }}>
          {product.unit && (
            <p className="text-[10px] font-semibold text-slate/40 uppercase tracking-wider mb-0.5">{product.unit}</p>
          )}
          {displayPrice ? (
            <p className="text-[15px] font-bold text-ink">{displayPrice}</p>
          ) : (
            <p className="text-[13px] font-semibold text-gold-dark">{t.contactForPricing}</p>
          )}
        </div>
      </div>
      </Link>

      {/* Buy Now + Copy Link */}
      <div className="px-5 pb-5 grid grid-cols-2 gap-2.5">
        <button
          type="button"
          disabled
          title={t.checkoutSoon}
          className="inline-flex items-center justify-center gap-1.5 bg-gold text-white text-[12px] font-semibold px-4 py-2.5 opacity-50 cursor-not-allowed"
        >
          {t.buyNow}
        </button>
        <CopyLinkButton
          path={productPath}
          label={t.copyLink}
          copiedLabel={t.copied}
          className="inline-flex items-center justify-center gap-1.5 border border-gold/40 text-gold-dark text-[12px] font-semibold px-4 py-2.5 transition-colors duration-200 hover:bg-gold/10 cursor-pointer"
        />
      </div>
    </div>
  )
}
