'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { useGsapStagger, useGsapFadeUp } from '@/components/animations/gsap-hooks'
import SectionLabel from '@/components/ui/SectionLabel'

const defaultServices = [
  {
    slug: { current: 'transportation' },
    title: 'Transportation & Logistics',
    excerpt: 'End-to-end freight forwarding, warehousing, and last-mile distribution across Tanzania and the region.',
    icon: '🚛',
    coverColor: '#0B1D3A',
  },
  {
    slug: { current: 'hardware' },
    title: 'Hardware & Steel Materials',
    excerpt: 'Quality construction materials — color paints, hardware supplies, and high-tensile reinforcement bars.',
    icon: '🔩',
    coverColor: '#1A2E4A',
  },
  {
    slug: { current: 'waste-management' },
    title: 'Waste Management',
    excerpt: 'Comprehensive scrap collection, sorting, recycling, and waste-to-energy services for industry and communities.',
    icon: '♻️',
    coverColor: '#0F2438',
  },
]

interface Service {
  _id?: string
  slug: { current: string }
  title: string
  excerpt: string
  icon?: string
  coverColor?: string
  coverImage?: { asset?: { url?: string } }
}

interface ServicesGridProps {
  services?: Service[]
  dark?: boolean
  label?: string
  heading?: string
}

export default function ServicesGrid({
  services = defaultServices,
  dark = false,
  label = 'What We Do',
  heading = 'Three Pillars of Our Business',
}: ServicesGridProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)

  useGsapFadeUp(headingRef)
  useGsapStagger(sectionRef, '.service-card', { stagger: 0.15, y: 50 })

  return (
    <section className={`py-section ${dark ? 'bg-navy' : 'bg-white'}`}>
      <div className="max-w-container mx-auto px-6 lg:px-10">
        <div ref={headingRef} className="opacity-0 mb-14">
          <SectionLabel light={dark} className="mb-4">{label}</SectionLabel>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className={`font-heading text-3xl md:text-4xl lg:text-5xl leading-tight max-w-lg ${dark ? 'text-white' : 'text-navy'}`}>
              {heading}
            </h2>
            <Link
              href="/services"
              className={`font-body text-sm tracking-wide flex items-center gap-2 shrink-0 transition-colors duration-200 ${
                dark ? 'text-gold hover:text-gold-light' : 'text-gold hover:text-navy'
              }`}
            >
              View All Services
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <Link
              key={service._id ?? i}
              href={`/services/${service.slug.current}`}
              className="service-card opacity-0 group block"
            >
              <div className={`relative overflow-hidden ${dark ? 'bg-white/5' : 'bg-cream'} border ${dark ? 'border-white/10 hover:border-gold/30' : 'border-sand hover:border-gold/40'} transition-all duration-400 hover:-translate-y-1 hover:shadow-2xl hover:shadow-navy/20`}>
                {/* Image / color block */}
                <div
                  className="relative h-48 overflow-hidden"
                  style={{ backgroundColor: service.coverColor ?? '#0B1D3A' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                  <div className="absolute inset-0 flex items-end justify-start p-6">
                    <span className="text-5xl">{service.icon ?? '◆'}</span>
                  </div>
                  {/* Gold stripe on hover */}
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-gold group-hover:w-full transition-all duration-500" />
                </div>

                <div className="p-7">
                  <h3 className={`font-heading text-xl mb-3 transition-colors duration-200 ${dark ? 'text-white group-hover:text-gold' : 'text-navy group-hover:text-gold'}`}>
                    {service.title}
                  </h3>
                  <p className={`font-body text-sm leading-relaxed mb-5 ${dark ? 'text-white/60' : 'text-slate/70'}`}>
                    {service.excerpt}
                  </p>
                  <span className={`font-body text-xs font-semibold tracking-widest uppercase flex items-center gap-2 transition-colors duration-200 ${dark ? 'text-gold' : 'text-gold'} group-hover:gap-4`}>
                    Learn More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
