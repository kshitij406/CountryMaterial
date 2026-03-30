'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'

/**
 * Wraps page content with GSAP enter/exit animations on route change.
 *
 * Enter: opacity 0→1, y 20→0, 0.4s power2.out
 * Exit:  opacity 1→0, y 0→-20, 0.3s power2.in  (then content swaps, then enter runs)
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const [renderedChildren, setRenderedChildren] = useState(children)

  // Keep a ref always pointing at the latest children so the exit onComplete
  // captures the correct new-page content regardless of closure timing.
  const childrenRef = useRef(children)
  childrenRef.current = children

  const activeTween = useRef<gsap.core.Tween | null>(null)
  const isFirstMount = useRef(true)

  // Initial page load — animate in
  useEffect(() => {
    if (!ref.current) return
    activeTween.current?.kill()
    activeTween.current = gsap.fromTo(
      ref.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
    )
  }, [])

  // Route change — exit → swap children → enter
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false
      return
    }
    if (!ref.current) return

    const el = ref.current
    activeTween.current?.kill()

    // Exit: slide up and fade out
    activeTween.current = gsap.to(el, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: 'power2.in',
      onComplete() {
        // Swap to the new page content, then animate it in
        setRenderedChildren(childrenRef.current)
        activeTween.current = gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        )
      },
    })
  }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={ref} style={{ opacity: 0 }}>
      {renderedChildren}
    </div>
  )
}
