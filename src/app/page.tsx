import type { Metadata } from 'next'
import { client, urlFor } from '@/sanity/lib/client' // urlFor used for partner logos below
import { homepageQuery, allServicesQuery } from '@/sanity/lib/queries'
import HeroSection from '@/components/HeroSection'
import IntroSection from '@/components/sections/IntroSection'
import ValuesGrid from '@/components/sections/ValuesGrid'
import ServicesGrid from '@/components/sections/ServicesGrid'
import ProductsGrid from '@/components/sections/ProductsGrid'
import PartnersSection from '@/components/sections/PartnersSection'
import CtaBanner from '@/components/sections/CtaBanner'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Country Materials Ltd — Hardware, Waste Management & Logistics',
}

export default async function HomePage() {
  const [homepage, services] = await Promise.all([
    client.fetch(homepageQuery).catch(() => null),
    client.fetch(allServicesQuery).catch(() => null),
  ])

  // Map Sanity values to ValuesGrid format
  const values = homepage?.values?.map((v: any) => ({
    icon: v.icon,
    title: v.title,
    description: v.description,
  }))

  // Map Sanity services to ServicesGrid format
  const featuredServices = (homepage?.featuredServices ?? services)?.map((s: any) => ({
    _id: s._id,
    slug: s.slug,
    title: s.title,
    excerpt: s.excerpt,
    coverImage: s.coverImage,
  }))

  // Map Sanity partner logos if they have images; otherwise PartnersSection uses its own defaults
  const partnerLogos = homepage?.partnerLogos
    ?.filter((p: any) => p.logo?.asset)
    .map((p: any) => ({
      src: urlFor(p.logo).width(200).url(),
      alt: p.name,
      height: 24,
    }))

  // heroVideo will come from siteSettings once the field is added to the schema
  const heroVideo = (homepage as any)?.heroVideo
    ? (homepage as any).heroVideo
    : undefined

  return (
    <>
      <HeroSection
        videoSrc={heroVideo}
        headingLine1={homepage?.heroHeading?.split(' ').slice(0, 2).join(' ') ?? undefined}
        headingLine2={homepage?.heroHeading?.split(' ').slice(2).join(' ') ?? undefined}
        subheading={homepage?.heroSubheading ?? undefined}
      />
      <IntroSection heading={homepage?.introHeading} body={homepage?.introBody} />
      <ServicesGrid
        dark
        heading="Three Pillars of Our Business"
        services={featuredServices ?? undefined}
      />
      <ValuesGrid values={values ?? undefined} />
      <ProductsGrid />
      <PartnersSection partners={partnerLogos?.length ? partnerLogos : undefined} />
      <CtaBanner
        heading={homepage?.ctaHeading ?? 'Ready to Work With Us?'}
        subtext={
          homepage?.ctaSubtext ??
          'Whether you need construction materials, waste management services, or reliable logistics — we are here to deliver.'
        }
        primaryLabel={homepage?.ctaButtonText ?? 'Contact Us Today'}
        primaryHref="/contact"
        secondaryLabel="View Our Services"
        secondaryHref="/services"
      />
    </>
  )
}
