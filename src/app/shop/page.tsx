'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import PageHeader from '@/components/ui/PageHeader'
import { formatCurrency } from '@/lib/utils'
import CtaBanner from '@/components/sections/CtaBanner'
import SectionLabel from '@/components/ui/SectionLabel'

const categories = ['All', 'Building Materials', 'Steel & Metals', 'Paints & Finishes']

const products = [
  {
    id: '1',
    name: 'Gypsum Board',
    category: 'Building Materials',
    price: 13000,
    priceRange: null,
    hasVariants: false,
    inStock: true,
    description: 'Standard gypsum wallboard for interior partitions, ceilings, and dry-wall systems. Available in standard sheet sizes.',
    unit: 'per sheet',
  },
  {
    id: '2',
    name: 'Marine Board',
    category: 'Building Materials',
    price: 38000,
    priceRange: null,
    hasVariants: false,
    inStock: true,
    description: 'High-grade marine plywood engineered for moisture resistance. Ideal for formwork, flooring, and demanding construction environments.',
    unit: 'per sheet',
  },
  {
    id: '3',
    name: 'High Tensile Reinforcement Bars BS 500',
    category: 'Steel & Metals',
    price: null,
    priceRange: '11,666 – 120,000',
    hasVariants: true,
    inStock: true,
    description: 'British Standard BS 500 compliant high-tensile deformed steel bars for structural reinforcement. Available in multiple diameters from 6mm to 32mm.',
    unit: 'per bar (varies by diameter)',
  },
]

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [inquiryProduct, setInquiryProduct] = useState<string | null>(null)

  const filtered = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category === activeCategory)

  return (
    <>
      <PageHeader
        label="Product Catalog"
        title="Quality Materials at Competitive Prices"
        subtitle="Browse our full range of construction materials, steel products, and hardware supplies. All prices in Tanzanian Shillings."
      />

      <section className="bg-cream py-section">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          {/* Note banner */}
          <div className="bg-gold/10 border border-gold/30 px-6 py-4 mb-10 flex items-center gap-4">
            <span className="text-gold text-lg shrink-0">ℹ</span>
            <p className="font-body text-sm text-navy/80">
              This is a display catalog. To place an order or request a bulk quotation, please{' '}
              <a href="/contact" className="text-gold hover:underline font-semibold">contact us directly</a>.
            </p>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-3 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-body text-sm px-5 py-2.5 border transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-navy text-white border-navy'
                    : 'bg-white text-slate border-sand hover:border-navy hover:text-navy'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-sand hover:border-gold/40 hover:shadow-xl hover:shadow-navy/8 transition-all duration-400 group"
              >
                {/* Image placeholder */}
                <div className="relative h-52 bg-navy/5 flex items-center justify-center overflow-hidden">
                  <span className="font-heading text-8xl text-navy/10 select-none">{product.name[0]}</span>
                  <span className="absolute top-3 left-3 font-body text-xs bg-navy text-gold px-3 py-1 tracking-wider uppercase">
                    {product.category}
                  </span>
                  {product.inStock ? (
                    <span className="absolute top-3 right-3 font-body text-xs bg-green-700 text-white px-2.5 py-1">
                      In Stock
                    </span>
                  ) : (
                    <span className="absolute top-3 right-3 font-body text-xs bg-slate/60 text-white px-2.5 py-1">
                      Out of Stock
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="font-heading text-xl text-navy mb-2 group-hover:text-gold transition-colors duration-200">
                    {product.name}
                  </h3>
                  <p className="font-body text-sm text-slate/70 leading-relaxed mb-4 line-clamp-3">
                    {product.description}
                  </p>

                  <div className="pt-4 border-t border-sand flex items-end justify-between gap-4">
                    <div>
                      <div className="font-body text-xs text-slate/50 mb-1 uppercase tracking-wide">Price</div>
                      {product.hasVariants && product.priceRange ? (
                        <div className="font-heading text-lg text-navy">
                          TZS {product.priceRange} /=
                        </div>
                      ) : product.price ? (
                        <div className="font-heading text-lg text-navy">
                          {formatCurrency(product.price)} /=
                        </div>
                      ) : null}
                      {product.unit && (
                        <div className="font-body text-xs text-slate/50 mt-0.5">{product.unit}</div>
                      )}
                    </div>
                    <a
                      href={`mailto:info@countrymaterial.com?subject=Product Inquiry: ${encodeURIComponent(product.name)}`}
                      className="shrink-0 px-5 py-2.5 bg-gold hover:bg-gold-light text-navy font-body text-xs font-semibold tracking-wide transition-colors duration-200"
                    >
                      Inquire
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="font-heading text-2xl text-navy/40">No products in this category yet.</p>
            </div>
          )}
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
