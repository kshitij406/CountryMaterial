import { defineType, defineField } from 'sanity'

export const motifLibrary = defineType({
  name: 'motifLibrary',
  title: 'Motif Library',
  type: 'document',
  icon: () => '◈',
  description: 'Reusable decorative overlay assets (SVG or PNG) — rebar patterns, billet silhouettes, mesh grids. Placed on pages via CMS.',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', description: 'e.g. "Rebar Grid", "Billet Stack Corner"' }),
    defineField({
      name: 'asset',
      title: 'Asset (SVG or PNG)',
      type: 'image',
      options: { accept: 'image/svg+xml,image/png' },
    }),
    defineField({
      name: 'placement',
      title: 'Allowed Placement',
      type: 'string',
      options: {
        list: [
          { title: 'Hero Background', value: 'hero-bg' },
          { title: 'Section Overlay', value: 'section-overlay' },
          { title: 'Corner Anchor', value: 'corner-anchor' },
          { title: 'Section Divider', value: 'section-divider' },
        ],
      },
    }),
    defineField({
      name: 'opacity',
      title: 'Default Opacity (0–1)',
      type: 'number',
      initialValue: 0.05,
      validation: (Rule) => Rule.min(0).max(1),
    }),
    defineField({
      name: 'zIndex',
      title: 'Z-Index Position',
      type: 'string',
      options: {
        list: [
          { title: 'Behind text (decorative)', value: 'behind-text' },
          { title: 'Above background', value: 'above-bg' },
        ],
      },
      initialValue: 'behind-text',
    }),
  ],
  preview: {
    select: { title: 'name', media: 'asset', subtitle: 'placement' },
  },
})
