import { forwardRef } from 'react'
import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export type CardVariant = 'elevated' | 'bordered' | 'flat'

const variantStyles: Record<CardVariant, string> = {
  elevated:
    'bg-[var(--color-card)] text-[var(--color-card-foreground)] shadow-md shadow-black/5 ' +
    'hover:shadow-xl hover:shadow-black/10',
  bordered:
    'bg-[var(--color-card)] text-[var(--color-card-foreground)] border border-[var(--color-border)] ' +
    'hover:border-[var(--color-accent)]/50',
  flat: 'bg-[var(--color-muted)] text-[var(--color-foreground)]',
}

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  interactive?: boolean
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = 'elevated', interactive = false, className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        'rounded-[var(--radius-lg)] p-6 transition-all duration-[var(--duration-base)] ease-[var(--ease-out-soft)]',
        variantStyles[variant],
        interactive && 'cursor-pointer hover:-translate-y-1',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
})

export function CardHeader({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mb-4 space-y-1.5', className)} {...rest}>
      {children}
    </div>
  )
}

export function CardTitle({ className, children, ...rest }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('font-serif text-xl font-semibold', className)} {...rest}>
      {children}
    </h3>
  )
}

export function CardDescription({ className, children, ...rest }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-sm text-[var(--color-muted-foreground)]', className)} {...rest}>
      {children}
    </p>
  )
}

export function CardContent({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(className)} {...rest}>
      {children}
    </div>
  )
}

export function CardFooter({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mt-4 flex items-center', className)} {...rest}>
      {children}
    </div>
  )
}
