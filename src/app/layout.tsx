import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageTransition from '@/components/animations/PageTransition'

export const metadata: Metadata = {
  title: {
    default: 'Country Materials Ltd — Hardware, Waste Management & Logistics | Dar es Salaam',
    template: '%s | Country Materials Ltd',
  },
  description:
    'Country Materials Ltd is a leading Tanzanian provider of hardware materials, steel, waste management, and transportation services in Dar es Salaam.',
  keywords: ['hardware materials', 'steel bars', 'waste management', 'transportation', 'Tanzania', 'Dar es Salaam'],
  openGraph: {
    siteName: 'Country Materials Ltd',
    locale: 'en_TZ',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body>
        <Navbar />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  )
}
