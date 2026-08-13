import { defineType, defineField } from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Products',
  type: 'document',
  icon: () => '📦',
  fields: [
    defineField({ name: 'name', title: 'Product Name', type: 'string' }),

    defineField({ name: 'nameSw', title: 'Product Name — Kiswahili', type: 'string', description: 'Leave blank to fall back to the English text.' }),
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

    defineField({ name: 'descriptionSw', title: 'Description — Kiswahili', type: 'text', rows: 3, description: 'Leave blank to fall back to the English text.' }),
    defineField({ name: 'inStock', title: 'In Stock', type: 'boolean', initialValue: true }),
    defineField({ name: 'hasVariants', title: 'Has Variants (use Price Range)', type: 'boolean', initialValue: false }),
    defineField({ name: 'grade', title: 'Steel Grade', type: 'string', description: 'e.g. "BS 500B" or "TMT Fe-500". Shown as a badge on the card.' }),
    defineField({ name: 'unit', title: 'Unit of Measure', type: 'string', description: 'e.g. "Per tonne", "Per bundle", "Per piece".' }),

    defineField({ name: 'unitSw', title: 'Unit of Measure — Kiswahili', type: 'string', description: 'Leave blank to fall back to the English text.' }),
    defineField({
      name: 'standards',
      title: 'Standards / Certifications',
      type: 'array',
      description: 'Badge labels shown on catalog cards. e.g. "TBS", "BS 500", "ISO 9001".',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: 'specSheet',
      title: 'Specification Sheet',
      type: 'array',
      description: 'Key-value pairs for the spec table (e.g. "Yield Strength" / "500 MPa").',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'key', title: 'Property', type: 'string' }),
          defineField({ name: 'value', title: 'Value', type: 'string' }),
        ],
        preview: { select: { title: 'key', subtitle: 'value' } },
      }],
    }),
  ],
  preview: {
    select: { title: 'name', media: 'images.0', price: 'price' },
    prepare({ title, media, price }) {
      return { title, media, subtitle: price ? `TZS ${price.toLocaleString()}` : 'See price range' }
    },
  },
})
