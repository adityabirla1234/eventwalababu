import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/motion/Reveal'
import { CompassMotif, LaurelMotif, OrnamentGlyph } from '@/components/home/Illustrations'
import { MISSION, VISION, VALUES } from '@/components/about/content'

const PANELS = [
  { ...MISSION, Motif: LaurelMotif, index: '01', reveal: 'left' as const, delay: 0 },
  { ...VISION, Motif: CompassMotif, index: '02', reveal: 'right' as const, delay: 0.12 },
]

/** Alternating entrance direction so the row reads as a left/right rhythm rather than a uniform block. */
const VALUE_REVEALS = ['left', 'right', 'left'] as const

export function MissionVision() {
  return (
    <Section spacing="lg" tone="muted">
      <div className="grid grid-cols-1 gap-8 overflow-x-hidden lg:grid-cols-2 lg:gap-10">
        {PANELS.map((panel) => (
          <Reveal
            key={panel.eyebrow}
            variant={panel.reveal}
            delay={panel.delay}
            className="group relative flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-card)] p-8 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--color-accent)]/50 hover:shadow-xl hover:shadow-black/10 sm:p-10"
          >
            {/* Ambient corner wash — grows subtly on hover */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-[var(--color-accent)]/10 blur-3xl transition-transform duration-700 ease-out group-hover:scale-125"
            />

            <div className="relative flex items-start justify-between">
              <div className="flex size-16 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)] transition-transform duration-500 ease-out group-hover:scale-105">
                <panel.Motif className="h-9 w-9" />
              </div>
              <span
                aria-hidden="true"
                className="font-serif text-4xl font-semibold text-[var(--color-border)] transition-colors duration-500 group-hover:text-[var(--color-accent)]/30"
              >
                {panel.index}
              </span>
            </div>

            <span className="relative mt-7 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-accent)]">
              {panel.eyebrow}
            </span>
            <h3 className="balance relative mt-3 font-serif text-2xl font-semibold leading-tight text-[var(--color-foreground)] sm:text-3xl">
              {panel.title}
            </h3>
            <p className="balance relative mt-4 max-w-md text-sm leading-relaxed text-[var(--color-muted-foreground)] sm:text-base">
              {panel.description}
            </p>

            <div
              aria-hidden="true"
              className="relative mt-6 h-px w-12 bg-[var(--color-accent)] transition-all duration-500 ease-out group-hover:w-20"
            />
          </Reveal>
        ))}
      </div>

      <div className="mt-14 grid grid-cols-1 gap-4 overflow-x-hidden sm:grid-cols-3">
        {VALUES.map((value, i) => (
          <Reveal
            key={value.label}
            variant={VALUE_REVEALS[i % VALUE_REVEALS.length]}
            delay={0.08 * i}
            className="group flex flex-col items-start gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-card)] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--color-accent)]/40 hover:shadow-lg hover:shadow-black/5"
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)] transition-transform duration-500 ease-out group-hover:scale-110">
              <OrnamentGlyph className="size-4" />
            </span>
            <p className="font-serif text-lg text-[var(--color-foreground)]">{value.label}</p>
            <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">{value.description}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
