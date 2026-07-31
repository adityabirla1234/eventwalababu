import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/home/SectionHeading'
import { AuroraText } from '@/components/ui/AuroraText'
import { GoldenThread } from '@/components/home/Illustrations'
import { Founders } from '@/components/about/Founders'
import { STORY_PARAGRAPHS } from '@/components/about/content'

export function OurStory() {
  const [lede, ...rest] = STORY_PARAGRAPHS

  return (
    <Section spacing="lg">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionHeading
            eyebrow="Our Story"
            title={<AuroraText>Six years of one obsession.</AuroraText>}
          />

          <Reveal variant="fade" delay={0.15} className="mt-10">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-accent)]">
              Founded By
            </p>
            <Founders />
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <div className="relative border-l border-[var(--color-border)] pl-8 sm:pl-10">
            <div className="pointer-events-none absolute inset-y-0 -left-px text-[var(--color-accent)]/40">
              <GoldenThread variant="vertical" className="h-full w-px" />
            </div>
            <div className="space-y-7">
              <Reveal
                variant="fade"
                className="balance font-serif text-2xl leading-snug text-[var(--color-foreground)] sm:text-3xl"
              >
                {lede}
              </Reveal>
              {rest.map((paragraph, i) => (
                <Reveal
                  key={paragraph.slice(0, 24)}
                  variant="fade"
                  delay={(i + 1) * 0.1}
                  className="balance text-base leading-relaxed text-[var(--color-muted-foreground)] sm:text-lg"
                >
                  {paragraph}
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
