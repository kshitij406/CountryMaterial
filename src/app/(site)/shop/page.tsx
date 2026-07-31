import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { allProductsQuery, allProductCategoriesQuery, allServicesQuery, getSiteSettings } from '@/sanity/lib/queries'
import type { Product, ProductCategory } from '@/types'
import ProductGrid from '@/components/shop/ProductGrid'
import { buildMetadata } from '@/lib/metadata'

export const revalidate = 60

export const metadata: Metadata = buildMetadata({
  title: 'Products & Services | Country Materials Ltd',
  description:
    'Browse BS 500B-certified TMT rebar, steel billets, hardware and the full range of services from Country Materials Ltd. Request pricing and bulk delivery across Tanzania.',
  path: '/shop',
})

const SERVICES_FALLBACK = [
  { _id: 's1', slug: { current: 'waste-management' }, title: 'Scrap Collection & Recycling', excerpt: "Tanzania's largest organised scrap collection network — verified daily through our mobile platform.", icon: 'waste', cardImageUrl: '/images/company/wastee.jpg', specChips: ['5,000+ vendors', 'Nationwide pickup'] },
  { _id: 's2', slug: { current: 'steel' }, title: 'Certified Steel Manufacturing', excerpt: 'Electric arc furnace technology producing BS 500-certified TMT rebar and billets.', icon: 'steel', cardImageUrl: '/images/randos/molten_steel.jpeg', specChips: ['BS 500B certified', 'Lab-tested batches'] },
  { _id: 's3', slug: { current: 'hardware' }, title: 'Vendor Platform & Procurement', excerpt: 'A mobile platform connecting scrap vendors, construction clients and our operations.', icon: 'hardware', cardImageUrl: '/images/company/hardware.jpg', specChips: ['Real-time pricing', 'Digital payments'] },
  { _id: 's4', slug: { current: 'transportation' }, title: 'Fleet Logistics & Distribution', excerpt: '30+ in-house trucks operating 24 hours across 5 regional branches.', icon: 'logistics', cardImageUrl: '/images/company/trans-large.jpg', specChips: ['30+ owned vehicles', 'Same-day dispatch'] },
]

export default async function ShopPage() {
  const [rawProducts, rawCategories, rawServices, siteSettings] = await Promise.all([
    client.fetch(allProductsQuery).catch(() => null),
    client.fetch(allProductCategoriesQuery).catch(() => null),
    client.fetch(allServicesQuery).catch(() => null),
    getSiteSettings().catch(() => null),
  ])

  const products: Product[] = rawProducts?.length ? rawProducts : []
  const categories: ProductCategory[] = rawCategories?.length ? rawCategories : []
  const services = rawServices?.length ? rawServices : SERVICES_FALLBACK

  const catalogUrl = siteSettings?.erpIntegration?.catalogUrl ?? null
  const catalogLabel = siteSettings?.erpIntegration?.catalogLabel ?? 'View Price List'

  return (
    <>
      {/* Compact marketplace header */}
      <section className="relative overflow-hidden pt-[110px] pb-[56px] px-8 lg:px-16 bg-navy" style={{ borderBottom: '1px solid rgba(216,224,231,.4)' }}>
        <div className="absolute inset-0 bg-steel-texture opacity-40" aria-hidden="true" />
        <div className="relative max-w-[1440px] mx-auto">
          <div className="flex items-center gap-3.5 mb-6">
            <span className="block h-px w-10 bg-gold" />
            <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-white/90">Products &amp; Services</span>
          </div>
          <h1 className="font-display text-[clamp(38px,6vw,84px)] leading-[0.9] tracking-[0.03em] uppercase text-white max-w-4xl">
            Everything we <span className="text-gold-light">supply and do</span>
          </h1>
          <p className="mt-6 font-barlow text-[16px] text-white/75 max-w-2xl leading-[1.65]">
            BS 500-grade steel, hardware and materials — plus the collection, manufacturing and logistics services behind them.
          </p>
        </div>
      </section>

      {/* ERP catalog banner */}
      {catalogUrl && (
        <div style={{ background: '#07121F', borderBottom: '1px solid rgba(200,150,46,0.2)' }}>
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-8 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-10">
            <div className="flex-1 min-w-0">
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase mb-1" style={{ color: '#C8962E' }}>ERP Price List</p>
              <p className="text-[13.5px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Our full product catalog with current pricing is available via our ERP system, updated weekly.
              </p>
            </div>
            <a
              href={catalogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2 font-bold text-[13px] px-6 py-3 transition-colors duration-200"
              style={{ background: '#C8962E', color: '#07121F' }}
            >
              {catalogLabel}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
            </a>
          </div>
        </div>
      )}

      {/* Products marketplace grid */}
      <section id="products" className="relative py-[80px] px-8 lg:px-16 bg-charcoal" style={{ borderBottom: '1px solid #D8E0E7' }}>
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-8 mb-10 reveal">
            <div>
              <div className="flex items-center gap-3.5 mb-5">
                <span className="block h-px w-10 bg-gold" />
                <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold">Catalogue</span>
              </div>
              <h2 className="font-display text-[clamp(32px,4vw,56px)] leading-[0.9] tracking-[0.03em] uppercase text-white">
                Products
              </h2>
            </div>
            <span className="font-space text-[12px] text-gold/70 tracking-[0.2em]">{`// ${products.length} ITEMS`}</span>
          </div>

          <div className="reveal">
            <ProductGrid products={products} categories={categories} />
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section id="services" className="relative py-[80px] px-8 lg:px-16 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-8 mb-10 reveal">
            <div>
              <div className="flex items-center gap-3.5 mb-5">
                <span className="block h-px w-10 bg-gold" />
                <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold">What We Do</span>
              </div>
              <h2 className="font-display text-[clamp(32px,4vw,56px)] leading-[0.9] tracking-[0.03em] uppercase text-slate">
                Services
              </h2>
            </div>
            <span className="font-space text-[12px] text-gold/70 tracking-[0.2em]">{`// ${services.length} SERVICES`}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 stagger">
            {services.map((svc: any) => (
              <Link
                key={svc._id}
                href={`/services/${svc.slug.current}`}
                className="group flex flex-col overflow-hidden border transition-all duration-300 hover:shadow-lg"
                style={{ background: '#FAF7F2', borderColor: '#E8DED1' }}
              >
                <div className="relative h-40 overflow-hidden flex-shrink-0" style={{ background: '#0B1D3A' }}>
                  {svc.cardImageUrl ? (
                    <Image
                      src={svc.cardImageUrl}
                      alt={svc.title}
                      fill
                      className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-[48px] text-gold/20">◈</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-[15px] font-black text-ink leading-snug group-hover:text-gold-dark transition-colors duration-200 mb-2">
                    {svc.title}
                  </h3>
                  {svc.excerpt && (
                    <p className="text-[13px] text-slate/65 leading-relaxed line-clamp-3 flex-1">{svc.excerpt}</p>
                  )}
                  {svc.specChips && svc.specChips.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {svc.specChips.slice(0, 2).map((chip: string) => (
                        <span key={chip} className="text-[10px] font-semibold px-2.5 py-0.5 border border-gold/30 text-gold-dark tracking-wider uppercase">
                          {chip}
                        </span>
                      ))}
                    </div>
                  )}
                  <span className="mt-4 pt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold text-gold-dark group-hover:gap-2.5 transition-all duration-200" style={{ borderTop: '1px solid #E8DED1' }}>
                    Learn more
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quote CTA */}
      <section className="py-20 sm:py-24 text-center relative overflow-hidden" style={{ background: '#0B1D3A' }} aria-label="Quote call to action">
        <div className="absolute inset-0 bg-steel-texture" aria-hidden="true" />
        <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-2xl mx-auto reveal">
            <h2 className="font-black text-[clamp(28px,4vw,56px)] text-white leading-tight mb-5">
              Need bulk pricing<br />or a custom quote?
            </h2>
            <p className="text-[15px] text-white/45 mb-10 leading-relaxed max-w-md mx-auto">
              We supply contractors, developers, and businesses at competitive wholesale prices. Our team responds within 24 hours.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold text-[15px] px-8 py-4 transition-colors duration-200 cursor-pointer">
                Request a Quote
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
              </Link>
              <a href="tel:+255768500555" className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold text-[15px] px-8 py-4 transition-all duration-200 cursor-pointer">
                +255 768 500 555
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
