'use client'

import { useEffect, useRef } from 'react'

interface Stat {
  count: number
  suffix?: string
  label: string
  sub?: string
}

const DEFAULT_STATS: Stat[] = [
  { count: 29,    suffix: '',  label: 'Years in Operation', sub: 'Since 1997, under one family stewardship.' },
  { count: 50000, suffix: '+', label: 'Tonnes Delivered',   sub: 'Of certified steel, annually, across the region.' },
  { count: 1200,  suffix: '+', label: 'Active Clients',     sub: 'Contractors, ministries, mines, and developers.' },
  { count: 14,    suffix: '',  label: 'Cities Served',      sub: 'Across Tanzania, Zambia, DRC and Rwanda.' },
]

function Counter({ count }: { count: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true
          io.disconnect()

          const dur = 2000
          const start = performance.now()

          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / dur)
            const eased = 1 - Math.pow(1 - p, 3)
            el.textContent = Math.floor(eased * count).toLocaleString()
            if (p < 1) requestAnimationFrame(tick)
            else el.textContent = count.toLocaleString()
          }

          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [count])

  return <span ref={ref} className="tabular-nums">0</span>
}

export default function StatsSection({ stats }: { stats?: Stat[] }) {
  const data = stats?.length ? stats.slice(0, 4) : DEFAULT_STATS

  return (
    <section
      className="relative py-20 sm:py-24 lg:py-[120px] px-5 sm:px-8 lg:px-16 overflow-hidden"
      id="stats"
      style={{
        background: '#05101f',
        borderTop: '1px solid rgba(200,150,46,.2)',
        borderBottom: '1px solid rgba(200,150,46,.2)',
      }}
    >
      <div aria-hidden className="grain-overlay absolute inset-0 pointer-events-none z-0" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 120%,rgba(200,150,46,.12),transparent 60%)' }}
      />

      <div className="relative max-w-[1440px] mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-8 sm:gap-10 mb-14 sm:mb-24 reveal">
          <h2 className="font-display text-[clamp(32px,5vw,72px)] leading-[0.9] tracking-[0.03em] uppercase text-cream max-w-[720px]">
            Numbers that <span className="text-gold">hold weight.</span>
          </h2>
          <span className="font-space text-[12px] text-gold tracking-[0.2em]">{'// 04 — THE RECORD'}</span>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 stagger"
          style={{ borderTop: '1px solid rgba(200,150,46,.25)' }}
        >
          {data.map((s, i) => (
            <div
              key={s.label}
              className="py-10 sm:py-14 px-5 sm:px-8"
              style={{ borderRight: i < data.length - 1 ? '1px solid rgba(200,150,46,.15)' : undefined }}
            >
              <div className="font-display text-[clamp(56px,8vw,132px)] leading-[0.95] tracking-[0.02em] text-gold flex items-baseline gap-1.5">
                <Counter count={s.count} />
                {s.suffix && <span className="text-[0.55em] text-gold-light">{s.suffix}</span>}
              </div>
              <div className="mt-4 w-10 h-px bg-gold" />
              <div className="mt-4 font-condensed text-[13px] tracking-[0.22em] uppercase text-cream/65">{s.label}</div>
              {s.sub && <div className="mt-2 font-barlow text-[14px] text-cream/45 max-w-[200px]">{s.sub}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
