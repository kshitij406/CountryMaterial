'use client'

import { useRef } from 'react'
import { useGsapSlideIn, useGsapFadeUp } from '@/components/animations/gsap-hooks'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'

export default function IntroSection() {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useGsapSlideIn(leftRef, 'left')
  useGsapSlideIn(rightRef, 'right')

  return (
    <section className="bg-white py-section">
      <div className="max-w-container mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — visual */}
          <div ref={leftRef} className="opacity-0 relative">
            <div className="relative aspect-[4/5] max-w-md">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/intro-main.jpg')" }}
              />
              {/* Gold accent frame */}
              <div className="absolute -bottom-6 -right-6 w-3/4 h-3/4 border-2 border-gold/40 -z-10" />
              {/* Stat overlay */}
              <div className="absolute -bottom-4 left-6 bg-navy px-7 py-5">
                <div className="font-heading text-4xl text-gold">15+</div>
                <div className="font-body text-xs text-white/70 tracking-widest uppercase mt-1">Years of Service</div>
              </div>
            </div>
          </div>

          {/* Right — text */}
          <div ref={rightRef} className="opacity-0">
            <SectionLabel className="mb-5">Who We Are</SectionLabel>
            <h2 className="font-heading text-4xl lg:text-5xl text-navy leading-tight mb-6">
              Tanzania's Trusted Partner in Industrial Solutions
            </h2>
            <p className="font-body text-slate leading-relaxed mb-5">
              Country Materials Ltd is a Dar es Salaam-based company dedicated to bridging the gap between
              scrap informal vendors, steel manufacturers, and constructors. We operate across hardware
              supply, waste management, and transportation — serving businesses and communities with
              reliability and purpose.
            </p>
            <p className="font-body text-slate leading-relaxed mb-8">
              Headquartered at Babecov Complex on Buguruni Mandela Road, we have built a reputation
              for quality, consistency, and long-term partnerships with Tanzania's leading steel and
              construction companies.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-10 py-8 border-y border-sand">
              {[
                { stat: '3', label: 'Core Services' },
                { stat: '50+', label: 'Products Supplied' },
                { stat: '6+', label: 'Industry Partners' },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="font-heading text-3xl text-gold">{item.stat}</div>
                  <div className="font-body text-xs text-slate/70 tracking-wide uppercase mt-1">{item.label}</div>
                </div>
              ))}
            </div>

            <Button href="/about" variant="ghost">
              Our Full Story
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
