import { defineType, defineField } from 'sanity'

export const productCategory = defineType({
  name: 'productCategory',
  title: 'Product Categories',
  type: 'document',
  icon: () => '🏷️',
  fields: [
    defineField({ name: 'name', title: 'Category Name', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name', maxLength: 96 } }),
  ],
  preview: {
    select: { title: 'name' },
  },
})
