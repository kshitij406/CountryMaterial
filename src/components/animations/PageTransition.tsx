'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'
import { usePathname } from 'next/navigation'

type GsapInstance = typeof import('gsap')['default']

export default function PageTransition({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const [renderedChildren, setRenderedChildren] = useState(children)
  const childrenRef = useRef(children)
  childrenRef.current = children
  const activeTween = useRef<gsap.core.Tween | null>(null)
  const isFirstMount = useRef(true)
  const gsapRef = useRef<GsapInstance | null>(null)

  useEffect(() => {
    setRenderedChildren(children)
  }, [children])

  // Load GSAP once then run the initial entrance animation
  useEffect(() => {
    import('gsap').then(({ default: g }) => {
      gsapRef.current = g
      if (!ref.current) return
      activeTween.current?.kill()
      activeTween.current = g.fromTo(
        ref.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
      )
    })
  }, [])

  // Route change — exit → swap children → enter
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false
      return
    }
    const g = gsapRef.current
    if (!g || !ref.current) return

    const el = ref.current
    activeTween.current?.kill()

    activeTween.current = g.to(el, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: 'power2.in',
      onComplete() {
        setRenderedChildren(childrenRef.current)
        activeTween.current = g.fromTo(
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
