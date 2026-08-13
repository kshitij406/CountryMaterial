import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { legalPageQuery } from '@/sanity/lib/queries'
import LegalPageLayout from '@/components/sections/LegalPageLayout'
import { buildMetadata } from '@/lib/metadata'
import { getDictionary, isLocale, defaultLocale } from '@/i18n'

export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale
  const t = getDictionary(locale).legal
  const data = await client.fetch(legalPageQuery, { slug: 'terms', locale }).catch(() => null)
  return buildMetadata({
    title: `${data?.title ?? t.terms.title} | Country Materials Ltd`,
    description: t.terms.description,
    path: '/terms',
    locale,
  })
}

export default async function TermsPage({ params }: { params: { locale: string } }) {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale
  const t = getDictionary(locale).legal
  const data = await client.fetch(legalPageQuery, { slug: 'terms', locale }).catch(() => null)
  return <LegalPageLayout data={data} fallbackTitle={t.terms.title} t={t} />
}
