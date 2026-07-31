import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface MarqueeProps {
  children: ReactNode
  className?: string
  /** Pause the scroll on hover — useful when tiles are interactive. */
  pauseOnHover?: boolean
  reverse?: boolean
}

/** Seamless infinite horizontal scroller. Renders content twice and animates a -50% translate. */
export function Marquee({ children, className, pauseOnHover = false, reverse = false }: MarqueeProps) {
  return (
    <div className={cn('relative w-full overflow-hidden mask-fade-x', className)}>
      <div
        className={cn(
          'flex w-max items-center gap-10 animate-marquee',
          reverse && '[animation-direction:reverse]',
          pauseOnHover && 'hover:[animation-play-state:paused]',
        )}
      >
        <div className="flex shrink-0 items-center gap-10">{children}</div>
        <div className="flex shrink-0 items-center gap-10" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
