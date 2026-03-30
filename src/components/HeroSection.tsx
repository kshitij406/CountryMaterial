'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from '@/components/ui/SectionLabel'
import HeroCanvas from '@/components/HeroCanvas'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Placeholder video — swap `src` with a Sanity field (e.g. siteSettings.heroVideo)
 * once video upload is wired into the CMS schema.
 */
const PLACEHOLDER_VIDEO =
  'https://assets.mixkit.co/videos/preview/mixkit-aerial-shot-of-a-construction-site-34477-large.mp4'

const HEADLINE_LINES = ["Building Tanzania's", 'Industrial Future']
const SUBHEADING =
  'Premium hardware materials, waste management, and logistics solutions for a growing nation.'

interface HeroSectionProps {
  /**
   * Video URL to use as the background.
   * - string  → play that URL
   * - null    → render HeroCanvas animated fallback (no video)
   * - omitted → use the Mixkit construction placeholder
   */
  videoSrc?: string | null
  /** Override the first headline line */
  headingLine1?: string
  /** Override the second headline line */
  headingLine2?: string
  /** Override the subheading paragraph */
  subheading?: string
}

export default function HeroSection({
  videoSrc = PLACEHOLDER_VIDEO,
  headingLine1 = HEADLINE_LINES[0],
  headingLine2 = HEADLINE_LINES[1],
  subheading = SUBHEADING,
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // ── 1. Label ──────────────────────────────────────────────────────────
      tl.fromTo('.hs-label', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5 }, 0.2)

      // ── 2. Word-by-word headline stagger ──────────────────────────────────
      // Each .hs-word slides up from y:40 and fades in, offset by 60ms per word
      tl.fromTo(
        '.hs-word',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.72, stagger: 0.06 },
        0.5
      )

      // ── 3. Gold underline draws in left → right ───────────────────────────
      tl.fromTo(
        '.hs-underline',
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.8, ease: 'power2.inOut' },
        1.35
      )

      // ── 4. Subheading ────────────────────────────────────────────────────
      tl.fromTo('.hs-sub', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7 }, 1.52)

      // ── 5. CTAs ──────────────────────────────────────────────────────────
      tl.fromTo(
        '.hs-cta',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.12 },
        1.72
      )

      // ── 6. Scroll cue ────────────────────────────────────────────────────
      tl.fromTo('.hs-scroll', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 2.1)

      // ── Nav glassmorphism on scroll ───────────────────────────────────────
      // Adds .nav-glass to <header> once user scrolls 80px into the hero.
      // Styles live in globals.css so CSS transitions handle the smooth blend.
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top+=80 top',
        onEnter: () => document.querySelector('header')?.classList.add('nav-glass'),
        onLeaveBack: () => document.querySelector('header')?.classList.remove('nav-glass'),
      })

      // ── Scroll-reveal for downstream sections ────────────────────────────
      // Add data-reveal to any wrapper in page.tsx to opt sections into this.
      ScrollTrigger.batch('[data-reveal]', {
        onEnter: (els) =>
          gsap.fromTo(els, { opacity: 0, y: 44 }, {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: 'power3.out',
          }),
        start: 'top 88%',
        once: true,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const lines = [headingLine1, headingLine2]

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[600px] max-h-[900px] flex items-center overflow-hidden bg-navy"
    >

      {/* ── Background layer — video when available, canvas fallback otherwise ── */}
      {videoSrc ? (
        /* scale-105 prevents letterboxing on zoom/parallax */
        <video
          className="absolute inset-0 w-full h-full object-cover scale-105"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
        />
      ) : (
        <HeroCanvas />
      )}

      {/* ── Colour overlays ────────────────────────────────────────────────── */}
      {/* Flat navy tint ~60% — establishes brand background */}
      <div className="absolute inset-0 bg-navy/60 z-[1]" />
      {/* Directional gradient for left-side text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/30 to-transparent z-[2]" />
      {/* Cinematic grain — .grain-overlay defined in globals.css */}
      <div aria-hidden className="grain-overlay absolute inset-0 z-[3] pointer-events-none" />

      {/* ── Bottom gold rule ───────────────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-gold via-gold-light to-transparent z-20" />

      {/* ── Content ────────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-container mx-auto px-6 lg:px-10 w-full">
        <div className="max-w-[740px]">

          {/* Label */}
          <SectionLabel light className="hs-label mb-6 opacity-0">
            Est. — Dar es Salaam, Tanzania
          </SectionLabel>

          {/* Headline — each word is an independently animated span */}
          <h1 className="font-heading text-5xl md:text-6xl lg:text-[4.5rem] text-white leading-[1.06] mb-5">
            {lines.map((line, li) => (
              <span key={li} className="block">
                {line.split(' ').map((word, wi) => (
                  // Trailing space is inside the animated span so word spacing
                  // appears as each word slides in
                  <span key={`${li}-${wi}`} className="hs-word inline-block opacity-0">
                    {word}{wi < line.split(' ').length - 1 ? '\u00A0' : ''}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          {/* Gold accent underline — scaleX 0→1 via GSAP */}
          <div className="mb-8">
            <span className="hs-underline block h-[3px] w-28 bg-gradient-to-r from-gold to-gold-light rounded-[1px] scale-x-0 origin-left" />
          </div>

          {/* Subheading */}
          <p className="hs-sub font-body text-lg text-white/75 leading-relaxed mb-10 max-w-[490px] opacity-0">
            {subheading}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/services"
              className="hs-cta opacity-0 inline-flex items-center justify-center px-8 py-4 bg-gold hover:bg-gold-light text-navy font-body font-semibold tracking-wide transition-colors duration-200"
            >
              Explore Our Services
            </Link>
            <Link
              href="/contact"
              className="hs-cta opacity-0 inline-flex items-center justify-center px-8 py-4 border-2 border-white/50 hover:border-white text-white font-body font-semibold tracking-wide transition-all duration-200 hover:bg-white/10"
            >
              Get in Touch
            </Link>
          </div>

        </div>
      </div>

      {/* ── Scroll cue ────────────────────────────────────────────────────── */}
      <div className="hs-scroll opacity-0 absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/40">
        <span className="font-body text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
      </div>

    </section>
  )
}
