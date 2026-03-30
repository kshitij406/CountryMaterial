import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { allServicesQuery } from '@/sanity/lib/queries'
import PageHeader from '@/components/ui/PageHeader'
import ServicesGrid from '@/components/sections/ServicesGrid'
import CtaBanner from '@/components/sections/CtaBanner'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Our Services',
    description:
      "Explore Country Materials' full range of services: transportation & logistics, hardware materials, and waste management in Tanzania.",
  }
}

type Callout = { number: string; title: string; body: string; href: string }

// Static callouts used when Sanity returns no services
const staticCallouts: Callout[] = [
  {
    number: '01',
    title: 'Transportation & Logistics',
    body: 'From freight forwarding to last-mile delivery, we manage the movement of goods efficiently across Tanzania. Our fleet and partner network ensures your materials arrive on time, every time.',
    href: '/services/transportation',
  },
  {
    number: '02',
    title: 'Hardware & Steel Materials',
    body: 'We supply a comprehensive range of construction materials — including high-tensile BS 500 reinforcement bars, color paints, and hardware essentials. Quality sourced, competitively priced.',
    href: '/services/hardware',
  },
  {
    number: '03',
    title: 'Waste Management',
    body: 'Our waste management division handles collection, sorting, recycling, and waste-to-energy processing. We turn industrial waste into resource, reducing environmental impact while creating value.',
    href: '/services/waste-management',
  },
]

export default async function ServicesPage() {
  const services = await client.fetch(allServicesQuery).catch(() => null)

  // Derive callouts from Sanity services when available, fall back to static copy
  const callouts: Callout[] = services?.length
    ? services.slice(0, 3).map((s: any, i: number) => ({
        number: String(i + 1).padStart(2, '0'),
        title: s.title,
        body: s.excerpt ?? '',
        href: `/services/${s.slug.current}`,
      }))
    : staticCallouts

  return (
    <>
      <PageHeader
        label="What We Do"
        title="Services Built for Tanzania's Industrial Needs"
        subtitle="Three integrated service lines — each designed to deliver reliability, quality, and value across Dar es Salaam and beyond."
      />

      <ServicesGrid
        label="Our Service Lines"
        heading="Comprehensive Industrial Solutions"
        services={services ?? undefined}
      />

      {/* Detail callouts */}
      <section className="bg-cream py-section">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-3 gap-10 divide-y lg:divide-y-0 lg:divide-x divide-sand">
            {callouts.map((item) => (
              <div key={item.number} className="pt-10 lg:pt-0 lg:px-10 first:lg:pl-0 last:lg:pr-0">
                <span className="font-heading text-6xl text-sand">{item.number}</span>
                <h3 className="font-heading text-2xl text-navy mt-4 mb-4">{item.title}</h3>
                <p className="font-body text-slate/75 leading-relaxed text-sm mb-6">{item.body}</p>
                <a
                  href={item.href}
                  className="font-body text-xs font-semibold tracking-widest uppercase text-gold hover:text-navy flex items-center gap-2 transition-colors duration-200"
                >
                  Learn More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        heading="Need a Custom Solution?"
        subtext="Our team is ready to discuss your specific requirements and build a tailored service plan."
        primaryLabel="Talk to Us"
        primaryHref="/contact"
      />
    </>
  )
}
