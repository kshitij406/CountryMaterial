import Image from 'next/image'

interface AboutStripProps {
  heading?: string
  lead?: string
  body?: string
  founderInitials?: string
  founderName?: string
  founderRole?: string
}

export default function AboutStrip({
  heading = 'Built for the long term.',
  lead = 'Regenerative steel recycler integrating scrap vendors, manufacturers, and construction into a circular supply chain powered by technology.',
  body = 'We transform scrap metal into high-quality, certified steel for affordable construction while empowering informal scrap vendors and driving sustainable industrial growth across Africa.',
  founderInitials = 'CM',
  founderName = 'Country Materials',
  founderRole = 'Circular Steel Ecosystem',
}: AboutStripProps) {
  const headingLines = heading.split('\n')

  return (
    <section className="relative bg-white py-20 sm:py-24 lg:py-[120px] px-5 sm:px-8 lg:px-16" id="about">
      <div className="max-w-[1440px] mx-auto grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-center">
        <div className="reveal">
          <div className="relative min-h-[300px] sm:min-h-[420px] lg:min-h-[500px] overflow-hidden" style={{ border: '1px solid #D8E0E7' }}>
            <Image src="/images/hero-steel-placeholder.svg" alt="Country Materials yard operations" fill className="object-cover" />
          </div>
          <div className="grid grid-cols-3 gap-3 mt-3">
            {['TBS ready stock', 'Certified supply', 'Regional dispatch'].map((item) => (
              <div key={item} className="bg-charcoal px-3 py-2.5 text-center" style={{ border: '1px solid #E6ECF1' }}>
                <span className="font-condensed text-[10px] tracking-[0.16em] uppercase text-slate/75">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal">
          <div className="flex items-center gap-3.5 mb-6">
            <span className="block h-px w-8 bg-gold" />
            <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold">About country materials</span>
          </div>

          <h2 className="font-display text-[clamp(32px,5vw,68px)] leading-[0.92] tracking-[0.03em] uppercase text-slate">
            {headingLines.map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h2>

          <p className="mt-6 font-barlow text-[17px] text-slate/82 leading-[1.58]">{lead}</p>
          <p className="mt-4 font-barlow text-[15px] text-slate/70 leading-[1.6] max-w-[560px]">{body}</p>

          <div className="mt-10 grid grid-cols-2 gap-4 max-w-[520px]">
            <div className="bg-charcoal p-4" style={{ border: '1px solid #E6ECF1' }}>
              <div className="font-display text-[34px] leading-none text-gold">50K+</div>
              <div className="font-condensed text-[11px] tracking-[0.18em] uppercase text-slate/70 mt-2">Metric tons recycled</div>
            </div>
            <div className="bg-charcoal p-4" style={{ border: '1px solid #E6ECF1' }}>
              <div className="font-display text-[34px] leading-none text-gold">5,000+</div>
              <div className="font-condensed text-[11px] tracking-[0.18em] uppercase text-slate/70 mt-2">Vendors on platform</div>
            </div>
          </div>

          <div className="mt-8 pt-6 flex items-center gap-4" style={{ borderTop: '1px solid #D8E0E7' }}>
            <span className="font-display text-[34px] text-gold leading-none tracking-[0.02em]">{founderInitials}</span>
            <div>
              <div className="font-barlow font-semibold text-[15px] tracking-[0.05em] uppercase text-slate">{founderName}</div>
              <div className="font-condensed text-[11px] tracking-[0.18em] uppercase text-slate/65 mt-0.5">{founderRole}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
