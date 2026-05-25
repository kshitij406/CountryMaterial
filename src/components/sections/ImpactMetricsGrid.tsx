'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export interface Metric {
  label: string
  value: string
  unit: string
}

interface Props {
  metrics: Metric[]
}

export default function ImpactMetricsGrid({ metrics }: Props) {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const cards = gridRef.current?.querySelectorAll<HTMLElement>('.impact-metric-card')
    if (!cards?.length) return

    gsap.fromTo(
      cards,
      { opacity: 0, y: 44 },
      {
        opacity: 1,
        y: 0,
        duration: 0.72,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    )

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()) }
  }, [])

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
    >
      {metrics.map((m) => (
        <div
          key={m.label}
          className="impact-metric-card p-6 sm:p-8"
          style={{
            background: '#FAF7F2',
            border: '1px solid #0B1D3A',
          }}
        >
          <p
            className="font-mono font-bold leading-none"
            style={{ fontSize: 'clamp(28px,4vw,52px)', color: '#C8962E' }}
          >
            {m.value}
          </p>
          {m.unit && (
            <p
              className="font-mono text-[11px] tracking-[0.18em] uppercase mt-1.5"
              style={{ color: '#8896A7' }}
            >
              {m.unit}
            </p>
          )}
          <p
            className="text-[13px] font-semibold leading-snug mt-4"
            style={{ color: '#2C3E50' }}
          >
            {m.label}
          </p>
        </div>
      ))}
    </div>
  )
}
