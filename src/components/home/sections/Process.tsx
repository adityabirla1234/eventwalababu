import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/home/SectionHeading'
import { GoldenThread } from '@/components/home/Illustrations'
import { PROCESS_STEPS } from '@/components/home/content'

export function Process() {
  return (
    <Section spacing="lg">
      <SectionHeading
        eyebrow="How We Work"
        title="Five Movements, One Evening"
        description="A disciplined process behind every celebration that feels effortless."
        align="center"
      />

      {/* Desktop: horizontal timeline with a drawn connecting thread */}
      <div className="relative mt-16 hidden lg:block">
        <div className="pointer-events-none absolute inset-x-0 top-[42px] text-[var(--color-accent)]/50">
          <GoldenThread className="h-16 w-full" />
        </div>
        <div className="grid grid-cols-5 gap-6">
          {PROCESS_STEPS.map((step, i) => (
            <Reveal key={step.index} delay={i * 0.1} className="relative text-center">
              <div className="relative z-10 mx-auto flex size-[86px] items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-background)] font-serif text-2xl text-[var(--color-accent)]">
                {step.index}
              </div>
              <h3 className="mt-6 font-serif text-xl text-[var(--color-foreground)]">{step.title}</h3>
              <p className="mx-auto mt-2 max-w-[22ch] text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                {step.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Mobile / tablet: vertical timeline */}
      <div className="relative mt-14 space-y-10 lg:hidden">
        <div className="absolute left-[27px] top-2 bottom-2 w-px bg-[var(--color-border)]" aria-hidden="true" />
        {PROCESS_STEPS.map((step, i) => (
          <Reveal key={step.index} delay={i * 0.08} className="relative flex gap-6 pl-0">
            <div className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-background)] font-serif text-lg text-[var(--color-accent)]">
              {step.index}
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
