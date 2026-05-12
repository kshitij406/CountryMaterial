import Image from 'next/image'
import Link from 'next/link'

export default function OperationsGallery() {
  return (
    <section className="relative bg-navy-deep py-20 sm:py-24 lg:py-[120px] px-5 sm:px-8 lg:px-16 overflow-hidden">
      <div className="absolute inset-0 bg-rebar-grid-dark" />
      <div className="absolute inset-0 grain-overlay" style={{ opacity: 0.022 }} />

      <div className="relative max-w-[1440px] mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-8 mb-12 reveal">
          <div>
            <div className="flex items-center gap-3.5 mb-5">
              <span className="block h-px w-10 bg-gold" />
              <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold">Our people</span>
            </div>
            <h2 className="font-display text-[clamp(34px,5.5vw,80px)] leading-[0.9] tracking-[0.03em] uppercase text-cream">
              The Team Behind <span className="text-gold-light">The Steel.</span>
            </h2>
          </div>
          <Link
            href="/about"
            className="inline-flex items-center gap-2.5 font-condensed text-[12px] tracking-[0.2em] uppercase text-gold/75 hover:text-gold transition-colors duration-200"
          >
            About us
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Two-photo layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 stagger">
          {/* Group photo — team */}
          <div
            className="relative overflow-hidden group"
            style={{ border: '1px solid rgba(46,111,163,.2)' }}
          >
            <div className="relative h-72 sm:h-[420px] lg:h-[540px]">
              <Image
                src="/images/company/group-photo.jpg"
                alt="Country Materials team on site"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(15,30,45,.82) 0%, rgba(15,30,45,.1) 55%)' }} />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="font-space text-[9px] tracking-[0.22em] uppercase text-gold/60 mb-2">Our team</div>
                <div className="font-display text-[clamp(22px,3vw,36px)] tracking-[0.04em] uppercase text-cream leading-[1]">
                  Country Materials Ltd.
                </div>
                <div className="font-barlow text-[14px] text-cream/55 mt-1.5">Dar es Salaam · Tanzania</div>
                <div className="mt-4 flex flex-wrap gap-3">
                  {['Recycling', 'Steel', 'Hardware', 'Logistics'].map((tag) => (
                    <span
                      key={tag}
                      className="font-condensed text-[9px] tracking-[0.18em] uppercase px-2.5 py-1 text-cream/65"
                      style={{ border: '1px solid rgba(255,255,255,.18)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right column: facility + stat panels */}
          <div className="grid grid-rows-[1fr_auto] gap-3">
            {/* Facility photo */}
            <div
              className="relative overflow-hidden group"
              style={{ border: '1px solid rgba(46,111,163,.2)' }}
            >
              <div className="relative h-56 sm:h-72 lg:h-full lg:min-h-[340px]">
                <Image
                  src="/images/company/company-profile.jpg"
                  alt="Country Materials headquarters and facility"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0" style={{ background: 'rgba(15,30,45,.35)' }} />
                <div className="absolute bottom-4 left-4">
                  <span
                    className="font-condensed font-semibold text-[9px] tracking-[0.18em] uppercase px-2.5 py-1.5 text-cream/85"
                    style={{ background: 'rgba(15,30,45,.70)', border: '1px solid rgba(255,255,255,.14)' }}
                  >
                    Our Facility
                  </span>
                </div>
              </div>
            </div>

            {/* Stat strip */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { num: '50K+', label: 'Tonnes recycled' },
                { num: '5,000+', label: 'Active vendors' },
                { num: '30+', label: 'Fleet vehicles' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="py-5 px-4 flex flex-col items-center text-center"
                  style={{ background: 'rgba(46,111,163,.08)', border: '1px solid rgba(46,111,163,.2)' }}
                >
                  <span className="font-display text-[clamp(22px,2.5vw,30px)] text-gold leading-none">{stat.num}</span>
                  <span className="font-condensed text-[9px] tracking-[0.16em] uppercase text-cream/50 mt-2 leading-tight">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
