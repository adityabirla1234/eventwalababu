import { ArrowUpRight } from 'lucide-react'
import { TextParallaxContent } from '@/components/ui/text-parallax-content-scroll'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/motion/Reveal'

interface Pillar {
  imgUrl: string
  imgAlt: string
  subheading: string
  heading: string
  body: string[]
  ctaLabel: string
}

const PILLARS: Pillar[] = [
  {
    imgUrl:
      'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0',
    imgAlt: 'Guests standing beneath a gold and white floral mandap ceiling',
    subheading: 'Design',
    heading: 'Built around your story.',
    body: [
      'Every celebration begins on a blank page. We spend as long on the planning table as we do on the ballroom floor — mapping the shape of your event before a single flower is ordered.',
      'Moodboards, floor plans and material studies come before anything gets built, so the day itself never feels improvised.',
    ],
    ctaLabel: 'See our process',
  },
  {
    imgUrl:
      'https://images.unsplash.com/photo-1745573673583-a51f665ae48e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0',
    imgAlt: 'A wedding stage finished with detailed floral drapery',
    subheading: 'Craft',
    heading: 'Never compromise.',
    body: [
      'The details most guests never consciously notice are the ones we obsess over most — stitched linens, hand-set florals, lighting balanced to the millimetre.',
      'Our in-house production team builds and finishes on-site, so what you approved in the mockup is exactly what arrives on the day.',
    ],
    ctaLabel: 'View our craft',
  },
  {
    imgUrl:
      'https://images.unsplash.com/photo-1698934641149-93431f3bd4f7?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0',
    imgAlt: 'An elegant banquet hall set with tables, chairs and chandeliers',
    subheading: 'Precision',
    heading: 'Calm, by design.',
    body: [
      'A wedding runs on hundreds of small handoffs — vendor arrivals, cue timings, quiet fixes nobody sees. Our planners track every one against a minute-by-minute production schedule.',
      "That's what lets you actually be present on the day, instead of managing it.",
    ],
    ctaLabel: 'Meet the studio',
  },
]

export function Pillars() {
  return (
    <div className="bg-[var(--color-background)]">
      {PILLARS.map((pillar) => (
        <TextParallaxContent
          key={pillar.subheading}
          imgUrl={pillar.imgUrl}
          imgAlt={pillar.imgAlt}
          subheading={pillar.subheading}
          heading={pillar.heading}
        >
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-5 pb-24 pt-12 sm:px-8 md:grid-cols-12 lg:px-0">
            <Reveal as="h3" className="col-span-1 font-serif text-2xl font-semibold sm:text-3xl md:col-span-4">
              {pillar.heading}
            </Reveal>
            <div className="col-span-1 md:col-span-8">
              {pillar.body.map((paragraph, i) => (
                <Reveal
                  key={paragraph.slice(0, 24)}
                  delay={i * 0.08}
                  className="balance mb-4 text-lg leading-relaxed text-[var(--color-muted-foreground)] last:mb-8 sm:text-xl"
                >
                  {paragraph}
                </Reveal>
              ))}
              <Reveal delay={0.16}>
                <Button to="/services" variant="outline" size="md" rightIcon={<ArrowUpRight className="size-4" />}>
                  {pillar.ctaLabel}
                </Button>
              </Reveal>
            </div>
          </div>
        </TextParallaxContent>
      ))}
    </div>
  )
}
