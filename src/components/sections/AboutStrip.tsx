import Image from 'next/image'
import SteelMotif from '@/components/ui/SteelMotifs'

interface ProcessStep {
  label: string
  note?: string
}

interface AboutStripProps {
  heading?: string
  lead?: string
  body?: string
  founderInitials?: string
  founderName?: string
  founderRole?: string
  aboutImageUrl?: string | null
  processSteps?: ProcessStep[]
}

const DEFAULT_STEPS: ProcessStep[] = [
  { label: 'Collection', note: '5,000+ vendors' },
  { label: 'Sorting', note: 'Grade & weight' },
  { label: 'Melting', note: 'EAF process' },
  { label: 'Rolling', note: 'Rebar & billets' },
  { label: 'Dispatch', note: '30+ fleet' },
]

export default function AboutStrip({
  heading = 'Built for the long term.',
  lead = 'Regenerative steel recycler integrating scrap vendors, manufacturers, and construction into a circular supply chain.',
  body = 'We transform scrap metal into high-quality, certified steel for affordable construction while empowering informal scrap vendors and driving sustainable industrial growth across Africa.',
  founderInitials = 'CM',
  founderName = 'Country Materials',
  founderRole = 'Circular Steel Ecosystem',
  aboutImageUrl,
  processSteps,
}: AboutStripProps) {
  const headingLines = heading.replace(/\\n/g, '\n').split('\n')
  const steps = processSteps?.length ? processSteps : DEFAULT_STEPS

  return (
    <section className="relative bg-white py-20 sm:py-24 lg:py-[120px] px-5 sm:px-8 lg:px-16" id="about">
      <SteelMotif
        name="billet"
        className="absolute -right-[140px] -top-[80px] w-[420px] h-[320px] text-slate/5 pointer-events-none select-none hidden lg:block"
      />
      <div className="max-w-[1440px] mx-auto grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-start">

        {/* Left: image + process strip */}
        <div className="reveal">
          <div
            className="relative min-h-[380px] sm:min-h-[500px] lg:min-h-[620px] overflow-hidden"
            style={{ border: '1px solid #D8E0E7' }}
          >
            <Image
              src={aboutImageUrl ?? '/images/company/company-profile.jpg'}
              alt="Country Materials — steel operations"
              fill
              className="object-cover"
            />
            {/* Bottom gradient for readability of corner badge */}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(15,30,45,.55) 0%, transparent 45%)' }}
            />

            {/* Bottom-right: certification corner badge */}
            <div
              className="absolute bottom-4 right-4 px-3 py-2"
              style={{ background: 'rgba(15,30,45,.88)', border: '1px solid rgba(46,111,163,.3)' }}
            >
              <span className="font-space text-[9px] tracking-[0.2em] uppercase text-gold/80">TBS · BS 500</span>
            </div>
          </div>

          {/* Process strip — spans width of image */}
          <div className="mt-3 grid gap-px" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)`, background: '#D8E0E7' }}>
            {steps.map((step, i) => (
              <div key={i} className="bg-charcoal px-2 py-3 text-center">
                <div className="font-space text-[8px] tracking-[0.1em] text-gold/55 mb-1">{String(i + 1).padStart(2, '0')}</div>
                <div className="font-condensed font-semibold text-[9px] sm:text-[10px] tracking-[0.14em] uppercase text-slate/80 leading-tight">{step.label}</div>
                {step.note && (
                  <div className="font-barlow text-[8px] text-slate/45 mt-0.5 leading-tight hidden sm:block">{step.note}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: content */}
        <div className="reveal lg:pt-4">
          <div className="flex items-center gap-3.5 mb-6">
            <span className="block h-px w-8 bg-gold" />
            <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold">About country materials</span>
          </div>

          <h2 className="font-display text-[clamp(32px,5vw,68px)] leading-[0.92] tracking-[0.03em] uppercase text-slate">
            {headingLines.map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h2>

          <p className="mt-6 font-barlow text-[17px] text-slate/80 leading-[1.58]">{lead}</p>
          <p className="mt-4 font-barlow text-[15px] text-slate/68 leading-[1.62] max-w-[560px]">{body}</p>

          {/* Mini stat grid */}
          <div className="mt-10 grid grid-cols-2 gap-4 max-w-[520px]">
            <div className="bg-charcoal p-4" style={{ border: '1px solid #E6ECF1' }}>
              <div className="font-display text-[34px] leading-none text-gold">50K+</div>
              <div className="font-condensed text-[11px] tracking-[0.18em] uppercase text-slate/70 mt-2">Metric tons recycled</div>
            </div>
            <div className="bg-charcoal p-4" style={{ border: '1px solid #E6ECF1' }}>
              <div className="font-display text-[34px] leading-none text-gold">5,000+</div>
              <div className="font-condensed text-[11px] tracking-[0.18em] uppercase text-slate/70 mt-2">Vendors on platform</div>
            </div>
          </div>

          {/* Founder signature */}
          <div className="mt-8 pt-6 flex items-center gap-4" style={{ borderTop: '1px solid #D8E0E7' }}>
            <span className="font-display text-[34px] text-gold leading-none tracking-[0.02em]">{founderInitials}</span>
            <div>
              <div className="font-barlow font-semibold text-[15px] tracking-[0.05em] uppercase text-slate">{founderName}</div>
              <div className="font-condensed text-[11px] tracking-[0.18em] uppercase text-slate/60 mt-0.5">{founderRole}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
