import Link from 'next/link'

interface ContactCTAProps {
  heading?: string
  eyebrow?: string
  primaryLabel?: string
  secondaryLabel?: string
  phone?: string
  email?: string
  address?: string
}

export default function ContactCTA({
  heading      = 'Price your\nproject.',
  eyebrow      = 'Speak to us',
  primaryLabel = 'Request a quote',
  secondaryLabel = 'Visit a yard',
  phone        = '+255 768 500 555',
  email        = 'tender@countrymaterials.co.tz',
  address      = 'Babecov Complex, Buguruni Mandela Road, Dar es Salaam',
}: ContactCTAProps) {
  const telHref = `tel:${phone.replace(/[\s-]/g, '')}`
  const headingLines = heading.split('\n')

  return (
    <section
      className="relative py-20 sm:py-28 lg:py-[160px] px-5 sm:px-8 lg:px-16 overflow-hidden"
      id="contact"
      style={{
        background: `
          radial-gradient(ellipse at 80% 40%,rgba(200,150,46,.18),transparent 55%),
          linear-gradient(180deg,#0B1D3A 0%,#05101f 100%)
        `,
        borderTop: '1px solid rgba(200,150,46,.22)',
      }}
    >
      <div aria-hidden className="grain-overlay absolute inset-0 pointer-events-none z-0" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'repeating-linear-gradient(90deg,transparent 0 120px,rgba(200,150,46,.04) 120px 121px)' }}
      />

      <div className="relative max-w-[1440px] mx-auto grid lg:grid-cols-[1.4fr_1fr] gap-12 sm:gap-20 items-end">
        {/* Headline */}
        <div className="reveal">
          <div className="flex items-center gap-3.5 mb-7">
            <span className="block h-px w-10 bg-gold" />
            <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold">{eyebrow}</span>
          </div>
          <h2 className="font-display text-[clamp(38px,8vw,128px)] leading-[0.9] tracking-[0.03em] uppercase text-cream">
            {headingLines.map((line, i) => (
              <span key={i} className="block">
                {i === headingLines.length - 1 ? <span className="text-gold">{line}</span> : line}
              </span>
            ))}
          </h2>
        </div>

        {/* Contact info */}
        <div className="flex flex-col gap-7 pb-3 reveal">
          <div style={{ borderTop: '1px solid rgba(200,150,46,.2)', paddingTop: 14 }}>
            <div className="font-condensed text-[11px] tracking-[0.22em] uppercase text-cream/55">Tender desk</div>
              <div className="mt-1 font-display text-[22px] sm:text-[26px] tracking-[0.04em] text-cream">
              <a href={telHref} className="hover:text-gold transition-colors duration-200">{phone}</a>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(200,150,46,.2)', paddingTop: 14 }}>
            <div className="font-condensed text-[11px] tracking-[0.22em] uppercase text-cream/55">Email</div>
             <div className="mt-1 font-display text-[clamp(16px,2vw,26px)] tracking-[0.04em] text-cream break-all sm:break-normal">
              <a href={`mailto:${email}`} className="hover:text-gold transition-colors duration-200">{email}</a>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(200,150,46,.2)', paddingTop: 14 }}>
            <div className="font-condensed text-[11px] tracking-[0.22em] uppercase text-cream/55">Head office</div>
            <div className="mt-1 font-display text-[clamp(16px,1.6vw,22px)] tracking-[0.04em] text-cream leading-tight">{address}</div>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="lg:col-span-2 flex flex-col sm:flex-row gap-4 reveal">
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center gap-3 overflow-hidden px-6 sm:px-[34px] py-4 sm:py-[18px] bg-gold text-navy font-condensed text-[13px] sm:text-[14px] tracking-[0.22em] uppercase font-semibold"
          >
            <span className="relative z-10">{primaryLabel}</span>
            <svg className="relative z-10 w-3.5 h-3.5 transition-transform duration-400 group-hover:translate-x-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
            <span className="absolute inset-0 bg-cream -translate-x-full group-hover:translate-x-0 transition-transform duration-500" style={{ transitionTimingFunction: 'cubic-bezier(.16,1,.3,1)' }} />
          </Link>
          <Link
            href="/about"
            className="group relative inline-flex items-center justify-center gap-3 overflow-hidden px-6 sm:px-[34px] py-4 sm:py-[18px] border border-gold text-gold font-condensed text-[13px] sm:text-[14px] tracking-[0.22em] uppercase font-semibold"
          >
            <span className="relative z-10 group-hover:text-navy transition-colors duration-300">{secondaryLabel}</span>
            <svg className="relative z-10 w-3.5 h-3.5 group-hover:text-navy transition-all duration-400 group-hover:translate-x-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
            <span className="absolute inset-0 bg-gold -translate-x-full group-hover:translate-x-0 transition-transform duration-500" style={{ transitionTimingFunction: 'cubic-bezier(.16,1,.3,1)' }} />
          </Link>
        </div>
      </div>
    </section>
  )
}
