export interface Career {
  _id: string
  title: string
  slug: { current: string }
  department?: string
  location?: string
  employmentType?: string
  excerpt?: string
  description?: Array<{ _type: string; children?: Array<{ text: string }> }>
  requirements?: string[]
  closingDate?: string
  expired?: boolean
}

export interface ProductCategory {
  _id: string
  name: string
  slug: { current: string }
}

export interface Product {
  _id: string
  name: string
  slug: { current: string }
  price?: number | null
  priceRange?: string | null
  category?: { name: string; slug: { current: string } } | null
  images?: Array<{ asset?: { url: string } }> | null
  description?: string | null
  inStock?: boolean
  hasVariants?: boolean
  grade?: string | null
  unit?: string | null
  standards?: string[] | null
  specSheet?: Array<{ key: string; value: string }> | null
}
