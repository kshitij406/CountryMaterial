const certifications = [
  {
    code: 'BS 500B',
    name: 'British Standard 500',
    authority: 'British Standards Institution',
    description: 'Our TMT rebar meets BS 500B — the internationally recognised standard for high-yield steel reinforcement used in earthquake-resistant and structural-grade construction.',
    accent: '#C8962E',
  },
  {
    code: 'TBS',
    name: 'Tanzania Bureau of Standards',
    authority: 'TBS — Government of Tanzania',
    description: 'Full TBS certification ensures our products meet Tanzanian national quality standards. Every batch is laboratory-tested for tensile strength, bendability, and chemical composition.',
    accent: '#2E7D54',
  },
  {
    code: 'ISO 9001',
    name: 'Quality Management System',
    authority: 'International Organisation for Standardisation',
    description: 'Our production and quality control processes are ISO 9001-compliant — guaranteeing consistent product quality from raw scrap input through to finished steel dispatch.',
    accent: '#A37824',
  },
]

const testingPoints = [
  'Tensile strength (yield & ultimate)',
  'Chemical composition analysis',
  'Bend and rebend testing',
  'Surface geometry and rib pattern',
  'Weight per metre verification',
  'Batch traceability records',
]

export default function CertificationsSection() {
  return (
    <section
      className="relative overflow-hidden"
      id="certifications"
      style={{ background: '#0B1D3A' }}
      aria-label="Certifications and quality"
    >
      <div className="absolute inset-0 bg-steel-texture" aria-hidden="true" />

      <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28">

        {/* Asymmetric header */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 items-end mb-16 reveal">
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-gold mb-4">Quality & Certification</p>
            <h2 className="font-black text-[clamp(36px,5vw,72px)] text-white leading-none tracking-tight">
              Every batch<br />tested and<br />
              <span className="text-gold">certified.</span>
            </h2>
          </div>
          <p className="text-[16px] text-white/50 leading-relaxed max-w-lg self-end">
            We don&apos;t ship uncertified steel. Period. Our in-house lab and independent audits ensure every tonne leaving our yard meets the specifications your structure depends on.
          </p>
        </div>

        {/* Certification cards — borderless, asymmetric */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px mb-12 stagger" style={{ background: 'rgba(200,150,46,0.1)' }}>
          {certifications.map((cert) => (
            <div
              key={cert.code}
              className="relative flex flex-col p-8 overflow-hidden cursor-default"
              style={{ background: '#0B1D3A' }}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: cert.accent }} aria-hidden="true" />

              {/* Badge */}
              <div
                className="inline-flex items-center self-start px-4 py-2 mb-6 font-mono font-bold text-[18px] tracking-wider border"
                style={{
                  background: `${cert.accent}18`,
                  borderColor: `${cert.accent}40`,
                  color: cert.accent,
                }}
                aria-label={`Certification code: ${cert.code}`}
              >
                {cert.code}
              </div>

              <h3 className="font-black text-[16px] text-white mb-1">{cert.name}</h3>
              <p className="font-mono text-[10px] font-semibold text-white/35 uppercase tracking-[0.15em] mb-5">{cert.authority}</p>
              <p className="text-[13.5px] text-white/50 leading-relaxed flex-1">{cert.description}</p>

              <div className="mt-6 flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 flex-shrink-0" stroke={cert.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                <span className="text-[12px] font-semibold" style={{ color: cert.accent }}>Certified & Active</span>
              </div>
            </div>
          ))}
        </div>

        {/* Testing checklist */}
        <div
          className="flex flex-col lg:flex-row gap-10 px-8 py-8 border-l-4 border-gold reveal"
          style={{ background: 'rgba(200,150,46,0.06)' }}
        >
          <div className="flex-1 max-w-sm">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-gold mb-4">Quality Control Tests</p>
            <h3 className="font-black text-[22px] text-white leading-tight mb-3">
              Every batch tested before it leaves our yard.
            </h3>
            <p className="text-[14px] text-white/40 leading-relaxed">
              Independent lab testing + in-house QC on every production run. Mill certificates available on request.
            </p>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
            {testingPoints.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="w-5 h-5 flex items-center justify-center border border-gold/30 flex-shrink-0 mt-0.5" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 text-gold" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                <span className="text-[13.5px] text-white/60">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
