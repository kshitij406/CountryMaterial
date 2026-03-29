import { defineType, defineField } from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Products',
  type: 'document',
  icon: () => '📦',
  fields: [
    defineField({ name: 'name', title: 'Product Name', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name', maxLength: 96 } }),
    defineField({ name: 'price', title: 'Price (TZS)', type: 'number' }),
    defineField({ name: 'priceRange', title: 'Price Range (for variants, e.g. "11,666 – 120,000")', type: 'string' }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'productCategory' }],
    }),
    defineField({
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'inStock', title: 'In Stock', type: 'boolean', initialValue: true }),
    defineField({ name: 'hasVariants', title: 'Has Variants (use Price Range)', type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: { title: 'name', media: 'images.0', price: 'price' },
    prepare({ title, media, price }) {
      return { title, media, subtitle: price ? `TZS ${price.toLocaleString()}` : 'See price range' }
    },
  },
})
