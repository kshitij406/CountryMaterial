import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { legalPageQuery } from '@/sanity/lib/queries'
import LegalPageLayout from '@/components/sections/LegalPageLayout'
import { buildMetadata } from '@/lib/metadata'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(legalPageQuery, { slug: 'cookies' }).catch(() => null)
  return buildMetadata({
    title: `${data?.title ?? 'Cookie Policy'} | Country Materials Ltd`,
    description:
      'Learn how Country Materials Ltd uses essential and analytics cookies on countrymaterial.com and how you can manage your consent preferences.',
    path: '/cookies',
  })
}

export default async function CookiesPage() {
  const data = await client.fetch(legalPageQuery, { slug: 'cookies' }).catch(() => null)
  return <LegalPageLayout data={data} fallbackTitle="Cookie Policy" />
}
