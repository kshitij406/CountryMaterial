'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface HeroSectionProps {
  videoSrc?: string | null
  headingLine1?: string
  headingLine2?: string
  subheading?: string
}

export default function HeroSection({
  videoSrc,
  headingLine1 = 'Built for Africa.',
  headingLine2 = 'Built to last.',
  subheading = 'Steel, hardware, waste management and logistics for the infrastructure Tanzania — and the continent — is building. Fifty thousand tonnes. One promise.',
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const ease = 'power3.out'
      const tl = gsap.timeline({ defaults: { ease } })

      // Kicker
      tl.fromTo('.hs-kicker', { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.4)
      tl.fromTo('.hs-rule', { width: 0 }, { width: 80, duration: 0.6, ease: 'power2.inOut' }, 0.4)

      // H1 line reveals (overflow-hidden parent clips the slide-up)
      tl.fromTo('.hs-line-inner', { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.15 }, 0.6)

      // Subheading
      tl.fromTo('.hs-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 1.0)

      // CTAs
      tl.fromTo('.hs-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 }, 1.2)

      // Meta & scroll hint
      tl.fromTo('.hs-meta', { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.4)
      tl.fromTo('.hs-scroll', { opacity: 0 }, { opacity: 0.75, duration: 0.5 }, 1.6)

      // Hero background parallax
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      // Nav glassmorphism on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top+=80 top',
        onEnter: () => document.querySelector('header')?.classList.add('nav-glass'),
        onLeaveBack: () => document.querySelector('header')?.classList.remove('nav-glass'),
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[720px] flex items-end overflow-hidden bg-navy"
    >
      {/* Cinematic background */}
      <div
        ref={bgRef}
        className="absolute inset-0 scale-[1.08]"
        style={{
          background: `
            radial-gradient(ellipse at 70% 30%, rgba(200,150,46,.22), transparent 55%),
            radial-gradient(ellipse at 20% 80%, rgba(232,184,75,.12), transparent 60%),
            linear-gradient(180deg,#050e1f 0%,#0B1D3A 55%,#1a0f05 100%)
          `,
        }}
      >
        {/* Angular shard overlay */}
        <div
          className="absolute inset-0 mix-blend-screen"
          style={{
            background: `
              linear-gradient(115deg,transparent 0%,transparent 48%,rgba(200,150,46,.06) 49%,rgba(200,150,46,.06) 50%,transparent 51%),
              linear-gradient(62deg,transparent 0%,transparent 38%,rgba(255,220,160,.04) 39%,transparent 40%),
              linear-gradient(200deg,transparent 60%,rgba(0,0,0,.5) 100%)
            `,
          }}
        />
        {videoSrc && (
          <video
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-55"
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
          />
        )}
      </div>

      {/* Navy gradient overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: 'linear-gradient(180deg,rgba(11,29,58,.55) 0%,rgba(11,29,58,.75) 50%,rgba(11,29,58,.95) 100%)' }}
      />

      {/* Grain */}
      <div aria-hidden className="grain-overlay absolute inset-0 z-[2] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-8 lg:px-16 pb-24">

        {/* Kicker */}
        <div className="hs-kicker flex items-center gap-[18px] mb-7" style={{ opacity: 0 }}>
          <span
            className="hs-rule block h-px bg-gold flex-shrink-0"
            style={{ width: 0 }}
          />
          <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold">
            Dar es Salaam · Est. 1997
          </span>
        </div>

        {/* H1 — each line clips via overflow-hidden parent */}
        <h1 className="font-display uppercase leading-[0.88] tracking-[0.04em] text-[clamp(64px,10vw,160px)] max-w-[1200px]">
          <span className="block overflow-hidden">
            <span className="hs-line-inner block text-cream">{headingLine1}</span>
          </span>
          <span className="block overflow-hidden">
            <span className="hs-line-inner block text-gold">{headingLine2}</span>
          </span>
        </h1>

        {/* Subheading */}
        <p
          className="hs-sub mt-9 font-barlow text-[18px] text-cream/70 leading-[1.6] max-w-[540px]"
          style={{ opacity: 0 }}
        >
          {subheading}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mt-11">
          <Link
            href="/services"
            className="hs-cta group relative inline-flex items-center gap-3 overflow-hidden px-[34px] py-[18px] bg-gold text-navy font-condensed text-[14px] tracking-[0.22em] uppercase font-semibold"
            style={{ opacity: 0 }}
          >
            <span className="relative z-10">Explore our work</span>
            <svg className="relative z-10 w-3.5 h-3.5 transition-transform duration-400 group-hover:translate-x-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
            <span
              className="absolute inset-0 bg-cream -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
              style={{ transitionTimingFunction: 'cubic-bezier(.16,1,.3,1)' }}
            />
          </Link>

          <Link
            href="/contact"
            className="hs-cta group relative inline-flex items-center gap-3 overflow-hidden px-[34px] py-[18px] border border-gold text-gold font-condensed text-[14px] tracking-[0.22em] uppercase font-semibold"
            style={{ opacity: 0 }}
          >
            <span className="relative z-10 group-hover:text-navy transition-colors duration-300">Request a quote</span>
            <svg
              className="relative z-10 w-3.5 h-3.5 group-hover:text-navy transition-all duration-400 group-hover:translate-x-1.5"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
            <span
              className="absolute inset-0 bg-gold -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
              style={{ transitionTimingFunction: 'cubic-bezier(.16,1,.3,1)' }}
            />
          </Link>
        </div>
      </div>

      {/* Hero meta — bottom right */}
      <div className="hs-meta absolute right-8 lg:right-16 bottom-24 z-10 flex flex-col gap-1 items-end" style={{ opacity: 0 }}>
        <span className="font-condensed text-[11px] tracking-[0.18em] uppercase text-cream/50">Est. MCMXCVII</span>
        <span className="font-space text-[12px] text-gold tracking-[0.1em]">06°47&apos;S · 39°12&apos;E</span>
      </div>

      {/* Scroll hint — bottom left */}
      <div className="hs-scroll absolute left-8 lg:left-16 bottom-10 z-10 flex items-center gap-3" style={{ opacity: 0 }}>
        <span className="font-condensed text-[11px] tracking-[0.22em] uppercase text-cream/60">Scroll</span>
        <span className="relative block w-px h-9 bg-gold overflow-hidden">
          <span className="absolute inset-0 bg-cream animate-scroll-bar" />
        </span>
      </div>

      {/* Bottom gold rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-gold via-gold-light to-transparent z-20" />
    </section>
  )
}
