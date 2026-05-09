import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-8"
      style={{ background: '#F7F9FB' }}
    >
      <div className="text-center max-w-lg reveal">
        <div className="font-display text-[120px] leading-none text-gold/25 mb-4">404</div>
        <div className="w-16 h-px bg-gold mx-auto mb-6" />
        <h1 className="font-display text-[clamp(32px,5vw,56px)] leading-[0.95] tracking-[0.04em] uppercase text-slate mb-5">
          Page Not Found
        </h1>
        <p className="font-barlow text-[16px] text-slate/65 leading-[1.65] mb-10">
          The page you are looking for does not exist, has been moved, or is temporarily unavailable.
        </p>
        <Link
          href="/"
          className="group relative inline-flex items-center gap-3 overflow-hidden px-[34px] py-[18px] bg-gold text-white font-condensed text-[14px] tracking-[0.22em] uppercase font-semibold"
        >
          <span className="relative z-10">Back to Home</span>
          <svg className="relative z-10 w-3.5 h-3.5 transition-transform duration-400 group-hover:translate-x-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
          <span className="absolute inset-0 bg-gold-dim -translate-x-full group-hover:translate-x-0 transition-transform duration-500" style={{ transitionTimingFunction: 'cubic-bezier(.16,1,.3,1)' }} />
        </Link>
      </div>
    </div>
  )
}
