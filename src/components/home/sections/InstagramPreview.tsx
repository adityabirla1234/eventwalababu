import { AtSign, ArrowUpRight } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/home/SectionHeading'
import { INSTAGRAM_TILES } from '@/components/home/content'
import { CONTACT } from '@/lib/navigation'
import { OrnamentGlyph } from '@/components/home/Illustrations'

const TILT = [-3, 2, -2, 3, -2.5, 2.5]

export function InstagramPreview() {
  return (
    <Section spacing="lg">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading
          eyebrow="Follow Along"
          title="The Moodboard"
          description="A running visual diary of stages, tablescapes and finales, posted as we build them."
        />
        <Reveal delay={0.15}>
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 border-b border-[var(--color-accent)] pb-1 font-serif text-lg text-[var(--color-foreground)] transition-colors hover:text-[var(--color-accent)]"
          >
            <AtSign className="size-4" /> eventwalababu
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
        {INSTAGRAM_TILES.map((tile, i) => (
          <Reveal key={tile.label} variant="scale" delay={i * 0.06}>
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noreferrer"
              style={{ transform: `rotate(${TILT[i % TILT.length]}deg)` }}
              className="group relative flex aspect-square flex-col justify-end overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] p-4 text-left shadow-sm transition-all duration-500 hover:z-10 hover:scale-105 hover:rotate-0 hover:shadow-xl hover:shadow-black/10"
            >
              <img
                src={tile.imgUrl}
                alt={tile.label}
                loading="lazy"
                className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-onyx-950)]/85 via-[var(--color-onyx-950)]/10 to-transparent" />
              <OrnamentGlyph className="relative mb-1 size-4 text-[var(--color-gold-300)] opacity-80 transition-opacity group-hover:opacity-100" />
              <p className="relative font-serif text-xs leading-tight text-white sm:text-sm">
                {tile.label}
              </p>
              <p className="relative text-[10px] text-white/60">{tile.tag}</p>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
