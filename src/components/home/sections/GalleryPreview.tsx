import { Link } from 'react-router-dom'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/home/SectionHeading'
import { Button } from '@/components/ui/Button'
import {
  ContainerScroll,
  ContainerSticky,
  GalleryContainer,
  GalleryCol,
} from '@/components/ui/AnimatedGallery'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

/** Three curated columns of real photography — each column parallaxes at its own rate as the gallery pins on scroll. */
const COLUMN_1 = [
  'https://ik.imagekit.io/dwze584zkp/EventWalaBabu/Photos/IMG-20260730-WA0010.jpg?updatedAt=1785477263681',
  'https://ik.imagekit.io/dwze584zkp/EventWalaBabu/Photos/IMG-20260730-WA0008.jpg?updatedAt=1785477262996',
  'https://images.unsplash.com/photo-1661142175513-a5f0871f1ad1?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0',
  'https://images.unsplash.com/photo-1601482441062-b9f13131f33a?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0',
]
const COLUMN_2 = [
  'https://ik.imagekit.io/dwze584zkp/EventWalaBabu/Photos/IMG-20260730-WA0006.jpg?updatedAt=1785477262496',
  'https://images.unsplash.com/photo-1745573674206-1d4805fcc427?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0',
  'https://images.unsplash.com/photo-1549194400-06e6874c2fd1?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0',
  'https://images.unsplash.com/photo-1744891471118-f74c0453cd21?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0',
]
const COLUMN_3 = [
  'https://ik.imagekit.io/dwze584zkp/EventWalaBabu/Photos/IMG-20260730-WA0004.jpg?updatedAt=1785477262841',
  'https://ik.imagekit.io/dwze584zkp/EventWalaBabu/Photos/IMG-20260730-WA0007.jpg?updatedAt=1785477263633',
  'https://images.unsplash.com/photo-1518165307141-a4651f36952a?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0',
  'https://images.unsplash.com/photo-1745573672923-6cf4c5979dd2?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0',
]
const ALL_IMAGES = [...COLUMN_1, ...COLUMN_2, ...COLUMN_3]

function GalleryImg({ src, index }: { src: string; index: number }) {
  return (
    <img
      src={src}
      alt="A moment from an EventWalaBabu celebration"
      loading={index < 3 ? 'eager' : 'lazy'}
      decoding="async"
      className="block aspect-[3/4] h-auto max-h-full w-full rounded-lg object-cover shadow-lg shadow-black/10 ring-1 ring-[var(--color-border)] sm:rounded-xl"
    />
  )
}

/** The pinned, 3D-perspective parallax gallery — used on every device (phone, tablet, laptop) when motion is allowed. */
function ScrollGallery() {
  return (
    <ContainerScroll className="h-[220vh]">
      <ContainerSticky className="flex h-[82vh] items-center">
        <GalleryContainer>
          <GalleryCol yRange={['-8%', '2%']} className="-mt-6">
            {COLUMN_1.map((src, i) => (
              <GalleryImg key={src} src={src} index={i} />
            ))}
          </GalleryCol>
          <GalleryCol yRange={['10%', '-2%']} className="mt-16">
            {COLUMN_2.map((src, i) => (
              <GalleryImg key={src} src={src} index={i + 4} />
            ))}
          </GalleryCol>
          <GalleryCol yRange={['-8%', '2%']} className="-mt-6">
            {COLUMN_3.map((src, i) => (
              <GalleryImg key={src} src={src} index={i + 8} />
            ))}
          </GalleryCol>
        </GalleryContainer>
      </ContainerSticky>
    </ContainerScroll>
  )
}

/**
 * Accessibility fallback — shown only when the user has requested reduced motion,
 * on any device. Each tile animates in as it's scrolled into view (not on a timer),
 * so nothing moves on its own; under reduced motion the shared Reveal component
 * renders statically with no animation at all.
 */
function GalleryFallback() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
      {ALL_IMAGES.slice(0, 9).map((src, i) => (
        <Reveal
          key={src}
          variant="scale"
          delay={(i % 3) * 0.08}
          amount={0.35}
          className={i === 0 ? 'col-span-2 sm:col-span-1' : undefined}
        >
          <img
            src={src}
            alt="A moment from an EventWalaBabu celebration"
            loading={i < 3 ? 'eager' : 'lazy'}
            decoding="async"
            className="aspect-[3/4] w-full rounded-lg object-cover shadow-md shadow-black/10 ring-1 ring-[var(--color-border)] sm:rounded-xl"
          />
        </Reveal>
      ))}
    </div>
  )
}

export function GalleryPreview() {
  const reducedMotion = useReducedMotion()

  return (
    <Section spacing="lg" className="relative">
      {/* Ambient brand-toned glow behind the gallery — replaces the generic gray/purple blur from the source demo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[60vh] opacity-30 dark:opacity-20"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 0%, var(--color-gold-300) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />

      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading
          eyebrow="Portfolio"
          title="A Glimpse of the Work"
          description="Every celebration is a composition of details. Here is a small selection of the full body of work."
        />
        <Reveal delay={0.15} className="shrink-0">
          <Button to="/gallery" variant="outline" size="md">
            View Full Gallery
          </Button>
        </Reveal>
      </div>

      <div className="mt-12 sm:mt-14">
        {reducedMotion ? <GalleryFallback /> : <ScrollGallery />}
      </div>

      {!reducedMotion && (
        <div className="mt-6 flex justify-center">
          <Link
            to="/gallery"
            className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-accent)]"
          >
            Explore the full portfolio &rarr;
          </Link>
        </div>
      )}
    </Section>
  )
}
