'use client'

import { useEffect, useRef, RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
