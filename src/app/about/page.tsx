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
      'Learn about Country Materials Limited - our mission, vision, and values powering a circular steel supply chain in Tanzania.',
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
  { _key: 'v1', title: 'People', desc: 'We create dignity and earning power for informal scrap vendors while building safe, skilled teams.' },
  { _key: 'v2', title: 'Planet', desc: 'We turn waste into certified steel and keep valuable materials in circulation through responsible operations.' },
  { _key: 'v3', title: 'Partnership', desc: 'We build long-term relationships across vendors, manufacturers, and builders through trust and transparency.' },
]

const fallbackWhyChooseUs = [
  { title: 'Fully Integrated Circular Model', description: '100% locally sourced scrap and an end-to-end operating model that reduces friction across collection, processing, and supply.' },
  { title: 'Proprietary Vendor Platform', description: 'A mobile platform digitizing 5,000+ vendors to improve transparency, traceability, and access to consistent scrap supply.' },
  { title: 'Certified Steel at Local Pricing', description: 'BS 500 certified steel products delivered with clear specifications and competitive local pricing.' },
  { title: 'Scale With a Clear Roadmap', description: 'A pipeline for a state-of-the-art virgin steel factory (details TBC) to increase capacity and expand product range.' },
]

export default async function AboutPage() {
  const data = await client.fetch(aboutPageQuery).catch(() => null)

  const vision =
    data?.vision ??
    "Build Africa's most trusted circular steel ecosystem, making quality construction materials accessible while transforming waste into opportunity for millions."
  const mission =
    data?.mission ??
    'Transform scrap metal into high-quality, certified steel, enabling affordable construction while empowering informal scrap vendors and driving sustainable industrial growth across Africa.'

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

      <section className="relative py-[100px] px-8 lg:px-16 bg-white" style={{ borderBottom: '1px solid #D8E0E7' }}>
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-[1fr_1.1fr] gap-20 items-center">
          <div className="reveal relative aspect-square max-w-[540px]">
            <div className="absolute inset-0 overflow-hidden" style={{ border: '1px solid #D8E0E7' }}>
              {storyImageUrl ? (
                <Image src={storyImageUrl} alt="Country Materials" fill className="object-cover" />
              ) : (
                <Image src="/images/hero-steel-placeholder.svg" alt="Country Materials" fill className="object-cover" />
              )}
            </div>
            <div className="absolute -bottom-5 -right-5 w-[80px] h-[80px] grid place-items-center" style={{ border: '1px solid #B9D1E4', background: '#2E6FA3' }}>
              <span className="font-display text-[22px] tracking-[0.1em] text-white">CM</span>
            </div>
          </div>

          <div className="reveal">
            <div className="flex items-center gap-3.5 mb-7">
              <span className="block h-px w-10 bg-gold" />
              <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold">Who We Are</span>
            </div>
            <h2 className="font-display text-[clamp(36px,4vw,64px)] leading-[0.95] tracking-[0.03em] uppercase text-slate mb-8">
              A Company Built on <span className="text-gold">Integrity</span>
            </h2>
            {bodyParagraphs.length > 0 ? (
              bodyParagraphs.map((p, i) => (
                <p key={i} className="font-barlow text-[16px] text-slate/75 leading-[1.7] mb-5 last:mb-0">{p}</p>
              ))
            ) : (
              <>
                <p className="font-barlow text-[16px] text-slate/75 leading-[1.7] mb-5">
                  Country Materials Limited is a regenerative steel recycler integrating scrap vendors,
                  manufacturers, and construction into a circular supply chain powered by technology.
                </p>
                <p className="font-barlow text-[16px] text-slate/75 leading-[1.7] mb-5">
                  Headquartered at Babecov Complex on Buguruni Mandela Road in Dar es Salaam, we
                  operate across scrap collection, recycling, and certified steel supply.
                </p>
                <p className="font-barlow text-[16px] text-slate/75 leading-[1.7]">
                  Through a proprietary mobile platform with 5,000+ digitized vendors and a fully
                  integrated model based on 100% locally sourced scrap, we deliver BS 500 certified
                  steel at competitive local pricing.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="relative py-[100px] px-8 lg:px-16 bg-charcoal" style={{ borderBottom: '1px solid #D8E0E7' }}>
        <div className="relative max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-5">
          <div className="reveal p-8 bg-white" style={{ border: '1px solid #D8E0E7' }}>
            <span className="font-space text-[11px] tracking-[0.2em] text-gold/75">SECTION VISION</span>
            <h3 className="font-display text-[clamp(32px,3.5vw,56px)] leading-[0.95] tracking-[0.03em] uppercase text-slate mt-4 mb-6">
              Building a Trusted<br /><span className="text-gold">Circular Ecosystem</span>
            </h3>
            <p className="font-barlow text-[16px] text-slate/75 leading-[1.7]">{vision}</p>
          </div>
          <div className="reveal p-8 bg-white" style={{ border: '1px solid #D8E0E7' }}>
            <span className="font-space text-[11px] tracking-[0.2em] text-gold/75">SECTION MISSION</span>
            <h3 className="font-display text-[clamp(32px,3.5vw,56px)] leading-[0.95] tracking-[0.03em] uppercase text-slate mt-4 mb-6">
              Transforming <span className="text-gold">Scrap to Steel</span>
            </h3>
            <p className="font-barlow text-[16px] text-slate/75 leading-[1.7]">{mission}</p>
          </div>
        </div>
      </section>

      <section className="relative py-[100px] px-8 lg:px-16 bg-white" style={{ borderBottom: '1px solid #D8E0E7' }}>
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-8 mb-14 reveal">
            <div>
              <div className="flex items-center gap-3.5 mb-5">
                <span className="block h-px w-10 bg-gold" />
                <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold">What We Stand For</span>
              </div>
              <h2 className="font-display text-[clamp(40px,4.5vw,72px)] leading-[0.9] tracking-[0.03em] uppercase text-slate">
                Our Core <span className="text-gold">Values</span>
              </h2>
            </div>
            <span className="font-space text-[12px] text-gold/75 tracking-[0.2em]">{'// 03 - PRINCIPLES'}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 stagger">
            {values.map((v: any, i: number) => (
              <div key={v._key ?? i} className="py-10 px-8 bg-charcoal" style={{ border: '1px solid #D8E0E7' }}>
                <div className="w-10 h-px bg-gold mb-8" />
                <h3 className="font-display text-[clamp(24px,2.5vw,36px)] leading-[1] tracking-[0.04em] uppercase text-slate mb-4">{v.title}</h3>
                <p className="font-barlow text-[15px] text-slate/70 leading-[1.65]">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-[100px] px-8 lg:px-16 bg-charcoal" style={{ borderBottom: '1px solid #D8E0E7' }}>
        <div className="relative max-w-[1440px] mx-auto">
          <div className="flex items-center gap-3.5 mb-5 reveal">
            <span className="block h-px w-10 bg-gold" />
            <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold">Why Country Materials</span>
          </div>
          <h2 className="font-display text-[clamp(40px,4.5vw,72px)] leading-[0.9] tracking-[0.03em] uppercase text-slate mb-14 reveal">
            Why Clients Choose <span className="text-gold">Us</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 stagger">
            {whyChooseUs.map((item: any, i: number) => (
              <div key={i} className="p-8 bg-white" style={{ border: '1px solid #D8E0E7' }}>
                <span className="font-space text-[11px] text-gold/65 tracking-[0.2em]">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-display text-[clamp(22px,2vw,32px)] leading-[1] tracking-[0.04em] uppercase text-slate mt-3 mb-4">{item.title}</h3>
                <p className="font-barlow text-[15px] text-slate/70 leading-[1.65]">{item.description}</p>
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
