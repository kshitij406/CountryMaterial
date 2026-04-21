import Link from 'next/link'

interface CtaBannerProps {
  heading?: string
  subtext?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}

export default function CtaBanner({
  heading = 'Ready to\nWork with Us?',
  subtext = 'Whether you need construction materials, waste management services, or reliable logistics — we are here to deliver.',
  primaryLabel = 'Contact Us Today',
  primaryHref = '/contact',
  secondaryLabel = 'View Our Services',
  secondaryHref = '/services',
}: CtaBannerProps) {
  const lines = heading.split('\n')

  return (
    <section
      className="relative py-[140px] px-8 lg:px-16 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 30% 60%,rgba(200,150,46,.15),transparent 55%),
          linear-gradient(180deg,#05101f 0%,#0B1D3A 100%)
        `,
        borderTop: '1px solid rgba(200,150,46,.2)',
      }}
    >
      <div aria-hidden className="grain-overlay absolute inset-0 pointer-events-none z-0" />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'repeating-linear-gradient(90deg,transparent 0 120px,rgba(200,150,46,.04) 120px 121px)' }}
      />

      <div className="relative max-w-[1440px] mx-auto text-center reveal">
        <div className="flex items-center justify-center gap-3.5 mb-8">
          <span className="block h-px w-10 bg-gold" />
          <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold">Get in touch</span>
          <span className="block h-px w-10 bg-gold" />
        </div>

        <h2 className="font-display text-[clamp(48px,7vw,104px)] leading-[0.9] tracking-[0.03em] uppercase text-cream mb-10">
          {lines.map((line, i) => (
            <span key={i} className="block">
              {i === lines.length - 1 ? <span className="text-gold">{line}</span> : line}
            </span>
          ))}
        </h2>

        {subtext && (
          <p className="font-barlow text-[16px] text-cream/55 max-w-xl mx-auto mb-12 leading-[1.65]">
            {subtext}
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={primaryHref}
            className="group relative inline-flex items-center gap-3 overflow-hidden px-[34px] py-[18px] bg-gold text-navy font-condensed text-[14px] tracking-[0.22em] uppercase font-semibold"
          >
            <span className="relative z-10">{primaryLabel}</span>
            <svg className="relative z-10 w-3.5 h-3.5 transition-transform duration-400 group-hover:translate-x-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
            <span className="absolute inset-0 bg-cream -translate-x-full group-hover:translate-x-0 transition-transform duration-500" style={{ transitionTimingFunction: 'cubic-bezier(.16,1,.3,1)' }} />
          </Link>
          {secondaryHref && (
            <Link
              href={secondaryHref}
              className="group relative inline-flex items-center gap-3 overflow-hidden px-[34px] py-[18px] border border-gold text-gold font-condensed text-[14px] tracking-[0.22em] uppercase font-semibold"
            >
              <span className="relative z-10 group-hover:text-navy transition-colors duration-300">{secondaryLabel}</span>
              <svg className="relative z-10 w-3.5 h-3.5 group-hover:text-navy transition-all duration-400 group-hover:translate-x-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
              <span className="absolute inset-0 bg-gold -translate-x-full group-hover:translate-x-0 transition-transform duration-500" style={{ transitionTimingFunction: 'cubic-bezier(.16,1,.3,1)' }} />
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
