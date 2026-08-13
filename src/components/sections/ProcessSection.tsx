import type { Dictionary } from '@/i18n'

// Step copy lives in the dictionary; the number and icon are language-independent.
const stepVisuals = [
  {
    number: '01',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1" y="3" width="15" height="13" rx="1"/>
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
  },
  {
    number: '02',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/>
        <polyline points="2 17 12 22 22 17"/>
        <polyline points="2 12 12 17 22 12"/>
      </svg>
    ),
  },
  {
    number: '03',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8.5 14.5A6.5 6.5 0 0 0 15 21a6.5 6.5 0 0 0 0-13C12 8 9 5 9 2c0 0-3.5 4-3.5 7.5a5.5 5.5 0 0 0 3 4.9"/>
        <path d="M11.5 17.5A3 3 0 0 0 15 20a3 3 0 0 0 3-3c0-1.5-1.5-3-3-3s-3-1.5-3-3"/>
      </svg>
    ),
  },
  {
    number: '04',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    ),
  },
  {
    number: '05',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
  },
]

export default function ProcessSection({ t }: { t: Dictionary['process'] }) {
  const steps = stepVisuals.map((v, i) => ({ ...v, ...t.steps[i] }))

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: '#0B1D3A' }}
      id="process"
      aria-label={t.sectionLabel}
    >
      <div className="absolute inset-0 bg-steel-texture" aria-hidden="true" />
      <div className="absolute inset-0 bg-concrete-texture" aria-hidden="true" />

      <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 items-end mb-16 reveal">
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-gold mb-4">{t.eyebrow}</p>
            <h2 className="font-black text-[clamp(36px,5vw,72px)] text-white leading-none tracking-tight">
              {t.headingLine1}<br />{t.headingLine2}<br />
              <span className="text-gold">{t.headingLine3}</span>
            </h2>
          </div>
          <p className="text-[16px] text-white/50 leading-relaxed max-w-lg self-end">
            {t.intro}
          </p>
        </div>

        {/* Step cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px stagger" style={{ background: 'rgba(200,150,46,0.1)' }}>
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative flex flex-col p-7 cursor-default group"
              style={{ background: '#0B1D3A' }}
            >
              {/* Icon area */}
              <div className="w-12 h-12 flex items-center justify-center border border-gold/25 text-gold mb-5 group-hover:border-gold/60 group-hover:text-gold-light transition-colors duration-300">
                {step.icon}
              </div>

              {/* Number */}
              <p className="font-mono text-[10px] tracking-[0.22em] text-gold/40 mb-2">{step.number}</p>

              {/* Title */}
              <h3 className="font-black text-[18px] text-white leading-tight mb-3">{step.title}</h3>

              {/* Description */}
              <p className="text-[13px] text-white/45 leading-relaxed flex-1">{step.description}</p>

              {/* Connector arrow (hidden on last) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-px top-1/2 -translate-y-1/2 z-10 w-px h-8 bg-gold/20" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>

        {/* Circular callout */}
        <div
          className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 px-7 py-6 border-l-4 border-gold reveal"
          style={{ background: 'rgba(200,150,46,0.06)' }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-gold flex-shrink-0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
            <path d="M21 3v5h-5"/>
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
            <path d="M8 16H3v5"/>
          </svg>
          <p className="text-[14px] text-white/55 leading-relaxed">
            <strong className="font-bold text-gold">{t.calloutLead}</strong>{' '}
            {t.calloutBody}
          </p>
        </div>
      </div>
    </section>
  )
}
