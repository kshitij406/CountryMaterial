import { defineType, defineField } from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: () => '🏠',
  fields: [
    // ── Hero ─────────────────────────────────────────────────────────────────
    defineField({ name: 'heroHeading', title: 'Hero Heading', type: 'string', description: 'e.g. "Built for Africa. Built to last."' }),
    defineField({ name: 'heroSubheading', title: 'Hero Subheading', type: 'text', rows: 2 }),
    defineField({
      name: 'heroVideo',
      title: 'Hero Background Video',
      type: 'file',
      options: { accept: 'video/mp4,video/webm,video/ogg' },
      description: 'Upload an MP4/WebM for the hero background. Leave empty to show the animated gradient.',
    }),

    // ── Ticker strip ──────────────────────────────────────────────────────────
    defineField({
      name: 'tickerItems',
      title: 'Ticker Strip Items',
      type: 'array',
      description: 'Scrolling stats bar below the hero. Each item shows a number/label pair.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'num', title: 'Number / Value', type: 'string', description: 'e.g. "50,000+" or "ISO 9001"' }),
            defineField({ name: 'label', title: 'Label', type: 'string', description: 'e.g. "Tonnes / yr"' }),
          ],
          preview: { select: { title: 'num', subtitle: 'label' } },
        },
      ],
    }),

    // ── Services ──────────────────────────────────────────────────────────────
    defineField({
      name: 'featuredServices',
      title: 'Featured Services (up to 4)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
      validation: (Rule) => Rule.max(4),
    }),

    // ── About strip ───────────────────────────────────────────────────────────
    defineField({ name: 'aboutHeading', title: 'About — Section Heading', type: 'string', description: 'e.g. "Three decades. One standard."' }),
    defineField({ name: 'aboutLead', title: 'About — Lead Paragraph', type: 'text', rows: 3 }),
    defineField({ name: 'aboutBody', title: 'About — Body Paragraph', type: 'text', rows: 4 }),
    defineField({ name: 'founderInitials', title: 'Founder Initials', type: 'string', description: 'Displayed large, e.g. "HM"' }),
    defineField({ name: 'founderName', title: 'Founder Name', type: 'string' }),
    defineField({ name: 'founderRole', title: 'Founder Role', type: 'string', description: 'e.g. "Founder & Chairman"' }),

    // ── Stats section ─────────────────────────────────────────────────────────
    defineField({
      name: 'stats',
      title: 'Stats Section',
      type: 'array',
      description: 'Up to 4 animated counter stats. Count is the number the counter animates to.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'count', title: 'Number', type: 'number', description: 'e.g. 50000' }),
            defineField({ name: 'suffix', title: 'Suffix', type: 'string', description: 'e.g. "+" or "T" — leave blank for none' }),
            defineField({ name: 'label', title: 'Label', type: 'string', description: 'e.g. "Tonnes Delivered"' }),
            defineField({ name: 'sub', title: 'Sub-label', type: 'string', description: 'Short supporting sentence' }),
          ],
          preview: { select: { title: 'label', subtitle: 'count' } },
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),

    // ── Featured products ─────────────────────────────────────────────────────
    defineField({
      name: 'featuredProducts',
      title: 'Featured Products (up to 6)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
      validation: (Rule) => Rule.max(6),
    }),

    // ── Partner logos ─────────────────────────────────────────────────────────
    defineField({
      name: 'partnerLogos',
      title: 'Client / Partner Logos',
      type: 'array',
      description: 'Shown in the grayscale marquee. Add a logo image for real logos, or leave it empty to display the name as text.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'sub', title: 'Industry / Sub-label', type: 'string', description: 'e.g. "Mining"' }),
            defineField({ name: 'logo', title: 'Logo Image (optional)', type: 'image', options: { hotspot: true } }),
          ],
          preview: { select: { title: 'name', subtitle: 'sub', media: 'logo' } },
        },
      ],
    }),

    // ── Contact CTA ───────────────────────────────────────────────────────────
    defineField({ name: 'contactHeading', title: 'Contact CTA Heading', type: 'string', description: 'e.g. "Price your project." — contact info comes from Site Settings' }),
    defineField({ name: 'contactEyebrow', title: 'Contact CTA Eyebrow', type: 'string', description: 'e.g. "Speak to us"' }),
    defineField({ name: 'contactPrimaryLabel', title: 'Contact CTA — Primary Button Label', type: 'string' }),
    defineField({ name: 'contactSecondaryLabel', title: 'Contact CTA — Secondary Button Label', type: 'string' }),
  ],
})
