'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface Props {
  tonnesRecycled: number
  co2AvoidedTonnes: number
  jobsCreated: number
  landfillDivertedM3: number
}

function fmt(n: number): string {
  return Math.round(n).toLocaleString('en-US')
}

export default function ImpactTeaser({
  tonnesRecycled,
  co2AvoidedTonnes,
  jobsCreated,
  landfillDivertedM3,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const numRefs = useRef<(HTMLSpanElement | null)[]>([])

  const items = [
    { label: 'Tonnes Recycled',   value: tonnesRecycled,    suffix: 't'    },
    { label: 'CO₂ Avoided',       value: co2AvoidedTonnes,  suffix: 't CO₂' },
    { label: 'Jobs Supported',    value: jobsCreated,        suffix: ''     },
    { label: 'Landfill Diverted', value: landfillDivertedM3, suffix: 'm³'  },
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const tweens = items.map((item, i) => {
      const el = numRefs.current[i]
      if (!el) return null

      const obj = { val: 0 }
      return gsap.to(obj, {
        val: item.value,
        duration: 2,
        ease: 'power2.out',
        onUpdate() {
          el.textContent = fmt(obj.val)
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })
    })

    return () => {
      tweens.forEach((t) => t?.kill())
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tonnesRecycled, co2AvoidedTonnes, jobsCreated, landfillDivertedM3])

  return (
    <section
      ref={sectionRef}
      aria-label="Impact teaser"
      style={{
        background: '#0B1D3A',
        borderTop:    '1px solid rgba(200,150,46,0.12)',
        borderBottom: '1px solid rgba(200,150,46,0.12)',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">
          <div>
            <p
              className="font-mono text-[11px] tracking-[0.22em] uppercase mb-3"
              style={{ color: '#C8962E' }}
            >
              Our Impact
            </p>
            <h2 className="font-black text-[clamp(26px,3.5vw,48px)] text-white leading-tight tracking-tight">
              Scrap turned into<br />measurable change.
            </h2>
          </div>
          <Link
            href="/impact"
            className="self-start sm:self-auto flex items-center gap-2 font-mono text-[12px] tracking-[0.18em] uppercase group whitespace-nowrap"
            style={{ color: '#C8962E' }}
          >
            See Full Impact Report
            <svg
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Counter grid — 2×2 mobile, 4-col desktop */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-px"
          style={{ background: 'rgba(200,150,46,0.12)' }}
        >
          {items.map((item, i) => (
            <div
              key={item.label}
              className="flex flex-col px-6 py-8 sm:px-8"
              style={{ background: '#0B1D3A' }}
            >
              <span
                className="font-mono font-bold leading-none"
                style={{ fontSize: 'clamp(28px,3.8vw,52px)', color: '#C8962E' }}
              >
                <span ref={(el) => { numRefs.current[i] = el }}>0</span>
                {item.suffix && (
                  <span
                    className="text-[15px] ml-1.5"
                    style={{ color: 'rgba(200,150,46,0.7)' }}
                  >
                    {item.suffix}
                  </span>
                )}
              </span>
              <span
                className="font-mono text-[11px] tracking-[0.16em] uppercase mt-3"
                style={{ color: '#8896A7' }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
