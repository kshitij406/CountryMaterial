import { defineType, defineField } from 'sanity'

export const impactPage = defineType({
  name: 'impactPage',
  title: 'Impact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'tonnesRecycled',
      title: 'Tonnes Recycled',
      type: 'number',
    }),
    defineField({
      name: 'reportingYear',
      title: 'Reporting Year',
      type: 'number',
    }),
    defineField({
      name: 'manualOverrides',
      title: 'Manual Overrides',
      type: 'object',
      fields: [
        defineField({
          name: 'co2Avoided',
          title: 'CO₂ Avoided (kg)',
          type: 'number',
        }),
        defineField({
          name: 'landfillDiverted',
          title: 'Landfill Diverted (m³)',
          type: 'number',
        }),
        defineField({
          name: 'jobsCreated',
          title: 'Jobs Created',
          type: 'number',
        }),
        defineField({
          name: 'womenParticipation',
          title: 'Women Participation (%)',
          type: 'number',
          validation: (Rule) => Rule.min(0).max(100),
        }),
        defineField({
          name: 'youthParticipation',
          title: 'Youth Participation (%)',
          type: 'number',
          validation: (Rule) => Rule.min(0).max(100),
        }),
      ],
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
    }),
    defineField({
      name: 'methodologyNote',
      title: 'Methodology Note',
      type: 'text',
    }),
    defineField({
      name: 'impactStories',
      title: 'Impact Stories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'stat', title: 'Stat', type: 'string' }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
            defineField({ name: 'icon', title: 'Icon', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'sdgGoals',
      title: 'SDG Goals',
      description: 'UN Sustainable Development Goal numbers e.g. "8", "11", "12", "13"',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})
