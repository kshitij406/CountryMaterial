import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
// ponytail: self-hosted via @fontsource instead of next/font/google — the
// latter fetches from fonts.gstatic.com at build time, which shared-hosting
// build environments can't always reach (and shouldn't need to).
import '@fontsource/plus-jakarta-sans/latin-300.css'
import '@fontsource/plus-jakarta-sans/latin-400.css'
import '@fontsource/plus-jakarta-sans/latin-500.css'
import '@fontsource/plus-jakarta-sans/latin-600.css'
import '@fontsource/plus-jakarta-sans/latin-700.css'
import '@fontsource/plus-jakarta-sans/latin-800.css'
import '@fontsource/space-mono/latin-400.css'
import '@fontsource/space-mono/latin-700.css'
import '@/app/globals.css'
import { getDictionary, htmlLang, isLocale, locales } from '@/i18n'
import { localeAlternates, siteUrl } from '@/lib/metadata'
import { localePath } from '@/i18n/config'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = isLocale(params.locale) ? params.locale : 'en'
  const t = getDictionary(locale)

  return {
    title: { default: t.meta.defaultTitle, template: t.meta.titleTemplate },
    description: t.meta.description,
    keywords: [...t.meta.keywords],
    authors: [{ name: t.meta.siteName }],
    robots: { index: true, follow: true },
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `${siteUrl}${localePath(locale, '/')}`,
      languages: localeAlternates('/'),
    },
    icons: {
      icon:     '/images/logo/Country-Materials-Logo.png',
      shortcut: '/images/logo/Country-Materials-Logo.png',
      apple:    '/images/logo/Country-Materials-Logo.png',
    },
  }
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!isLocale(params.locale)) notFound()

  return (
    <html
      lang={htmlLang[params.locale]}
      style={{
        '--font-jakarta': "'Plus Jakarta Sans', system-ui, sans-serif",
        '--font-space-mono': "'Space Mono', monospace",
      } as React.CSSProperties}
    >
      <body>{children}</body>
    </html>
  )
}
