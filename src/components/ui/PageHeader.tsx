import SectionLabel from './SectionLabel'

interface PageHeaderProps {
  label?: string
  title: string
  subtitle?: string
}

export default function PageHeader({ label, title, subtitle }: PageHeaderProps) {
  return (
    <section className="relative bg-navy overflow-hidden">
      {/* Texture overlay */}
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] pointer-events-none" />
      {/* Gold accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="relative max-w-container mx-auto px-6 lg:px-10 py-20 lg:py-28">
        {label && <SectionLabel light className="mb-5">{label}</SectionLabel>}
        <h1 className="font-heading text-4xl lg:text-6xl text-white leading-tight max-w-2xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 text-white/60 font-body text-lg max-w-xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
