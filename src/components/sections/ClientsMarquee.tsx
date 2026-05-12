import Image from 'next/image'
import Link from 'next/link'

interface Partner {
  name: string
  sub?: string
  logoUrl?: string
}

const FALLBACK_PARTNERS: Partner[] = [
  { name: 'Lake Steel',   sub: 'Steel Manufacturer', logoUrl: '/images/partners/LAKE_STEEL_LOGO.png' },
  { name: 'Kamal Steel',  sub: 'Trading Partner',    logoUrl: '/images/partners/kamal-steel-logo.png' },
  { name: 'Lodhia Steel', sub: 'Distribution',       logoUrl: '/images/partners/lodhia_steel.png' },
  { name: 'Sita Steel',   sub: 'Manufacturing',      logoUrl: '/images/partners/sitasteel-removebg-preview.png' },
  { name: 'SteelMast',    sub: 'Fabrication',        logoUrl: '/images/partners/steelmast-removebg-preview.png' },
  { name: 'Metro Group',  sub: 'Conglomerate',       logoUrl: '/images/partners/Metro-Group-updated-logo-removebg-preview.png' },
]

export default function ClientsMarquee({ partners }: { partners?: Partner[] }) {
  const data = partners?.length ? partners : FALLBACK_PARTNERS
  const doubled = [...data, ...data]

  return (
    <section
      className="relative overflow-hidden"
      id="partners"
      style={{ background: '#FAF7F2', borderTop: '1px solid #E8DED1', borderBottom: '1px solid #E8DED1' }}
      aria-label="Partners and vendor network"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28 mb-0">

        {/* Asymmetric header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 reveal">
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-gold mb-4">Vendor Network</p>
            <h2 className="font-black text-[clamp(36px,5vw,72px)] text-ink leading-none tracking-tight">
              5,000+ vendors.<br />
              <span className="text-gold">One network.</span>
            </h2>
          </div>
          <Link
            href="/contact"
            className="flex-shrink-0 self-start sm:self-end inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-white font-bold text-[13px] px-6 py-3 transition-colors duration-200 cursor-pointer"
          >
            Become a Vendor
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
        </div>

        {/* Vendor value props — horizontal bordered row */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 stagger mb-16"
          style={{ borderTop: '1px solid #E8DED1' }}
        >
          {[
            { title: 'Fair Pricing',    body: 'Real-time market rates for your scrap — no middlemen, no haggling.' },
            { title: 'Instant Payment', body: 'Mobile money transfer on the spot. No waiting, no cheques.' },
            { title: 'App-Enabled',     body: 'Track pickups, verify weights, and manage your account from your phone.' },
          ].map((prop, i) => (
            <div
              key={prop.title}
              className="pt-8 pb-6"
              style={{ borderBottom: '1px solid #E8DED1', paddingRight: i < 2 ? '32px' : undefined, paddingLeft: i > 0 ? '32px' : undefined, borderLeft: i > 0 ? '1px solid #E8DED1' : undefined }}
            >
              <div className="w-8 h-8 flex items-center justify-center border border-gold/30 mb-4">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-gold" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h3 className="font-black text-[16px] text-ink mb-2">{prop.title}</h3>
              <p className="text-[13px] text-slate/60 leading-relaxed">{prop.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Partner logos marquee */}
      <div className="relative overflow-hidden py-4" aria-label="Partner company logos">
        <div
          className="flex items-center gap-px animate-marquee-slow whitespace-nowrap"
          style={{ width: 'max-content', background: '#E8DED1' }}
          aria-hidden="true"
        >
          {doubled.map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="flex-shrink-0 flex flex-col items-center justify-center px-10 py-6 w-52 h-24 cursor-default"
              style={{ background: '#FAF7F2' }}
            >
              {partner.logoUrl ? (
                <Image
                  src={partner.logoUrl}
                  alt={partner.name}
                  width={140}
                  height={48}
                  className="max-h-10 w-auto object-contain"
                />
              ) : (
                <span className="text-[13px] font-bold text-ink">{partner.name}</span>
              )}
              {partner.sub && !partner.logoUrl && (
                <span className="text-[11px] text-slate/45 mt-1">{partner.sub}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
