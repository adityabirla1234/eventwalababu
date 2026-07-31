import { forwardRef } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface OptionCardProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  description?: string
  icon?: ReactNode
  /** 'radio' for single-select groups, 'checkbox' for multi-select groups. */
  kind?: 'radio' | 'checkbox'
}

/**
 * A native radio/checkbox input visually rendered as a selectable card.
 * Keeps full keyboard/screen-reader semantics (the input is real, just
 * visually hidden) while presenting a premium, tappable surface instead of
 * a plain form control — used throughout the Inquiry wizard.
 */
export const OptionCard = forwardRef<HTMLInputElement, OptionCardProps>(function OptionCard(
  { label, description, icon, kind = 'radio', className, id, ...rest },
  ref,
) {
  return (
    <label
      htmlFor={id}
      className={cn(
        'group relative flex min-h-[44px] cursor-pointer items-start gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-card)] p-4 transition-all duration-[var(--duration-base)]',
        'hover:border-[var(--color-accent)]/60 hover:shadow-md hover:shadow-black/5',
        'has-[:checked]:border-[var(--color-accent)] has-[:checked]:bg-[var(--color-accent-soft)] has-[:checked]:shadow-md',
        'has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--color-accent)]',
        className,
      )}
    >
      <input ref={ref} type={kind} id={id} className="sr-only" {...rest} />
      {icon && (
        <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-muted)] text-[var(--color-accent)] transition-colors group-has-[:checked]:bg-[var(--color-accent)] group-has-[:checked]:text-[var(--color-accent-foreground)]">
          {icon}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-[var(--color-foreground)]">{label}</span>
        {description && (
          <span className="mt-0.5 block text-xs leading-relaxed text-[var(--color-muted-foreground)]">
            {description}
          </span>
        )}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          'mt-0.5 flex size-5 shrink-0 items-center justify-center border text-[var(--color-accent-foreground)] transition-all',
          kind === 'radio' ? 'rounded-full' : 'rounded-[0.3rem]',
          'border-[var(--color-border)] group-has-[:checked]:border-[var(--color-accent)] group-has-[:checked]:bg-[var(--color-accent)]',
        )}
      >
        <Check className="size-3 scale-0 transition-transform group-has-[:checked]:scale-100" strokeWidth={3} />
      </span>
    </label>
  )
})
