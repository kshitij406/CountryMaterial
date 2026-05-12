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
  subtext = 'Whether you need steel supply, scrap support, or reliable logistics, our team is ready to help.',
  primaryLabel = 'Contact Us Today',
  primaryHref = '/contact',
  secondaryLabel = 'View Our Services',
  secondaryHref = '/services',
}: CtaBannerProps) {
  const lines = heading.replace(/\\n/g, '\n').split('\n')

  return (
    <section className="relative py-[110px] px-8 lg:px-16 overflow-hidden bg-navy" style={{ borderTop: '1px solid rgba(216,224,231,.35)' }}>
      <div className="relative max-w-[1440px] mx-auto text-center reveal">
        <div className="flex items-center justify-center gap-3.5 mb-8">
          <span className="block h-px w-10 bg-gold" />
          <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-white/90">Get in touch</span>
          <span className="block h-px w-10 bg-gold" />
        </div>

        <h2 className="font-display text-[clamp(44px,7vw,96px)] leading-[0.9] tracking-[0.03em] uppercase text-white mb-8">
          {lines.map((line, i) => (
            <span key={i} className="block">
              {i === lines.length - 1 ? <span className="text-gold-light">{line}</span> : line}
            </span>
          ))}
        </h2>

        {subtext && (
          <p className="font-barlow text-[16px] text-white/75 max-w-2xl mx-auto mb-10 leading-[1.65]">
            {subtext}
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={primaryHref}
            className="group relative inline-flex items-center gap-3 overflow-hidden px-[34px] py-[16px] bg-gold text-white font-condensed text-[14px] tracking-[0.22em] uppercase font-semibold"
          >
            <span className="relative z-10">{primaryLabel}</span>
            <svg className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
            <span className="absolute inset-0 bg-gold-dim -translate-x-full group-hover:translate-x-0 transition-transform duration-500" style={{ transitionTimingFunction: 'cubic-bezier(.16,1,.3,1)' }} />
          </Link>
          {secondaryHref && (
            <Link
              href={secondaryHref}
              className="group relative inline-flex items-center gap-3 overflow-hidden px-[34px] py-[16px] border border-cream/70 text-white font-condensed text-[14px] tracking-[0.22em] uppercase font-semibold"
            >
              <span className="relative z-10">{secondaryLabel}</span>
              <svg className="relative z-10 w-3.5 h-3.5 transition-all duration-300 group-hover:translate-x-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
              <span className="absolute inset-0 bg-cream/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" style={{ transitionTimingFunction: 'cubic-bezier(.16,1,.3,1)' }} />
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
