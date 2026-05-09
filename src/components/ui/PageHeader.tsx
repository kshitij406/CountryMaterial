export type PageHeaderTheme = 'navy' | 'cream' | 'gold' | 'charcoal'

interface PageHeaderProps {
  label?: string
  title: string
  subtitle?: string
  theme?: PageHeaderTheme
}

export default function PageHeader({ label, title, subtitle }: PageHeaderProps) {
  return (
    <section
      className="relative overflow-hidden pt-[160px] pb-[100px] px-8 lg:px-16"
      style={{ background: '#1F3347', borderBottom: '1px solid rgba(216,224,231,.4)' }}
    >
      <div className="relative max-w-[1440px] mx-auto">
        {label && (
          <div className="flex items-center gap-3.5 mb-7">
            <span className="block h-px w-10 bg-gold" />
            <span className="font-condensed text-[12px] tracking-[0.18em] uppercase text-white/90">{label}</span>
          </div>
        )}
        <h1 className="font-display text-[clamp(48px,7vw,112px)] leading-[0.9] tracking-[0.03em] uppercase text-white max-w-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-8 font-barlow text-[17px] text-white/60 max-w-2xl leading-[1.65]">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
