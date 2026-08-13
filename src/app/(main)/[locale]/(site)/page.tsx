import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { client } from '@/sanity/lib/client'
import { homepageQuery, siteSettingsQuery, impactPageQuery } from '@/sanity/lib/queries'
import { calculateImpact } from '@/lib/impactCalculations'
import { buildMetadata } from '@/lib/metadata'
import { getDictionary, isLocale, defaultLocale } from '@/i18n'
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

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale
  const t = getDictionary(locale)
  return buildMetadata({
    title: t.meta.home.title,
    description: t.meta.home.description,
    path: '/',
    locale,
  })
}

export default async function HomePage({ params }: { params: { locale: string } }) {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale
  const t = getDictionary(locale)

  const [hp, settings, impactRaw] = await Promise.all([
    client.fetch(homepageQuery, { locale }).catch(() => null),
    client.fetch(siteSettingsQuery, { locale }).catch(() => null),
    client.fetch(impactPageQuery, { locale }).catch(() => null),
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
        locale={locale}
        t={t.hero}
      />

      <StatsSection stats={hp?.stats ?? undefined} locale={locale} t={t.stats} />

      <ProcessSection t={t.process} />

      <ServicesSection services={hp?.featuredServices ?? undefined} locale={locale} t={t.services} />

      <ImpactTeaser
        tonnesRecycled={impact.tonnesRecycled}
        co2AvoidedTonnes={impact.co2AvoidedTonnes}
        vendorsOnboarded={5000}
        activeClients={320}
        locale={locale}
        t={t.impactTeaser}
      />

      <ProductsGrid products={hp?.featuredProducts ?? undefined} locale={locale} t={t.products} />

      <OperationsSection t={t.operations} />

      <CertificationsSection t={t.certifications} />

      <ClientsMarquee partners={hp?.partnerLogos?.length ? hp.partnerLogos : undefined} t={t.clients} />

      <NextDecadeTeaser locale={locale} t={t.nextDecade} />

      <ContactCTA
        heading={hp?.contactHeading ?? undefined}
        eyebrow={hp?.contactEyebrow ?? undefined}
        primaryLabel={hp?.contactPrimaryLabel ?? undefined}
        secondaryLabel={hp?.contactSecondaryLabel ?? undefined}
        phone={settings?.phone ?? undefined}
        email={settings?.email ?? undefined}
        address={settings?.address ?? undefined}
        locale={locale}
        t={t.contactCta}
      />
    </>
  )
}
