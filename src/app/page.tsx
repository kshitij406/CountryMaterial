import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { client } from '@/sanity/lib/client'
import { homepageQuery, siteSettingsQuery, impactPageQuery } from '@/sanity/lib/queries'
import { calculateImpact } from '@/lib/impactCalculations'
import { buildMetadata } from '@/lib/metadata'
import HeroSection from '@/components/HeroSection'
import StatsSection from '@/components/sections/StatsSection'
import ProcessSection from '@/components/sections/ProcessSection'
import ServicesSection from '@/components/sections/ServicesSection'

const ImpactTeaser = dynamic(() => import('@/components/ImpactTeaser'), {
  ssr: false,
  loading: () => (
    <div className="h-32 bg-navy-deep flex items-center justify-center">
      <span className="w-3 h-3 rounded-full bg-gold animate-pulse" />
    </div>
  ),
})
import ProductsGrid from '@/components/sections/ProductsGrid'
import OperationsSection from '@/components/sections/OperationsSection'
import CertificationsSection from '@/components/sections/CertificationsSection'
import ClientsMarquee from '@/components/sections/ClientsMarquee'
import NextDecadeTeaser from '@/components/sections/NextDecadeTeaser'
import ContactCTA from '@/components/sections/ContactCTA'

export const revalidate = 30

export const metadata: Metadata = buildMetadata({
  title: 'Country Materials Ltd | Hardware, Waste Management & Logistics Tanzania',
  description:
    'Country Materials Ltd supplies BS 500-certified steel, scrap recycling, hardware and logistics services across Tanzania, headquartered in Dar es Salaam.',
  path: '/',
})

export default async function HomePage() {
  const [hp, settings, impactRaw] = await Promise.all([
    client.fetch(homepageQuery).catch(() => null),
    client.fetch(siteSettingsQuery).catch(() => null),
    client.fetch(impactPageQuery).catch(() => null),
  ])

  const impact = calculateImpact(
    impactRaw?.tonnesRecycled ?? 50000,
    impactRaw?.reportingYear ?? 2024,
    impactRaw?.manualOverrides ?? undefined,
  )

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

      <ImpactTeaser
        tonnesRecycled={impact.tonnesRecycled}
        co2AvoidedTonnes={impact.co2AvoidedTonnes}
        jobsCreated={impact.jobsCreated}
        landfillDivertedM3={impact.landfillDivertedM3}
      />

      <ProductsGrid products={hp?.featuredProducts ?? undefined} />

      <OperationsSection />

      <CertificationsSection />

      <ClientsMarquee partners={hp?.partnerLogos?.length ? hp.partnerLogos : undefined} />

      <NextDecadeTeaser />

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
