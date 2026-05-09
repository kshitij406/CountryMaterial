import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageTransition from '@/components/animations/PageTransition'
import RevealObserver from '@/components/animations/RevealObserver'
import { client, urlFor } from '@/sanity/lib/client'
import { siteSettingsQuery } from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: {
    default: 'Country Materials Limited — Circular Steel Recycling | Dar es Salaam',
    template: '%s | Country Materials Limited',
  },
  icons: {
    icon: '/images/logo/Country-Materials-Logo.png',
    shortcut: '/images/logo/Country-Materials-Logo.png',
    apple: '/images/logo/Country-Materials-Logo.png',
  },
  description:
    'Regenerative steel recycler integrating scrap vendors, manufacturers, and construction into a circular supply chain powered by technology.',
  keywords: ['steel recycling', 'circular economy', 'scrap metal', 'BS 500', 'TMT rebar', 'steel billets', 'Tanzania', 'Dar es Salaam'],
  openGraph: {
    siteName: 'Country Materials Limited',
    locale: 'en_TZ',
    type: 'website',
  },
}

export const revalidate = 60

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await client.fetch(siteSettingsQuery).catch(() => null)

  const logoUrl = settings?.logo?.asset
    ? urlFor(settings.logo).width(240).url()
    : undefined

  const contact = {
    address: settings?.address,
    poBox: settings?.poBox,
    city: settings?.city,
    country: settings?.country,
    phone: settings?.phone,
    email: settings?.email,
    socialLinks: settings?.socialLinks,
  }

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
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
