'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useGsapHeroEntrance } from '@/components/animations/gsap-hooks'
import SectionLabel from '@/components/ui/SectionLabel'

interface HeroSlide {
  image: string
  heading: string
  subheading: string
}

const defaultSlides: HeroSlide[] = [
  {
    image: '/images/hero-1.jpg',
    heading: "Building Tanzania's Industrial Future",
    subheading: 'Premium hardware materials, waste management, and logistics solutions for a growing nation.',
  },
  {
    image: '/images/hero-2.jpg',
    heading: 'Steel & Hardware. Delivered Right.',
    subheading: 'Quality reinforcement bars, construction materials, and industrial supplies across Dar es Salaam.',
  },
  {
    image: '/images/hero-3.jpg',
    heading: 'Sustainable Waste Management Solutions',
    subheading: 'Collection, recycling, and waste-to-energy services driving a circular economy in Tanzania.',
  },
]

interface HeroProps {
  slides?: HeroSlide[]
}

export default function Hero({ slides = defaultSlides }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [transitioning, setTransitioning] = useState(false)

  useGsapHeroEntrance(containerRef)

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitioning(true)
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
        setTransitioning(false)
      }, 600)
    }, 6000)
    return () => clearInterval(interval)
  }, [slides.length])

  const slide = slides[currentSlide]

  return (
    <section ref={containerRef} className="relative h-screen min-h-[600px] max-h-[900px] flex items-center overflow-hidden">
      {/* Background image */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${transitioning ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="absolute inset-0 bg-navy/70 z-10" />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/40 to-transparent z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${slide.image})` }}
        />
      </div>

      {/* Decorative gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold via-gold-light to-transparent z-20" />

      {/* Content */}
      <div className="relative z-20 max-w-container mx-auto px-6 lg:px-10 w-full">
        <div className="max-w-2xl">
          <SectionLabel light className="hero-label mb-6">
            Est. — Dar es Salaam, Tanzania
          </SectionLabel>

          <h1 className="hero-heading font-heading text-5xl lg:text-7xl text-white leading-[1.05] mb-6">
            {slide.heading}
          </h1>

          <p className="hero-sub font-body text-lg text-white/75 leading-relaxed mb-10 max-w-lg">
            {slide.subheading}
          </p>

          <div className="hero-cta flex flex-col sm:flex-row gap-4">
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-8 py-4 bg-gold hover:bg-gold-light text-navy font-body font-semibold tracking-wide transition-colors duration-200"
            >
              Explore Our Services
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/50 hover:border-white text-white font-body font-semibold tracking-wide transition-all duration-200 hover:bg-white/10"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-10 right-10 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-0.5 transition-all duration-400 ${
              i === currentSlide ? 'w-8 bg-gold' : 'w-4 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/40">
        <span className="font-body text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
