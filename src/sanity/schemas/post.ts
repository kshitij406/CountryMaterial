import { defineType, defineField } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'News & Announcements',
  type: 'document',
  icon: () => '📰',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'News', value: 'News' },
          { title: 'Announcement', value: 'Announcement' },
          { title: 'Update', value: 'Update' },
        ],
        layout: 'radio',
      },
      initialValue: 'News',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'date',
      options: { dateFormat: 'YYYY-MM-DD' },
    }),
    defineField({ name: 'author', title: 'Author', type: 'string' }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 2,
      description: 'Short summary shown on the news listing page.',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
            defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
          ],
        },
      ],
    }),
  ],
  orderings: [
    {
      title: 'Published Date (newest first)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'coverImage' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle ?? 'News', media }
    },
  },
})
