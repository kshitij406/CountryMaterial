import type { Metadata } from 'next'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { openCareersQuery, siteSettingsQuery } from '@/sanity/lib/queries'
import type { Career } from '@/types'
import CtaBanner from '@/components/sections/CtaBanner'
import { buildMetadata } from '@/lib/metadata'
import { getDictionary, isLocale, defaultLocale } from '@/i18n'
import { localePath } from '@/i18n/config'

export const revalidate = 60

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale
  const t = getDictionary(locale).careers
  return buildMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    path: '/careers',
    locale,
  })
}

const FALLBACK_JOB_META = [
  { _id: 'fallback-1', slug: 'logistics-coordinator',        closingDate: '2026-04-30' },
  { _id: 'fallback-2', slug: 'waste-collection-supervisor',  closingDate: '2026-04-15' },
]

export default async function CareersPage({ params }: { params: { locale: string } }) {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale
  const dict = getDictionary(locale)
  const t = dict.careers

  const [rawJobs, settings] = await Promise.all([
    client.fetch(openCareersQuery, { locale }).catch(() => null),
    client.fetch(siteSettingsQuery, { locale }).catch(() => null),
  ])

  const fallbackJobs: Career[] = FALLBACK_JOB_META.map((meta, i) => ({
    _id: meta._id,
    slug: { current: meta.slug },
    location: 'Dar es Salaam',
    employmentType: 'full-time',
    closingDate: meta.closingDate,
    title: t.fallbackJobs[i].title,
    department: t.fallbackJobs[i].department,
    description: [{ _type: 'block', children: [{ text: t.fallbackJobs[i].description }] }],
    requirements: [...t.fallbackJobs[i].requirements],
  }))

  const jobs: Career[] = rawJobs?.length ? rawJobs : fallbackJobs
  const company = settings?.companyName ?? 'Country Materials'

  return (
    <>
      <section className="relative overflow-hidden pt-[110px] pb-[56px] px-8 lg:px-16 bg-navy" style={{ borderBottom: '1px solid rgba(216,224,231,.4)' }}>
        <div className="relative max-w-[1440px] mx-auto">
          <div className="flex items-center gap-3.5 mb-6">
            <span className="block h-px w-10 bg-gold" />
            <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-white/90">{t.eyebrow}</span>
          </div>
          <h1 className="font-display text-[clamp(38px,6vw,84px)] leading-[0.9] tracking-[0.03em] uppercase text-white max-w-4xl">
            {t.headingPrefix} <span className="text-gold-light">{company}</span>
          </h1>
          <p className="mt-6 font-barlow text-[16px] text-white/75 max-w-2xl leading-[1.65]">
            {t.intro}
          </p>
        </div>
      </section>

      <section className="relative py-[70px] px-8 lg:px-16 bg-charcoal" style={{ borderBottom: '1px solid #D8E0E7' }}>
        <div className="relative max-w-[1440px] mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-8 mb-10 reveal">
            <div>
              <div className="flex items-center gap-3.5 mb-5">
                <span className="block h-px w-10 bg-gold" />
                <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold">{t.openPositions}</span>
              </div>
              <h2 className="font-display text-[clamp(32px,4vw,56px)] leading-[0.9] tracking-[0.03em] uppercase text-white">
                {t.currentPlain} <span className="text-gold">{t.currentAccent}</span>
              </h2>
            </div>
            <span className="font-space text-[12px] text-gold/70 tracking-[0.2em]">{`// ${jobs.length} ${t.openRoles}`}</span>
          </div>

          <div className="space-y-4 stagger">
            {jobs.map((job, i) => (
              <Link
                key={job._id}
                href={localePath(locale, `/careers/${job.slug.current}`)}
                className="group flex flex-col sm:flex-row sm:items-center gap-6 py-7 px-6 hover:pl-8 transition-all duration-300 bg-white"
                style={{ border: '1px solid #D8E0E7' }}
              >
                <span className="font-space text-[12px] text-gold/55 tracking-[0.2em] shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <h3 className="font-display text-[clamp(20px,2vw,28px)] leading-[1] tracking-[0.04em] uppercase text-slate group-hover:text-gold transition-colors duration-200 mb-2">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {job.department && (
                      <span className="font-condensed text-[11px] tracking-[0.15em] uppercase text-gold/80">{job.department}</span>
                    )}
                    {job.location && (
                      <span className="font-condensed text-[11px] tracking-[0.15em] uppercase text-slate/55">- {job.location}</span>
                    )}
                    {job.employmentType && (
                      <span className="font-condensed text-[11px] tracking-[0.15em] uppercase text-slate/55">{job.employmentType.replace('-', ' ')}</span>
                    )}
                  </div>
                </div>
                {job.closingDate && (
                  <span className="font-barlow text-[13px] text-slate/55 shrink-0">
                    {t.closes} {new Date(job.closingDate).toLocaleDateString(t.dateLocale, { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                )}
                <svg className="w-4 h-4 text-gold/60 group-hover:text-gold transition-colors duration-300 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>

          {jobs.length === 0 && (
            <div className="text-center py-20 reveal bg-white" style={{ border: '1px solid #D8E0E7' }}>
              <div className="font-display text-[56px] text-gold/20 mb-4">◈</div>
              <h3 className="font-display text-[28px] tracking-[0.04em] uppercase text-slate mb-3">{t.noneHeading}</h3>
              <p className="font-barlow text-[15px] text-slate/65 max-w-md mx-auto mb-8">
                {t.noneBody}
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="relative py-[100px] px-8 lg:px-16 bg-white" style={{ borderBottom: '1px solid #D8E0E7' }}>
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-8 mb-14 reveal">
            <div>
              <div className="flex items-center gap-3.5 mb-5">
                <span className="block h-px w-10 bg-gold" />
                <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold">{t.whyEyebrow}</span>
              </div>
              <h2 className="font-display text-[clamp(36px,4vw,64px)] leading-[0.9] tracking-[0.03em] uppercase text-slate">
                {t.whyHeadingPre} <span className="text-gold">{t.whyHeadingAccent}</span> {t.whyHeadingPost}
              </h2>
            </div>
            <span className="font-space text-[12px] text-gold/70 tracking-[0.2em]">{`// ${t.culture}`}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 stagger">
            {t.whyItems.map((item, i) => (
              <div
                key={i}
                className="p-8 bg-charcoal"
                style={{
                  borderLeft: '3px solid rgba(200,150,46,0.55)',
                  borderTop: '1px solid rgba(200,150,46,0.12)',
                  borderRight: '1px solid rgba(200,150,46,0.08)',
                  borderBottom: '1px solid rgba(200,150,46,0.08)',
                }}
              >
                <span className="font-space text-[11px] text-gold/60 tracking-[0.2em]">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-display text-[clamp(22px,2vw,30px)] leading-[1] tracking-[0.04em] uppercase text-cream font-semibold mt-3 mb-3">{item.title}</h3>
                <p className="font-barlow text-[15px] text-sand leading-[1.65]">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 reveal">
            <p className="font-barlow text-[16px] text-slate/75 leading-[1.7] max-w-2xl">
              {t.basedInPre} {settings?.city ?? 'Dar es Salaam'}, {t.basedInPost}
            </p>
          </div>
        </div>
      </section>

      <CtaBanner
        heading={t.ctaHeading}
        subtext={t.ctaSubtext}
        primaryLabel={t.ctaPrimary}
        primaryHref={localePath(locale, '/contact')}
        secondaryLabel={t.ctaSecondary}
        secondaryHref={localePath(locale, '/about')}
        locale={locale}
        t={dict.ctaBanner}
      />
    </>
  )
}
