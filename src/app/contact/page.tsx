import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { siteSettingsQuery } from '@/sanity/lib/queries'
import ContactForm from '@/components/sections/ContactForm'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Contact Us | Country Materials Ltd',
  description:
    "Reach Country Materials Ltd's team in Dar es Salaam to request a quote, place a bulk order, or find your nearest yard across Tanzania's five branches.",
  path: '/contact',
})

export const revalidate = 60

const branches = [
  { name: 'Dar es Salaam', note: 'Headquarters & Main Yard',  hours: '24hrs' },
  { name: 'Mbeya',         note: 'Southern Highlands Hub',   hours: '8am–6pm' },
  { name: 'Dodoma',        note: 'Central Region Branch',    hours: '8am–6pm' },
  { name: 'Kahama',        note: 'Lake Zone Operations',     hours: '8am–6pm' },
  { name: 'Pwani',         note: 'Coastal Collection Hub',   hours: '8am–6pm' },
  { name: 'Kilimanjaro',   note: 'Northern Zone Branch',     hours: '8am–6pm' },
]

export default async function ContactPage() {
  const settings = await client.fetch(siteSettingsQuery).catch(() => null)
  const phone = settings?.phone ?? '+255 768 500 555'
  const email = settings?.email ?? 'info@countrymaterial.com'
  const whatsappNum = settings?.whatsapp ?? phone.replace(/[^0-9]/g, '')

  return (
    <>
      {/* Hero */}
      <section
        className="relative min-h-[38vh] flex flex-col justify-end overflow-hidden pt-20"
        style={{ background: '#0B1D3A' }}
        aria-label="Contact page hero"
      >
        <div className="absolute inset-0 bg-steel-texture" aria-hidden="true" />
        <div className="absolute inset-0 bg-concrete-texture" aria-hidden="true" />
        <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pb-16 sm:pb-20 pt-12">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-gold mb-6">Get in Touch</p>
          <h1 className="font-black text-[clamp(48px,8vw,110px)] leading-[0.92] tracking-tight text-white">
            We respond within<br />
            <span className="text-gold">24 hours.</span>
          </h1>
          <p className="mt-6 text-[17px] text-white/55 max-w-lg leading-relaxed">
            From bulk orders and delivery logistics to vendor registration and trade accounts — reach our team directly.
          </p>
        </div>
      </section>

      {/* Contact grid */}
      <section className="py-16 sm:py-20" style={{ background: '#FAF7F2' }} aria-label="Contact information and form">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8">

            {/* Left: contact info */}
            <div className="flex flex-col gap-5">

              {/* Direct contacts */}
              <div className="p-7 border" style={{ background: '#FFFFFF', borderColor: '#E8DED1' }}>
                <h2 className="font-black text-[17px] text-ink mb-6">Direct Contact</h2>
                <div className="flex flex-col gap-5">

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center border border-gold/30 flex-shrink-0 text-gold">
                      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.59 1.24h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate/45 mb-1">Phone / WhatsApp</p>
                      <a href={`https://wa.me/${whatsappNum}`} className="text-[16px] font-bold text-ink hover:text-gold transition-colors duration-200 cursor-pointer">{phone}</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center border border-gold/30 flex-shrink-0 text-gold">
                      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate/45 mb-1">Email</p>
                      <a href={`mailto:${email}`} className="text-[16px] font-bold text-ink hover:text-gold transition-colors duration-200 cursor-pointer">{email}</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center border border-gold/30 flex-shrink-0 text-gold">
                      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate/45 mb-1">Headquarters</p>
                      <p className="text-[16px] font-bold text-ink">{settings?.address ?? 'Babecov Complex, Buguruni Mandela Road, Dar es Salaam'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Branches */}
              <div className="p-7 border" style={{ background: '#FFFFFF', borderColor: '#E8DED1' }}>
                <h2 className="font-black text-[17px] text-ink mb-5">All Branches</h2>
                <div className="flex flex-col">
                  {branches.map((b, i) => (
                    <div
                      key={b.name}
                      className="flex items-center justify-between py-3"
                      style={{ borderBottom: i < branches.length - 1 ? '1px solid #E8DED1' : undefined }}
                    >
                      <div>
                        <p className="text-[14px] font-bold text-ink">{b.name}</p>
                        <p className="text-[12px] text-slate/50">{b.note}</p>
                      </div>
                      <span className="text-[10px] font-bold border border-gold/25 text-gold px-2.5 py-1 font-mono tracking-wide">
                        {b.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="p-8 border" style={{ background: '#FFFFFF', borderColor: '#E8DED1' }}>
              <h2 className="font-black text-[20px] text-ink mb-2">Send us a message</h2>
              <p className="text-[14px] text-slate/55 mb-7">We&apos;ll get back to you within 24 hours, Monday–Saturday.</p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
