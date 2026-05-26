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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${spaceMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
