import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'country-materials',
  title: 'Country Materials CMS',
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem()
              .title('Homepage')
              .id('homepage')
              .child(S.document().schemaType('homepage').documentId('homepage')),
            S.listItem()
              .title('About Page')
              .id('aboutPage')
              .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
            S.listItem()
              .title('Impact Page')
              .id('impactPage')
              .child(S.document().schemaType('impactPage').documentId('impactPage')),
            S.divider(),
            S.documentTypeListItem('service').title('Services'),
            S.documentTypeListItem('product').title('Products'),
            S.documentTypeListItem('productCategory').title('Product Categories'),
            S.documentTypeListItem('career').title('Careers'),
            S.documentTypeListItem('post').title('News & Announcements'),
            S.documentTypeListItem('legalPage').title('Legal Pages'),
            S.divider(),
            S.documentTypeListItem('motifLibrary').title('Motif Library'),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
