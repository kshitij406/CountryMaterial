import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { client } from '@/sanity/lib/client'
import { impactPageQuery } from '@/sanity/lib/queries'
import { calculateImpact } from '@/lib/impactCalculations'
import { buildMetadata } from '@/lib/metadata'

const ImpactMetricsGrid = dynamic(() => import('@/components/sections/ImpactMetricsGrid'), {
  ssr: false,
  loading: () => (
    <div className="h-32 flex items-center justify-center">
      <span className="w-3 h-3 rounded-full bg-gold animate-pulse" />
    </div>
  ),
})

export const revalidate = 3600

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Climate & Social Impact | Country Materials Ltd',
    description:
      "Discover how Country Materials Ltd's circular model avoids 92,500 tonnes of CO₂, diverts 28,500 m³ from landfill and supports 750 livelihoods in Tanzania.",
    path: '/impact',
  }),
  keywords: ['recycling Tanzania', 'CO2 emissions', 'waste management Dar es Salaam', 'ESG'],
}

// UN SDG official colour palette
const SDG_META: Record<string, { bg: string; label: string }> = {
  '1':  { bg: '#E5243B', label: 'No Poverty' },
  '2':  { bg: '#DDA63A', label: 'Zero Hunger' },
  '3':  { bg: '#4C9F38', label: 'Good Health & Well-Being' },
  '4':  { bg: '#C5192D', label: 'Quality Education' },
  '5':  { bg: '#FF3A21', label: 'Gender Equality' },
  '6':  { bg: '#26BDE2', label: 'Clean Water & Sanitation' },
  '7':  { bg: '#FCC30B', label: 'Affordable & Clean Energy' },
  '8':  { bg: '#A21942', label: 'Decent Work & Economic Growth' },
  '9':  { bg: '#FD6925', label: 'Industry, Innovation & Infrastructure' },
  '10': { bg: '#DD1367', label: 'Reduced Inequalities' },
  '11': { bg: '#FD9D24', label: 'Sustainable Cities & Communities' },
  '12': { bg: '#BF8B2E', label: 'Responsible Consumption & Production' },
  '13': { bg: '#3F7E44', label: 'Climate Action' },
  '14': { bg: '#0A97D9', label: 'Life Below Water' },
  '15': { bg: '#56C02B', label: 'Life on Land' },
  '16': { bg: '#00689D', label: 'Peace, Justice & Strong Institutions' },
  '17': { bg: '#19486A', label: 'Partnerships for the Goals' },
}

function fmt(n: number, decimals = 0): string {
  return n.toLocaleString('en-US', { maximumFractionDigits: decimals })
}

function CircleArc({ pct, label }: { pct: number; label: string }) {
  // CSS-only donut using conic-gradient — no chart library
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: 112, height: 112 }}>
        {/* Outer ring */}
        <div
          aria-hidden="true"
          style={{
            width: 112,
            height: 112,
            borderRadius: '50%',
            background: `conic-gradient(#C8962E ${pct}%, #E8DED1 0%)`,
          }}
        />
        {/* Inner donut mask */}
        <div
          style={{
            position: 'absolute',
            inset: 14,
            borderRadius: '50%',
            background: '#FAF7F2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            className="font-mono font-bold"
            style={{ fontSize: 16, color: '#1A1A2E' }}
          >
            {pct}%
          </span>
        </div>
      </div>
      <p className="text-[13px] font-semibold text-center" style={{ color: '#2C3E50', maxWidth: 100 }}>
        {label}
      </p>
    </div>
  )
}

interface ImpactStory {
  _key: string
  stat: string
  label: string
  description?: string
  icon?: string
}

// Icon glyphs by key — CSS-drawn SVG, no icon library; falls back to emoji if icon is not a known key
function StoryIcon({ icon }: { icon?: string }) {
  if (icon === 'co2') return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
      <path d="M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10" />
      <path d="M15 9.5A3.5 3.5 0 0 0 8 12a3.5 3.5 0 0 0 3.5 3.5" />
      <path d="M17 16h4M19 14v4" />
    </svg>
  )
  if (icon === 'landfill') return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  )
  if (icon === 'jobs') return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
  if (icon === 'energy') return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
  // Emoji or any other string — render directly
  if (icon) return <span className="text-xl leading-none" aria-hidden="true">{icon}</span>
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  )
}

export default async function ImpactPage() {
  const raw = await client.fetch(impactPageQuery).catch(() => null)

  const tonnesRecycled = raw?.tonnesRecycled ?? 0
  const reportingYear = raw?.reportingYear ?? new Date().getFullYear()

  const impact = calculateImpact(tonnesRecycled, reportingYear, raw?.manualOverrides ?? undefined)

  const heroHeading = raw?.heroHeading ?? 'Turning Scrap\nInto a Better Future'
  const headingLines = heroHeading.replace(/\\n/g, '\n').split('\n')

  const metrics = [
    { label: 'Tonnes Recycled',   value: fmt(impact.tonnesRecycled),      unit: 'metric tonnes'  },
    { label: 'CO₂ Avoided',       value: fmt(impact.co2AvoidedTonnes),    unit: 'tonnes CO₂'    },
    { label: 'Landfill Diverted', value: fmt(impact.landfillDivertedM3),  unit: 'm³'             },
    { label: 'Energy Saved',      value: fmt(impact.energySavedKwh),      unit: 'kWh'            },
    { label: 'Jobs Supported',    value: fmt(impact.jobsCreated),          unit: 'livelihoods'    },
    { label: 'Reporting Year',    value: String(impact.reportingYear),     unit: 'fiscal year'    },
  ]

  const impactStories: ImpactStory[] = raw?.impactStories ?? []
  const sdgGoals: string[] = raw?.sdgGoals ?? []

  const womenPct = impact.womenParticipationPct
  const youthPct = impact.youthParticipationPct

  return (
    <>
      {/* ── 1. Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative pt-32 pb-20 sm:pb-28 overflow-hidden"
        style={{ background: '#0B1D3A' }}
        aria-label="Impact hero"
      >
        {/* Subtle rebar grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,rgba(200,150,46,0.04) 0 1px,transparent 1px 60px),' +
              'repeating-linear-gradient(90deg,rgba(200,150,46,0.04) 0 1px,transparent 1px 60px)',
          }}
        />

        <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          {/* Eyebrow */}
          <p
            className="reveal font-mono text-[11px] tracking-[0.22em] uppercase mb-6"
            style={{ color: '#C8962E' }}
          >
            Climate & Social Impact — {reportingYear}
          </p>

          {/* Heading */}
          <h1 className="reveal font-black text-[clamp(42px,7vw,96px)] leading-[0.94] tracking-tight text-white mb-6">
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

          {/* Subtitle */}
          {raw?.heroSubtitle && (
            <p
              className="reveal text-[16px] leading-relaxed max-w-2xl mb-14"
              style={{ color: '#8896A7' }}
            >
              {raw.heroSubtitle}
            </p>
          )}

          {/* Three headline stats */}
          <div className="reveal grid grid-cols-3 gap-6 max-w-2xl" style={{ borderTop: '1px solid rgba(200,150,46,0.15)' }}>
            {[
              { label: 'CO₂ Avoided',       value: `${fmt(impact.co2AvoidedTonnes)}t`   },
              { label: 'Tonnes Recycled',   value: `${fmt(impact.tonnesRecycled)}`         },
              { label: 'Jobs Supported',    value: fmt(impact.jobsCreated)                  },
            ].map((s) => (
              <div key={s.label} className="pt-6">
                <p
                  className="font-mono font-bold text-[clamp(22px,3vw,38px)] leading-none"
                  style={{ color: '#C8962E' }}
                >
                  {s.value}
                </p>
                <p className="font-mono text-[11px] tracking-[0.16em] uppercase mt-2" style={{ color: '#8896A7' }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. Primary Metrics Grid (GSAP stagger) ──────────────────────────── */}
      <section
        className="py-20 sm:py-28"
        style={{ background: '#FAF7F2' }}
        aria-label="Primary impact metrics"
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="mb-12 reveal">
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase mb-4" style={{ color: '#C8962E' }}>
              By the Numbers
            </p>
            <h2 className="font-black text-[clamp(30px,4vw,58px)] text-ink leading-tight tracking-tight">
              Measured impact.<br />Verified results.
            </h2>
          </div>
          <ImpactMetricsGrid metrics={metrics} />
          <p className="mt-6 font-mono text-[11px] tracking-[0.14em] uppercase" style={{ color: '#8896A7' }}>
            Based on {fmt(impact.tonnesRecycled)} metric tonnes recycled · FY {reportingYear}
          </p>
        </div>
      </section>

      {/* ── 3. Social Impact ─────────────────────────────────────────────────── */}
      <section
        className="py-20 sm:py-28"
        style={{ background: '#0B1D3A' }}
        aria-label="People and community impact"
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="mb-14 reveal">
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase mb-4" style={{ color: '#C8962E' }}>
              People & Community
            </p>
            <h2 className="font-black text-[clamp(30px,4vw,58px)] text-white leading-tight tracking-tight">
              Circular steel that<br />lifts communities.
            </h2>
          </div>

          {/* Circular arc indicators */}
          {(womenPct > 0 || youthPct > 0) && (
            <div className="flex flex-wrap gap-12 mb-16 reveal">
              {womenPct > 0 && <CircleArc pct={womenPct} label="Women Participation" />}
              {youthPct > 0 && <CircleArc pct={youthPct} label="Youth Participation (Under 35)" />}
            </div>
          )}

          {/* Impact stories */}
          {impactStories.length > 0 && (
            <div className="overflow-x-auto -mx-6 px-6 sm:overflow-visible sm:mx-0 sm:px-0">
              <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 min-w-max sm:min-w-0 stagger">
                {impactStories.map((story) => (
                  <div
                    key={story._key}
                    className="w-[76vw] sm:w-auto flex-shrink-0 sm:flex-shrink p-6 sm:p-8"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(200,150,46,0.18)',
                    }}
                  >
                    <div
                      className="w-10 h-10 flex items-center justify-center mb-5"
                      style={{ border: '1px solid rgba(200,150,46,0.3)', color: '#C8962E' }}
                    >
                      <StoryIcon icon={story.icon} />
                    </div>
                    <p
                      className="font-mono font-bold text-[clamp(24px,3vw,40px)] leading-none mb-1"
                      style={{ color: '#C8962E' }}
                    >
                      {story.stat}
                    </p>
                    <p className="font-semibold text-[13px] uppercase tracking-wide text-white mb-3">
                      {story.label}
                    </p>
                    {story.description && (
                      <p className="text-[13.5px] leading-relaxed" style={{ color: '#8896A7' }}>
                        {story.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 4. SDG Strip ─────────────────────────────────────────────────────── */}
      {sdgGoals.length > 0 && (
        <section
          className="py-16 sm:py-20"
          style={{ background: '#FAF7F2' }}
          aria-label="Sustainable Development Goals"
        >
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
            <div className="mb-10 reveal">
              <p className="font-mono text-[11px] tracking-[0.22em] uppercase mb-3" style={{ color: '#C8962E' }}>
                UN Sustainable Development Goals
              </p>
              <h2 className="font-black text-[clamp(22px,3vw,40px)] text-ink leading-tight">
                Our work contributes to:
              </h2>
            </div>
            <div className="flex flex-wrap gap-4 stagger">
              {sdgGoals.map((goal) => {
                const meta = SDG_META[goal]
                if (!meta) return null
                return (
                  <div
                    key={goal}
                    className="flex items-center gap-3 px-5 py-3"
                    style={{
                      background: meta.bg,
                      borderRadius: 2,
                    }}
                  >
                    <span
                      className="font-mono font-bold text-white text-[22px] leading-none"
                      aria-hidden="true"
                    >
                      {goal}
                    </span>
                    <div>
                      <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/70 leading-none mb-0.5">
                        Goal {goal}
                      </p>
                      <p className="font-semibold text-[12px] text-white leading-snug max-w-[160px]">
                        {meta.label}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── 5. Methodology footnote ──────────────────────────────────────────── */}
      {raw?.methodologyNote && (
        <section
          className="py-14 sm:py-20"
          style={{ background: '#FAF7F2' }}
          aria-label="Methodology"
        >
          <div className="max-w-2xl mx-auto px-6 sm:px-10">
            <div
              className="pl-5 py-1"
              style={{ borderLeft: '3px solid #C8962E' }}
            >
              <p className="font-mono text-[11px] tracking-[0.18em] uppercase mb-3" style={{ color: '#C8962E' }}>
                Methodology
              </p>
              <p className="text-[13px] italic leading-relaxed" style={{ color: '#8896A7' }}>
                {raw.methodologyNote}
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
