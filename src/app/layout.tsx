import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Space_Mono } from 'next/font/google'
import './globals.css'

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
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageTransition from '@/components/animations/PageTransition'
import RevealObserver from '@/components/animations/RevealObserver'
import CookieBanner from '@/components/CookieBanner'
import { client, urlFor } from '@/sanity/lib/client'
import { siteSettingsQuery } from '@/sanity/lib/queries'

// TODO: replace /public/og-default.png with a real 1200×630 branded OG image before go-live
// TODO: add /public/favicon.ico for full browser/tab support (currently using logo PNG via `icons`)

export const metadata: Metadata = {
  title: {
    default: 'Country Materials Ltd',
    template: '%s | Country Materials Ltd',
  },
  description:
    "Tanzania's trusted supplier of construction materials, waste management solutions and logistics services based in Dar es Salaam.",
  keywords: [
    'construction materials Tanzania',
    'waste management Dar es Salaam',
    'scrap recycling Tanzania',
    'hardware supplier Tanzania',
    'logistics Tanzania',
    'BS 500 steel',
    'TMT rebar Tanzania',
    'circular economy Africa',
  ],
  authors: [{ name: 'Country Materials Ltd' }],
  robots: { index: true, follow: true },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://countrymaterials.com'),
  icons: {
    icon:     '/images/logo/Country-Materials-Logo.png',
    shortcut: '/images/logo/Country-Materials-Logo.png',
    apple:    '/images/logo/Country-Materials-Logo.png',
  },
}

export const revalidate = 60

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await client.fetch(siteSettingsQuery).catch(() => null)

  const logoUrl = settings?.logo?.asset
    ? urlFor(settings.logo).width(240).auto('format').url()
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
    <html lang="en" className={`${plusJakartaSans.variable} ${spaceMono.variable}`}>
      <body>
        <RevealObserver />
        <Navbar logoUrl={logoUrl} companyName={settings?.companyName} />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer contact={contact} />
        <CookieBanner />
      </body>
    </html>
  )
}
