import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { siteSettingsQuery } from '@/sanity/lib/queries'
import AnimatedSection from '@/components/animations/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import ContactForm from '@/components/sections/ContactForm'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch(siteSettingsQuery).catch(() => null)
  const name = settings?.companyName ?? 'Country Materials Ltd'
  const city = settings?.city ?? 'Dar es Salaam'
  const country = settings?.country ?? 'Tanzania'
  return {
    title: 'Contact Us',
    description: `Get in touch with ${name}. We are based in ${city}, ${country}. Call, email, or send us a message.`,
  }
}

export default async function ContactPage() {
  const settings = await client.fetch(siteSettingsQuery).catch(() => null)

  // Build contact values from Sanity with hardcoded fallbacks
  const phone = settings?.phone ?? '+255 768 500 555'
  const email = settings?.email ?? 'info@countrymaterial.com'
  const addressLine = settings?.address ?? 'Babecov Complex, Buguruni Mandela Road'
  const poBox = settings?.poBox ? `P.O. Box ${settings.poBox}` : 'P.O. Box 2140'
  const city = settings?.city ?? 'Dar es Salaam'
  const country = settings?.country ?? 'Tanzania'
  const officeValue = `${addressLine}\n${poBox}, ${city}, ${country}`

  // tel: href — strip spaces and dashes
  const telHref = `tel:${phone.replace(/[\s-]/g, '')}`

  const mapsQuery = encodeURIComponent(`${addressLine} ${city}`)

  return (
    <>
      {/* Contact-specific header: split — title left, key contact details right */}
      <section className="relative bg-navy overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/noise.svg')] opacity-[0.03] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="relative max-w-container mx-auto px-6 lg:px-10 py-12 md:py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            {/* Left: title */}
            <div>
              <span className="inline-flex items-center gap-2.5 font-body text-xs font-semibold tracking-[0.2em] uppercase text-gold-light mb-5">
                <span className="block h-px w-8 bg-gold-light" />
                Get in Touch
              </span>
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
                We&apos;d Love to Hear From You
              </h1>
              <p className="font-body text-white/55 text-lg leading-relaxed">
                Whether you have a product inquiry, service request, or just want to learn more — our team is ready to help.
              </p>
            </div>
            {/* Right: immediate contact details */}
            <div className="space-y-6 lg:pl-8 lg:border-l lg:border-white/10">
              <a href={telHref} className="group flex items-center gap-4 hover:opacity-80 transition-opacity">
                <div className="shrink-0 w-10 h-10 border border-gold/30 flex items-center justify-center text-gold">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="font-body text-xs text-white/40 tracking-widest uppercase mb-0.5">Phone</div>
                  <div className="font-body text-white">{phone}</div>
                </div>
              </a>
              <a href={`mailto:${email}`} className="group flex items-center gap-4 hover:opacity-80 transition-opacity">
                <div className="shrink-0 w-10 h-10 border border-gold/30 flex items-center justify-center text-gold">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="font-body text-xs text-white/40 tracking-widest uppercase mb-0.5">Email</div>
                  <div className="font-body text-white">{email}</div>
                </div>
              </a>
              <div className="flex items-center gap-4">
                <div className="shrink-0 w-10 h-10 border border-gold/30 flex items-center justify-center text-gold">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-body text-xs text-white/40 tracking-widest uppercase mb-0.5">Office</div>
                  <div className="font-body text-white/80 text-sm">{addressLine}, {city}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-section">
        <div className="max-w-container mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

            {/* Contact info */}
            <div>
              <AnimatedSection>
                <SectionLabel className="mb-5">Contact Information</SectionLabel>
                <h2 className="font-heading text-3xl lg:text-4xl text-navy mb-8 leading-tight">
                  Visit, Call, or Write to Us
                </h2>
              </AnimatedSection>

              <div className="space-y-7">
                {/* Address */}
                <AnimatedSection delay={0.05}>
                  <div className="flex gap-5">
                    <div className="shrink-0 w-11 h-11 bg-cream border border-sand flex items-center justify-center text-gold">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-body text-xs text-slate/50 tracking-widest uppercase mb-1.5">Our Office</div>
                      <p className="font-body text-navy whitespace-pre-line">{officeValue}</p>
                    </div>
                  </div>
                </AnimatedSection>

                {/* Phone */}
                <AnimatedSection delay={0.1}>
                  <div className="flex gap-5">
                    <div className="shrink-0 w-11 h-11 bg-cream border border-sand flex items-center justify-center text-gold">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-body text-xs text-slate/50 tracking-widest uppercase mb-1.5">Phone</div>
                      <a href={telHref} className="font-body text-navy hover:text-gold transition-colors duration-200">
                        {phone}
                      </a>
                    </div>
                  </div>
                </AnimatedSection>

                {/* Email */}
                <AnimatedSection delay={0.15}>
                  <div className="flex gap-5">
                    <div className="shrink-0 w-11 h-11 bg-cream border border-sand flex items-center justify-center text-gold">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-body text-xs text-slate/50 tracking-widest uppercase mb-1.5">Email</div>
                      <a href={`mailto:${email}`} className="font-body text-navy hover:text-gold transition-colors duration-200">
                        {email}
                      </a>
                    </div>
                  </div>
                </AnimatedSection>

                {/* Business hours — no Sanity field yet, kept as static */}
                <AnimatedSection delay={0.2}>
                  <div className="flex gap-5">
                    <div className="shrink-0 w-11 h-11 bg-cream border border-sand flex items-center justify-center text-gold">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-body text-xs text-slate/50 tracking-widest uppercase mb-1.5">Business Hours</div>
                      <p className="font-body text-navy whitespace-pre-line">
                        {settings?.businessHours ?? 'Monday – Friday: 8:00 AM – 5:00 PM\nSaturday: 8:00 AM – 1:00 PM'}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              </div>

              {/* Map placeholder */}
              <AnimatedSection delay={0.3} className="mt-10">
                <div className="bg-navy/5 border border-sand h-56 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-3">📍</div>
                    <p className="font-body text-sm text-slate/60">{addressLine}, {city}</p>
                    <a
                      href={`https://maps.google.com/?q=${mapsQuery}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-xs text-gold hover:underline mt-2 inline-block"
                    >
                      Open in Google Maps →
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Form */}
            <div>
              <AnimatedSection delay={0.1}>
                <SectionLabel className="mb-5">Send a Message</SectionLabel>
                <h2 className="font-heading text-3xl lg:text-4xl text-navy mb-8 leading-tight">
                  Tell Us What You Need
                </h2>
                <ContactForm />
              </AnimatedSection>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
