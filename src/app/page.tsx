import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { homepageQuery, siteSettingsQuery } from '@/sanity/lib/queries'
import HeroSection from '@/components/HeroSection'
import StatsSection from '@/components/sections/StatsSection'
import ProcessSection from '@/components/sections/ProcessSection'
import ServicesSection from '@/components/sections/ServicesSection'
import ProductsGrid from '@/components/sections/ProductsGrid'
import OperationsSection from '@/components/sections/OperationsSection'
import CertificationsSection from '@/components/sections/CertificationsSection'
import ClientsMarquee from '@/components/sections/ClientsMarquee'
import ContactCTA from '@/components/sections/ContactCTA'

export const revalidate = 30

export const metadata: Metadata = {
  title: "Country Materials Limited — Africa's Circular Steel Ecosystem",
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
        heroImageUrl={hp?.heroImageUrl ?? undefined}
        headingLine1={hp?.heroHeading?.replace(/\\n/g, '\n').split('\n')[0] ?? undefined}
        headingLine2={hp?.heroHeading?.replace(/\\n/g, '\n').split('\n')[1] ?? undefined}
        subheading={hp?.heroSubheading ?? undefined}
      />

      <StatsSection stats={hp?.stats ?? undefined} />

      <ProcessSection />

      <ServicesSection services={hp?.featuredServices ?? undefined} />

      <ProductsGrid products={hp?.featuredProducts ?? undefined} />

      <OperationsSection />

      <CertificationsSection />

      <ClientsMarquee partners={hp?.partnerLogos?.length ? hp.partnerLogos : undefined} />

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
