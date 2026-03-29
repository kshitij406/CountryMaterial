import { cn } from '@/lib/utils'

interface SectionLabelProps {
  children: string
  className?: string
  light?: boolean
}

export default function SectionLabel({ children, className, light = false }: SectionLabelProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2.5 font-body text-xs font-semibold tracking-[0.2em] uppercase',
        light ? 'text-gold-light' : 'text-gold',
        className
      )}
    >
      <span className={cn('block h-px w-8', light ? 'bg-gold-light' : 'bg-gold')} />
      {children}
    </span>
  )
}
