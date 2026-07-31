import { ArrowUpRight } from 'lucide-react'
import { TextParallaxContent } from '@/components/ui/text-parallax-content-scroll'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/motion/Reveal'

export function SignatureMoment() {
  return (
    <div className="bg-[var(--color-background)]">
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1744891471118-f74c0453cd21?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0"
        imgAlt="A brightly decorated outdoor event entrance welcoming guests"
        subheading="The EventWalaBabu Standard"
        heading="Where vision becomes venue."
      >
        <div className="mx-auto max-w-2xl px-5 pb-24 pt-12 text-center sm:px-8">
          <Reveal className="balance mb-8 text-lg leading-relaxed text-[var(--color-muted-foreground)] sm:text-xl">
            Every stage we build, every table we set, every cue we run is measured against the same
            standard — the one your celebration deserves. That&apos;s the thread through every
            wedding, milestone and corporate event we design.
          </Reveal>
          <Reveal delay={0.08}>
            <Button to="/services" variant="outline" size="md" rightIcon={<ArrowUpRight className="size-4" />}>
              Explore our services
            </Button>
          </Reveal>
        </div>
      </TextParallaxContent>
    </div>
  )
}
