'use client'

import { useEffect, useRef, useState, RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext'
import type { PreparedTextWithSegments } from '@chenglou/pretext'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function useGsapFadeUp(ref: RefObject<HTMLElement | null>, options?: { delay?: number; duration?: number }) {
  useEffect(() => {
    if (!ref.current) return
    const el = ref.current

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: options?.duration ?? 0.9,
          delay: options?.delay ?? 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    return () => ctx.revert()
  }, [ref, options?.delay, options?.duration])
}

export function useGsapStagger(
  containerRef: RefObject<HTMLElement | null>,
  childSelector: string,
  options?: { stagger?: number; duration?: number; y?: number }
) {
  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        childSelector,
        { opacity: 0, y: options?.y ?? 50 },
        {
          opacity: 1,
          y: 0,
          duration: options?.duration ?? 0.8,
          stagger: options?.stagger ?? 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [containerRef, childSelector, options?.stagger, options?.duration, options?.y])
}

export function useGsapSlideIn(ref: RefObject<HTMLElement | null>, direction: 'left' | 'right' = 'left') {
  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, x: direction === 'left' ? -60 : 60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    return () => ctx.revert()
  }, [ref, direction])
}

export function useGsapParallax(ref: RefObject<HTMLElement | null>, strength: number = 80) {
  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { y: -strength / 2 },
        {
          y: strength / 2,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    })

    return () => ctx.revert()
  }, [ref, strength])
}

export function useGsapCounter(
  ref: RefObject<HTMLElement | null>,
  target: number,
  options?: { duration?: number; prefix?: string; suffix?: string }
) {
  useEffect(() => {
    if (!ref.current) return
    const el = ref.current

    // Pre-measure the final value's rendered width with pretext so the element
    // doesn't shift layout as digits animate in. We read the computed font from
    // the live element (after fonts are loaded) and set minWidth once.
    document.fonts.ready.then(() => {
      const computedFont = window.getComputedStyle(el).font
      if (computedFont) {
        const finalText = `${options?.prefix ?? ''}${target.toLocaleString()}${options?.suffix ?? ''}`
        const prepared = prepareWithSegments(finalText, computedFont)
        const { lines } = layoutWithLines(prepared, 9999, parseInt(window.getComputedStyle(el).lineHeight) || 24)
        const finalWidth = lines[0]?.width ?? 0
        if (finalWidth > 0) el.style.minWidth = `${Math.ceil(finalWidth)}px`
      }
    })

    const ctx = gsap.context(() => {
      const obj = { val: 0 }
      gsap.to(obj, {
        val: target,
        duration: options?.duration ?? 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onUpdate() {
          el.textContent = `${options?.prefix ?? ''}${Math.round(obj.val).toLocaleString()}${options?.suffix ?? ''}`
        },
      })
    })

    return () => ctx.revert()
  }, [ref, target, options?.duration, options?.prefix, options?.suffix])
}

/**
 * Splits `text` into rendered lines using pretext — no DOM layout reflow.
 * Returns `[]` while fonts are loading, then the real line strings.
 * On resize, only the cheap `layoutWithLines()` arithmetic re-runs; the
 * expensive `prepareWithSegments()` is called just once per text+font combo.
 *
 * @param containerRef  Ref to the element whose offsetWidth sets the line-wrap boundary
 * @param text          The plain-text string to measure
 * @param font          CSS font shorthand matching the element's computed font, e.g. `'18px Outfit'`
 * @param lineHeightPx  Pixel line-height matching the element's CSS `line-height`
 */
export function useTextLines(
  containerRef: RefObject<HTMLElement | null>,
  text: string,
  font: string,
  lineHeightPx: number,
): string[] {
  const [lines, setLines] = useState<string[]>([])
  const preparedRef = useRef<PreparedTextWithSegments | null>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const el = containerRef.current

    const compute = () => {
      const width = el.offsetWidth
      if (width === 0) return
      // prepareWithSegments is the expensive pass — only run it once per text+font
      if (!preparedRef.current) {
        preparedRef.current = prepareWithSegments(text, font)
      }
      const { lines: layoutLines } = layoutWithLines(preparedRef.current, width, lineHeightPx)
      setLines(layoutLines.map(l => l.text))
    }

    // Wait for fonts so measureText uses the correct glyphs, not a fallback
    document.fonts.ready.then(compute)

    // Recompute on resize (only layout(), not prepare() — ~0.09ms per call)
    const ro = new ResizeObserver(compute)
    ro.observe(el)
    return () => ro.disconnect()
  }, [containerRef, text, font, lineHeightPx])

  return lines
}

export function useGsapHeroEntrance(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo('.hero-label', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.3)
        .fromTo('.hero-heading', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9 }, 0.5)
        .fromTo('.hero-sub', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 0.8)
        .fromTo('.hero-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, 1.0)
    }, containerRef)

    return () => ctx.revert()
  }, [containerRef])
}
