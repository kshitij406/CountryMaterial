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
      name: 'cardImage',
      title: 'Service Card Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Photo shown in the image panel on homepage/services cards. Use an operations shot (landscape, 800×500+).',
    }),
    defineField({
      name: 'specChips',
      title: 'Specification Chips',
      type: 'array',
      description: 'Short attribute labels on service cards. e.g. "BS 500", "Locally sourced", "24hrs dispatch".',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image (Detail Page)',
      type: 'image',
      options: { hotspot: true },
      description: 'Hero image for the individual service detail page.',
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
    defineField({
      name: 'features',
      title: 'Key Capabilities',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bullet-point list of capabilities shown on the service detail page.',
    }),
    defineField({
      name: 'highlights',
      title: 'Stat Highlights',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'stat', title: 'Stat', type: 'string' }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
          ],
          preview: { select: { title: 'stat', subtitle: 'label' } },
        },
      ],
      description: 'Up to 3 stat/label pairs shown in the dark banner on the service detail page.',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Steel / Construction', value: 'steel' },
          { title: 'Hardware / Tools', value: 'hardware' },
          { title: 'Waste Management', value: 'waste' },
          { title: 'Logistics / Transport', value: 'logistics' },
        ],
      },
      description: 'Icon shown on the homepage services card.',
    }),
    defineField({ name: 'displayOrder', title: 'Display Order', type: 'number' }),
  ],
  orderings: [{ title: 'Display Order', name: 'displayOrder', by: [{ field: 'displayOrder', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', media: 'coverImage' },
  },
})
