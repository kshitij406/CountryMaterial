'use client'

import { useEffect, useRef } from 'react'
import { localePath, type Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n'

interface Stat {
  count: number
  suffix?: string
  label: string
  sub?: string
}

const DEFAULT_COUNTS = [
  { count: 50000, suffix: '+' },
  { count: 320,   suffix: '+' },
  { count: 5000,  suffix: '+' },
  { count: 104,   suffix: ''  },
  { count: 30,    suffix: '+' },
  { count: 5,     suffix: ''  },
]

/** Counts are language-independent; only the labels come from the dictionary. */
function defaultStats(t: Dictionary['stats']): Stat[] {
  return DEFAULT_COUNTS.map((c, i) => ({ ...c, ...t.defaults[i] }))
}

function Counter({ count, suffix = '' }: { count: number; suffix?: string }) {
  const spanRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = spanRef.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = count.toLocaleString() + suffix
      return
    }

    // Local closure var — not a ref — so each effect invocation starts fresh.
    // (A ref would carry over from the first invocation in React Strict Mode's
    //  double-fire, causing the second observer's callback to never run.)
    let animStarted = false
    let rafId: number | null = null

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || animStarted) return
        animStarted = true
        io.disconnect()

        const dur = 1800
        const startTs = performance.now()
        const tick = (now: number) => {
          const p = Math.min(1, (now - startTs) / dur)
          const eased = 1 - Math.pow(1 - p, 3)
          el.textContent = Math.floor(eased * count).toLocaleString() + suffix
          if (p < 1) {
            rafId = requestAnimationFrame(tick)
          } else {
            el.textContent = count.toLocaleString() + suffix
          }
        }
        rafId = requestAnimationFrame(tick)
      },
      // Lower threshold so the animation fires as soon as the item enters view,
      // not waiting for 50% — avoids missing the window when elements are small.
      { threshold: 0.2 }
    )

    io.observe(el)

    return () => {
      io.disconnect()
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [count, suffix])

  return <span ref={spanRef} className="tabular-nums">0{suffix}</span>
}

// Tailwind scans source text for class names, not evaluated JS — literal
// strings in this lookup are picked up at build time even though they're
// selected dynamically at runtime.
const SM_COLS: Record<number, string> = {
  1: 'sm:grid-cols-1', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-4', 5: 'sm:grid-cols-5', 6: 'sm:grid-cols-6',
}
const XL_COLS: Record<number, string> = {
  1: 'xl:grid-cols-1', 2: 'xl:grid-cols-2', 3: 'xl:grid-cols-3',
  4: 'xl:grid-cols-4', 5: 'xl:grid-cols-5', 6: 'xl:grid-cols-6',
}

export default function StatsSection({
  stats,
  locale,
  t,
}: {
  stats?: Stat[]
  locale: Locale
  t: Dictionary['stats']
}) {
  const data = stats?.length ? stats.slice(0, 6) : defaultStats(t)
  // Columns track the actual item count — a fixed 6-col grid left narrow,
  // clipped cells whenever fewer than 6 stats were configured (the "+" in
  // "50,000+" was landing past the cell's overflow-hidden edge).
  const smCols = SM_COLS[Math.min(data.length, 3)]
  const xlCols = XL_COLS[Math.min(data.length, 6)]

  return (
    <section
      className="relative overflow-hidden"
      id="impact"
      style={{ background: 'var(--navy)' }}
    >
      {/* Industrial texture overlays */}
      <div className="absolute inset-0 bg-steel-texture" aria-hidden="true" />
      <div className="absolute inset-0 bg-concrete-texture" aria-hidden="true" />

      <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 reveal">
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-gold mb-4">{t.eyebrow}</p>
            <h2 className="font-black text-[clamp(36px,5.5vw,80px)] text-inverse leading-none tracking-tight">
              {t.headingLine1}<br />{t.headingLine2}
            </h2>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-4">
            <a
              href={localePath(locale, '/impact')}
              className="group inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.18em] uppercase text-gold hover:text-gold-light transition-colors duration-200"
            >
              {t.viewImpactReport}
              <svg
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <span className="hidden sm:block font-mono text-[10px] text-inverse/30 tracking-widest text-right leading-relaxed">
              {t.established}<br />{t.city}
            </span>
          </div>
        </div>

        {/* Stats grid — no stagger class here; stagger hides items while counter
            runs invisibly, so users see the final value snap in without animation. */}
        <div
          className={`reveal grid grid-cols-2 ${smCols} ${xlCols}`}
          style={{ borderTop: '1px solid rgba(200,150,46,0.12)' }}
        >
          {data.map((s, i) => (
            <div
              key={s.label}
              className="group py-8 px-3 sm:px-4 transition-colors duration-300 hover:bg-inverse/[0.03]"
              style={{
                borderRight: i < data.length - 1 ? '1px solid rgba(200,150,46,0.10)' : undefined,
              }}
            >
              <div className="font-mono font-bold text-[clamp(24px,2.6vw,48px)] leading-none text-gold whitespace-nowrap">
                <Counter count={s.count} suffix={s.suffix} />
              </div>
              <div className="mt-3 w-6 h-px bg-gold/30 transition-all duration-300 group-hover:w-10 group-hover:bg-gold/60" />
              <div className="mt-2.5 text-[10px] font-bold tracking-[0.18em] uppercase text-inverse/55">{s.label}</div>
              {s.sub && <div className="mt-1 text-[11px] text-inverse/45 leading-snug max-w-[160px]">{s.sub}</div>}
            </div>
          ))}
        </div>

        {/* Revenue callout */}
        <div
          className="mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-12 px-8 py-8 border-l-4 border-gold reveal"
          style={{ background: 'rgba(200,150,46,0.06)' }}
        >
          <div className="flex-shrink-0">
            <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-gold/60 mb-1">{t.annualRevenue}</p>
            <p className="font-mono font-bold text-[52px] text-inverse leading-none">$11.2M</p>
          </div>
          <div className="flex-1 max-w-sm">
            <p className="text-[14px] text-inverse/60 leading-relaxed">
              {t.revenueBody}
            </p>
          </div>
          <a
            href={localePath(locale, '/about')}
            className="group flex-shrink-0 inline-flex items-center gap-2 text-gold hover:text-gold-light text-[13px] font-semibold transition-colors duration-200 cursor-pointer"
          >
            {t.ourStory}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>
  )
}
