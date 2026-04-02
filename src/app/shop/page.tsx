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
    description:
      'Standard gypsum wallboard for interior partitions, ceilings, and dry-wall systems. Available in standard sheet sizes.',
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
    description:
      'High-grade marine plywood engineered for moisture resistance. Ideal for formwork, flooring, and demanding construction environments.',
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
    description:
      'British Standard BS 500 compliant high-tensile deformed steel bars for structural reinforcement. Available in multiple diameters from 6mm to 32mm.',
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
  const shopTitle = settings?.shopPageTitle ?? `Quality Materials from ${company}`
  const shopSubtitle =
    settings?.shopPageSubtitle ??
    'Browse our full range of construction materials, steel products, and hardware supplies. All prices in Tanzanian Shillings.'

  return (
    <>
      {/* Shop-specific header: cream bg with oversized "CATALOG" watermark */}
      <section className="relative bg-cream overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/noise.svg')] opacity-[0.02] pointer-events-none" />
        {/* Oversized watermark */}
        <div className="absolute inset-0 flex items-center justify-end pr-6 lg:pr-10 pointer-events-none select-none overflow-hidden">
          <span className="font-heading text-[5rem] sm:text-[8rem] lg:text-[14rem] leading-none text-navy/5 tracking-tight">
            CATALOG
          </span>
        </div>
        <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/70 to-transparent`} />
        <div className="relative max-w-container mx-auto px-6 lg:px-10 py-12 md:py-20 lg:py-28">
          <span className="inline-flex items-center gap-2.5 font-body text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-5">
            <span className="block h-px w-8 bg-gold" />
            Product Catalog
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-navy leading-tight max-w-2xl">
            {shopTitle}
          </h1>
          <p className="mt-5 font-body text-lg text-slate/65 max-w-xl leading-relaxed">
            {shopSubtitle}
          </p>
        </div>
      </section>

      <section className="bg-cream py-section">
        <div className="max-w-container mx-auto px-6 lg:px-10">

          {/* Catalog-only notice */}
          <div className="bg-gold/10 border border-gold/30 px-6 py-4 mb-10 flex items-center gap-4">
            <span className="text-gold text-lg shrink-0">ℹ</span>
            <p className="font-body text-sm text-navy/80">
              This is a display catalog. To place an order or request a bulk quotation, please{' '}
              <a href="/contact" className="text-gold hover:underline font-semibold">
                contact us directly
              </a>
              .
            </p>
          </div>

          <ProductGrid products={products} categories={categories} />
        </div>
      </section>

      <CtaBanner
        heading="Need a Bulk Order or Custom Quote?"
        subtext="We supply to contractors, developers, and businesses at competitive wholesale prices. Get in touch for project-specific pricing."
        primaryLabel="Request a Quote"
        primaryHref="/contact"
        secondaryLabel="Our Services"
        secondaryHref="/services"
      />
    </>
  )
}
