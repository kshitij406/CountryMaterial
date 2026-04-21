import type { Metadata } from 'next'
import { client, urlFor } from '@/sanity/lib/client'
import { aboutPageQuery } from '@/sanity/lib/queries'
import PageHeader from '@/components/ui/PageHeader'
import CtaBanner from '@/components/sections/CtaBanner'
import Image from 'next/image'

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

function ptToParagraphs(blocks: any[] | null | undefined): string[] {
  if (!blocks?.length) return []
  return blocks
    .filter((b: any) => b._type === 'block')
    .map((b: any) => (b.children ?? []).map((c: any) => c.text ?? '').join(''))
    .filter(Boolean)
}

const fallbackValues = [
  { _key: 'v1', title: 'Quality Excellence', desc: 'Uncompromising standards across every product and service we deliver.' },
  { _key: 'v2', title: 'Community Responsibility', desc: 'We measure success not just in profit, but in the positive impact we leave on communities and the environment.' },
  { _key: 'v3', title: 'Team Collaboration', desc: 'Our strength lies in the collective effort of our team and the partnerships we build with clients and suppliers.' },
]

const fallbackWhyChooseUs = [
  { title: 'Quality Assurance', description: 'Every product we supply meets rigorous quality standards. We partner only with certified manufacturers and maintain strict sourcing criteria.' },
  { title: 'Innovation', description: 'We continuously adopt modern practices — from waste-to-energy solutions to digital logistics management — to deliver smarter outcomes.' },
  { title: 'Customer-Centric Approach', description: 'Our clients are partners. We listen, adapt, and go the extra mile to ensure every engagement exceeds expectations.' },
  { title: 'Sustainability', description: 'Through responsible waste management and environmentally conscious operations, we are actively building a greener Tanzania.' },
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
    : null

  const bodyParagraphs = ptToParagraphs(data?.body)

  const values = (data?.values ?? fallbackValues).map((v: any) => ({
    _key: v._key,
    title: v.title,
    desc: v.description ?? v.desc,
  }))

  const whyChooseUs = (data?.whyChooseUs ?? fallbackWhyChooseUs).map((w: any) => ({
    title: w.title,
    description: w.description,
  }))

  return (
    <>
      <PageHeader
        label="Our Story"
        title={data?.heading ?? 'Building Stronger\nFoundations'}
        subtitle={
          data?.intro ??
          'A Dar es Salaam-based company committed to quality materials, responsible waste management, and reliable logistics.'
        }
      />

      {/* Story section */}
      <section
        className="relative py-[120px] px-8 lg:px-16"
        style={{ background: '#0B1D3A', borderBottom: '1px solid rgba(200,150,46,.15)' }}
      >
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-[1fr_1.1fr] gap-20 items-center">
          {/* Image panel */}
          <div className="reveal relative aspect-square max-w-[540px]">
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ border: '1px solid rgba(200,150,46,.25)' }}
            >
              {storyImageUrl ? (
                <Image src={storyImageUrl} alt="Country Materials" fill className="object-cover" />
              ) : (
                <div
                  className="w-full h-full"
                  style={{ background: 'linear-gradient(135deg,#0B1D3A 0%,#1a3666 100%)' }}
                />
              )}
            </div>
            {/* Corner accent */}
            <div className="absolute -bottom-5 -right-5 w-[80px] h-[80px] grid place-items-center" style={{ border: '1px solid rgba(200,150,46,.5)', background: '#C8962E' }}>
              <span className="font-display text-[22px] tracking-[0.1em] text-navy">CM</span>
            </div>
          </div>

          {/* Text */}
          <div className="reveal">
            <div className="flex items-center gap-3.5 mb-7">
              <span className="block h-px w-10 bg-gold" />
              <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold">Who We Are</span>
            </div>
            <h2 className="font-display text-[clamp(36px,4vw,64px)] leading-[0.95] tracking-[0.03em] uppercase text-cream mb-8">
              A Company Built on <span className="text-gold">Integrity</span>
            </h2>
            {bodyParagraphs.length > 0 ? (
              bodyParagraphs.map((p, i) => (
                <p key={i} className="font-barlow text-[16px] text-cream/60 leading-[1.7] mb-5 last:mb-0">{p}</p>
              ))
            ) : (
              <>
                <p className="font-barlow text-[16px] text-cream/60 leading-[1.7] mb-5">
                  Country Materials Ltd was established to bridge a critical gap in Tanzania&apos;s
                  industrial landscape — connecting scrap informal vendors, steel manufacturers, and
                  constructors through a unified, professional service model.
                </p>
                <p className="font-barlow text-[16px] text-cream/60 leading-[1.7] mb-5">
                  Headquartered at Babecov Complex on Buguruni Mandela Road in Dar es Salaam, we
                  operate across three complementary business lines: hardware supply, waste management,
                  and transportation logistics.
                </p>
                <p className="font-barlow text-[16px] text-cream/60 leading-[1.7]">
                  Our partnerships with Tanzania&apos;s leading steel companies — Lake Steel, Kamal
                  Steel, Steelmast, and others — reflect the trust the industry places in our ability
                  to deliver consistently and professionally.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section
        className="relative py-[120px] px-8 lg:px-16"
        style={{ background: '#05101f', borderBottom: '1px solid rgba(200,150,46,.15)' }}
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 20% 50%,rgba(200,150,46,.1),transparent 55%)' }}
        />
        <div className="relative max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x" style={{ borderColor: 'rgba(200,150,46,.2)' }}>
          <div className="reveal pb-16 lg:pb-0 lg:pr-20" style={{ borderColor: 'rgba(200,150,46,.2)' }}>
            <span className="font-space text-[11px] tracking-[0.2em] text-gold/60">{'// VISION'}</span>
            <h3 className="font-display text-[clamp(32px,3.5vw,56px)] leading-[0.95] tracking-[0.03em] uppercase text-cream mt-4 mb-6">
              Leading Waste<br /><span className="text-gold">Management</span>
            </h3>
            <p className="font-barlow text-[16px] text-cream/55 leading-[1.7]">{vision}</p>
          </div>
          <div className="reveal pt-16 lg:pt-0 lg:pl-20" style={{ borderColor: 'rgba(200,150,46,.2)' }}>
            <span className="font-space text-[11px] tracking-[0.2em] text-gold/60">{'// MISSION'}</span>
            <h3 className="font-display text-[clamp(32px,3.5vw,56px)] leading-[0.95] tracking-[0.03em] uppercase text-cream mt-4 mb-6">
              Connecting the <span className="text-gold">Full Chain</span>
            </h3>
            <p className="font-barlow text-[16px] text-cream/55 leading-[1.7]">{mission}</p>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section
        className="relative py-[120px] px-8 lg:px-16"
        style={{ background: '#0B1D3A', borderBottom: '1px solid rgba(200,150,46,.15)' }}
      >
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-8 mb-16 reveal">
            <div>
              <div className="flex items-center gap-3.5 mb-5">
                <span className="block h-px w-10 bg-gold" />
                <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold">What We Stand For</span>
              </div>
              <h2 className="font-display text-[clamp(40px,4.5vw,72px)] leading-[0.9] tracking-[0.03em] uppercase text-cream">
                Our Core <span className="text-gold">Values</span>
              </h2>
            </div>
            <span className="font-space text-[12px] text-gold/50 tracking-[0.2em]">{'// 03 — PRINCIPLES'}</span>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 stagger"
            style={{ borderTop: '1px solid rgba(200,150,46,.2)' }}
          >
            {values.map((v: any, i: number) => (
              <div
                key={v._key ?? i}
                className="py-12 px-8"
                style={{ borderRight: i < values.length - 1 ? '1px solid rgba(200,150,46,.15)' : undefined }}
              >
                <div className="w-10 h-px bg-gold mb-8" />
                <h3 className="font-display text-[clamp(24px,2.5vw,36px)] leading-[1] tracking-[0.04em] uppercase text-cream mb-4">{v.title}</h3>
                <p className="font-barlow text-[15px] text-cream/50 leading-[1.65]">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        className="relative py-[120px] px-8 lg:px-16"
        style={{ background: '#05101f', borderBottom: '1px solid rgba(200,150,46,.15)' }}
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 80% 50%,rgba(200,150,46,.08),transparent 55%)' }}
        />
        <div className="relative max-w-[1440px] mx-auto">
          <div className="flex items-center gap-3.5 mb-5 reveal">
            <span className="block h-px w-10 bg-gold" />
            <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold">Why Country Materials</span>
          </div>
          <h2 className="font-display text-[clamp(40px,4.5vw,72px)] leading-[0.9] tracking-[0.03em] uppercase text-cream mb-16 reveal">
            Why Clients Choose <span className="text-gold">Us</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 stagger" style={{ borderTop: '1px solid rgba(200,150,46,.2)', borderLeft: '1px solid rgba(200,150,46,.2)' }}>
            {whyChooseUs.map((item: any, i: number) => (
              <div
                key={i}
                className="p-10"
                style={{ borderRight: '1px solid rgba(200,150,46,.2)', borderBottom: '1px solid rgba(200,150,46,.2)' }}
              >
                <span className="font-space text-[11px] text-gold/50 tracking-[0.2em]">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-display text-[clamp(22px,2vw,32px)] leading-[1] tracking-[0.04em] uppercase text-cream mt-3 mb-4">{item.title}</h3>
                <p className="font-barlow text-[15px] text-cream/50 leading-[1.65]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        heading="Let's Build\nTogether"
        subtext="Reach out to discuss your materials, logistics, or waste management needs."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="Our Services"
        secondaryHref="/services"
      />
    </>
  )
}
