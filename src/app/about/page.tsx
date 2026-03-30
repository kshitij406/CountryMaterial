import type { Metadata } from 'next'
import { client, urlFor } from '@/sanity/lib/client'
import { aboutPageQuery } from '@/sanity/lib/queries'
import PageHeader from '@/components/ui/PageHeader'
import AnimatedSection from '@/components/animations/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import CtaBanner from '@/components/sections/CtaBanner'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(aboutPageQuery).catch(() => null)
  return {
    title: data?.heading ?? 'About Us',
    description:
      data?.intro ??
      'Learn about Country Materials Ltd — our story, vision, mission, and the values driving our work in Tanzania.',
  }
}

// Extract plain-text paragraphs from Sanity portable text blocks
function ptToParagraphs(blocks: any[] | null | undefined): string[] {
  if (!blocks?.length) return []
  return blocks
    .filter((b: any) => b._type === 'block')
    .map((b: any) => (b.children ?? []).map((c: any) => c.text ?? '').join(''))
    .filter(Boolean)
}

const fallbackValues = [
  { _key: 'v1', icon: '◈', title: 'Quality Excellence', desc: 'Uncompromising standards across every product and service we deliver.' },
  { _key: 'v2', icon: '◉', title: 'Community & Environmental Responsibility', desc: 'We measure success not just in profit, but in the positive impact we leave on communities and the environment.' },
  { _key: 'v3', icon: '◎', title: 'Team Collaboration', desc: 'Our strength lies in the collective effort of our team and the partnerships we build with clients and suppliers.' },
]

const fallbackWhyChooseUs = [
  { icon: '◈', title: 'Quality Assurance', description: 'Every product we supply meets rigorous quality standards. We partner only with certified manufacturers and maintain strict sourcing criteria.' },
  { icon: '◉', title: 'Innovation', description: 'We continuously adopt modern practices — from waste-to-energy solutions to digital logistics management — to deliver smarter outcomes.' },
  { icon: '◎', title: 'Customer-Centric Approach', description: 'Our clients are partners. We listen, adapt, and go the extra mile to ensure every engagement exceeds expectations.' },
  { icon: '◆', title: 'Sustainability', description: 'Through responsible waste management and environmentally conscious operations, we are actively building a greener Tanzania.' },
]

export default async function AboutPage() {
  const data = await client.fetch(aboutPageQuery).catch(() => null)

  const vision =
    data?.vision ??
    'Become a leading Steel Waste Management company in the region with presence across the country.'
  const mission =
    data?.mission ??
    'Bridge the gap between scrap informal vendors, steel manufacturers and constructors through a steel waste management company.'

  const storyImageUrl = data?.images?.[0]
    ? urlFor(data.images[0]).width(800).height(800).url()
    : '/images/about-main.jpg'

  const bodyParagraphs = ptToParagraphs(data?.body)

  const values = (data?.values ?? fallbackValues).map((v: any) => ({
    _key: v._key,
    icon: v.icon ?? '◆',
    title: v.title,
    desc: v.description ?? v.desc,
  }))

  const whyChooseUs = (data?.whyChooseUs ?? fallbackWhyChooseUs).map((w: any) => ({
    icon: w.icon ?? '◆',
    title: w.title,
    description: w.description,
  }))

  return (
    <>
      <PageHeader
        label="Our Story"
        title={data?.heading ?? 'Building Stronger Foundations for Tanzania'}
        subtitle={
          data?.intro ??
          'A Dar es Salaam-based company committed to quality materials, responsible waste management, and reliable logistics.'
        }
      />

      {/* Story section */}
      <section className="bg-white py-section">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <AnimatedSection>
              <div className="relative aspect-square max-w-lg">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${storyImageUrl}')` }}
                />
                <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 border-2 border-gold/40 -z-10" />
                <div className="absolute -top-4 -left-4 bg-gold w-24 h-24 flex items-center justify-center">
                  <span className="font-heading text-navy text-3xl">CM</span>
                </div>
              </div>
            </AnimatedSection>

            <div>
              <AnimatedSection>
                <SectionLabel className="mb-5">Who We Are</SectionLabel>
                <h2 className="font-heading text-4xl lg:text-5xl text-navy leading-tight mb-6">
                  A Company Built on Integrity and Purpose
                </h2>
              </AnimatedSection>
              <AnimatedSection delay={0.1}>
                {bodyParagraphs.length > 0 ? (
                  bodyParagraphs.map((p, i) => (
                    <p key={i} className="font-body text-slate leading-relaxed mb-5 last:mb-0">{p}</p>
                  ))
                ) : (
                  <>
                    <p className="font-body text-slate leading-relaxed mb-5">
                      Country Materials Ltd was established to bridge a critical gap in Tanzania&apos;s
                      industrial landscape — connecting scrap informal vendors, steel manufacturers, and
                      constructors through a unified, professional service model.
                    </p>
                    <p className="font-body text-slate leading-relaxed mb-5">
                      Headquartered at Babecov Complex on Buguruni Mandela Road in Dar es Salaam, we
                      operate across three complementary business lines: hardware supply, waste management,
                      and transportation logistics.
                    </p>
                    <p className="font-body text-slate leading-relaxed">
                      Our partnerships with Tanzania&apos;s leading steel companies — Lake Steel, Kamal
                      Steel, Steelmast, and others — reflect the trust the industry places in our ability
                      to deliver consistently and professionally.
                    </p>
                  </>
                )}
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-navy py-section">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <AnimatedSection>
              <div className="border-t-2 border-gold pt-8">
                <SectionLabel light className="mb-4">Our Vision</SectionLabel>
                <h3 className="font-heading text-3xl lg:text-4xl text-white mb-5 leading-tight">
                  Leading Steel Waste Management in the Region
                </h3>
                <p className="font-body text-white/65 leading-relaxed">{vision}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="border-t-2 border-white/20 pt-8">
                <SectionLabel light className="mb-4">Our Mission</SectionLabel>
                <h3 className="font-heading text-3xl lg:text-4xl text-white mb-5 leading-tight">
                  Connecting the Full Value Chain
                </h3>
                <p className="font-body text-white/65 leading-relaxed">{mission}</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="bg-cream py-section">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <AnimatedSection className="text-center mb-14">
            <SectionLabel className="mb-4">What We Stand For</SectionLabel>
            <h2 className="font-heading text-4xl lg:text-5xl text-navy leading-tight max-w-lg mx-auto">
              Our Core Values
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v: any, i: number) => (
              <AnimatedSection key={v._key ?? i} delay={i * 0.1}>
                <div className="bg-white border border-sand p-8 lg:p-10 h-full">
                  <div className="text-4xl text-gold mb-6 font-heading">{v.icon}</div>
                  <h3 className="font-heading text-xl text-navy mb-3">{v.title}</h3>
                  <p className="font-body text-slate/80 leading-relaxed text-sm">{v.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-section">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <AnimatedSection className="mb-14">
            <SectionLabel className="mb-4">Why Country Materials</SectionLabel>
            <h2 className="font-heading text-4xl lg:text-5xl text-navy leading-tight max-w-xl">
              The Reasons Clients Choose Us, Again and Again
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
            {whyChooseUs.map((item: any, i: number) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="flex gap-6 group">
                  <div className="shrink-0 w-12 h-12 bg-cream border border-sand flex items-center justify-center text-gold text-xl font-heading group-hover:bg-gold group-hover:border-gold group-hover:text-navy transition-all duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-navy mb-2">{item.title}</h3>
                    <p className="font-body text-slate/75 leading-relaxed text-sm">{item.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        heading="Let's Build Something Together"
        subtext="Reach out to discuss your materials, logistics, or waste management needs."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="Our Services"
        secondaryHref="/services"
      />
    </>
  )
}
