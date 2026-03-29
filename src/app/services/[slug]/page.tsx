import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import PageHeader from '@/components/ui/PageHeader'
import AnimatedSection from '@/components/animations/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import CtaBanner from '@/components/sections/CtaBanner'
import Button from '@/components/ui/Button'

// Static service data — will be replaced with Sanity fetch once project ID is set
const staticServices: Record<string, {
  title: string
  excerpt: string
  label: string
  intro: string
  features: string[]
  highlights: Array<{ stat: string; label: string }>
}> = {
  transportation: {
    title: 'Transportation & Logistics',
    label: 'Logistics',
    excerpt: 'End-to-end freight forwarding, warehousing, and last-mile distribution across Tanzania and the region.',
    intro:
      'Our transportation division provides reliable, efficient movement of goods across Tanzania. From bulk freight to time-sensitive deliveries, we offer a full spectrum of logistics services backed by an experienced team and a growing fleet.',
    features: [
      'Freight forwarding — domestic and regional',
      'Warehousing and storage solutions',
      'Last-mile delivery across Dar es Salaam',
      'Heavy-load transportation for construction materials',
      'Supply chain coordination and tracking',
      'Cross-border logistics support',
    ],
    highlights: [
      { stat: '100+', label: 'Deliveries Per Month' },
      { stat: '10+', label: 'Routes Covered' },
      { stat: '99%', label: 'On-Time Rate' },
    ],
  },
  hardware: {
    title: 'Hardware & Steel Materials',
    label: 'Hardware',
    excerpt: 'Quality construction materials — color paints, hardware supplies, and high-tensile reinforcement bars.',
    intro:
      'We supply a comprehensive range of hardware materials for construction, industrial, and commercial projects. Our stock includes BS 500 high-tensile reinforcement bars, color paints, and essential hardware — all sourced from certified manufacturers and available at competitive prices.',
    features: [
      'High Tensile Reinforcement Bars (BS 500 compliant)',
      'Color paints — interior and exterior grades',
      'Gypsum boards and ceiling materials',
      'Marine plywood and timber products',
      'General hardware supplies and fasteners',
      'Bulk and project-quantity procurement',
    ],
    highlights: [
      { stat: '50+', label: 'Products Stocked' },
      { stat: '6+', label: 'Partner Manufacturers' },
      { stat: 'BS 500', label: 'Steel Standard' },
    ],
  },
  'waste-management': {
    title: 'Waste Management',
    label: 'Environment',
    excerpt: 'Comprehensive scrap collection, sorting, recycling, and waste-to-energy services for industry and communities.',
    intro:
      'Our waste management division sits at the core of our mission. We bridge the gap between informal scrap vendors, industrial generators, and recycling facilities — creating an efficient, transparent, and environmentally responsible value chain for steel and industrial waste in Tanzania.',
    features: [
      'Scrap metal collection and aggregation',
      'Industrial waste sorting and processing',
      'Steel recycling and material recovery',
      'Waste-to-energy program development',
      'Community waste collection partnerships',
      'Compliance documentation and reporting',
    ],
    highlights: [
      { stat: '∞', label: 'Recyclable Materials' },
      { stat: 'Zero', label: 'Waste-to-Landfill Goal' },
      { stat: 'CO₂', label: 'Reduction Focus' },
    ],
  },
}

export async function generateStaticParams() {
  return Object.keys(staticServices).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = staticServices[params.slug]
  if (!service) return {}
  return {
    title: service.title,
    description: service.excerpt,
  }
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = staticServices[params.slug]
  if (!service) notFound()

  return (
    <>
      <PageHeader
        label={service.label}
        title={service.title}
        subtitle={service.excerpt}
      />

      {/* Intro */}
      <section className="bg-white py-section">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <AnimatedSection>
              <SectionLabel className="mb-5">Overview</SectionLabel>
              <h2 className="font-heading text-4xl text-navy leading-tight mb-6">
                What This Service Covers
              </h2>
              <p className="font-body text-slate leading-relaxed mb-8 text-lg">
                {service.intro}
              </p>
              <Button href="/contact" variant="ghost">
                Request a Quote
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </AnimatedSection>

            {/* Features list */}
            <AnimatedSection delay={0.1}>
              <div className="bg-cream border border-sand p-8 lg:p-10">
                <h3 className="font-heading text-xl text-navy mb-6">Key Capabilities</h3>
                <ul className="space-y-4">
                  {service.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-4 font-body text-slate text-sm">
                      <span className="shrink-0 w-6 h-6 bg-gold flex items-center justify-center text-navy text-xs font-semibold mt-0.5">
                        {i + 1}
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-navy py-16">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-3 gap-8 divide-x divide-white/10">
            {service.highlights.map((item, i) => (
              <div key={i} className="text-center">
                <div className="font-heading text-4xl lg:text-5xl text-gold mb-2">{item.stat}</div>
                <div className="font-body text-xs text-white/50 tracking-widest uppercase">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        heading={`Ready to Use Our ${service.label} Services?`}
        subtext="Get in touch with our team for a custom quote or to discuss your specific requirements."
        primaryLabel="Get in Touch"
        primaryHref="/contact"
        secondaryLabel="All Services"
        secondaryHref="/services"
      />
    </>
  )
}
