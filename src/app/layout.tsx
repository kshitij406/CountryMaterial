import type { Metadata } from 'next'
import '@fontsource/plus-jakarta-sans/300.css'
import '@fontsource/plus-jakarta-sans/400.css'
import '@fontsource/plus-jakarta-sans/500.css'
import '@fontsource/plus-jakarta-sans/600.css'
import '@fontsource/plus-jakarta-sans/700.css'
import '@fontsource/plus-jakarta-sans/800.css'
import '@fontsource/space-mono/400.css'
import '@fontsource/space-mono/700.css'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageTransition from '@/components/animations/PageTransition'
import RevealObserver from '@/components/animations/RevealObserver'
import { client, urlFor } from '@/sanity/lib/client'
import { siteSettingsQuery } from '@/sanity/lib/queries'

// Fonts are loaded via @fontsource CSS imports above.
// CSS variables are set in globals.css.
const fontClassNames = ''

export const metadata: Metadata = {
  title: {
    default: 'Country Materials Limited — Africa\'s Circular Steel Ecosystem',
    template: '%s | Country Materials Limited',
  },
  description:
    'From scrap collection to certified construction steel. Tanzania\'s leading circular steel manufacturer connecting 5,000+ vendors, 320+ clients, and 30+ fleet vehicles across 5 regional branches.',
  keywords: ['steel recycling', 'circular economy', 'scrap metal', 'BS 500', 'TMT rebar', 'steel billets', 'Tanzania', 'Dar es Salaam'],
  icons: {
    icon:     '/images/logo/Country-Materials-Logo.png',
    shortcut: '/images/logo/Country-Materials-Logo.png',
    apple:    '/images/logo/Country-Materials-Logo.png',
  },
  openGraph: {
    siteName: 'Country Materials Limited',
    locale: 'en_TZ',
    type: 'website',
  },
}

export const revalidate = 60

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await client.fetch(siteSettingsQuery).catch(() => null)

  const logoUrl = settings?.logo?.asset
    ? urlFor(settings.logo).width(240).url()
    : undefined

  const contact = {
    address:     settings?.address,
    poBox:       settings?.poBox,
    city:        settings?.city,
    country:     settings?.country,
    phone:       settings?.phone,
    email:       settings?.email,
    socialLinks: settings?.socialLinks,
  }

  return (
    <html lang="en" className={fontClassNames}>
      <body>
        <RevealObserver />
        <Navbar logoUrl={logoUrl} companyName={settings?.companyName} />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer contact={contact} />
      </body>
    </html>
  )
}
