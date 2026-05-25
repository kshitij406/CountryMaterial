import type { Metadata } from 'next'

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://countrymaterials.com'

export function buildMetadata({
  title,
  description,
  path,
  image = '/og-default.png',
}: {
  title: string
  description: string
  path: string
  image?: string
}): Metadata {
  const url = `${siteUrl}${path}`
  return {
    // absolute bypasses the root layout template so brand suffix is not doubled
    title: { absolute: title },
    description,
    metadataBase: new URL(siteUrl),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Country Materials Ltd',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      locale: 'en_TZ',
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
