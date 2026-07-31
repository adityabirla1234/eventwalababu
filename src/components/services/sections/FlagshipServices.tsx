import { ArrowRight, Check } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/motion/Reveal'
import { Button } from '@/components/ui/Button'
import { FLAGSHIP_SERVICES } from '@/components/services/content'

export function FlagshipServices() {
  return (
    <Section spacing="lg" tone="muted" className="space-y-24 sm:space-y-32">
      {FLAGSHIP_SERVICES.map((service, i) => {
        const reversed = i % 2 === 1
        return (
          <div
            key={service.title}
            className={`grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 ${
              reversed ? 'lg:[&>*:first-child]:order-2' : ''
            }`}
          >
            <Reveal variant="scale" className="relative">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] shadow-lg shadow-black/10 sm:aspect-square">
                <img
                  src={service.imgUrl}
                  alt={service.title}
                  loading="lazy"
                  className="size-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-onyx-950)]/50 via-transparent to-transparent" />
              </div>
              {/* Gold corner accent — keeps the frame feeling designed, not just a stock photo drop-in */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-4 -right-4 -z-10 h-2/3 w-2/3 rounded-[var(--radius-xl)] border border-[var(--color-accent)]/30"
              />
            </Reveal>

            <div>
              <Reveal
                variant="fade"
                className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-accent)]"
              >
                {service.eyebrow}
              </Reveal>
              <Reveal
                as="h3"
                delay={0.05}
                className="balance font-serif text-3xl font-semibold leading-tight text-[var(--color-foreground)] sm:text-4xl"
              >
                {service.title}
              </Reveal>
              <Reveal
                delay={0.1}
                className="balance mt-5 max-w-lg text-base leading-relaxed text-[var(--color-muted-foreground)] sm:text-lg"
              >
                {service.description}
              </Reveal>
              <ul className="mt-6 space-y-2.5">
                {service.points.map((point, j) => (
                  <Reveal
                    key={point}
                    delay={0.15 + j * 0.06}
                    className="flex items-start gap-2.5 text-sm text-[var(--color-foreground)] sm:text-base"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
                    <span>{point}</span>
                  </Reveal>
                ))}
              </ul>
              <Reveal delay={0.3} className="mt-8">
                <Button to="/inquiry" variant="outline" size="md" rightIcon={<ArrowRight className="size-4" />}>
                  Inquire About This Service
                </Button>
              </Reveal>
            </div>
          </div>
        )
      })}
    </Section>
  )
}
