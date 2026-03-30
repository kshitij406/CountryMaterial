import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { allProductsQuery, allProductCategoriesQuery, siteSettingsQuery } from '@/sanity/lib/queries'
import type { Product, ProductCategory } from '@/types'
import PageHeader from '@/components/ui/PageHeader'
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
      <PageHeader
        label="Product Catalog"
        title={shopTitle}
        subtitle={shopSubtitle}
      />

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
