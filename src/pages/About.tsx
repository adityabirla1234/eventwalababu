import { PageHero } from '@/components/PageHero'
import { PageCTA } from '@/components/PageCTA'
import { Seo } from '@/components/Seo'
import { OurStory, MissionVision, Journey } from '@/components/about/sections'

export default function About() {
  return (
    <>
      <Seo
        title="About Us — Sanawad's Wedding Planning Studio"
        description="EventWalaBabu is a Sanawad-based studio of designers, decorators and choreographers serving Barwaha, Khargone and the Nimad region. Meet the founders and the standard they set."
        path="/about"
      />
      <PageHero
        tone="muted"
        eyebrow="Our Story"
        title="About EventWalaBabu"
        description="A Sanawad-based studio of designers, decorators and choreographers, serving Barwaha, Khargone and the Nimad region since 2019."
      />
      <OurStory />
      <MissionVision />
      <Journey />
      <PageCTA
        title="Ready to design your celebration?"
        description="Tell us the date. Our studio will bring the design, the craft, and the calm."
      />
    </>
  )
}
