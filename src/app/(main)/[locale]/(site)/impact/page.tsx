import type { Metadata } from 'next'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { client } from '@/sanity/lib/client'
import { impactPageQuery } from '@/sanity/lib/queries'
import { calculateImpact } from '@/lib/impactCalculations'
import { buildMetadata } from '@/lib/metadata'
import { getDictionary, isLocale, defaultLocale } from '@/i18n'

const ImpactMetricsGrid = dynamic(() => import('@/components/sections/ImpactMetricsGrid'), {
  ssr: false,
  loading: () => (
    <div className="h-32 flex items-center justify-center">
      <span className="w-3 h-3 rounded-full bg-gold animate-pulse" />
    </div>
  ),
})

export const revalidate = 3600

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale
  const t = getDictionary(locale).impact
  return {
    ...buildMetadata({
      title: t.metaTitle,
      description: t.metaDescription,
      path: '/impact',
      locale,
    }),
    keywords: [...t.keywords],
  }
}

/** Official UN SDG brand colours — never translated. */
const SDG_COLORS: Record<string, string> = {
  '8': '#A21942',
  '11': '#FD9D24',
  '12': '#BF8B2E',
  '13': '#3F7E44',
}

const VERIFIED_SDG_GOALS = ['8', '11', '12', '13']

function fmt(n: number, numberLocale: string, decimals = 0): string {
  return n.toLocaleString(numberLocale, { maximumFractionDigits: decimals })
}

interface ImpactStory {
  _key: string
  stat: string
  label: string
  description?: string
  icon?: string
}

export default async function ImpactPage({ params }: { params: { locale: string } }) {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale
  const t = getDictionary(locale).impact
  // Kiswahili uses the same digit grouping as en-US; keep one format for both.
  const numberLocale = 'en-US'

  const raw = await client.fetch(impactPageQuery, { locale }).catch(() => null)

  const tonnesRecycled = raw?.tonnesRecycled ?? 50000
  const reportingYear  = raw?.reportingYear  ?? new Date().getFullYear()

  const impact = calculateImpact(tonnesRecycled, reportingYear, raw?.manualOverrides ?? undefined)

  const heroHeading = raw?.heroHeading ?? t.heroHeading
  const headingLines = heroHeading.replace(/\\n/g, '\n').split('\n')

  const metrics = [
    { label: t.metricLabels.tonnesRecycled,   value: `${fmt(impact.tonnesRecycled, numberLocale)}+`, unit: t.units.metricTonnes   },
    { label: t.metricLabels.co2Avoided,       value: fmt(impact.co2AvoidedTonnes, numberLocale),     unit: t.units.tonnesCo2      },
    { label: t.metricLabels.landfillDiverted, value: fmt(impact.landfillDivertedM3, numberLocale),   unit: t.units.cubicMetres    },
    { label: t.metricLabels.energySaved,      value: fmt(impact.energySavedKwh, numberLocale),       unit: t.units.kwh            },
    { label: t.metricLabels.jobsCreated,      value: '104',                                          unit: t.units.directJobs     },
    { label: t.metricLabels.vendorsOnboarded, value: '5,000+',                                       unit: t.units.supplyPartners },
  ]

  const fallbackStories: ImpactStory[] = t.stories.map((s, i) => ({ _key: `f${i + 1}`, ...s }))
  const rawStories: ImpactStory[] = raw?.impactStories ?? []
  const impactStories = rawStories.length > 0 ? rawStories : fallbackStories

  const sdgGoals: string[] = raw?.sdgGoals ?? VERIFIED_SDG_GOALS

  return (
    <>
      {/* ── 1. Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[72vh] flex flex-col justify-end overflow-hidden pt-24"
        style={{ background: '#0B1D3A' }}
        aria-label={t.heroLabel}
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/company/company-profile.jpg"
            alt={t.facilityAlt}
            fill
            className="object-cover opacity-25"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0B1D3A 30%, rgba(11,29,58,0.6) 100%)' }} />
        </div>

        {/* Grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,rgba(200,150,46,0.035) 0 1px,transparent 1px 80px),' +
              'repeating-linear-gradient(90deg,rgba(200,150,46,0.035) 0 1px,transparent 1px 80px)',
          }}
        />

        <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pb-20 sm:pb-28">
          <p
            className="reveal font-mono text-[11px] tracking-[0.22em] uppercase mb-6"
            style={{ color: '#C8962E' }}
          >
            {t.eyebrow} — {reportingYear}
          </p>

          <h1 className="reveal font-black text-[clamp(52px,8vw,110px)] leading-[0.92] tracking-tight text-white mb-6">
            {headingLines.map((line: string, i: number) =>
              i === 0 ? (
                <span key={i}>{line}</span>
              ) : (
                <span key={i} className="block" style={{ color: '#C8962E' }}>
                  {line}
                </span>
              )
            )}
          </h1>
          <span
            className="reveal block h-1 w-16 mb-8"
            style={{ background: '#C8962E' }}
            aria-hidden="true"
          />

          {raw?.heroSubtitle && (
            <p
              className="reveal text-[17px] leading-relaxed max-w-2xl mb-14"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              {raw.heroSubtitle}
            </p>
          )}

          {/* Headline stats */}
          <div
            className="reveal grid grid-cols-3 gap-6 max-w-2xl"
            style={{ borderTop: '1px solid rgba(200,150,46,0.2)' }}
          >
            {[
              { label: t.metricLabels.co2Avoided,     value: `${fmt(impact.co2AvoidedTonnes, numberLocale)}t` },
              { label: t.metricLabels.tonnesRecycled, value: `${fmt(impact.tonnesRecycled, numberLocale)}+`   },
              { label: t.metricLabels.jobsCreated,    value: '104'                                            },
            ].map((s) => (
              <div key={s.label} className="pt-7">
                <p
                  className="font-mono font-bold text-[clamp(26px,3.5vw,48px)] leading-none"
                  style={{ color: '#C8962E' }}
                >
                  {s.value}
                </p>
                <p className="font-mono text-[11px] tracking-[0.18em] uppercase mt-2" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. Metrics Grid ─────────────────────────────────────────────────── */}
      <section
        className="py-20 sm:py-28"
        style={{ background: '#FAF7F2' }}
        aria-label={t.metricsLabel}
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="mb-12 reveal">
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase mb-4" style={{ color: '#C8962E' }}>
              {t.byTheNumbers}
            </p>
            <h2 className="font-black text-[clamp(36px,5vw,68px)] text-ink leading-tight tracking-tight">
              {t.measuredLine1}<br />{t.measuredLine2}
            </h2>
          </div>
          <ImpactMetricsGrid metrics={metrics} />
          <p className="mt-6 font-mono text-[11px] tracking-[0.14em] uppercase" style={{ color: '#8896A7' }}>
            {t.footnotePre} {fmt(impact.tonnesRecycled, numberLocale)}+ {t.footnotePost} {reportingYear}
          </p>
        </div>
      </section>

      {/* ── 3. Full-width image break ────────────────────────────────────────── */}
      <div className="relative h-[380px] sm:h-[480px] overflow-hidden" aria-hidden="true">
        <Image
          src="/images/company/group-photo-large.jpg"
          alt={t.teamAlt}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(11,29,58,0.45)' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <p
            className="font-black text-center text-white text-[clamp(28px,4vw,56px)] leading-tight tracking-tight px-6 max-w-3xl"
            style={{ textShadow: '0 2px 24px rgba(0,0,0,0.5)' }}
          >
            {t.breakLine1}<br />
            <span style={{ color: '#C8962E' }}>{t.breakLine2}</span>
          </p>
        </div>
      </div>

      {/* ── 4. Impact Stories ───────────────────────────────────────────────── */}
      <section
        className="py-20 sm:py-28"
        style={{ background: '#0B1D3A' }}
        aria-label={t.communityLabel}
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="mb-14 reveal">
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase mb-4" style={{ color: '#C8962E' }}>
              {t.peopleEyebrow}
            </p>
            <h2 className="font-black text-[clamp(36px,5vw,68px)] text-white leading-tight tracking-tight">
              {t.communityLine1}<br />{t.communityLine2}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px stagger" style={{ background: 'rgba(200,150,46,0.1)' }}>
            {impactStories.map((story) => (
              <div
                key={story._key}
                className="p-8 sm:p-10"
                style={{ background: '#0B1D3A' }}
              >
                <p
                  className="font-mono font-bold text-[clamp(36px,4vw,56px)] leading-none mb-3"
                  style={{ color: '#C8962E' }}
                >
                  {story.stat}
                </p>
                <p className="font-black text-[15px] uppercase tracking-wide text-white mb-4">
                  {story.label}
                </p>
                {story.description && (
                  <p className="text-[14px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    {story.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Women & Youth Empowerment ────────────────────────────────────── */}
      <section
        className="overflow-hidden"
        style={{ background: '#FAF7F2' }}
        aria-label={t.womenLabel}
      >
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[560px]">

            {/* Image panel */}
            <div className="relative min-h-[360px] lg:min-h-0 overflow-hidden">
              <Image
                src="/images/stock/team-workers.jpg"
                alt={t.workersAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to right, rgba(250,247,242,0) 60%, rgba(250,247,242,0.95) 100%)' }}
              />
            </div>

            {/* Content panel */}
            <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20 py-20 reveal">
              <p className="font-mono text-[11px] tracking-[0.22em] uppercase mb-6" style={{ color: '#C8962E' }}>
                {t.womenEyebrow}
              </p>
              <h2 className="font-black text-[clamp(32px,4vw,58px)] text-ink leading-tight tracking-tight mb-6">
                {t.womenLine1}<br />{t.womenLine2}
              </h2>
              <p className="text-[16px] leading-relaxed mb-8 max-w-lg" style={{ color: '#4A5568' }}>
                {t.womenBody1}
              </p>
              <p className="text-[16px] leading-relaxed mb-10 max-w-lg" style={{ color: '#4A5568' }}>
                {t.womenBody2}
              </p>

              <div
                className="grid grid-cols-1 sm:grid-cols-3 gap-px"
                style={{ background: '#E8DED1' }}
              >
                {t.womenCallouts.map((item) => (
                  <div key={item.title} className="p-5" style={{ background: '#FAF7F2' }}>
                    <p className="font-black text-[13px] text-ink mb-2">{item.title}</p>
                    <p className="text-[12.5px] leading-relaxed" style={{ color: '#8896A7' }}>{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Second image break ───────────────────────────────────────────── */}
      <div className="relative h-[300px] sm:h-[380px] overflow-hidden" aria-hidden="true">
        <Image
          src="/images/company/wastee.jpg"
          alt={t.scrapAlt}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(11,29,58,0.55)' }} />
        <div className="absolute inset-0 flex items-end px-6 sm:px-10 lg:px-16 pb-12 max-w-[1440px] mx-auto">
          <p
            className="font-mono text-[11px] tracking-[0.22em] uppercase"
            style={{ color: 'rgba(200,150,46,0.8)' }}
          >
            {t.scrapCaption}
          </p>
        </div>
      </div>

      {/* ── 7. UN SDG Goals ─────────────────────────────────────────────────── */}
      {sdgGoals.length > 0 && (
        <section
          className="py-20 sm:py-28"
          style={{ background: '#0B1D3A' }}
          aria-label={t.sdgLabel}
        >
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">

            <div className="mb-16 reveal">
              <p className="font-mono text-[11px] tracking-[0.22em] uppercase mb-5" style={{ color: '#C8962E' }}>
                {t.globalStandards}
              </p>
              <h2 className="font-black text-[clamp(40px,6vw,80px)] text-white leading-tight tracking-tight mb-4">
                {t.sdgLine1}<br />{t.sdgLine2}
              </h2>
              <p className="text-[17px] max-w-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {t.sdgIntro}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 stagger">
              {sdgGoals.map((goal) => {
                const meta = t.sdg[goal]
                if (!meta) return null
                return (
                  <div
                    key={goal}
                    className="relative overflow-hidden p-8 sm:p-10"
                    style={{ background: SDG_COLORS[goal] }}
                  >
                    {/* Big watermark number */}
                    <span
                      className="absolute top-4 right-6 font-black leading-none select-none pointer-events-none"
                      style={{ fontSize: 'clamp(80px,10vw,140px)', color: 'rgba(255,255,255,0.1)', lineHeight: 1 }}
                      aria-hidden="true"
                    >
                      {goal}
                    </span>

                    <div className="relative">
                      <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-white/60 mb-3">
                        {t.sdgGoalPrefix} {goal}
                      </p>
                      <h3 className="font-black text-[clamp(22px,2.8vw,36px)] text-white leading-tight mb-5">
                        {meta.label}
                      </h3>
                      <p className="text-[15px] leading-relaxed text-white/70 max-w-md">
                        {meta.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── 8. Methodology ──────────────────────────────────────────────────── */}
      <section
        className="py-16 sm:py-20"
        style={{ background: '#FAF7F2' }}
        aria-label={t.methodologyLabel}
      >
        <div className="max-w-2xl mx-auto px-6 sm:px-10">
          <div
            className="pl-5 py-1"
            style={{ borderLeft: '3px solid #C8962E' }}
          >
            <p className="font-mono text-[11px] tracking-[0.18em] uppercase mb-3" style={{ color: '#C8962E' }}>
              {t.methodology}
            </p>
            <p className="text-[13px] italic leading-relaxed" style={{ color: '#8896A7' }}>
              {raw?.methodologyNote ?? `${t.methodologyNote} ${reportingYear}.`}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
