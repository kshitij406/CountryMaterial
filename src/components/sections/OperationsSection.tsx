import Image from 'next/image'
import type { Dictionary } from '@/i18n'

// Place names and figures are language-independent; roles/labels come from the dictionary.
const BRANCHES = [
  { name: 'Dar es Salaam', flag: 'HQ' },
  { name: 'Mbeya',         flag: 'MB' },
  { name: 'Dodoma',        flag: 'DO' },
  { name: 'Kahama',        flag: 'KA' },
  { name: 'Pwani',         flag: 'PW' },
  { name: 'Kilimanjaro',   flag: 'KL' },
]

const FLEET_VALUES = ['30+', '5', '24hrs', '104']

export default function OperationsSection({ t }: { t: Dictionary['operations'] }) {
  const branches = BRANCHES.map((b, i) => ({ ...b, role: t.branchRoles[i] }))
  const fleetStats = FLEET_VALUES.map((value, i) => ({ value, label: t.fleetStats[i] }))

  return (
    <section
      className="relative overflow-hidden"
      id="operations"
      style={{ background: '#FAF7F2' }}
      aria-label={t.sectionLabel}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28">

        {/* Asymmetric header */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 items-end mb-16 reveal">
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-gold mb-4">{t.eyebrow}</p>
            <h2 className="font-black text-[clamp(36px,5vw,72px)] text-ink leading-none tracking-tight">
              {t.headingLine1}<br />
              <span className="text-gold">{t.headingLine2}</span><br />
              {t.headingLine3}
            </h2>
          </div>
          <p className="text-[16px] text-slate/65 leading-relaxed max-w-lg self-end">
            {t.intro}
          </p>
        </div>

        {/* Main layout: image + branches */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

          {/* Operations photo */}
          <div className="relative overflow-hidden min-h-[360px] reveal group">
            <Image
              src="/images/company/trans-large.jpg"
              alt={t.fleetAlt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-gold/60 mb-1">{t.fleetEyebrow}</p>
              <p className="font-black text-[20px] text-white leading-tight">{t.fleetCaption}</p>
            </div>
          </div>

          {/* Branches grid */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-px stagger" style={{ background: '#E8DED1' }}>
              {branches.map((branch) => (
                <div
                  key={branch.name}
                  className="flex items-start gap-4 p-5 cursor-default"
                  style={{ background: '#FAF7F2' }}
                >
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-gold/30">
                    <span className="font-mono text-[11px] font-bold text-gold">{branch.flag}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-black text-[14px] text-ink truncate">{branch.name}</p>
                    <p className="text-[12px] text-slate/55 leading-snug mt-0.5">{branch.role}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Company photo grid */}
            <div className="grid grid-cols-2 gap-3 mt-1">
              <div className="relative h-36 overflow-hidden">
                <Image src="/images/company/group-photo.jpg" alt={t.teamAlt} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
                <div className="absolute inset-0 bg-navy/40" />
                <span className="absolute bottom-3 left-3 text-[11px] font-bold text-white/70 tracking-wide">{t.teamCaption}</span>
              </div>
              <div className="relative h-36 overflow-hidden">
                <Image src="/images/stock/facility-main.jpg" alt={t.facilityAlt} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
                <div className="absolute inset-0 bg-navy/40" />
                <span className="absolute bottom-3 left-3 text-[11px] font-bold text-white/70 tracking-wide">{t.facilityCaption}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Fleet stats bar */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 reveal"
          style={{ borderTop: '1px solid #E8DED1' }}
        >
          {fleetStats.map((s, i) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center py-10 px-4 text-center"
              style={{ borderRight: i < fleetStats.length - 1 ? '1px solid #E8DED1' : undefined }}
            >
              <span className="font-mono font-bold text-[clamp(32px,4vw,56px)] text-gold leading-none">{s.value}</span>
              <div className="mt-2 w-5 h-px bg-gold/30" />
              <span className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate/50">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
