const DEFAULT_ITEMS = [
  { num: '50,000+', label: 'Tonnes / yr' },
  { num: '29',      label: 'Years' },
  { num: '14',      label: 'Cities' },
  { num: '1,200+',  label: 'Clients' },
  { num: '60',      label: 'Fleet Vehicles' },
  { num: '10',      label: 'Distribution Yards' },
  { num: 'ISO 9001',label: 'Certified' },
  { num: '24 / 7',  label: 'Logistics' },
]

interface TickerItem { num: string; label: string }

function TickerItem({ num, label }: TickerItem) {
  return (
    <div className="flex items-center gap-5 flex-shrink-0">
      <span className="font-display text-[34px] text-gold tracking-[0.04em] leading-none">{num}</span>
      <span className="font-condensed text-[13px] tracking-[0.2em] uppercase text-cream/65">{label}</span>
      <span className="w-1.5 h-1.5 bg-gold rotate-45 flex-shrink-0" />
    </div>
  )
}

export default function TickerStrip({ items }: { items?: TickerItem[] }) {
  const data = items?.length ? items : DEFAULT_ITEMS
  const doubled = [...data, ...data]

  return (
    <section
      className="relative overflow-hidden py-7"
      style={{
        background: '#1A1A2E',
        borderTop: '1px solid rgba(200,150,46,.22)',
        borderBottom: '1px solid rgba(200,150,46,.22)',
      }}
      aria-label="Key facts"
    >
      <div className="flex gap-20 w-max animate-ticker">
        {doubled.map((item, i) => (
          <TickerItem key={i} {...item} />
        ))}
      </div>
    </section>
  )
}
