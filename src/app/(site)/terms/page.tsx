import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { legalPageQuery } from '@/sanity/lib/queries'
import LegalPageLayout from '@/components/sections/LegalPageLayout'
import { buildMetadata } from '@/lib/metadata'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(legalPageQuery, { slug: 'terms' }).catch(() => null)
  return buildMetadata({
    title: `${data?.title ?? 'Terms of Use'} | Country Materials Ltd`,
    description:
      'Read the Terms of Use governing your access to the Country Materials Ltd website, including intellectual property rights and limitation of liability.',
    path: '/terms',
  })
}

export default async function TermsPage() {
  const data = await client.fetch(legalPageQuery, { slug: 'terms' }).catch(() => null)
  return <LegalPageLayout data={data} fallbackTitle="Terms of Use" />
}
