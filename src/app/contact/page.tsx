import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { siteSettingsQuery } from '@/sanity/lib/queries'
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

  const phone = settings?.phone ?? '+255 768 500 555'
  const email = settings?.email ?? 'info@countrymaterial.com'
  const addressLine = settings?.address ?? 'Babecov Complex, Buguruni Mandela Road'
  const poBox = settings?.poBox ? `P.O. Box ${settings.poBox}` : 'P.O. Box 2140'
  const city = settings?.city ?? 'Dar es Salaam'
  const country = settings?.country ?? 'Tanzania'
  const officeValue = `${addressLine}\n${poBox}, ${city}, ${country}`

  const telHref = `tel:${phone.replace(/[\s-]/g, '')}`
  const mapsQuery = encodeURIComponent(`${addressLine} ${city}`)

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden pt-[160px] pb-[100px] px-8 lg:px-16"
        style={{ background: '#05101f', borderBottom: '1px solid rgba(200,150,46,.2)' }}
      >
        <div aria-hidden className="grain-overlay absolute inset-0 pointer-events-none z-0" />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'repeating-linear-gradient(90deg,transparent 0 120px,rgba(200,150,46,.04) 120px 121px)' }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 70% 50%,rgba(200,150,46,.14),transparent 55%)' }}
        />

        <div className="relative max-w-[1440px] mx-auto grid lg:grid-cols-[1.3fr_1fr] gap-16 items-end">
          <div>
            <div className="flex items-center gap-3.5 mb-7">
              <span className="block h-px w-10 bg-gold" />
              <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold">Get in Touch</span>
            </div>
            <h1 className="font-display text-[clamp(48px,7vw,112px)] leading-[0.9] tracking-[0.03em] uppercase text-cream">
              We&apos;d Love to <span className="text-gold">Hear</span> from You
            </h1>
          </div>

          {/* Quick contact panel */}
          <div className="reveal" style={{ borderLeft: '1px solid rgba(200,150,46,.2)', paddingLeft: 32 }}>
            <a
              href={telHref}
              className="group flex items-center gap-5 py-5 hover:pl-3 transition-all duration-300"
              style={{ borderBottom: '1px solid rgba(200,150,46,.15)' }}
            >
              <div className="shrink-0 w-10 h-10 grid place-items-center text-gold" style={{ border: '1px solid rgba(200,150,46,.3)' }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <div className="font-condensed text-[10px] tracking-[0.22em] uppercase text-cream/40 mb-0.5">Phone</div>
                <div className="font-barlow text-[16px] text-cream group-hover:text-gold transition-colors duration-200">{phone}</div>
              </div>
            </a>
            <a
              href={`mailto:${email}`}
              className="group flex items-center gap-5 py-5 hover:pl-3 transition-all duration-300"
              style={{ borderBottom: '1px solid rgba(200,150,46,.15)' }}
            >
              <div className="shrink-0 w-10 h-10 grid place-items-center text-gold" style={{ border: '1px solid rgba(200,150,46,.3)' }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div className="font-condensed text-[10px] tracking-[0.22em] uppercase text-cream/40 mb-0.5">Email</div>
                <div className="font-barlow text-[16px] text-cream group-hover:text-gold transition-colors duration-200">{email}</div>
              </div>
            </a>
            <div className="flex items-center gap-5 py-5">
              <div className="shrink-0 w-10 h-10 grid place-items-center text-gold" style={{ border: '1px solid rgba(200,150,46,.3)' }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <div className="font-condensed text-[10px] tracking-[0.22em] uppercase text-cream/40 mb-0.5">Head Office</div>
                <div className="font-barlow text-[15px] text-cream/75">{addressLine}, {city}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section
        className="relative py-[120px] px-8 lg:px-16"
        style={{ background: '#0B1D3A', borderBottom: '1px solid rgba(200,150,46,.15)' }}
      >
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-20">

          {/* Contact info */}
          <div className="reveal">
            <div className="flex items-center gap-3.5 mb-7">
              <span className="block h-px w-10 bg-gold" />
              <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold">Contact Information</span>
            </div>
            <h2 className="font-display text-[clamp(32px,3.5vw,56px)] leading-[0.95] tracking-[0.03em] uppercase text-cream mb-12">
              Visit, Call, or <span className="text-gold">Write</span>
            </h2>

            <div style={{ borderTop: '1px solid rgba(200,150,46,.2)' }}>
              {/* Address */}
              <div className="flex gap-5 py-7" style={{ borderBottom: '1px solid rgba(200,150,46,.15)' }}>
                <div className="shrink-0 w-10 h-10 grid place-items-center text-gold flex-shrink-0" style={{ border: '1px solid rgba(200,150,46,.3)' }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-condensed text-[10px] tracking-[0.22em] uppercase text-cream/40 mb-1">Our Office</div>
                  <p className="font-barlow text-[15px] text-cream/75 whitespace-pre-line leading-[1.6]">{officeValue}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-5 py-7" style={{ borderBottom: '1px solid rgba(200,150,46,.15)' }}>
                <div className="shrink-0 w-10 h-10 grid place-items-center text-gold flex-shrink-0" style={{ border: '1px solid rgba(200,150,46,.3)' }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="font-condensed text-[10px] tracking-[0.22em] uppercase text-cream/40 mb-1">Phone</div>
                  <a href={telHref} className="font-barlow text-[15px] text-cream/75 hover:text-gold transition-colors duration-200">{phone}</a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-5 py-7" style={{ borderBottom: '1px solid rgba(200,150,46,.15)' }}>
                <div className="shrink-0 w-10 h-10 grid place-items-center text-gold flex-shrink-0" style={{ border: '1px solid rgba(200,150,46,.3)' }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="font-condensed text-[10px] tracking-[0.22em] uppercase text-cream/40 mb-1">Email</div>
                  <a href={`mailto:${email}`} className="font-barlow text-[15px] text-cream/75 hover:text-gold transition-colors duration-200">{email}</a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-5 py-7" style={{ borderBottom: '1px solid rgba(200,150,46,.15)' }}>
                <div className="shrink-0 w-10 h-10 grid place-items-center text-gold flex-shrink-0" style={{ border: '1px solid rgba(200,150,46,.3)' }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-condensed text-[10px] tracking-[0.22em] uppercase text-cream/40 mb-1">Business Hours</div>
                  <p className="font-barlow text-[15px] text-cream/75 whitespace-pre-line leading-[1.6]">
                    {settings?.businessHours ?? 'Monday – Friday: 8:00 AM – 5:00 PM\nSaturday: 8:00 AM – 1:00 PM'}
                  </p>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div
              className="mt-8 h-52 flex items-center justify-center"
              style={{ border: '1px solid rgba(200,150,46,.2)', background: '#05101f' }}
            >
              <div className="text-center">
                <div className="font-display text-[36px] text-gold/30 mb-2">◈</div>
                <p className="font-barlow text-[13px] text-cream/40">{addressLine}, {city}</p>
                <a
                  href={`https://maps.google.com/?q=${mapsQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-condensed text-[11px] tracking-[0.15em] uppercase text-gold/60 hover:text-gold mt-2 inline-block transition-colors duration-200"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="reveal">
            <div className="flex items-center gap-3.5 mb-7">
              <span className="block h-px w-10 bg-gold" />
              <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold">Send a Message</span>
            </div>
            <h2 className="font-display text-[clamp(32px,3.5vw,56px)] leading-[0.95] tracking-[0.03em] uppercase text-cream mb-12">
              Tell Us What <span className="text-gold">You Need</span>
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
