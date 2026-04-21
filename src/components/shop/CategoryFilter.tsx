'use client'

import type { ProductCategory } from '@/types'

interface CategoryFilterProps {
  categories: ProductCategory[]
  active: string
  onSelect: (category: string) => void
}

const ALL: ProductCategory = { _id: 'all', name: 'All', slug: { current: 'all' } }

export default function CategoryFilter({ categories, active, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-10">
      {[ALL, ...categories].map((cat) => {
        const isActive = active === cat.name
        return (
          <button
            key={cat._id}
            onClick={() => onSelect(cat.name)}
            className={`font-condensed text-[12px] tracking-[0.18em] uppercase px-5 py-2.5 transition-all duration-200 ${
              isActive
                ? 'bg-gold text-navy font-semibold'
                : 'text-cream/60 hover:text-cream'
            }`}
            style={{ border: isActive ? '1px solid #C8962E' : '1px solid rgba(200,150,46,.25)' }}
          >
            {cat.name}
          </button>
        )
      })}
    </div>
  )
}
