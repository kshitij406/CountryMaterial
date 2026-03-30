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
        <div className="text-center py-20">
          <p className="font-heading text-2xl text-navy/40">No products in this category yet.</p>
        </div>
      )}
    </>
  )
}
