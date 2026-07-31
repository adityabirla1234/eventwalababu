import { PageHero } from '@/components/PageHero'
import { PageCTA } from '@/components/PageCTA'
import { Seo } from '@/components/Seo'
import { Section } from '@/components/ui/Section'
import { MasonryGrid } from '@/components/gallery/MasonryGrid'
import { VideoGallery } from '@/components/gallery/VideoGallery'
import { InstagramCallout } from '@/components/gallery/InstagramCallout'

export default function Gallery() {
  return (
    <>
      <Seo
        title="Wedding Gallery — Sanawad, Barwaha & Nimad"
        description="A glimpse of the weddings and celebrations EventWalaBabu has brought to life across Sanawad, Barwaha and the Nimad region — stage productions, floral design, special effects and décor."
        path="/gallery"
      />
      <PageHero
        tone="muted"
        eyebrow="Portfolio"
        title="Gallery"
        description="A glimpse of the celebrations we've brought to life — step into the viewer for a closer look."
      />
      <Section spacing="lg">
        <MasonryGrid />
      </Section>
      <VideoGallery />
      <InstagramCallout />
      <PageCTA
        title="Your celebration could be next in the gallery."
        description="Tell us the date. We'll bring the design, the craft, and the calm."
        buttonLabel="Start Planning"
      />
    </>
  )
}
