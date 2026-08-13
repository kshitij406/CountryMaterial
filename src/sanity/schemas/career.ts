import { defineType, defineField } from 'sanity'

export const career = defineType({
  name: 'career',
  title: 'Careers',
  type: 'document',
  icon: () => '💼',
  fields: [
    defineField({ name: 'title', title: 'Job Title', type: 'string' }),

    defineField({ name: 'titleSw', title: 'Job Title — Kiswahili', type: 'string', description: 'Leave blank to fall back to the English text.' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } }),
    defineField({
      name: 'excerpt',
      title: 'Short Description',
      type: 'string',
      description: 'One-sentence summary shown on the job card (max ~160 characters). Falls back to the first line of the full description.',
    }),
    defineField({
      name: 'excerptSw',
      title: 'Short Description — Kiswahili',
      type: 'string',
      description: 'Leave blank to fall back to the English text.',
    }),
    defineField({ name: 'department', title: 'Department', type: 'string' }),

    defineField({ name: 'departmentSw', title: 'Department — Kiswahili', type: 'string', description: 'Leave blank to fall back to the English text.' }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({
      name: 'employmentType',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: [
          { title: 'Full-Time', value: 'full-time' },
          { title: 'Part-Time', value: 'part-time' },
          { title: 'Contract', value: 'contract' },
          { title: 'Internship', value: 'internship' },
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Job Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'descriptionSw',
      title: 'Job Description — Kiswahili',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Leave blank to fall back to the English text.',
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'closingDate', title: 'Closing Date', type: 'date' }),
    defineField({ name: 'expired', title: 'Expired / Closed', type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'department', expired: 'expired' },
    prepare({ title, subtitle, expired }) {
      return { title: expired ? `[CLOSED] ${title}` : title, subtitle }
    },
  },
})
