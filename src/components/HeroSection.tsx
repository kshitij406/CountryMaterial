'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { localePath, type Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n'

interface HeroSectionProps {
  videoSrc?: string
  heroImageUrl?: string
  headingLine1?: string
  headingLine2?: string
  subheading?: string
  locale: Locale
  t: Dictionary['hero']
}

export default function HeroSection({
  videoSrc,
  heroImageUrl,
  headingLine1,
  headingLine2,
  subheading,
  locale,
  t,
}: HeroSectionProps) {
  const line1 = headingLine1 ?? t.headingLine1
  const line2 = headingLine2 ?? t.headingLine2
  const sub   = subheading ?? t.subheading
  const containerRef  = useRef<HTMLDivElement>(null)
  const locationRef   = useRef<HTMLParagraphElement>(null)
  const line1Ref      = useRef<HTMLSpanElement>(null)
  const line2Ref      = useRef<HTMLSpanElement>(null)
  const subRef        = useRef<HTMLParagraphElement>(null)
  const ctaRef        = useRef<HTMLDivElement>(null)
  const scrollRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const refs = [locationRef, line1Ref, line2Ref, subRef, ctaRef, scrollRef]
    if (prefersReduced) {
      refs.forEach((r) => {
        if (r.current) { r.current.style.opacity = '1'; r.current.style.transform = 'none' }
      })
      return
    }

    let cancelled = false
    let ctx: { revert: () => void } | undefined

    // Safety net: if the tab is backgrounded/throttled (rAF paused) or the GSAP
    // chunk fails to load, never leave the hero text permanently invisible.
    const fallback = window.setTimeout(() => {
      refs.forEach((r) => {
        if (r.current) { r.current.style.opacity = '1'; r.current.style.transform = 'none' }
      })
    }, 2500)

    import('gsap').then(({ default: gsap }) => {
      if (cancelled) return
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: () => window.clearTimeout(fallback) })
        tl.from(locationRef.current, { y: 20, opacity: 0, duration: 0.6 })
          .from(line1Ref.current,    { y: 80, opacity: 0, duration: 1.0 }, '-=0.3')
          .from(line2Ref.current,    { y: 80, opacity: 0, duration: 1.0 }, '-=0.7')
          .from(subRef.current,      { y: 30, opacity: 0, duration: 0.7 }, '-=0.4')
          .from(ctaRef.current,      { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
          .from(scrollRef.current,   { opacity: 0, duration: 0.8 },        '-=0.2')
      }, containerRef)
    })

    return () => {
      cancelled = true
      window.clearTimeout(fallback)
      ctx?.revert()
    }
  }, [])

  const bgImage = heroImageUrl ?? '/images/randos/molten_steel.jpeg'

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col overflow-hidden bg-navy"
      aria-label={t.sectionLabel}
    >
      {/* Background */}
      {videoSrc ? (
        <video autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={bgImage}
          alt={t.imageAlt}
          fill className="object-cover"
          priority quality={85}
          sizes="100vw"
        />
      )}

      {/* Overlays — heavy at bottom so copy reads, lighter at top */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/40 to-navy/95" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/55 via-transparent to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 grain-overlay" aria-hidden="true" />
      <div className="absolute inset-0 bg-steel-texture" aria-hidden="true" />

      {/* Content — pushed to bottom third */}
      <div className="relative z-10 flex-1 flex flex-col justify-end max-w-[1440px] mx-auto w-full px-6 sm:px-10 lg:px-16 pb-0">

        {/* Location line — plain text, no badge */}
        <p
          ref={locationRef}
          className="font-mono text-[11px] tracking-[0.22em] uppercase text-white/45 mb-8"
        >
          {t.location}
        </p>

        {/* Main headline */}
        <h1 className="font-sans leading-[0.95] tracking-tight text-white mb-7">
          <span
            ref={line1Ref}
            className="block font-black text-[clamp(52px,8.5vw,124px)]"
          >
            {line1}
          </span>
          {/* Second line in gold, not cyan */}
          <span
            ref={line2Ref}
            className="block font-black text-[clamp(52px,8.5vw,124px)] text-gold"
          >
            {line2}
          </span>
        </h1>

        {/* Subheading */}
        <p
          ref={subRef}
          className="text-[clamp(15px,1.6vw,18px)] text-white/60 font-medium leading-relaxed max-w-lg mb-10"
        >
          {sub}
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-wrap items-center gap-4 mb-16">
          <Link
            href={localePath(locale, '/contact')}
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold text-[15px] px-7 py-4 rounded-none transition-colors duration-200 cursor-pointer"
          >
            {t.requestQuote}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
          <Link
            href={localePath(locale, '/shop')}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white border border-white/20 hover:border-white/40 font-semibold text-[15px] px-7 py-4 rounded-none transition-all duration-200 cursor-pointer"
          >
            {t.viewProducts}
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-[130px] right-8 lg:right-14 hidden lg:flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <div className="w-px h-14 bg-gradient-to-b from-transparent via-white/20 to-white/40" />
        <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/25 [writing-mode:vertical-lr]">
          {t.scroll}
        </span>
      </div>
    </section>
  )
}
