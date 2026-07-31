import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface AuroraTextProps {
  children: ReactNode
  className?: string
}

/**
 * Animated gradient "shimmer" text — a warm gold-to-cream gradient that
 * drifts slowly across the glyphs on a loop (see `.text-aurora` / the
 * `aurora-shimmer` keyframes in `index.css`). Reserved for short, prominent
 * headline moments — a moving gradient works against readability on body
 * copy, so this isn't meant to wrap full paragraphs.
 */
export function AuroraText({ children, className }: AuroraTextProps) {
  return <span className={cn('text-aurora', className)}>{children}</span>
}
