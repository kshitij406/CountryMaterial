'use client'

import { useEffect } from 'react'

export default function RevealObserver() {
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

    observe()

    // Re-observe after any dynamic content settles
    const timer = setTimeout(observe, 500)
    return () => {
      clearTimeout(timer)
      io.disconnect()
    }
  }, [])

  return null
}
