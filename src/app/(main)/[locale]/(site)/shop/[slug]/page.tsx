import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { productBySlugQuery, allProductSlugsQuery } from '@/sanity/lib/queries'
import type { Product } from '@/types'
import CopyLinkButton from '@/components/shop/CopyLinkButton'
import { buildMetadata } from '@/lib/metadata'
import { getDictionary, isLocale, defaultLocale } from '@/i18n'
import { localePath } from '@/i18n/config'

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await client.fetch<Array<{ slug: string }>>(allProductSlugsQuery).catch(() => [])
  return slugs.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: string }
}): Promise<Metadata> {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale
  const t = getDictionary(locale).productDetail
  const product = await client.fetch<Product>(productBySlugQuery, { slug: params.slug, locale }).catch(() => null)
  if (!product) return { title: t.notFoundTitle }
  return buildMetadata({
    title: `${product.name} | Country Materials Ltd`,
    description: product.description ?? `${product.name} — ${t.metaFallback}`,
    path: `/shop/${params.slug}`,
    locale,
  })
}

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string; locale: string }
}) {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale
  const dict = getDictionary(locale)
  const t = dict.productDetail

  const product = await client.fetch<Product>(productBySlugQuery, { slug: params.slug, locale }).catch(() => null)
  if (!product) notFound()

  const productPath = localePath(locale, `/shop/${params.slug}`)
  const imageUrl = product.images?.[0]?.asset?.url
  const displayPrice = product.priceRange
    ? `TZS ${product.priceRange}`
    : product.price
    ? `TZS ${product.price.toLocaleString()}`
    : null

  return (
    <>
      {/* Breadcrumb bar */}
      <section className="relative pt-[110px] pb-8 px-8 lg:px-16 bg-navy" style={{ borderBottom: '1px solid rgba(216,224,231,.4)' }}>
        <div className="relative max-w-[1440px] mx-auto">
          <Link
            href={localePath(locale, '/shop')}
            className="inline-flex items-center gap-2 font-condensed text-[12px] tracking-[0.18em] uppercase text-white/55 hover:text-white/90 transition-colors"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            {t.allProducts}
          </Link>
        </div>
      </section>

      <section className="relative py-[70px] px-8 lg:px-16 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Image */}
            <div className="relative h-[340px] sm:h-[440px] lg:h-[520px] overflow-hidden" style={{ background: '#0B1D3A' }}>
              {imageUrl ? (
                <Image src={imageUrl} alt={product.name} fill className="object-cover opacity-90" sizes="(max-width: 1024px) 100vw, 50vw" priority />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 48 48" fill="none" className="w-20 h-20 text-white/10" stroke="currentColor" strokeWidth="1.5">
                    <rect x="6" y="18" width="36" height="8" rx="4" /><rect x="6" y="28" width="36" height="8" rx="4" /><rect x="6" y="8" width="36" height="8" rx="4" />
                  </svg>
                </div>
              )}
              {product.grade && (
                <span className="absolute top-5 left-5 px-3 py-1.5 bg-navy/80 border border-gold/40 text-gold text-[11px] font-bold tracking-wide font-mono">
                  {product.grade}
                </span>
              )}
              <span className={`absolute bottom-5 left-5 inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 border ${
                product.inStock !== false
                  ? 'bg-emerald-DEFAULT/20 border-emerald-DEFAULT/40 text-emerald-DEFAULT'
                  : 'bg-white/10 border-white/20 text-white/50'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${product.inStock !== false ? 'bg-emerald-DEFAULT' : 'bg-white/30'}`} />
                {product.inStock !== false ? dict.productCard.inStock : dict.productCard.contactUs}
              </span>
            </div>

            {/* Details */}
            <div>
              {product.category && (
                <span className="inline-block mb-4 px-3 py-1 bg-cream text-slate/70 text-[11px] font-semibold tracking-wider uppercase">
                  {product.category.name}
                </span>
              )}

              <h1 className="font-black text-[clamp(28px,3.5vw,44px)] leading-tight text-ink mb-4">
                {product.name}
              </h1>

              {product.standards && product.standards.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.standards.map((std) => (
                    <span key={std} className="text-[11px] font-semibold px-3 py-1 border border-gold/30 text-gold-dark tracking-wider uppercase">
                      {std}
                    </span>
                  ))}
                </div>
              )}

              {product.description && (
                <p className="text-[15px] text-slate/70 leading-relaxed mb-8 max-w-lg">{product.description}</p>
              )}

              <div className="pt-6 pb-6 mb-8" style={{ borderTop: '1px solid #E8DED1', borderBottom: '1px solid #E8DED1' }}>
                {product.unit && (
                  <p className="text-[11px] font-semibold text-slate/40 uppercase tracking-wider mb-1">{product.unit}</p>
                )}
                {displayPrice ? (
                  <p className="text-[30px] font-black text-ink">{displayPrice}</p>
                ) : (
                  <p className="text-[18px] font-semibold text-gold-dark">{dict.productCard.contactForPricing}</p>
                )}
              </div>

              {/* Buy Now + Copy Link */}
              <div className="grid grid-cols-2 gap-3 mb-10">
                <button
                  type="button"
                  disabled
                  title={dict.productCard.checkoutSoon}
                  className="inline-flex items-center justify-center gap-2 bg-gold text-white text-[14px] font-bold px-6 py-4 opacity-50 cursor-not-allowed"
                >
                  {dict.productCard.buyNow}
                </button>
                <CopyLinkButton
                  path={productPath}
                  label={dict.productCard.copyLink}
                  copiedLabel={dict.productCard.copied}
                  className="inline-flex items-center justify-center gap-2 border border-gold/40 text-gold-dark text-[14px] font-bold px-6 py-4 transition-colors duration-200 hover:bg-gold/10 cursor-pointer"
                />
              </div>

              {product.specSheet && product.specSheet.length > 0 && (
                <div>
                  <p className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold mb-4">{t.specifications}</p>
                  <div className="flex flex-col" style={{ border: '1px solid #E8DED1' }}>
                    {product.specSheet.map((spec, i) => (
                      <div
                        key={spec.key}
                        className="flex items-center justify-between gap-4 px-5 py-3"
                        style={{ background: i % 2 === 0 ? '#FAF7F2' : '#FFFFFF', borderTop: i === 0 ? 'none' : '1px solid #E8DED1' }}
                      >
                        <span className="text-[12px] font-semibold text-slate/55 uppercase tracking-wider">{spec.key}</span>
                        <span className="font-mono text-[13px] text-ink font-semibold">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-10">
                <Link
                  href={`${localePath(locale, '/contact')}?product=${params.slug}`}
                  className="inline-flex items-center gap-2 text-gold-dark hover:text-gold font-semibold text-[13px] border-b border-gold/40 hover:border-gold pb-0.5 transition-all duration-200"
                >
                  {t.enquire}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
