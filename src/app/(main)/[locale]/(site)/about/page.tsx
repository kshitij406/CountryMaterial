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
        data-theme="dark"
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
      <section className="py-20 sm:py-28" style={{ background: 'var(--navy)' }} aria-label={t.milestonesLabel}>
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div className="reveal">
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-gold mb-6">{t.ourStory}</p>
              <h2 className="font-black text-[clamp(32px,4vw,60px)] text-inverse leading-none tracking-tight mb-8">
                {t.storyLine1}<br />{t.storyLine2}<br />{t.storyLine3}
              </h2>
              <p className="text-[15px] text-inverse/60 leading-relaxed mb-10">
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
                    <p className="text-[14px] text-inverse/60 leading-relaxed">{m.event}</p>
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

      {/* CTA */}
      <section className="py-20 sm:py-24 text-center" style={{ background: 'var(--navy)' }} aria-label={t.ctaLabel}>
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-2xl mx-auto reveal">
            <h2 className="font-black text-[clamp(28px,4vw,56px)] text-inverse leading-tight mb-5">
              {t.ctaHeadingLine1}<br />
              <span className="text-gold">{t.ctaHeadingLine2}</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={localePath(locale, '/contact')} className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold text-[15px] px-8 py-4 transition-colors duration-200 cursor-pointer">
                {t.contactUs}
              </Link>
              <Link href={localePath(locale, '/shop')} className="inline-flex items-center gap-2 border border-inverse/20 hover:border-inverse/40 text-inverse font-semibold text-[15px] px-8 py-4 transition-all duration-200 cursor-pointer">
                {t.viewProducts}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
