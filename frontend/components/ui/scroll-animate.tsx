'use client'

import { ReactNode } from 'react'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { cn } from '@/lib/utils'

interface ScrollAnimateProps {
  children: ReactNode
  className?: string
  delay?: 1 | 2 | 3 | 4
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function ScrollAnimate({ 
  children, 
  className, 
  delay,
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true
}: ScrollAnimateProps) {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold,
    rootMargin,
    triggerOnce
  })

  return (
    <div
      ref={elementRef}
      className={cn(
        'fade-up',
        isVisible && 'visible',
        delay && `fade-up-delay-${delay}`,
        className
      )}
    >
      {children}
    </div>
  )
}
