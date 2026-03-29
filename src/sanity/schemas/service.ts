import { defineType, defineField } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Services',
  type: 'document',
  icon: () => '🔧',
  fields: [
    defineField({ name: 'title', title: 'Service Title', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } }),
    defineField({ name: 'excerpt', title: 'Short Description', type: 'text', rows: 2 }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'contentSections',
      title: 'Content Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'heading', title: 'Section Heading', type: 'string' }),
            defineField({
              name: 'body',
              title: 'Section Body',
              type: 'array',
              of: [{ type: 'block' }],
            }),
            defineField({
              name: 'image',
              title: 'Section Image',
              type: 'image',
              options: { hotspot: true },
            }),
          ],
          preview: { select: { title: 'heading' } },
        },
      ],
    }),
    defineField({ name: 'displayOrder', title: 'Display Order', type: 'number' }),
  ],
  orderings: [{ title: 'Display Order', name: 'displayOrder', by: [{ field: 'displayOrder', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', media: 'coverImage' },
  },
})
