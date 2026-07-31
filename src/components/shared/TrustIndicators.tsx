import type { LucideIcon } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { cn } from '@/lib/utils'

export interface TrustPoint {
  icon: LucideIcon
  label: string
  description?: string
}

interface TrustIndicatorsProps {
  points: readonly TrustPoint[]
  className?: string
}

/** Row of small trust badges (confidentiality, response time, track record, etc). */
export function TrustIndicators({ points, className }: TrustIndicatorsProps) {
  return (
    <div className={cn('grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6', className)}>
      {points.map(({ icon: Icon, label, description }, i) => (
        <Reveal
          key={label}
          delay={i * 0.06}
          className="flex flex-col items-center gap-2 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-5 text-center"
        >
          <span className="flex size-10 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
            <Icon className="size-5" aria-hidden="true" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-foreground)] sm:text-sm">
            {label}
          </span>
          {description && (
            <span className="text-[11px] leading-snug text-[var(--color-muted-foreground)] sm:text-xs">
              {description}
            </span>
          )}
        </Reveal>
      ))}
    </div>
  )
}
