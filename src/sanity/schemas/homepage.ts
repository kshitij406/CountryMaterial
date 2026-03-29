import { defineType, defineField } from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: () => '🏠',
  fields: [
    defineField({ name: 'heroHeading', title: 'Hero Heading', type: 'string' }),
    defineField({ name: 'heroSubheading', title: 'Hero Subheading', type: 'text', rows: 2 }),
    defineField({
      name: 'heroImages',
      title: 'Hero Background Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({ name: 'introHeading', title: 'Intro Section Heading', type: 'string' }),
    defineField({ name: 'introBody', title: 'Intro Body Text', type: 'text', rows: 4 }),
    defineField({ name: 'vision', title: 'Vision Statement', type: 'text', rows: 3 }),
    defineField({ name: 'mission', title: 'Mission Statement', type: 'text', rows: 3 }),
    defineField({
      name: 'values',
      title: 'Core Values',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Value Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
            defineField({ name: 'icon', title: 'Icon (emoji or name)', type: 'string' }),
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    }),
    defineField({ name: 'ctaHeading', title: 'CTA Banner Heading', type: 'string' }),
    defineField({ name: 'ctaSubtext', title: 'CTA Banner Subtext', type: 'string' }),
    defineField({ name: 'ctaButtonText', title: 'CTA Button Text', type: 'string' }),
    defineField({
      name: 'featuredServices',
      title: 'Featured Services',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
    }),
    defineField({
      name: 'partnerLogos',
      title: 'Partner Logos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Partner Name', type: 'string' }),
            defineField({ name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true } }),
          ],
          preview: { select: { title: 'name' } },
        },
      ],
    }),
  ],
})
