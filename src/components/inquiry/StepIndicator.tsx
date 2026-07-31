import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EASE_LUXE } from '@/lib/motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  labels: readonly string[]
}

export function StepIndicator({ currentStep, totalSteps, labels }: StepIndicatorProps) {
  const reducedMotion = useReducedMotion()
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Compact mobile version — avoids horizontal scroll / cramped labels */}
      <div className="mb-2 flex items-center justify-between sm:hidden">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-xs font-medium text-[var(--color-muted-foreground)]">{labels[currentStep - 1]}</span>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-[var(--color-muted)] sm:hidden">
        <motion.div
          className="h-full rounded-full bg-[var(--color-accent)]"
          initial={false}
          animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
          transition={{ duration: reducedMotion ? 0 : 0.5, ease: EASE_LUXE }}
        />
      </div>

      {/* Full stepper — desktop / tablet */}
      <div className="relative hidden sm:flex sm:items-start sm:justify-between">
        <div className="absolute left-0 right-0 top-5 h-px bg-[var(--color-border)]" aria-hidden="true" />
        <motion.div
          className="absolute left-0 top-5 h-px bg-[var(--color-accent)]"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: reducedMotion ? 0 : 0.5, ease: EASE_LUXE }}
          aria-hidden="true"
        />
        {labels.map((label, i) => {
          const step = i + 1
          const isComplete = step < currentStep
          const isCurrent = step === currentStep
          return (
            <div key={label} className="relative z-10 flex flex-col items-center gap-2" style={{ flexBasis: `${100 / totalSteps}%` }}>
              <span
                className={cn(
                  'flex size-10 items-center justify-center rounded-full border text-sm font-serif font-semibold transition-colors duration-[var(--duration-base)]',
                  isComplete && 'border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-accent-foreground)]',
                  isCurrent && 'border-[var(--color-accent)] bg-[var(--color-card)] text-[var(--color-accent)] ring-4 ring-[var(--color-accent-soft)]',
                  !isComplete && !isCurrent && 'border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-muted-foreground)]',
                )}
              >
                {isComplete ? <Check className="size-4" strokeWidth={3} /> : step}
              </span>
              <span
                className={cn(
                  'text-center text-xs font-medium tracking-wide',
                  isCurrent ? 'text-[var(--color-foreground)]' : 'text-[var(--color-muted-foreground)]',
                )}
              >
                {label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
