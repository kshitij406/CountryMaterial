import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Plus_Jakarta_Sans, Space_Mono } from 'next/font/google'
import '@/app/globals.css'
import { getDictionary, htmlLang, isLocale, locales } from '@/i18n'
import { localeAlternates, siteUrl } from '@/lib/metadata'
import { localePath } from '@/i18n/config'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
  preload: true,
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
  preload: true,
})

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
      className={`${plusJakartaSans.variable} ${spaceMono.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
