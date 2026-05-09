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
  heading = 'Let us support\nyour next project.',
  eyebrow = 'Speak to our team',
  primaryLabel = 'Request a quote',
  secondaryLabel = 'Visit a yard',
  phone = '+255 768 500 555',
  email = 'info@countrymaterial.com',
  address = 'Babecov Complex, Buguruni Mandela Road, Dar es Salaam',
}: ContactCTAProps) {
  const telHref = `tel:${phone.replace(/[\s-]/g, '')}`
  const headingLines = heading.split('\n')

  return (
    <section className="relative py-20 sm:py-24 lg:py-[120px] px-5 sm:px-8 lg:px-16 bg-charcoal" id="contact" style={{ borderTop: '1px solid #D8E0E7' }}>
      <div className="relative max-w-[1440px] mx-auto grid lg:grid-cols-[1.3fr_1fr] gap-12 sm:gap-16 items-end">
        <div className="reveal">
          <div className="flex items-center gap-3.5 mb-6">
            <span className="block h-px w-10 bg-gold" />
            <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold">{eyebrow}</span>
          </div>
          <h2 className="font-display text-[clamp(34px,7vw,104px)] leading-[0.9] tracking-[0.03em] uppercase text-slate">
            {headingLines.map((line, i) => (
              <span key={i} className="block">
                {i === headingLines.length - 1 ? <span className="text-gold">{line}</span> : line}
              </span>
            ))}
          </h2>
        </div>

        <div className="flex flex-col gap-5 pb-1 reveal">
          <div className="bg-white p-4" style={{ border: '1px solid #D8E0E7' }}>
            <div className="font-condensed text-[11px] tracking-[0.2em] uppercase text-slate/55">Tender desk</div>
            <div className="mt-1 font-display text-[24px] tracking-[0.03em] text-slate">
              <a href={telHref} className="hover:text-gold transition-colors duration-200">{phone}</a>
            </div>
          </div>
          <div className="bg-white p-4" style={{ border: '1px solid #D8E0E7' }}>
            <div className="font-condensed text-[11px] tracking-[0.2em] uppercase text-slate/55">Email</div>
            <div className="mt-1 font-barlow text-[16px] text-slate break-all sm:break-normal">
              <a href={`mailto:${email}`} className="hover:text-gold transition-colors duration-200">{email}</a>
            </div>
          </div>
          <div className="bg-white p-4" style={{ border: '1px solid #D8E0E7' }}>
            <div className="font-condensed text-[11px] tracking-[0.2em] uppercase text-slate/55">Head office</div>
            <div className="mt-1 font-barlow text-[16px] text-slate/85 leading-tight">{address}</div>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col sm:flex-row gap-4 reveal">
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center gap-3 overflow-hidden px-6 sm:px-[34px] py-4 sm:py-[16px] bg-gold text-white font-condensed text-[13px] sm:text-[14px] tracking-[0.2em] uppercase font-semibold"
          >
            <span className="relative z-10">{primaryLabel}</span>
            <svg className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
            <span className="absolute inset-0 bg-gold-dim -translate-x-full group-hover:translate-x-0 transition-transform duration-500" style={{ transitionTimingFunction: 'cubic-bezier(.16,1,.3,1)' }} />
          </Link>
          <Link
            href="/about"
            className="group relative inline-flex items-center justify-center gap-3 overflow-hidden px-6 sm:px-[34px] py-4 sm:py-[16px] border border-slate/25 text-slate font-condensed text-[13px] sm:text-[14px] tracking-[0.2em] uppercase font-semibold bg-white"
          >
            <span className="relative z-10">{secondaryLabel}</span>
            <svg className="relative z-10 w-3.5 h-3.5 transition-all duration-300 group-hover:translate-x-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
            <span className="absolute inset-0 bg-charcoal -translate-x-full group-hover:translate-x-0 transition-transform duration-500" style={{ transitionTimingFunction: 'cubic-bezier(.16,1,.3,1)' }} />
          </Link>
        </div>
      </div>
    </section>
  )
}
