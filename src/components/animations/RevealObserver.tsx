'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function RevealObserver() {
  const pathname = usePathname()

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    )

    const observe = () => {
      document.querySelectorAll('.reveal, .stagger').forEach((el) => io.observe(el))
    }

    const scheduleObserve = () => {
      requestAnimationFrame(() => {
        observe()
      })
    }

    scheduleObserve()

    const timer = setTimeout(scheduleObserve, 250)
    const lateTimer = setTimeout(scheduleObserve, 700)
    return () => {
      clearTimeout(timer)
      clearTimeout(lateTimer)
      io.disconnect()
    }
  }, [pathname])

  return null
}
