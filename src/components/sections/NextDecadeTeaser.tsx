import Image from 'next/image'
import Link from 'next/link'
import { localePath, type Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n'

export default function NextDecadeTeaser({
  locale,
  t,
}: {
  locale: Locale
  t: Dictionary['nextDecade']
}) {
  return (
    <section
      className="relative overflow-hidden"
      id="next-decade-teaser"
      aria-label={t.sectionLabel}
      style={{ background: '#07121F' }}
    >
      {/* Background: industrial image + layered dark overlay */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/stock/facility-main.jpg"
          alt=""
          fill
          className="object-cover opacity-20"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(110deg, rgba(7,18,31,0.97) 0%, rgba(7,18,31,0.80) 55%, rgba(7,18,31,0.94) 100%)',
          }}
        />
        <div className="absolute inset-0 bg-steel-lines opacity-25" />
      </div>

      {/* Gold top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gold/20" />

      <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-24 sm:py-32 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-14 lg:gap-24 items-center">

          {/* Left — display headline */}
          <div className="reveal">
            <div className="flex items-center gap-4 mb-8">
              <span className="block w-8 h-px bg-gold" aria-hidden="true" />
              <span className="font-mono text-[11px] tracking-[0.30em] uppercase text-gold">
                {t.eyebrow}
              </span>
            </div>

            <h2
              className="font-display uppercase leading-[0.88] tracking-[0.02em] text-white"
              style={{ fontSize: 'clamp(48px, 7.5vw, 116px)' }}
            >
              {t.headingLine1}<br />
              {t.headingLine2}<br />
              {t.headingLine3}<br />
              <span className="text-gold">{t.headingLine4}</span>
            </h2>

            <div className="mt-12 flex items-center gap-3">
              <span className="block h-px w-16 bg-gold/25" />
              <span className="block w-1.5 h-1.5 rounded-full bg-gold/55" />
              <span className="block h-px w-8 bg-gold/12" />
            </div>
          </div>

          {/* Right — supporting content + CTA */}
          <div className="reveal">
            <div
              className="mb-8 pl-5"
              style={{ borderLeft: '2px solid rgba(200,150,46,0.45)' }}
            >
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-gold/65 mb-2">
                {t.planEyebrow}
              </p>
              <p className="font-mono font-bold text-[26px] text-white leading-tight">
                {t.planLine1}<br />{t.planLine2}
              </p>
              <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/30 mt-1">
                {t.planNote}
              </p>
            </div>

            <p className="font-barlow text-[16px] leading-relaxed mb-10 text-white/55 max-w-sm">
              {t.body}
            </p>

            <Link
              href={`${localePath(locale, '/about')}#next-decade`}
              className="inline-flex items-center gap-3 bg-gold hover:bg-amber-light text-white font-condensed text-[13px] tracking-[0.18em] uppercase font-semibold px-8 py-4 transition-colors duration-200"
            >
              {t.learnMore}
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Gold bottom rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gold/12" />
    </section>
  )
}
