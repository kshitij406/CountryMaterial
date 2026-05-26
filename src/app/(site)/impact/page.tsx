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
      "Country Materials Ltd has recycled 50,000+ metric tonnes of scrap steel, avoiding 92,500 tonnes of CO₂, onboarding 5,000+ vendors and creating 104 direct jobs in Tanzania.",
    path: '/impact',
  }),
  keywords: ['recycling Tanzania', 'CO2 emissions', 'waste management Dar es Salaam', 'ESG'],
}

// UN SDG official colour palette
const SDG_META: Record<string, { bg: string; label: string }> = {
  '8':  { bg: '#A21942', label: 'Decent Work & Economic Growth' },
  '11': { bg: '#FD9D24', label: 'Sustainable Cities & Communities' },
  '12': { bg: '#BF8B2E', label: 'Responsible Consumption & Production' },
  '13': { bg: '#3F7E44', label: 'Climate Action' },
}

const VERIFIED_SDG_GOALS = ['8', '11', '12', '13']

function fmt(n: number, decimals = 0): string {
  return n.toLocaleString('en-US', { maximumFractionDigits: decimals })
}

interface ImpactStory {
  _key: string
  stat: string
  label: string
  description?: string
  icon?: string
}

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
  if (icon === 'vendors') return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
  if (icon === 'clients') return (
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
  if (icon) return <span className="text-xl leading-none" aria-hidden="true">{icon}</span>
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  )
}

// Fallback impact stories — shown when Sanity has no data
const FALLBACK_STORIES: ImpactStory[] = [
  { _key: 'f1', stat: '50,000+', label: 'Metric Tons Recycled',  icon: 'energy',  description: 'Scrap steel collected, processed and returned to the supply chain since 2022.' },
  { _key: 'f2', stat: '5,000+',  label: 'Vendors Onboarded',    icon: 'vendors', description: 'Informal collectors and scrap dealers integrated into a formal circular supply chain.' },
  { _key: 'f3', stat: '320+',    label: 'Active Clients',        icon: 'clients', description: 'Construction companies, contractors and hardware dealers served across Tanzania.' },
  { _key: 'f4', stat: '104',     label: 'Jobs Created',          icon: 'jobs',    description: 'Direct employment generated at our facility and logistics operations in Dar es Salaam.' },
]

export default async function ImpactPage() {
  const raw = await client.fetch(impactPageQuery).catch(() => null)

  const tonnesRecycled = raw?.tonnesRecycled ?? 50000
  const reportingYear  = raw?.reportingYear  ?? new Date().getFullYear()

  const impact = calculateImpact(tonnesRecycled, reportingYear, raw?.manualOverrides ?? undefined)

  const heroHeading = raw?.heroHeading ?? 'Turning Scrap\nInto a Better Future'
  const headingLines = heroHeading.replace(/\\n/g, '\n').split('\n')

  // Verified + calculated metrics only — no fabricated estimates
  const metrics = [
    { label: 'Tonnes Recycled',   value: `${fmt(impact.tonnesRecycled)}+`,   unit: 'metric tonnes'  },
    { label: 'CO₂ Avoided',       value: fmt(impact.co2AvoidedTonnes),       unit: 'tonnes CO₂'    },
    { label: 'Landfill Diverted', value: fmt(impact.landfillDivertedM3),     unit: 'm³'             },
    { label: 'Energy Saved',      value: fmt(impact.energySavedKwh),         unit: 'kWh'            },
    { label: 'Jobs Created',      value: '104',                               unit: 'direct jobs'    },
    { label: 'Vendors Onboarded', value: '5,000+',                            unit: 'supply partners' },
  ]

  // Use Sanity stories if present, otherwise fall back to the verified set
  const rawStories: ImpactStory[] = raw?.impactStories ?? []
  const impactStories = rawStories.length > 0 ? rawStories : FALLBACK_STORIES

  // SDG goals — only claim goals with verified supporting data
  const sdgGoals: string[] = raw?.sdgGoals ?? VERIFIED_SDG_GOALS

  return (
    <>
      {/* ── 1. Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative pt-32 pb-20 sm:pb-28 overflow-hidden"
        style={{ background: '#0B1D3A' }}
        aria-label="Impact hero"
      >
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
          <p
            className="reveal font-mono text-[11px] tracking-[0.22em] uppercase mb-6"
            style={{ color: '#C8962E' }}
          >
            Climate & Social Impact — {reportingYear}
          </p>

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

          {raw?.heroSubtitle && (
            <p
              className="reveal text-[16px] leading-relaxed max-w-2xl mb-14"
              style={{ color: '#8896A7' }}
            >
              {raw.heroSubtitle}
            </p>
          )}

          {/* Three verified headline stats */}
          <div className="reveal grid grid-cols-3 gap-6 max-w-2xl" style={{ borderTop: '1px solid rgba(200,150,46,0.15)' }}>
            {[
              { label: 'CO₂ Avoided',       value: `${fmt(impact.co2AvoidedTonnes)}t` },
              { label: 'Tonnes Recycled',   value: `${fmt(impact.tonnesRecycled)}+`    },
              { label: 'Jobs Created',      value: '104'                                },
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

      {/* ── 2. Primary Metrics Grid ──────────────────────────────────────────── */}
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
            CO₂, landfill & energy figures calculated from {fmt(impact.tonnesRecycled)}+ metric tonnes · World Steel Association / EPA conversion factors · FY {reportingYear}
          </p>
        </div>
      </section>

      {/* ── 3. People & Community ────────────────────────────────────────────── */}
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

          {/* Women & youth — narrative only, no unverified percentages */}
          <div
            className="reveal mb-16 pl-5 py-5 pr-6 max-w-2xl"
            style={{
              background: '#FAF7F2',
              borderLeft: '4px solid #C8962E',
            }}
          >
            <p className="italic text-[15px] leading-relaxed" style={{ color: '#4A5568' }}>
              At Country Materials, women make up a significant part of our vendor network and workforce.
              We are actively tracking gender and youth participation data and will publish verified
              figures in our 2025 Impact Report.
            </p>
          </div>

          {/* Verified impact story cards */}
          <div className="overflow-x-auto -mx-6 px-6 sm:overflow-visible sm:mx-0 sm:px-0">
            <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 min-w-max sm:min-w-0 stagger">
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
                    style={{ background: meta.bg, borderRadius: 2 }}
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
              {raw?.methodologyNote ??
                'CO₂ avoided calculated at 1.85 tonnes CO₂ per tonne of scrap recycled (World Steel Association, 2023). ' +
                'Landfill diversion calculated at 0.57 m³ per tonne (US EPA). ' +
                'Energy savings calculated at 642 kWh per tonne (World Steel Association). ' +
                'Vendor, client and employment figures are verified company records as of FY ' + reportingYear + '.'}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
