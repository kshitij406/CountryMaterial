import type { Metadata } from 'next'
import { defaultLocale, locales, localePath, ogLocale, type Locale } from '@/i18n/config'

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://countrymaterials.com'

/**
 * hreflang map for one unprefixed route, e.g. '/about' ->
 * { en: 'https://…/about', sw: 'https://…/sw/about', 'x-default': 'https://…/about' }
 */
export function localeAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {}
  for (const locale of locales) {
    languages[locale] = `${siteUrl}${localePath(locale, path)}`
  }
  languages['x-default'] = `${siteUrl}${localePath(defaultLocale, path)}`
  return languages
}

export function buildMetadata({
  title,
  description,
  path,
  image = '/og-default.png',
  locale = defaultLocale,
}: {
  title: string
  description: string
  /** Unprefixed route, e.g. '/about'. The locale prefix is applied here. */
  path: string
  image?: string
  locale?: Locale
}): Metadata {
  const url = `${siteUrl}${localePath(locale, path)}`
  return {
    // absolute bypasses the root layout template so brand suffix is not doubled
    title: { absolute: title },
    description,
    metadataBase: new URL(siteUrl),
    alternates: { canonical: url, languages: localeAlternates(path) },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Country Materials Ltd',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      locale: ogLocale[locale],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}
