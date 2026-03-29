import type { Metadata } from 'next'
import PageHeader from '@/components/ui/PageHeader'
import AnimatedSection from '@/components/animations/AnimatedSection'
import SectionLabel from '@/components/ui/SectionLabel'
import ContactForm from '@/components/sections/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Country Materials Ltd. We are based in Dar es Salaam, Tanzania. Call, email, or send us a message.',
}

const contactDetails = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: 'Our Office',
    value: 'Babecov Complex, Buguruni Mandela Road\nP.O. Box 2140, Dar es Salaam, Tanzania',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: 'Phone',
    value: '+255 768 500 555',
    href: 'tel:+255768500555',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'Email',
    value: 'info@countrymaterial.com',
    href: 'mailto:info@countrymaterial.com',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: 'Business Hours',
    value: 'Monday – Friday: 8:00 AM – 5:00 PM\nSaturday: 8:00 AM – 1:00 PM',
  },
]

export default function ContactPage() {
  return (
    <>
      <PageHeader
        label="Get in Touch"
        title="We'd Love to Hear From You"
        subtitle="Whether you have a product inquiry, service request, or just want to learn more — our team is ready to help."
      />

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
                {contactDetails.map((detail, i) => (
                  <AnimatedSection key={i} delay={i * 0.08}>
                    <div className="flex gap-5">
                      <div className="shrink-0 w-11 h-11 bg-cream border border-sand flex items-center justify-center text-gold">
                        {detail.icon}
                      </div>
                      <div>
                        <div className="font-body text-xs text-slate/50 tracking-widest uppercase mb-1.5">
                          {detail.label}
                        </div>
                        {detail.href ? (
                          <a
                            href={detail.href}
                            className="font-body text-navy hover:text-gold transition-colors duration-200 whitespace-pre-line"
                          >
                            {detail.value}
                          </a>
                        ) : (
                          <p className="font-body text-navy whitespace-pre-line">{detail.value}</p>
                        )}
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>

              {/* Map placeholder */}
              <AnimatedSection delay={0.3} className="mt-10">
                <div className="bg-navy/5 border border-sand h-56 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-3">📍</div>
                    <p className="font-body text-sm text-slate/60">
                      Buguruni Mandela Road, Dar es Salaam
                    </p>
                    <a
                      href="https://maps.google.com/?q=Buguruni+Mandela+Road+Dar+es+Salaam"
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
