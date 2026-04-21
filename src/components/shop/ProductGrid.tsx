'use client'

import { useState } from 'react'
import type { Product, ProductCategory } from '@/types'
import CategoryFilter from '@/components/shop/CategoryFilter'
import ProductCard from '@/components/shop/ProductCard'

interface ProductGridProps {
  products: Product[]
  categories: ProductCategory[]
}

export default function ProductGrid({ products, categories }: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered =
    activeCategory === 'All'
      ? products
      : products.filter((p) => p.category?.name === activeCategory)

  return (
    <>
      <CategoryFilter
        categories={categories}
        active={activeCategory}
        onSelect={setActiveCategory}
      />

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filtered.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20" style={{ border: '1px solid rgba(200,150,46,.2)' }}>
          <div className="font-display text-[48px] text-gold/20 mb-3">◈</div>
          <p className="font-barlow text-[15px] text-cream/40">No products in this category yet.</p>
        </div>
      )}
    </>
  )
}
