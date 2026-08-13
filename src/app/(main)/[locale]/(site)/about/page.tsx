import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { aboutPageQuery } from '@/sanity/lib/queries'
import { buildMetadata } from '@/lib/metadata'
import { getDictionary, isLocale, defaultLocale } from '@/i18n'
import { localePath } from '@/i18n/config'

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale
  const t = getDictionary(locale).about
  return buildMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    path: '/about',
    locale,
  })
}

export const revalidate = 60

export default async function AboutPage({ params }: { params: { locale: string } }) {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale
  const t = getDictionary(locale).about

  const about = await client.fetch(aboutPageQuery, { locale }).catch(() => null)

  type DisplayValue = { title: string; body: string; icon?: string | null }
  const displayValues: DisplayValue[] = about?.values?.length
    ? about.values.map((v: { title: string; description: string; icon?: string }) => ({
        title: v.title,
        body: v.description,
        icon: v.icon ?? null,
      }))
    : t.values.map((v) => ({ title: v.title, body: v.body, icon: v.icon }))

  return (
    <>
      {/* Page hero */}
      <section
        className="relative min-h-[52vh] flex flex-col justify-end overflow-hidden pt-20"
        style={{ background: '#0B1D3A' }}
        aria-label={t.heroLabel}
      >
        <div className="absolute inset-0">
          <Image src="/images/company/company-profile.jpg" alt={t.facilityAlt} fill className="object-cover opacity-20" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/50 to-navy" />
          <div className="absolute inset-0 bg-steel-texture" aria-hidden="true" />
        </div>
        <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pb-16 sm:pb-24 pt-12">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-gold mb-6">{t.eyebrow}</p>
          <h1 className="font-black text-[clamp(48px,8vw,110px)] leading-[0.92] tracking-tight text-white">
            {t.headingLine1}<br />
            <span className="text-gold">{t.headingLine2}</span>
          </h1>
          <p className="mt-6 text-[17px] text-white/55 max-w-xl leading-relaxed">
            {about?.intro ?? t.intro}
          </p>
        </div>
      </section>

      {/* Mission + Vision */}
      <section className="py-20 sm:py-28 overflow-hidden" style={{ background: '#FAF7F2' }} aria-label={t.missionVisionLabel}>
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px" style={{ background: '#E8DED1' }}>

            <div className="p-10 sm:p-14 reveal" style={{ background: '#FAF7F2' }}>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-gold mb-6">{t.ourMission}</p>
              <p className="font-black text-[clamp(20px,2.5vw,32px)] text-ink leading-tight">
                {about?.mission ?? t.mission}
              </p>
            </div>

            <div className="p-10 sm:p-14 reveal" style={{ background: '#F0E8DC' }}>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-gold mb-6">{t.ourVision}</p>
              <p className="font-black text-[clamp(20px,2.5vw,32px)] text-ink leading-tight">
                {about?.vision ?? t.vision}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story / Milestones */}
      <section className="py-20 sm:py-28" style={{ background: '#0B1D3A' }} aria-label={t.milestonesLabel}>
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div className="reveal">
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-gold mb-6">{t.ourStory}</p>
              <h2 className="font-black text-[clamp(32px,4vw,60px)] text-white leading-none tracking-tight mb-8">
                {t.storyLine1}<br />{t.storyLine2}<br />{t.storyLine3}
              </h2>
              <p className="text-[15px] text-white/50 leading-relaxed mb-10">
                {typeof about?.body === 'string' ? about.body : t.storyBody}
              </p>

              {/* Timeline */}
              <div style={{ borderTop: '1px solid rgba(200,150,46,0.15)' }}>
                {t.milestones.map((m) => (
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
                <Image src="/images/company/group-photo-large.jpg" alt={t.teamAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative h-44 overflow-hidden">
                  <Image src="/images/company/wastee.jpg" alt={t.scrapAlt} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
                </div>
                <div className="relative h-44 overflow-hidden">
                  <Image src="/images/company/hardware.jpg" alt={t.hardwareAlt} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 sm:py-28 overflow-hidden" style={{ background: '#FAF7F2' }} aria-label={t.valuesLabel} id="values">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">

          <div className="mb-16 reveal">
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-gold mb-4">{t.standForEyebrow}</p>
            <h2 className="font-black text-[clamp(36px,5vw,72px)] text-ink leading-none tracking-tight">
              {t.principlesLine1}<br />{t.principlesLine2}
            </h2>
          </div>

          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-px stagger ${displayValues.length === 3 ? 'lg:grid-cols-3' : 'xl:grid-cols-4'}`}
            style={{ background: '#E8DED1' }}
          >
            {displayValues.map((v) => (
              <div key={v.title} className="p-8 cursor-default" style={{ background: '#FAF7F2' }}>
                <div className="w-10 h-10 flex items-center justify-center border border-gold/30 text-gold mb-6">
                  {v.icon ? (
                    <span className="text-xl leading-none">{v.icon}</span>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
                  )}
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
        aria-label={t.nextDecadeLabel}
      >
        {/* Top rule */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gold/20" />

        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[640px]">

            {/* Image panel — left */}
            <div className="relative min-h-[420px] lg:min-h-0 overflow-hidden order-2 lg:order-1">
              <Image
                src="/images/stock/iron-ore-smelting.jpg"
                alt={t.furnaceAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Dark overlay */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to right, rgba(7,18,31,0.25) 0%, rgba(7,18,31,0.1) 100%)' }}
              />
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
                  {t.ndEyebrow}
                </span>
              </div>

              {/* Headline */}
              <h2 className="font-black text-[clamp(30px,3.5vw,52px)] text-white leading-tight tracking-tight mb-7 reveal">
                {t.ndHeadingLine1}<br />
                <span className="text-gold">{t.ndHeadingLine2}</span>
              </h2>

              {/* Body */}
              <p className="text-[15px] text-white/55 leading-relaxed mb-8 max-w-lg reveal">
                {t.ndBody}
              </p>

              {/* Pull quote */}
              <blockquote
                className="mb-10 pl-5 reveal"
                style={{ borderLeft: '2px solid rgba(200,150,46,0.6)' }}
              >
                <p className="font-black text-[clamp(20px,2.2vw,28px)] text-gold leading-tight">
                  {t.ndQuoteLine1}<br />{t.ndQuoteLine2}
                </p>
              </blockquote>

              {/* Three callouts */}
              <div
                className="grid grid-cols-1 sm:grid-cols-3 reveal"
                style={{ borderTop: '1px solid rgba(200,150,46,0.12)' }}
              >
                {t.ndCallouts.map((item, i) => (
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
      <section className="py-20 sm:py-24 text-center" style={{ background: '#0B1D3A' }} aria-label={t.ctaLabel}>
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-2xl mx-auto reveal">
            <h2 className="font-black text-[clamp(28px,4vw,56px)] text-white leading-tight mb-5">
              {t.ctaHeadingLine1}<br />
              <span className="text-gold">{t.ctaHeadingLine2}</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={localePath(locale, '/contact')} className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold text-[15px] px-8 py-4 transition-colors duration-200 cursor-pointer">
                {t.contactUs}
              </Link>
              <Link href={localePath(locale, '/shop')} className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold text-[15px] px-8 py-4 transition-all duration-200 cursor-pointer">
                {t.viewProducts}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
