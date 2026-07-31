import type { HTMLAttributes, ElementType, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Container, type ContainerSize } from '@/components/ui/Container'

export type SectionSpacing = 'sm' | 'md' | 'lg' | 'xl' | 'none'
export type SectionTone = 'default' | 'muted' | 'inverse' | 'transparent'

const spacingStyles: Record<SectionSpacing, string> = {
  none: 'py-0',
  sm: 'py-12 sm:py-16',
  md: 'py-16 sm:py-24',
  lg: 'py-20 sm:py-28 lg:py-32',
  xl: 'py-28 sm:py-36 lg:py-44',
}

const toneStyles: Record<SectionTone, string> = {
  default: 'bg-[var(--color-background)] text-[var(--color-foreground)]',
  // White alternate-section background (was dark grey/onyx). Rescopes the
  // shared color tokens locally so every child component underneath — which
  // already reads var(--color-foreground), var(--color-accent), etc. —
  // automatically renders black body copy + a contrast-safe darker gold
  // accent on the light background, with no per-file changes needed.
  muted:
    'bg-white text-[var(--color-onyx-950)] ' +
    '[--color-foreground:var(--color-onyx-950)] ' +
    '[--color-muted-foreground:var(--color-onyx-600)] ' +
    '[--color-border:var(--color-onyx-200)] ' +
    '[--color-card:#ffffff] ' +
    '[--color-card-foreground:var(--color-onyx-950)] ' +
    '[--color-accent:var(--color-gold-600)] ' +
    '[--color-accent-foreground:#ffffff] ' +
    '[--color-accent-soft:var(--color-gold-100)]',
  inverse: 'bg-[var(--color-surface-inverse)] text-[var(--color-surface-inverse-foreground)]',
  transparent: 'bg-transparent',
}

interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  spacing?: SectionSpacing
  tone?: SectionTone
  containerSize?: ContainerSize
  /** Skip the inner Container (useful for full-bleed hero media). */
  fullBleed?: boolean
  children?: ReactNode
}

/** Standard page section: consistent vertical rhythm + tone + centered container. */
export function Section({
  as: Tag = 'section',
  spacing = 'md',
  tone = 'default',
  containerSize = 'lg',
  fullBleed = false,
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <Tag className={cn(spacingStyles[spacing], toneStyles[tone], className)} {...rest}>
      {fullBleed ? children : <Container size={containerSize}>{children}</Container>}
    </Tag>
  )
}
