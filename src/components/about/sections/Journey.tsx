import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/home/SectionHeading'
import { JOURNEY } from '@/components/about/content'

export function Journey() {
  return (
    <Section spacing="lg">
      <SectionHeading
        eyebrow="Our Journey"
        title="Milestones Along the Way"
        description="From a single wedding stage to a full studio of designers, planners and choreographers."
        align="center"
      />

      {/* Desktop: alternating vertical timeline */}
      <div className="relative mt-16 hidden lg:block">
        <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-[var(--color-border)]" aria-hidden="true" />
        <div className="space-y-2">
          {JOURNEY.map((step, i) => {
            const isLeft = i % 2 === 0
            return (
              <div key={step.year} className="relative grid grid-cols-2 items-center gap-10 py-6">
                <Reveal
                  variant="fade"
                  delay={i * 0.06}
                  className={isLeft ? 'text-right' : 'col-start-2 text-left'}
                >
                  <span className="font-serif text-sm text-[var(--color-accent)]">{step.year}</span>
                  <h3 className="mt-1 font-serif text-xl text-[var(--color-foreground)]">{step.title}</h3>
                  <p
                    className={`mt-1.5 max-w-sm text-sm leading-relaxed text-[var(--color-muted-foreground)] ${
                      isLeft ? 'ml-auto' : ''
                    }`}
                  >
                    {step.description}
                  </p>
                </Reveal>
                <span
                  className="absolute left-1/2 top-1/2 z-10 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-background)]"
                  aria-hidden="true"
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* Mobile / tablet: single-column vertical timeline */}
      <div className="relative mt-14 space-y-10 lg:hidden">
        <div className="absolute left-[27px] top-2 bottom-2 w-px bg-[var(--color-border)]" aria-hidden="true" />
        {JOURNEY.map((step, i) => (
          <Reveal key={step.year} variant="fade" delay={i * 0.06} className="relative flex gap-6">
            <div className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-background)] font-serif text-xs text-[var(--color-accent)]">
              {step.year}
            </div>
            <div className="pt-2.5">
              <h3 className="font-serif text-lg text-[var(--color-foreground)]">{step.title}</h3>
              <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                {step.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
