import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white border border-sand',
        hover && 'transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/8',
        className
      )}
    >
      {children}
    </div>
  )
}
