interface AboutStripProps {
  heading?: string
  lead?: string
  body?: string
  founderInitials?: string
  founderName?: string
  founderRole?: string
}

export default function AboutStrip({
  heading         = 'Three decades.\nOne standard.',
  lead            = 'Country Materials Ltd was founded in 1997 on a single conviction: that Tanzanian infrastructure deserves materials worthy of it.',
  body            = "From a single warehouse in Kariakoo we have grown into East Africa's most trusted vertically-integrated materials house — a fleet of sixty, a mill in Pwani, ten distribution yards, and two thousand professionals. What we build, we build once.",
  founderInitials = 'HM',
  founderName     = 'Hamisi Mwangaza',
  founderRole     = 'Founder & Chairman',
}: AboutStripProps) {
  const headingLines = heading.split('\n')

  return (
    <section
      className="relative grid lg:grid-cols-2"
      id="about"
      style={{ borderTop: '1px solid rgba(200,150,46,.15)' }}
    >
      {/* Left — foundry visual */}
      <div
        className="grain-overlay relative min-h-[600px] lg:min-h-[720px] overflow-hidden reveal"
        style={{
          background: `
            radial-gradient(ellipse at 30% 40%,rgba(200,150,46,.35),transparent 55%),
            radial-gradient(ellipse at 70% 70%,rgba(22,45,86,.8),transparent 60%),
            linear-gradient(140deg,#2a1a08 0%,#1A1A2E 50%,#0B1D3A 100%)
          `,
        }}
      >
        <div
          className="absolute inset-0 mix-blend-overlay"
          style={{
            background: `
              repeating-linear-gradient(90deg,transparent 0 80px,rgba(0,0,0,.18) 80px 81px),
              repeating-linear-gradient(0deg,transparent 0 80px,rgba(255,220,160,.04) 80px 81px)
            `,
          }}
        />
        <span className="absolute top-8 left-8 font-space text-[11px] tracking-[0.18em] text-gold/60">
          {'// 01 — FOUNDRY / PWANI'}
        </span>
        <span
          className="absolute bottom-8 left-8 font-space text-[11px] tracking-[0.2em] uppercase text-cream/40"
          style={{ border: '1px dashed rgba(232,222,209,.25)', padding: '8px 14px' }}
        >
          macro · molten pour · warm grade
        </span>
      </div>

      {/* Right — text */}
      <div className="flex flex-col justify-center px-10 lg:px-20 py-28 bg-charcoal reveal">
        <div className="flex items-center gap-3.5 mb-6">
          <span className="block h-px w-8 bg-gold" />
          <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-gold">The House of Country</span>
        </div>

        <h2 className="font-display text-[clamp(40px,5vw,72px)] leading-[0.92] tracking-[0.03em] uppercase text-cream">
          {headingLines.map((line, i) => (
            <span key={i} className="block">
              {i === headingLines.length - 1
                ? <><span className="text-cream">{line.split(' ').slice(0, -1).join(' ')} </span><span className="text-gold">{line.split(' ').slice(-1)[0]}</span></>
                : line}
            </span>
          ))}
        </h2>

        <p className="mt-7 font-barlow text-[19px] text-cream/82 leading-[1.55]">{lead}</p>

        <p className="mt-5 font-barlow text-[16px] text-cream/60 max-w-[540px]">{body}</p>

        <div
          className="mt-10 pt-7 flex items-center gap-5"
          style={{ borderTop: '1px solid rgba(200,150,46,.25)' }}
        >
          <span className="font-display text-[40px] text-gold leading-none tracking-[0.02em]">{founderInitials}</span>
          <div>
            <div className="font-barlow font-semibold text-[15px] tracking-[0.08em] uppercase text-cream">{founderName}</div>
            <div className="font-condensed text-[12px] tracking-[0.2em] uppercase text-cream/55 mt-0.5">{founderRole}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
