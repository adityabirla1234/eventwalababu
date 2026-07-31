import { ArrowUpRight } from 'lucide-react'
import { TextParallaxContent } from '@/components/ui/text-parallax-content-scroll'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/motion/Reveal'

interface Highlight {
  imgUrl: string
  imgAlt: string
  subheading: string
  heading: string
  body: string[]
  ctaLabel: string
}

const HIGHLIGHTS: Highlight[] = [
  {
    imgUrl:
      'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0',
    imgAlt: 'A gazebo set up for an outdoor destination wedding ceremony',
    subheading: 'Luxury & Destination Weddings',
    heading: 'Design that becomes memory.',
    body: [
      'From a first design conversation to the final farewell, a dedicated lead planner and production team run every wedding to the minute — vendors briefed to one standard, logistics handled quietly.',
      'A 9\u201312 month planning runway means nothing is improvised, whether the ceremony is down the road or across the world.',
    ],
    ctaLabel: 'Plan your wedding',
  },
  {
    imgUrl:
      'https://images.unsplash.com/photo-1745573674206-1d4805fcc427?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0',
    imgAlt: 'A dramatically decorated wedding stage ready for a performance',
    subheading: 'Stage Production & Special Effects',
    heading: 'Engineered for the moment.',
    body: [
      'Our production team builds stages the way an architect would — structurally sound, beautifully lit, and closed out with licensed pyrotechnics and choreographed light.',
      'Certified technicians run every cue on-site, so the finale lands exactly as designed.',
    ],
    ctaLabel: 'Explore stage production',
  },
  {
    imgUrl:
      'https://images.unsplash.com/photo-1745573672923-6cf4c5979dd2?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0',
    imgAlt: 'A polished, professionally decorated event stage set for guests',
    subheading: 'Corporate Events',
    heading: 'On-brand, down to the second.',
    body: [
      'Launches, galas and leadership offsites get the same production discipline as our weddings — brand-led design, stage & AV handled in-house, guest logistics mapped in advance.',
      'A single point of contact keeps every vendor moving to one run sheet.',
    ],
    ctaLabel: 'Talk to us about your event',
  },
]

export function ServiceHighlights() {
  return (
    <div className="bg-[var(--color-background)]">
      {HIGHLIGHTS.map((item) => (
        <TextParallaxContent
          key={item.subheading}
          imgUrl={item.imgUrl}
          imgAlt={item.imgAlt}
          subheading={item.subheading}
          heading={item.heading}
        >
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-5 pb-24 pt-12 sm:px-8 md:grid-cols-12 lg:px-0">
            <Reveal as="h3" className="col-span-1 font-serif text-2xl font-semibold sm:text-3xl md:col-span-4">
              {item.heading}
            </Reveal>
            <div className="col-span-1 md:col-span-8">
              {item.body.map((paragraph, i) => (
                <Reveal
                  key={paragraph.slice(0, 24)}
                  delay={i * 0.08}
                  className="balance mb-4 text-lg leading-relaxed text-[var(--color-muted-foreground)] last:mb-8 sm:text-xl"
                >
                  {paragraph}
                </Reveal>
              ))}
              <Reveal delay={0.16}>
                <Button to="/inquiry" variant="outline" size="md" rightIcon={<ArrowUpRight className="size-4" />}>
                  {item.ctaLabel}
                </Button>
              </Reveal>
            </div>
          </div>
        </TextParallaxContent>
      ))}
    </div>
  )
}
