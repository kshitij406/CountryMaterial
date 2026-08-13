'use client'

import type { ProductCategory } from '@/types'

interface CategoryFilterProps {
  categories: ProductCategory[]
  active: string
  onSelect: (category: string) => void
  /** Display label for the "all categories" chip; the filter value stays ALL_VALUE. */
  allLabel: string
}

/** Stable sentinel — never translated, so filtering keeps working in any language. */
export const ALL_VALUE = '__all__'

const ALL: ProductCategory = { _id: 'all', name: ALL_VALUE, slug: { current: 'all' } }

export default function CategoryFilter({ categories, active, onSelect, allLabel }: CategoryFilterProps) {
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
                ? 'bg-gold text-white font-semibold'
                : 'text-slate/70 hover:text-slate bg-white'
            }`}
            style={{ border: isActive ? '1px solid #C8962E' : '1px solid #E8DED1' }}
          >
            {cat.name === ALL_VALUE ? allLabel : cat.name}
          </button>
        )
      })}
    </div>
  )
}
