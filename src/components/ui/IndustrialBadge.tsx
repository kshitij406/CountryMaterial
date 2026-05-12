interface IndustrialBadgeProps {
  label: string
  variant?: 'grade' | 'standard' | 'cert'
  className?: string
}

export default function IndustrialBadge({ label, variant = 'grade', className = '' }: IndustrialBadgeProps) {
  const base = 'inline-flex items-center gap-1.5 font-space text-[9px] tracking-[0.18em] uppercase px-2.5 py-1 border'
  const variants: Record<string, string> = {
    grade:    'text-gold border-gold/40 bg-gold/5',
    standard: 'text-slate/70 border-slate/20 bg-slate/5',
    cert:     'text-amber border-amber/40 bg-amber/5',
  }
  return (
    <span className={`${base} ${variants[variant] ?? variants.grade} ${className}`}>
      <span className="w-1 h-1 rounded-full bg-current flex-shrink-0" />
      {label}
    </span>
  )
}
