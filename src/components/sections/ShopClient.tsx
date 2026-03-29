'use client'

import { useState } from 'react'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'

export interface ShopProduct {
  _id: string
  name: string
  slug: { current: string }
  price?: number | null
  priceRange?: string | null
  hasVariants?: boolean
  inStock?: boolean
  description?: string
  images?: Array<{ asset?: { url?: string } }>
  category?: { name: string; slug: { current: string } }
}

interface ShopClientProps {
  products: ShopProduct[]
  categoryNames: string[]
}

export default function ShopClient({ products, categoryNames }: ShopClientProps) {
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', ...categoryNames]

  const filtered =
    activeCategory === 'All'
      ? products
      : products.filter((p) => p.category?.name === activeCategory)

  return (
    <>
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
            key={product._id}
            className="bg-white border border-sand hover:border-gold/40 hover:shadow-xl hover:shadow-navy/8 transition-all duration-400 group"
          >
            {/* Image */}
            <div className="relative h-52 bg-navy/5 flex items-center justify-center overflow-hidden">
              {product.images?.[0]?.asset?.url ? (
                <img
                  src={product.images[0].asset!.url}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <span className="font-heading text-8xl text-navy/10 select-none">
                  {product.name[0]}
                </span>
              )}
              {product.category && (
                <span className="absolute top-3 left-3 font-body text-xs bg-navy text-gold px-3 py-1 tracking-wider uppercase">
                  {product.category.name}
                </span>
              )}
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
              {product.description && (
                <p className="font-body text-sm text-slate/70 leading-relaxed mb-4 line-clamp-3">
                  {product.description}
                </p>
              )}

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
    </>
  )
}
