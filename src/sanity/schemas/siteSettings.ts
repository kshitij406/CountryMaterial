import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: () => '⚙️',
  fields: [
    defineField({ name: 'companyName', title: 'Company Name', type: 'string' }),
    defineField({ name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'phone', title: 'Phone Number', type: 'string' }),
    defineField({ name: 'email', title: 'Email Address', type: 'string' }),
    defineField({ name: 'address', title: 'Street Address', type: 'string' }),
    defineField({ name: 'poBox', title: 'P.O. Box', type: 'string' }),
    defineField({ name: 'city', title: 'City', type: 'string' }),
    defineField({ name: 'country', title: 'Country', type: 'string' }),
    defineField({
      name: 'businessHours',
      title: 'Business Hours',
      type: 'text',
      rows: 3,
      description: 'e.g. "Monday – Friday: 8:00 AM – 5:00 PM\\nSaturday: 8:00 AM – 1:00 PM"',
    }),
    defineField({
      name: 'shopPageTitle',
      title: 'Shop Page — Heading',
      type: 'string',
      description: 'Main heading shown on the Product Catalog page. Defaults to "Quality Materials from [Company Name]".',
    }),
    defineField({
      name: 'shopPageSubtitle',
      title: 'Shop Page — Subtitle',
      type: 'text',
      rows: 2,
      description: 'Subtitle paragraph shown beneath the shop page heading.',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        defineField({ name: 'facebook', title: 'Facebook URL', type: 'url' }),
        defineField({ name: 'twitter', title: 'Twitter / X URL', type: 'url' }),
        defineField({ name: 'instagram', title: 'Instagram URL', type: 'url' }),
        defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'url' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'companyName' },
  },
})
