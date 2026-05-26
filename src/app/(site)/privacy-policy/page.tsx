import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { legalPageQuery } from '@/sanity/lib/queries'
import LegalPageLayout from '@/components/sections/LegalPageLayout'
import { buildMetadata } from '@/lib/metadata'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(legalPageQuery, { slug: 'privacy-policy' }).catch(() => null)
  return buildMetadata({
    title: `${data?.title ?? 'Privacy Policy'} | Country Materials Ltd`,
    description:
      "Read Country Materials Ltd's Privacy Policy to learn how we collect, use and protect your personal data when you visit countrymaterial.com.",
    path: '/privacy-policy',
  })
}

export default async function PrivacyPolicyPage() {
  const data = await client.fetch(legalPageQuery, { slug: 'privacy-policy' }).catch(() => null)
  return <LegalPageLayout data={data} fallbackTitle="Privacy Policy" />
}
