'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useGsapStagger, useGsapFadeUp } from '@/components/animations/gsap-hooks'
import SectionLabel from '@/components/ui/SectionLabel'
import { formatCurrency } from '@/lib/utils'

const defaultProducts = [
  {
    _id: '1',
    name: 'Gypsum Board',
    slug: { current: 'gypsum-board' },
    price: 13000,
    priceRange: null,
    hasVariants: false,
    inStock: true,
    description: 'Standard gypsum wallboard for interior partitions and ceilings.',
    images: [],
    category: { name: 'Building Materials' },
  },
  {
    _id: '2',
    name: 'Marine Board',
    slug: { current: 'marine-board' },
    price: 38000,
    priceRange: null,
    hasVariants: false,
    inStock: true,
    description: 'High-grade marine plywood, moisture-resistant for demanding environments.',
    images: [],
    category: { name: 'Building Materials' },
  },
  {
    _id: '3',
    name: 'High Tensile Reinforcement Bars BS 500',
    slug: { current: 'rebar-bs500' },
    price: null,
    priceRange: '11,666 – 120,000',
    hasVariants: true,
    inStock: true,
    description: 'British Standard BS 500 compliant steel rebar for structural reinforcement.',
    images: [],
    category: { name: 'Steel & Metals' },
  },
]

interface Product {
  _id: string
  name: string
  slug: { current: string }
  price?: number | null
  priceRange?: string | null
  hasVariants?: boolean
  inStock?: boolean
  description?: string
  images?: Array<{ asset?: { url?: string } }>
  category?: { name: string }
}

export default function ProductsGrid({ products = defaultProducts, featured = true }: { products?: Product[]; featured?: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)

  useGsapFadeUp(headingRef)
  useGsapStagger(sectionRef, '.product-card', { stagger: 0.12 })

  const displayProducts = featured ? products.slice(0, 3) : products

  return (
    <section className="bg-cream py-section">
      <div className="max-w-container mx-auto px-6 lg:px-10">
        <div ref={headingRef} className="opacity-0 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <SectionLabel className="mb-4">Our Products</SectionLabel>
            <h2 className="font-heading text-4xl lg:text-5xl text-navy leading-tight">
              Quality Materials, Competitive Prices
            </h2>
          </div>
          <Link
            href="/shop"
            className="font-body text-sm text-gold hover:text-navy tracking-wide flex items-center gap-2 transition-colors duration-200 shrink-0"
          >
            Browse Full Catalog
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div ref={sectionRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayProducts.map((product, i) => (
            <div
              key={product._id}
              className="product-card opacity-0 bg-white border border-sand group hover:border-gold/40 hover:shadow-xl hover:shadow-navy/8 transition-all duration-400"
            >
              {/* Image area */}
              <div className="relative h-48 bg-navy/5 overflow-hidden">
                {product.images?.[0] ? (
                  <Image
                    src={(product.images[0] as { asset?: { url?: string } }).asset?.url ?? ''}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 border-2 border-sand flex items-center justify-center">
                      <span className="font-heading text-navy/20 text-2xl">{product.name[0]}</span>
                    </div>
                  </div>
                )}
                {product.category && (
                  <span className="absolute top-3 left-3 font-body text-xs bg-navy text-gold px-3 py-1 tracking-wider uppercase">
                    {product.category.name}
                  </span>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                    <span className="font-body text-sm text-slate/60 tracking-wide">Out of Stock</span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="font-heading text-lg text-navy mb-2 group-hover:text-gold transition-colors duration-200">
                  {product.name}
                </h3>
                {product.description && (
                  <p className="font-body text-sm text-slate/70 leading-relaxed mb-4 line-clamp-2">
                    {product.description}
                  </p>
                )}
                <div className="flex items-center justify-between pt-4 border-t border-sand">
                  <div>
                    {product.hasVariants && product.priceRange ? (
                      <span className="font-body text-sm font-semibold text-navy">
                        TZS {product.priceRange} /=
                      </span>
                    ) : product.price ? (
                      <span className="font-body text-sm font-semibold text-navy">
                        {formatCurrency(product.price)} /=
                      </span>
                    ) : null}
                  </div>
                  <Link
                    href={`/shop`}
                    className="font-body text-xs font-semibold tracking-widest uppercase text-gold hover:text-navy flex items-center gap-1.5 transition-colors duration-200"
                  >
                    View
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
