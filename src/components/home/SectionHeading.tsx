import type { ReactNode } from 'react'
import { Reveal } from '@/components/motion/Reveal'
import { OrnamentGlyph } from '@/components/home/Illustrations'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  tone?: 'default' | 'inverse'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'default',
  className,
}: SectionHeadingProps) {
  const isCenter = align === 'center'
  const mutedColor =
    tone === 'inverse' ? 'text-white/60' : 'text-[var(--color-muted-foreground)]'
  const accentColor = tone === 'inverse' ? 'text-[var(--color-gold-400)]' : 'text-[var(--color-accent)]'

  return (
    <div className={cn(isCenter ? 'mx-auto max-w-2xl text-center' : 'max-w-xl', className)}>
      <Reveal
        variant="fade"
        className={cn(
          'mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em]',
          accentColor,
          isCenter && 'justify-center',
        )}
      >
        <OrnamentGlyph className="size-3.5" />
        <span>{eyebrow}</span>
      </Reveal>
      <Reveal
        as="h2"
        delay={0.05}
        className="balance text-3xl font-semibold sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
      >
        {title}
      </Reveal>
      {description && (
        <Reveal
          delay={0.1}
          className={cn('balance mt-4 text-base leading-relaxed sm:text-lg', mutedColor, isCenter && 'mx-auto max-w-lg')}
        >
          {description}
        </Reveal>
      )}
    </div>
  )
}
