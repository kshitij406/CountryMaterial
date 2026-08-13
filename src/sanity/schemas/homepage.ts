import { defineType, defineField } from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: () => '🏠',
  fields: [
    // ── Hero ─────────────────────────────────────────────────────────────────
    defineField({ name: 'heroHeading', title: 'Hero Heading', type: 'string', description: 'e.g. "Built for Africa. Built to last."' }),
    defineField({ name: 'heroHeadingSw', title: 'Hero Heading — Kiswahili', type: 'string', description: 'Leave blank to fall back to the English text.' }),
    defineField({ name: 'heroSubheading', title: 'Hero Subheading', type: 'text', rows: 2 }),
    defineField({ name: 'heroSubheadingSw', title: 'Hero Subheading — Kiswahili', type: 'text', rows: 2, description: 'Leave blank to fall back to the English text.' }),
    defineField({
      name: 'heroVideo',
      title: 'Hero Background Video',
      type: 'file',
      options: { accept: 'video/mp4,video/webm,video/ogg' },
      description: 'Upload an MP4/WebM for the hero background. Takes priority over Hero Background Image.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Used when no video is set. Upload a steel yard or molten steel shot (min 1920×1080, landscape).',
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
            defineField({ name: 'labelSw', title: 'Label — Kiswahili', type: 'string', description: 'Leave blank to fall back to the English text.' }),
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
    defineField({ name: 'aboutHeadingSw', title: 'About — Section Heading — Kiswahili', type: 'string', description: 'Leave blank to fall back to the English text.' }),
    defineField({ name: 'aboutLead', title: 'About — Lead Paragraph', type: 'text', rows: 3 }),
    defineField({ name: 'aboutLeadSw', title: 'About — Lead Paragraph — Kiswahili', type: 'text', rows: 3, description: 'Leave blank to fall back to the English text.' }),
    defineField({ name: 'aboutBody', title: 'About — Body Paragraph', type: 'text', rows: 4 }),
    defineField({ name: 'aboutBodySw', title: 'About — Body Paragraph — Kiswahili', type: 'text', rows: 4, description: 'Leave blank to fall back to the English text.' }),
    defineField({ name: 'founderInitials', title: 'Founder Initials', type: 'string', description: 'Displayed large, e.g. "HM"' }),
    defineField({ name: 'founderName', title: 'Founder Name', type: 'string' }),
    defineField({ name: 'founderRole', title: 'Founder Role', type: 'string', description: 'e.g. "Founder & Chairman"' }),
    defineField({ name: 'founderRoleSw', title: 'Founder Role — Kiswahili', type: 'string', description: 'Leave blank to fall back to the English text.' }),
    defineField({
      name: 'aboutImage',
      title: 'About Section Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Shown in the homepage About strip (left column). Use a yard operations or process shot.',
    }),
    defineField({
      name: 'processSteps',
      title: 'Process Steps (Scrap → Steel)',
      type: 'array',
      description: '3–5 steps shown as a process strip below the About image.',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', title: 'Step Label', type: 'string', description: 'e.g. "Collection"' }),
          defineField({ name: 'labelSw', title: 'Step Label — Kiswahili', type: 'string', description: 'Leave blank to fall back to the English text.' }),
          defineField({ name: 'note', title: 'Short Note', type: 'string', description: 'e.g. "5,000+ vendors"' }),
          defineField({ name: 'noteSw', title: 'Short Note — Kiswahili', type: 'string', description: 'Leave blank to fall back to the English text.' }),
        ],
        preview: { select: { title: 'label', subtitle: 'note' } },
      }],
      validation: (Rule) => Rule.max(5),
    }),

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
            defineField({ name: 'labelSw', title: 'Label — Kiswahili', type: 'string', description: 'Leave blank to fall back to the English text.' }),
            defineField({ name: 'sub', title: 'Sub-label', type: 'string', description: 'Short supporting sentence' }),
            defineField({ name: 'subSw', title: 'Sub-label — Kiswahili', type: 'string', description: 'Leave blank to fall back to the English text.' }),
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

    defineField({
      name: 'becomeVendorHref',
      title: 'Become a Vendor — Button Link',
      type: 'string',
      description: 'URL the "Become a Vendor" button links to in the partner section. e.g. "/contact" or "https://forms.example.com/vendor"',
    }),

    // ── Featured announcement / development plan ──────────────────────────────
    defineField({ name: 'announcementTag', title: 'Announcement Tag', type: 'string', description: 'e.g. "Upcoming · Next Decade"' }),
    defineField({ name: 'announcementTagSw', title: 'Announcement Tag — Kiswahili', type: 'string', description: 'Leave blank to fall back to the English text.' }),
    defineField({ name: 'announcementHeading', title: 'Announcement Heading', type: 'string', description: 'e.g. "Next Decade Development Plan"' }),
    defineField({ name: 'announcementHeadingSw', title: 'Announcement Heading — Kiswahili', type: 'string', description: 'Leave blank to fall back to the English text.' }),
    defineField({ name: 'announcementBody', title: 'Announcement Body', type: 'text', rows: 5 }),
    defineField({ name: 'announcementBodySw', title: 'Announcement Body — Kiswahili', type: 'text', rows: 5, description: 'Leave blank to fall back to the English text.' }),
    defineField({
      name: 'announcementImage',
      title: 'Announcement Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Background image for the announcement card — use a modern factory or facility shot.',
    }),
    defineField({ name: 'announcementCtaLabel', title: 'Announcement CTA Label', type: 'string', description: 'e.g. "Read more"' }),
    defineField({ name: 'announcementCtaLabelSw', title: 'Announcement CTA Label — Kiswahili', type: 'string', description: 'Leave blank to fall back to the English text.' }),
    defineField({ name: 'announcementCtaHref', title: 'Announcement CTA Link', type: 'string', description: 'e.g. "/blog/next-decade-plan"' }),

    // ── Contact CTA ───────────────────────────────────────────────────────────
    defineField({ name: 'contactHeading', title: 'Contact CTA Heading', type: 'string', description: 'e.g. "Price your project." — contact info comes from Site Settings' }),
    defineField({ name: 'contactHeadingSw', title: 'Contact CTA Heading — Kiswahili', type: 'string', description: 'Leave blank to fall back to the English text.' }),
    defineField({ name: 'contactEyebrow', title: 'Contact CTA Eyebrow', type: 'string', description: 'e.g. "Speak to us"' }),
    defineField({ name: 'contactEyebrowSw', title: 'Contact CTA Eyebrow — Kiswahili', type: 'string', description: 'Leave blank to fall back to the English text.' }),
    defineField({ name: 'contactPrimaryLabel', title: 'Contact CTA — Primary Button Label', type: 'string' }),
    defineField({ name: 'contactPrimaryLabelSw', title: 'Contact CTA — Primary Button Label — Kiswahili', type: 'string', description: 'Leave blank to fall back to the English text.' }),
    defineField({ name: 'contactSecondaryLabel', title: 'Contact CTA — Secondary Button Label', type: 'string' }),
    defineField({ name: 'contactSecondaryLabelSw', title: 'Contact CTA — Secondary Button Label — Kiswahili', type: 'string', description: 'Leave blank to fall back to the English text.' }),
  ],
})
