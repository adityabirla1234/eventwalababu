import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/motion/Reveal'
import { Marquee } from '@/components/home/Marquee'
import { OrnamentGlyph } from '@/components/home/Illustrations'
import { VENUE_CATEGORIES } from '@/components/home/content'

export function TrustedBy() {
  return (
    <Section spacing="sm" tone="default" containerSize="full" className="border-y border-[var(--color-border)]">
      <Reveal
        variant="fade"
        className="mx-auto mb-8 max-w-7xl px-5 text-center text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-muted-foreground)] sm:px-8 lg:px-12"
      >
        The Venues We&rsquo;ve Graced
      </Reveal>
      <Marquee>
        {VENUE_CATEGORIES.map((name) => (
          <span
            key={name}
            className="flex items-center gap-4 font-serif text-xl tracking-wide text-[var(--color-foreground)]/70 sm:text-2xl"
          >
            {name}
            <OrnamentGlyph className="size-3 text-[var(--color-accent)]" />
          </span>
        ))}
      </Marquee>
    </Section>
  )
}
