import { defineType, defineField } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: () => '📖',
  fields: [
    defineField({ name: 'heading', title: 'Page Heading', type: 'string' }),
    defineField({ name: 'intro', title: 'Introduction', type: 'text', rows: 3 }),
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
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
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
            defineField({ name: 'icon', title: 'Icon (emoji)', type: 'string' }),
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    }),
    defineField({
      name: 'whyChooseUs',
      title: 'Why Choose Us',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
            defineField({ name: 'icon', title: 'Icon (emoji)', type: 'string' }),
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    }),
    defineField({
      name: 'heroImage',
      title: 'Story / Hero Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Primary image in the story section (replaces the placeholder). Use a high-quality operations or portrait shot.',
    }),
    defineField({
      name: 'processSteps',
      title: 'Process Timeline (Scrap → Steel)',
      type: 'array',
      description: '4–5 steps for the "from scrap to steel" timeline on the About page.',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'stepNumber', title: 'Step Number', type: 'string', description: 'e.g. "01"' }),
          defineField({ name: 'title', title: 'Step Title', type: 'string' }),
          defineField({ name: 'description', title: 'Short Description', type: 'text', rows: 2 }),
          defineField({ name: 'image', title: 'Step Image (optional)', type: 'image', options: { hotspot: true } }),
        ],
        preview: { select: { title: 'title', subtitle: 'stepNumber' } },
      }],
      validation: (Rule) => Rule.max(5),
    }),
    defineField({
      name: 'images',
      title: 'Additional Page Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
  ],
})
