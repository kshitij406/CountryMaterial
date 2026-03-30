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
            className={`font-body text-sm px-5 py-2.5 border transition-all duration-200 ${
              isActive
                ? 'bg-gold text-navy border-gold font-semibold'
                : 'bg-white text-slate border-sand hover:border-navy hover:text-navy'
            }`}
          >
            {cat.name}
          </button>
        )
      })}
    </div>
  )
}
