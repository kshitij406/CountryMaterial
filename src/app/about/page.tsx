import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { aboutPageQuery } from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'About Country Materials Limited',
  description: "Founded in 2022 in Dar es Salaam, Country Materials Limited built Tanzania's first fully integrated circular steel ecosystem.",
}

export const revalidate = 60

const milestones = [
  { year: '2022', event: "Founded in Dar es Salaam with a vision to formalise Tanzania's scrap-to-steel supply chain." },
  { year: '2023', event: 'Launched mobile vendor platform. Onboarded 2,000+ scrap vendors within 6 months.' },
  { year: '2024', event: 'Achieved BS 500B and TBS certification. Opened branches in Mbeya and Dodoma.' },
  { year: '2025', event: 'Expanded to 5 branches, 30+ fleet vehicles, $11.2M revenue, 5,000+ vendors digitised.' },
]

const values = [
  {
    title: 'Circular First',
    body: "Every tonne of steel we produce comes from recycled scrap. Sustainability isn't a marketing word here — it's the business model.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
    ),
  },
  {
    title: 'Vendor First',
    body: 'We built the network from the ground up — by paying fair prices, providing instant mobile money, and treating informal collectors as partners.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    ),
  },
  {
    title: 'Quality Uncompromised',
    body: 'BS 500B. TBS. ISO 9001. We certify every batch because the buildings this steel reinforces depend on it — and so do the people inside.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    ),
  },
  {
    title: 'Tanzania-Rooted',
    body: 'Our team, our vendors, and our clients are Tanzanian. We reinvest in local communities and create skilled jobs across 5 regions.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>
    ),
  },
]

export default async function AboutPage() {
  const about = await client.fetch(aboutPageQuery).catch(() => null)

  return (
    <>
      {/* Page hero */}
      <section
        className="relative min-h-[52vh] flex flex-col justify-end overflow-hidden pt-20"
        style={{ background: '#0B1D3A' }}
        aria-label="About page hero"
      >
        <div className="absolute inset-0">
          <Image src="/images/company/company-profile.jpg" alt="Country Materials facility" fill className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/50 to-navy" />
          <div className="absolute inset-0 bg-steel-texture" aria-hidden="true" />
        </div>
        <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pb-16 sm:pb-24 pt-12">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-gold mb-6">About Us</p>
          <h1 className="font-black text-[clamp(48px,8vw,110px)] leading-[0.92] tracking-tight text-white">
            Built for Tanzania.<br />
            <span className="text-gold">Built to last.</span>
          </h1>
          <p className="mt-6 text-[17px] text-white/55 max-w-xl leading-relaxed">
            {about?.intro ?? "Country Materials Limited is Tanzania's leading circular steel manufacturer and scrap recycling ecosystem — founded in 2022, headquartered in Dar es Salaam."}
          </p>
        </div>
      </section>

      {/* Mission + Vision */}
      <section className="py-20 sm:py-28 overflow-hidden" style={{ background: '#FAF7F2' }} aria-label="Mission and vision">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px" style={{ background: '#E8DED1' }}>

            <div className="p-10 sm:p-14 reveal" style={{ background: '#FAF7F2' }}>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-gold mb-6">Our Mission</p>
              <p className="font-black text-[clamp(20px,2.5vw,32px)] text-ink leading-tight">
                {about?.mission ?? "To formalise Tanzania's scrap economy into a world-class circular steel supply chain that creates jobs, reduces waste, and builds the nation."}
              </p>
            </div>

            <div className="p-10 sm:p-14 reveal" style={{ background: '#F0E8DC' }}>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-gold mb-6">Our Vision</p>
              <p className="font-black text-[clamp(20px,2.5vw,32px)] text-ink leading-tight">
                {about?.vision ?? "To be Africa's most trusted circular steel ecosystem — the model that other African nations replicate to build sustainable construction industries."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story / Milestones */}
      <section className="py-20 sm:py-28" style={{ background: '#0B1D3A' }} aria-label="Company milestones">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div className="reveal">
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-gold mb-6">Our Story</p>
              <h2 className="font-black text-[clamp(32px,4vw,60px)] text-white leading-none tracking-tight mb-8">
                From idea to<br />industry-defining<br />network.
              </h2>
              <p className="text-[15px] text-white/50 leading-relaxed mb-10">
                {typeof about?.body === 'string'
                  ? about.body
                  : "Country Materials was founded with one observation: Tanzania had abundant scrap metal, strong construction demand, and zero organised supply chain connecting them. We built the bridge — from informal scrap vendors with mobile phones to certified steel leaving certified yards."}
              </p>

              {/* Timeline */}
              <div style={{ borderTop: '1px solid rgba(200,150,46,0.15)' }}>
                {milestones.map((m) => (
                  <div
                    key={m.year}
                    className="grid grid-cols-[72px_1fr] gap-6 py-5"
                    style={{ borderBottom: '1px solid rgba(200,150,46,0.1)' }}
                  >
                    <span className="font-mono font-bold text-[13px] text-gold">{m.year}</span>
                    <p className="text-[14px] text-white/50 leading-relaxed">{m.event}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 reveal">
              <div className="relative h-72 overflow-hidden">
                <Image src="/images/company/group-photo-large.jpg" alt="Country Materials team" fill className="object-cover" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative h-44 overflow-hidden">
                  <Image src="/images/company/wastee.jpg" alt="Scrap collection" fill className="object-cover" />
                </div>
                <div className="relative h-44 overflow-hidden">
                  <Image src="/images/company/hardware.jpg" alt="Hardware products" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 sm:py-28 overflow-hidden" style={{ background: '#FAF7F2' }} aria-label="Company values" id="values">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">

          <div className="mb-16 reveal">
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-gold mb-4">What We Stand For</p>
            <h2 className="font-black text-[clamp(36px,5vw,72px)] text-ink leading-none tracking-tight">
              The principles<br />behind the product.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-px stagger" style={{ background: '#E8DED1' }}>
            {values.map((v) => (
              <div key={v.title} className="p-8 cursor-default" style={{ background: '#FAF7F2' }}>
                <div className="w-10 h-10 flex items-center justify-center border border-gold/30 text-gold mb-6">
                  {v.icon}
                </div>
                <h3 className="font-black text-[18px] text-ink mb-3">{v.title}</h3>
                <p className="text-[13.5px] text-slate/65 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Decade Development Plan */}
      <section
        className="relative overflow-hidden"
        id="next-decade"
        style={{ background: '#07121F' }}
        aria-label="Next decade development plan"
      >
        {/* Top rule */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gold/20" />

        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[640px]">

            {/* Image panel — left */}
            <div className="relative min-h-[420px] lg:min-h-0 overflow-hidden order-2 lg:order-1">
              <Image
                src="/images/stock/iron-ore-smelting.jpg"
                alt="Industrial furnace — placeholder for factory renders"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Dark overlay */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to right, rgba(7,18,31,0.25) 0%, rgba(7,18,31,0.1) 100%)' }}
              />
              {/* Placeholder label — remove when real renders arrive */}
              <div
                className="absolute bottom-4 left-4 px-3 py-1.5"
                style={{ background: 'rgba(7,18,31,0.88)', border: '1px solid rgba(200,150,46,0.35)' }}
              >
                <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-gold/75">
                  Placeholder — swap with factory renders
                </span>
              </div>
              {/* Watermark */}
              <span
                className="absolute top-5 right-6 font-mono font-bold select-none pointer-events-none text-white/8"
                style={{ fontSize: '96px', lineHeight: 1 }}
                aria-hidden="true"
              >
                ND
              </span>
            </div>

            {/* Content panel — right */}
            <div
              className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20 py-20 lg:py-28 order-1 lg:order-2"
              style={{ background: '#07121F' }}
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-4 mb-8 reveal">
                <span className="block w-8 h-px bg-gold" aria-hidden="true" />
                <span className="font-mono text-[10px] tracking-[0.30em] uppercase text-gold">
                  Next Decade Development Plan
                </span>
              </div>

              {/* Headline */}
              <h2 className="font-black text-[clamp(30px,3.5vw,52px)] text-white leading-tight tracking-tight mb-7 reveal">
                The Future of Steel.<br />
                <span className="text-gold">Made in Tanzania.</span>
              </h2>

              {/* Body */}
              <p className="text-[15px] text-white/55 leading-relaxed mb-8 max-w-lg reveal">
                The upcoming Country Materials factory will be a state-of-the-art facility equipped with the latest machinery to produce virgin steel in Tanzania. It will be the second facility on the African continent capable of producing virgin steel directly from iron ore, after South Africa. This process requires no mixing and produces superior quality steel billets — setting a new standard for locally manufactured construction materials. Our vision is to provide Tanzanians with the highest quality products that uplift local industry and compete directly against imported steel.
              </p>

              {/* Pull quote */}
              <blockquote
                className="mb-10 pl-5 reveal"
                style={{ borderLeft: '2px solid rgba(200,150,46,0.6)' }}
              >
                <p className="font-black text-[clamp(20px,2.2vw,28px)] text-gold leading-tight">
                  &ldquo;Second only to South Africa.<br />First in Tanzania.&rdquo;
                </p>
              </blockquote>

              {/* Three callouts */}
              <div
                className="grid grid-cols-1 sm:grid-cols-3 reveal"
                style={{ borderTop: '1px solid rgba(200,150,46,0.12)' }}
              >
                {[
                  { title: 'Virgin Steel Production', sub: 'No mixing. No compromise.' },
                  { title: 'Superior Quality Billets', sub: 'Highest grade. Locally made.' },
                  { title: 'Import Replacement', sub: 'Built for Tanzania. Scaled for Africa.' },
                ].map((item, i) => (
                  <div
                    key={item.title}
                    className="pt-6 pb-2 pr-4"
                    style={{
                      borderRight: i < 2 ? '1px solid rgba(200,150,46,0.10)' : undefined,
                      paddingLeft: i > 0 ? '1rem' : undefined,
                    }}
                  >
                    <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-gold/70 mb-1">
                      {item.title}
                    </p>
                    <p className="text-[12px] text-white/35 leading-snug">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom rule */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gold/10" />
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-24 text-center" style={{ background: '#0B1D3A' }} aria-label="Contact call to action">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-2xl mx-auto reveal">
            <h2 className="font-black text-[clamp(28px,4vw,56px)] text-white leading-tight mb-5">
              Want to know more?<br />
              <span className="text-gold">Let&apos;s talk.</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold text-[15px] px-8 py-4 transition-colors duration-200 cursor-pointer">
                Contact Us
              </Link>
              <Link href="/shop" className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold text-[15px] px-8 py-4 transition-all duration-200 cursor-pointer">
                View Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
