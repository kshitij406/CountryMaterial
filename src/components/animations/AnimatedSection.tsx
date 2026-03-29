'use client'

import { useRef, ReactNode } from 'react'
import { useGsapFadeUp } from './gsap-hooks'
import { cn } from '@/lib/utils'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function AnimatedSection({ children, className, delay = 0 }: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  useGsapFadeUp(ref, { delay })

  return (
    <div ref={ref} className={cn('opacity-0', className)}>
      {children}
    </div>
  )
}
