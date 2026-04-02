import SectionLabel from './SectionLabel'

export type PageHeaderTheme = 'navy' | 'cream' | 'gold' | 'charcoal'

interface PageHeaderProps {
  label?: string
  title: string
  subtitle?: string
  theme?: PageHeaderTheme
}

const THEMES: Record<PageHeaderTheme, {
  section: string
  labelLight: boolean
  title: string
  subtitle: string
  accent: string
}> = {
  navy: {
    section: 'bg-navy',
    labelLight: true,
    title: 'text-white',
    subtitle: 'text-white/60',
    accent: 'from-transparent via-gold to-transparent',
  },
  cream: {
    section: 'bg-cream',
    labelLight: false,
    title: 'text-navy',
    subtitle: 'text-slate/65',
    accent: 'from-transparent via-gold/70 to-transparent',
  },
  gold: {
    section: 'bg-gold',
    labelLight: false,
    title: 'text-navy',
    subtitle: 'text-navy/65',
    accent: 'from-transparent via-navy/25 to-transparent',
  },
  charcoal: {
    section: 'bg-charcoal',
    labelLight: true,
    title: 'text-white',
    subtitle: 'text-white/55',
    accent: 'from-transparent via-gold to-transparent',
  },
}

export default function PageHeader({ label, title, subtitle, theme = 'navy' }: PageHeaderProps) {
  const t = THEMES[theme]
  return (
    <section className={`relative ${t.section} overflow-hidden`}>
      <div className="absolute inset-0 bg-[url('/images/noise.svg')] opacity-[0.03] pointer-events-none" />
      <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${t.accent}`} />

      <div className="relative max-w-container mx-auto px-6 lg:px-10 py-12 md:py-20 lg:py-28">
        {label && (
          <SectionLabel light={t.labelLight} className="mb-5">
            {label}
          </SectionLabel>
        )}
        <h1 className={`font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl ${t.title} leading-tight max-w-2xl`}>
          {title}
        </h1>
        {subtitle && (
          <p className={`mt-4 font-body text-base md:text-lg ${t.subtitle} max-w-xl leading-relaxed`}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
