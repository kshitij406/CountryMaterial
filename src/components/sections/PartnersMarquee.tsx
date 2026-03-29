const defaultPartners = [
  'Lake Steel',
  'Kamal Steel',
  'Lodhia',
  'Steelmast',
  'Metro Group',
  'Sita Steel',
]

interface Partner {
  name: string
  logo?: { asset?: { url?: string } }
}

export default function PartnersMarquee({ partners = defaultPartners.map((n) => ({ name: n })) }: { partners?: Partner[] }) {
  // Double for seamless loop
  const doubled = [...partners, ...partners]

  return (
    <section className="bg-navy border-y border-white/10 py-12 overflow-hidden">
      <div className="max-w-container mx-auto px-6 lg:px-10 mb-8">
        <p className="font-body text-xs text-white/40 tracking-[0.2em] uppercase text-center">
          Trusted by Tanzania's Leading Industrial Partners
        </p>
      </div>

      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-navy to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-navy to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee whitespace-nowrap">
          {doubled.map((partner, i) => (
            <div
              key={i}
              className="inline-flex items-center shrink-0 mx-10 lg:mx-16"
            >
              {partner.logo?.asset?.url ? (
                <img
                  src={partner.logo.asset.url}
                  alt={partner.name}
                  className="h-8 w-auto object-contain filter brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-200"
                />
              ) : (
                <span className="font-heading text-xl text-white/40 hover:text-gold/70 transition-colors duration-200 tracking-wide">
                  {partner.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
