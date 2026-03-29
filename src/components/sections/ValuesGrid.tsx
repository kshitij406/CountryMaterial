'use client'

import { useRef } from 'react'
import { useGsapStagger, useGsapFadeUp } from '@/components/animations/gsap-hooks'
import SectionLabel from '@/components/ui/SectionLabel'

const defaultValues = [
  {
    icon: '◈',
    title: 'Quality Excellence',
    description: 'We source and supply materials that meet rigorous standards, ensuring every project is built to last.',
  },
  {
    icon: '◉',
    title: 'Community & Environmental Responsibility',
    description: 'Our waste management work actively reduces industrial pollution and supports sustainable development in Tanzania.',
  },
  {
    icon: '◎',
    title: 'Team Collaboration',
    description: 'We operate as a unified team with partners, suppliers, and clients to deliver seamless, reliable outcomes.',
  },
]

interface Value {
  icon?: string
  title: string
  description: string
}

export default function ValuesGrid({ values = defaultValues }: { values?: Value[] }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)

  useGsapFadeUp(headingRef)
  useGsapStagger(sectionRef, '.value-card', { stagger: 0.18, y: 40 })

  return (
    <section className="bg-cream py-section">
      <div className="max-w-container mx-auto px-6 lg:px-10">
        <div ref={headingRef} className="opacity-0 text-center mb-14">
          <SectionLabel className="mb-4">Our Principles</SectionLabel>
          <h2 className="font-heading text-4xl lg:text-5xl text-navy leading-tight max-w-xl mx-auto">
            The Values That Drive Everything We Do
          </h2>
        </div>

        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, i) => (
            <div
              key={i}
              className="value-card opacity-0 bg-white border border-sand p-8 lg:p-10 group hover:border-gold/50 hover:shadow-xl hover:shadow-navy/5 transition-all duration-400"
            >
              <div className="text-4xl text-gold mb-6 font-heading">{value.icon ?? '◆'}</div>
              <h3 className="font-heading text-xl text-navy mb-3 group-hover:text-gold transition-colors duration-300">
                {value.title}
              </h3>
              <p className="font-body text-slate/80 leading-relaxed text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
