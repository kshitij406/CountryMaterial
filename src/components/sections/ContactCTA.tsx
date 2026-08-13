import Link from 'next/link'
import { localePath, type Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n'

interface ContactCTAProps {
  heading?: string
  eyebrow?: string
  primaryLabel?: string
  secondaryLabel?: string
  phone?: string
  email?: string
  address?: string
  locale: Locale
  t: Dictionary['contactCta']
}

export default function ContactCTA({
  heading,
  eyebrow,
  primaryLabel,
  secondaryLabel,
  phone = '+255 768 500 555',
  email = 'info@countrymaterial.com',
  address = 'Babecov Complex, Buguruni Mandela Road, Dar es Salaam',
  locale,
  t,
}: ContactCTAProps) {
  const [line1, line2] = (heading ?? `${t.headingLine1}\n${t.headingLine2}`).split('\n')
  const headingLine1 = line1
  const headingLine2 = line2 ?? t.headingLine2

  return (
    <section
      className="relative overflow-hidden"
      id="contact-cta"
      style={{ background: 'var(--navy)' }}
      aria-label={t.sectionLabel}
    >
      <div className="absolute inset-0 bg-steel-texture" aria-hidden="true" />
      <div className="absolute inset-0 bg-concrete-texture" aria-hidden="true" />

      {/* Subtle gold radial */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(200,150,46,0.07) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
        <div className="max-w-3xl mx-auto text-center reveal">

          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-gold mb-6">{eyebrow ?? t.eyebrow}</p>

          <h2 className="font-black text-[clamp(36px,5.5vw,80px)] text-inverse leading-none tracking-tight mb-8">
            {headingLine1}<br />
            <span className="text-gold">{headingLine2}</span>
          </h2>

          <p className="text-[16px] text-inverse/60 leading-relaxed max-w-xl mx-auto mb-12">
            {t.body}
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <Link
              href={localePath(locale, '/contact')}
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold text-[15px] px-8 py-4 transition-colors duration-200 cursor-pointer"
            >
              {primaryLabel ?? t.primaryLabel}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
            <a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 text-inverse border border-inverse/20 hover:border-inverse/40 font-semibold text-[15px] px-8 py-4 transition-all duration-200 cursor-pointer"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.59 1.24h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              {secondaryLabel ?? t.secondaryLabel}
            </a>
          </div>

          {/* Contact details — icon + label rows */}
          <div
            className="flex flex-wrap justify-center gap-10 pt-10"
            style={{ borderTop: '1px solid rgba(200,150,46,0.12)' }}
          >
            <a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className="w-10 h-10 flex items-center justify-center border border-gold/25 group-hover:border-gold/50 transition-colors duration-200">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-gold/60 group-hover:text-gold transition-colors duration-200" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.59 1.24h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <span className="text-[15px] font-semibold text-inverse group-hover:text-gold transition-colors duration-200">{phone}</span>
              <span className="text-[10px] text-inverse/50 font-mono uppercase tracking-[0.15em]">{t.callOrWhatsapp}</span>
            </a>

            <a
              href={`mailto:${email}`}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className="w-10 h-10 flex items-center justify-center border border-gold/25 group-hover:border-gold/50 transition-colors duration-200">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-gold/60 group-hover:text-gold transition-colors duration-200" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <span className="text-[15px] font-semibold text-inverse group-hover:text-gold transition-colors duration-200">{email}</span>
              <span className="text-[10px] text-inverse/50 font-mono uppercase tracking-[0.15em]">{t.emailUs}</span>
            </a>

            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 flex items-center justify-center border border-gold/25">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-gold/60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <span className="text-[15px] font-semibold text-inverse">{address}</span>
              <span className="text-[10px] text-inverse/50 font-mono uppercase tracking-[0.15em]">{t.headquarters}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
