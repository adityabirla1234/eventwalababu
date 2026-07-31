import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/motion/Reveal'
import { OrnamentGlyph } from '@/components/home/Illustrations'

interface PageCTAProps {
  title: ReactNode
  description?: ReactNode
  buttonLabel?: string
  buttonTo?: string
}

/**
 * End-of-page call to action. Shares the theatrical dark/gold treatment used
 * by the homepage's LuxuryCTA so every route ends on the same note, while
 * allowing per-page copy.
 */
export function PageCTA({
  title,
  description,
  buttonLabel = 'Begin Your Story',
  buttonTo = '/inquiry',
}: PageCTAProps) {
  return (
    <Section spacing="xl" tone="inverse" className="relative overflow-hidden text-center">
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-2xl">
        <Reveal variant="scale" className="mx-auto mb-6 text-[var(--color-gold-400)]">
          <OrnamentGlyph className="mx-auto size-6" />
        </Reveal>
        <Reveal
          as="h2"
          variant="fade"
          delay={0.1}
          className="balance font-serif text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl"
        >
          {title}
        </Reveal>
        {description && (
          <Reveal
            variant="fade"
            delay={0.2}
            className="balance mx-auto mt-6 max-w-lg text-base leading-relaxed opacity-70 sm:text-lg"
          >
            {description}
          </Reveal>
        )}
        <Reveal delay={0.3} className="mt-10">
          <Button
            to={buttonTo}
            variant="gold"
            size="lg"
            className="shine"
            rightIcon={<ArrowRight className="size-4" />}
          >
            {buttonLabel}
          </Button>
        </Reveal>
      </div>
    </Section>
  )
}
