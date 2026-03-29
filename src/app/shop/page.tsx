import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { allProductsQuery, productCategoriesQuery } from '@/sanity/lib/queries'
import PageHeader from '@/components/ui/PageHeader'
import ShopClient from '@/components/sections/ShopClient'
import CtaBanner from '@/components/sections/CtaBanner'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Online Shop',
  description:
    'Browse construction materials, steel products, and hardware supplies from Country Materials Ltd. Prices in Tanzanian Shillings.',
}

const fallbackProducts = [
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

export default async function ShopPage() {
  const [products, categories] = await Promise.all([
    client.fetch(allProductsQuery).catch(() => null),
    client.fetch(productCategoriesQuery).catch(() => null),
  ])

  const displayProducts = products?.length ? products : fallbackProducts
  const categoryNames: string[] = categories?.length
    ? categories.map((c: any) => c.name)
    : ['Building Materials', 'Steel & Metals']

  return (
    <>
      <PageHeader
        label="Product Catalog"
        title="Quality Materials at Competitive Prices"
        subtitle="Browse our full range of construction materials, steel products, and hardware supplies. All prices in Tanzanian Shillings."
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

          <ShopClient products={displayProducts} categoryNames={categoryNames} />
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
