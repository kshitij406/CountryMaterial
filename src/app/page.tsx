import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { homepageQuery, siteSettingsQuery } from '@/sanity/lib/queries'
import HeroSection from '@/components/HeroSection'
import TickerStrip from '@/components/sections/TickerStrip'
import ServicesSection from '@/components/sections/ServicesSection'
import AboutStrip from '@/components/sections/AboutStrip'
import StatsSection from '@/components/sections/StatsSection'
import ProductsGrid from '@/components/sections/ProductsGrid'
import ClientsMarquee from '@/components/sections/ClientsMarquee'
import ContactCTA from '@/components/sections/ContactCTA'

export const revalidate = 30

export const metadata: Metadata = {
  title: 'Country Materials Ltd — Built for Africa. Built to Last.',
}

export default async function HomePage() {
  const [hp, settings] = await Promise.all([
    client.fetch(homepageQuery).catch(() => null),
    client.fetch(siteSettingsQuery).catch(() => null),
  ])

  return (
    <>
      <HeroSection
        videoSrc={hp?.heroVideo?.asset?.url ?? undefined}
        headingLine1={hp?.heroHeading?.split('\n')[0] ?? undefined}
        headingLine2={hp?.heroHeading?.split('\n')[1] ?? undefined}
        subheading={hp?.heroSubheading ?? undefined}
      />

      <TickerStrip items={hp?.tickerItems ?? undefined} />

      <ServicesSection services={hp?.featuredServices ?? undefined} />

      <AboutStrip
        heading={hp?.aboutHeading ?? undefined}
        lead={hp?.aboutLead ?? undefined}
        body={hp?.aboutBody ?? undefined}
        founderInitials={hp?.founderInitials ?? undefined}
        founderName={hp?.founderName ?? undefined}
        founderRole={hp?.founderRole ?? undefined}
      />

      <StatsSection stats={hp?.stats ?? undefined} />

      <ProductsGrid products={hp?.featuredProducts ?? undefined} />

      <ClientsMarquee
        partners={hp?.partnerLogos?.length ? hp.partnerLogos : undefined}
      />

      <ContactCTA
        heading={hp?.contactHeading ?? undefined}
        eyebrow={hp?.contactEyebrow ?? undefined}
        primaryLabel={hp?.contactPrimaryLabel ?? undefined}
        secondaryLabel={hp?.contactSecondaryLabel ?? undefined}
        phone={settings?.phone ?? undefined}
        email={settings?.email ?? undefined}
        address={settings?.address ?? undefined}
      />
    </>
  )
}
