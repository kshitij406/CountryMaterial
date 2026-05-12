export default function SteelBannerStrip() {
  return (
    <div
      className="relative h-[280px] sm:h-[340px] overflow-hidden"
      style={{
        backgroundImage: "url('/images/randos/steel_bars.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
      }}
    >
      {/* Heavy navy overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(108deg, rgba(15,30,45,.94) 0%, rgba(15,30,45,.72) 50%, rgba(15,30,45,.88) 100%)' }}
      />
      <div className="absolute inset-0 bg-steel-lines pointer-events-none" />
      <div className="absolute inset-0 grain-overlay" style={{ opacity: 0.03 }} />

      {/* Horizontal rule top */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(46,111,163,.6), transparent)' }} />

      <div className="relative h-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 flex items-center justify-between gap-8">
        {/* Left: bold statement */}
        <div>
          <div className="font-space text-[9px] tracking-[0.28em] uppercase text-gold/55 mb-4">
            BS 500 · TBS CERTIFIED · DAR ES SALAAM
          </div>
          <p className="font-display text-[clamp(28px,5vw,72px)] leading-[0.9] tracking-[0.03em] uppercase text-white max-w-[700px]">
            From Local Scrap to <span className="text-gold-light">Certified Steel.</span>
          </p>
        </div>

        {/* Right: spec data table */}
        <div className="hidden lg:flex flex-col gap-px shrink-0" style={{ borderLeft: '1px solid rgba(46,111,163,.3)' }}>
          {[
            { k: 'Yield Strength', v: '≥ 500 MPa' },
            { k: 'Process', v: 'EAF + Ladle Refining' },
            { k: 'Certification', v: 'BS 500 · TBS' },
            { k: 'Origin', v: '100% Local Scrap' },
          ].map((row) => (
            <div key={row.k} className="flex gap-8 items-center px-8 py-3" style={{ borderBottom: '1px solid rgba(46,111,163,.15)' }}>
              <span className="font-space text-[9px] tracking-[0.14em] uppercase text-white/40 w-36">{row.k}</span>
              <span className="font-space text-[9px] tracking-[0.14em] text-gold/80">{row.v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal rule bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(46,111,163,.6), transparent)' }} />
    </div>
  )
}
