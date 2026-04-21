import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { allProductsQuery, allProductCategoriesQuery, siteSettingsQuery } from '@/sanity/lib/queries'
import type { Product, ProductCategory } from '@/types'
import ProductGrid from '@/components/shop/ProductGrid'
import CtaBanner from '@/components/sections/CtaBanner'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch(siteSettingsQuery).catch(() => null)
  const company = settings?.companyName ?? 'Country Materials'
  return {
    title: 'Product Catalog',
    description: `Browse construction materials, steel products, and hardware supplies from ${company}. Prices in Tanzanian Shillings.`,
  }
}

const fallbackProducts: Product[] = [
  {
    _id: 'fallback-1',
    name: 'Gypsum Board',
    slug: { current: 'gypsum-board' },
    price: 13000,
    priceRange: null,
    hasVariants: false,
    inStock: true,
    description: 'Standard gypsum wallboard for interior partitions, ceilings, and dry-wall systems. Available in standard sheet sizes.',
    images: [],
    category: { name: 'Building Materials', slug: { current: 'building-materials' } },
  },
  {
    _id: 'fallback-2',
    name: 'Marine Board',
    slug: { current: 'marine-board' },
    price: 38000,
    priceRange: null,
    hasVariants: false,
    inStock: true,
    description: 'High-grade marine plywood engineered for moisture resistance. Ideal for formwork, flooring, and demanding construction environments.',
    images: [],
    category: { name: 'Building Materials', slug: { current: 'building-materials' } },
  },
  {
    _id: 'fallback-3',
    name: 'High Tensile Reinforcement Bars BS 500',
    slug: { current: 'rebar-bs500' },
    price: null,
    priceRange: '11,666 – 120,000',
    hasVariants: true,
    inStock: true,
    description: 'British Standard BS 500 compliant high-tensile deformed steel bars for structural reinforcement. Available in multiple diameters from 6mm to 32mm.',
    images: [],
    category: { name: 'Steel & Metals', slug: { current: 'steel-metals' } },
  },
]

const fallbackCategories: ProductCategory[] = [
  { _id: 'fc-1', name: 'Building Materials', slug: { current: 'building-materials' } },
  { _id: 'fc-2', name: 'Steel & Metals', slug: { current: 'steel-metals' } },
]

export default async function ShopPage() {
  const [rawProducts, rawCategories, settings] = await Promise.all([
    client.fetch(allProductsQuery).catch(() => null),
    client.fetch(allProductCategoriesQuery).catch(() => null),
    client.fetch(siteSettingsQuery).catch(() => null),
  ])

  const products: Product[] = rawProducts?.length ? rawProducts : fallbackProducts
  const categories: ProductCategory[] = rawCategories?.length ? rawCategories : fallbackCategories

  const company = settings?.companyName ?? 'Country Materials'
  const shopTitle = settings?.shopPageTitle ?? `Quality Materials\nfrom ${company}`
  const shopSubtitle =
    settings?.shopPageSubtitle ??
    'Browse our full range of construction materials, steel products, and hardware supplies. All prices in Tanzanian Shillings.'

  const titleLines = shopTitle.split('\n')

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden pt-[160px] pb-[100px] px-8 lg:px-16"
        style={{ background: '#05101f', borderBottom: '1px solid rgba(200,150,46,.2)' }}
      >
        <div aria-hidden className="grain-overlay absolute inset-0 pointer-events-none z-0" />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'repeating-linear-gradient(90deg,transparent 0 120px,rgba(200,150,46,.04) 120px 121px)' }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 80% 40%,rgba(200,150,46,.12),transparent 55%)' }}
        />
        {/* Watermark */}
        <div aria-hidden className="absolute inset-0 flex items-center justify-end pr-8 lg:pr-16 pointer-events-none select-none overflow-hidden">
          <span className="font-display text-[8rem] lg:text-[14rem] leading-none text-gold/[0.06] tracking-tight">CATALOG</span>
        </div>

        <div className="relative max-w-[1440px] mx-auto">
          <div className="flex items-center gap-3.5 mb-7">
            <span className="block h-px w-10 bg-gold" />
            <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold">Product Catalog</span>
          </div>
          <h1 className="font-display text-[clamp(48px,7vw,112px)] leading-[0.9] tracking-[0.03em] uppercase text-cream max-w-4xl">
            {titleLines.map((line: string, i: number) => (
              <span key={i} className="block">
                {i === titleLines.length - 1 ? <span className="text-gold">{line}</span> : line}
              </span>
            ))}
          </h1>
          <p className="mt-8 font-barlow text-[17px] text-cream/55 max-w-xl leading-[1.65]">{shopSubtitle}</p>
        </div>
      </section>

      {/* Products */}
      <section
        className="relative py-[120px] px-8 lg:px-16"
        style={{ background: '#0B1D3A', borderBottom: '1px solid rgba(200,150,46,.15)' }}
      >
        <div className="max-w-[1440px] mx-auto">
          {/* Catalog-only notice */}
          <div
            className="flex items-center gap-4 px-6 py-4 mb-12 reveal"
            style={{ border: '1px solid rgba(200,150,46,.3)', background: 'rgba(200,150,46,.06)' }}
          >
            <div className="text-gold text-lg shrink-0">ℹ</div>
            <p className="font-barlow text-[14px] text-cream/60">
              This is a display catalog. To place an order or request a bulk quotation, please{' '}
              <a href="/contact" className="text-gold hover:underline">contact us directly</a>.
            </p>
          </div>

          <ProductGrid products={products} categories={categories} />
        </div>
      </section>

      <CtaBanner
        heading="Need a Bulk Order\nor Custom Quote?"
        subtext="We supply to contractors, developers, and businesses at competitive wholesale prices. Get in touch for project-specific pricing."
        primaryLabel="Request a Quote"
        primaryHref="/contact"
        secondaryLabel="Our Services"
        secondaryHref="/services"
      />
    </>
  )
}
