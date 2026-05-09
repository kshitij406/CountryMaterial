import Image from 'next/image'

interface Partner {
  name: string
  sub?: string
  logoUrl?: string
}

const DEFAULT_PARTNERS: Partner[] = [
  { name: 'CRJE',          sub: 'East Africa' },
  { name: 'SHELTER AFRIQUE', sub: 'Finance' },
  { name: 'TAZARA',        sub: 'Rail' },
  { name: 'GEITA GOLD',    sub: 'Mining' },
  { name: 'TANROADS',      sub: 'Infrastructure' },
  { name: 'AZANIA BANK',   sub: 'Banking' },
  { name: 'CHINA RAILWAY', sub: 'Engineering' },
  { name: 'DANGOTE',       sub: 'Cement' },
  { name: 'TPDC',          sub: 'Energy' },
  { name: 'NAT. HOUSING',  sub: 'Development' },
  { name: 'SUMATRA',       sub: 'Logistics' },
  { name: 'STRABAG',       sub: 'Construction' },
]

function LogoTile({ name, sub, logoUrl }: Partner) {
  return (
    <div
      className="logo-tile flex-shrink-0 w-[150px] sm:w-[180px] h-[56px] sm:h-[60px] flex flex-col items-center justify-center px-4 sm:px-6 cursor-default"
      style={{
        filter: 'grayscale(1) brightness(1.1) contrast(.8)',
        opacity: 0.72,
        borderLeft: '1px solid #D8E0E7',
        borderRight: '1px solid #D8E0E7',
      }}
    >
      {logoUrl ? (
        <Image src={logoUrl} alt={name} width={120} height={40} className="object-contain max-h-10 w-auto" />
      ) : (
        <>
          <span className="font-display text-[17px] sm:text-[20px] tracking-[0.08em] text-slate">{name}</span>
          {sub && <span className="font-condensed text-[9px] tracking-[0.2em] uppercase text-slate/55 mt-0.5">{sub}</span>}
        </>
      )}
    </div>
  )
}

export default function ClientsMarquee({ partners }: { partners?: Partner[] }) {
  const data = partners?.length ? partners : DEFAULT_PARTNERS
  const doubled = [...data, ...data]

  return (
    <section
      className="relative overflow-hidden py-14 sm:py-20 bg-white"
      id="clients"
      style={{ borderTop: '1px solid #D8E0E7', borderBottom: '1px solid #D8E0E7' }}
    >
      <div className="text-center mb-10 sm:mb-16 px-5 sm:px-8 reveal">
        <div className="inline-flex items-center gap-3.5 mb-5">
          <span className="block h-px w-8 bg-gold" />
          <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold">Trusted by</span>
          <span className="block h-px w-8 bg-gold" />
        </div>
        <h3 className="font-display text-[clamp(28px,3.5vw,44px)] tracking-[0.05em] uppercase text-slate">
          The firms building East Africa
        </h3>
      </div>

      <div className="flex gap-10 sm:gap-20 w-max animate-ticker">
        {doubled.map((c, i) => (
          <LogoTile key={i} {...c} />
        ))}
      </div>
    </section>
  )
}
