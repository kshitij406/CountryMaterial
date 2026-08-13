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
  const data = await client.fetch(legalPageQuery, { slug: 'cookies', locale }).catch(() => null)
  return buildMetadata({
    title: `${data?.title ?? t.cookies.title} | Country Materials Ltd`,
    description: t.cookies.description,
    path: '/cookies',
    locale,
  })
}

export default async function CookiesPage({ params }: { params: { locale: string } }) {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale
  const t = getDictionary(locale).legal
  const data = await client.fetch(legalPageQuery, { slug: 'cookies', locale }).catch(() => null)
  return <LegalPageLayout data={data} fallbackTitle={t.cookies.title} t={t} />
}
