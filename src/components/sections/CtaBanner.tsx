'use client'

import { useRef } from 'react'
import { useGsapFadeUp } from '@/components/animations/gsap-hooks'
import Button from '@/components/ui/Button'

interface CtaBannerProps {
  heading?: string
  subtext?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}

export default function CtaBanner({
  heading = 'Ready to Work With Us?',
  subtext = 'Whether you need construction materials, waste management services, or reliable logistics — we are here to deliver.',
  primaryLabel = 'Contact Us Today',
  primaryHref = '/contact',
  secondaryLabel = 'View Our Services',
  secondaryHref = '/services',
}: CtaBannerProps) {
  const ref = useRef<HTMLDivElement>(null)
  useGsapFadeUp(ref)

  return (
    <section className="relative bg-navy overflow-hidden py-20 lg:py-28">
      {/* Decorative background element */}
      <div className="absolute inset-0 bg-[url('/images/noise.svg')] opacity-[0.04] pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-gold/5 blur-3xl pointer-events-none" />

      {/* Gold top border */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div ref={ref} className="opacity-0 relative max-w-container mx-auto px-6 lg:px-10 text-center">
        <h2 className="font-heading text-3xl md:text-4xl lg:text-6xl text-white leading-tight mb-5 max-w-3xl mx-auto">
          {heading}
        </h2>
        <p className="font-body text-white/60 text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
          {subtext}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href={primaryHref} variant="primary" size="lg">
            {primaryLabel}
          </Button>
          <Button href={secondaryHref} variant="outline" size="lg">
            {secondaryLabel}
          </Button>
        </div>
      </div>
    </section>
  )
}
