import Link from 'next/link'

interface HeroSectionProps {
  videoSrc?: string | null
  headingLine1?: string
  headingLine2?: string
  subheading?: string
}

export default function HeroSection({
  videoSrc: _videoSrc,
  headingLine1 = 'Steel and Scrap',
  headingLine2 = 'You Can Trust.',
  subheading = 'Regenerative steel recycler integrating scrap vendors, manufacturers, and construction into a circular supply chain powered by technology.',
}: HeroSectionProps) {
  return (
    <section
      className="relative min-h-[560px] lg:min-h-[680px] pt-36 sm:pt-40 lg:pt-44 pb-14 sm:pb-20 flex items-end overflow-hidden bg-navy"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/hero-steel-placeholder.svg')",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      />

      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(100deg,rgba(23,40,56,.82) 12%,rgba(23,40,56,.62) 48%,rgba(23,40,56,.28) 100%)' }}
      />

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-16 pb-16 sm:pb-24">
        <div className="flex items-center gap-4 mb-6 reveal">
          <span className="block h-px w-10 bg-gold flex-shrink-0" />
          <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-white/90">
            Dar es Salaam | Est. 2022
          </span>
        </div>

        <h1 className="reveal font-display uppercase leading-[0.9] tracking-[0.03em] text-[clamp(42px,8.2vw,118px)] max-w-[980px] text-white">
          <span className="block">{headingLine1}</span>
          <span className="block text-gold-light">{headingLine2}</span>
        </h1>

        <p className="reveal mt-7 sm:mt-9 font-barlow text-[16px] sm:text-[18px] text-white/90 leading-[1.6] max-w-[620px]">
          {subheading}
        </p>

        <div className="reveal flex flex-col sm:flex-row gap-3 sm:gap-4 mt-9 sm:mt-11">
          <Link
            href="/shop"
            className="group relative inline-flex items-center justify-center gap-3 overflow-hidden px-6 sm:px-[34px] py-4 sm:py-[18px] bg-gold text-white font-condensed text-[13px] sm:text-[14px] tracking-[0.2em] uppercase font-semibold"
          >
            <span className="relative z-10">View products</span>
            <svg className="relative z-10 w-3.5 h-3.5 transition-transform duration-400 group-hover:translate-x-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
            <span
              className="absolute inset-0 bg-gold-dim -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
              style={{ transitionTimingFunction: 'cubic-bezier(.16,1,.3,1)' }}
            />
          </Link>

          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center gap-3 overflow-hidden px-6 sm:px-[34px] py-4 sm:py-[18px] border border-cream/70 text-white font-condensed text-[13px] sm:text-[14px] tracking-[0.2em] uppercase font-semibold"
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">Request a quote</span>
            <svg
              className="relative z-10 w-3.5 h-3.5 group-hover:text-white transition-all duration-400 group-hover:translate-x-1.5"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
            <span
              className="absolute inset-0 bg-cream/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
              style={{ transitionTimingFunction: 'cubic-bezier(.16,1,.3,1)' }}
            />
          </Link>
        </div>

        <div className="reveal mt-10 sm:mt-12 inline-flex flex-wrap items-center gap-x-8 gap-y-3 text-white/85">
          <span className="font-condensed text-[11px] tracking-[0.2em] uppercase">100% locally sourced scrap</span>
          <span className="font-condensed text-[11px] tracking-[0.2em] uppercase">BS 500 certified steel</span>
          <span className="font-condensed text-[11px] tracking-[0.2em] uppercase">5,000+ vendors digitized</span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-cream/35 z-20" />
    </section>
  )
}
