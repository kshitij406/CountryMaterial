import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import IntroSection from '@/components/sections/IntroSection'
import ValuesGrid from '@/components/sections/ValuesGrid'
import ServicesGrid from '@/components/sections/ServicesGrid'
import ProductsGrid from '@/components/sections/ProductsGrid'
import PartnersMarquee from '@/components/sections/PartnersMarquee'
import CtaBanner from '@/components/sections/CtaBanner'

export const metadata: Metadata = {
  title: 'Country Materials Ltd — Hardware, Waste Management & Logistics',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <IntroSection />
      <ServicesGrid dark heading="Three Pillars of Our Business" />
      <ValuesGrid />
      <ProductsGrid />
      <PartnersMarquee />
      <CtaBanner />
    </>
  )
}
