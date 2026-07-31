import { Reveal } from '@/components/motion/Reveal'
import { FOUNDERS } from '@/components/about/content'
import { cn } from '@/lib/utils'

/**
 * Compact "founding duo" display: two small, deliberately asymmetric photo
 * frames (one circular, one softly-rounded, gently staggered) rather than a
 * generic two-column team card. Sized to sit inside a sidebar column without
 * adding extra vertical rhythm to the page.
 */
export function Founders({ className }: { className?: string }) {
  const [first, second] = FOUNDERS

  return (
    <div className={cn('flex items-start gap-5', className)}>
      <Reveal variant="scale" className="flex flex-col items-center text-center">
        <div className="size-16 overflow-hidden rounded-full border-2 border-[var(--color-background)] shadow-sm ring-1 ring-[var(--color-accent)]/50 sm:size-20">
          <img
            src={first.imgUrl}
            alt={first.name}
            loading="lazy"
            className="size-full object-cover"
          />
        </div>
        <p className="mt-2 font-serif text-xs text-[var(--color-foreground)] sm:text-sm">{first.name}</p>
        <p className="mt-0.5 text-[9px] uppercase tracking-[0.15em] text-[var(--color-muted-foreground)] sm:text-[10px]">
          Founder
        </p>
      </Reveal>

      <Reveal variant="scale" delay={0.08} className="mt-5 flex flex-col items-center text-center sm:mt-6">
        <div className="size-16 -rotate-3 overflow-hidden rounded-2xl border-2 border-[var(--color-background)] shadow-sm ring-1 ring-[var(--color-accent)]/50 sm:size-20">
          <img
            src={second.imgUrl}
            alt={second.name}
            loading="lazy"
            className="size-full object-cover"
          />
        </div>
        <p className="mt-2 font-serif text-xs text-[var(--color-foreground)] sm:text-sm">{second.name}</p>
        <p className="mt-0.5 text-[9px] uppercase tracking-[0.15em] text-[var(--color-muted-foreground)] sm:text-[10px]">
          Co-Founder
        </p>
      </Reveal>
    </div>
  )
}
