import { PageHero } from '@/components/PageHero'
import { PageCTA } from '@/components/PageCTA'
import { Seo } from '@/components/Seo'
import { ServiceCards, FlagshipServices } from '@/components/services/sections'
import { SERVICES } from '@/components/services/content'
import { buildServiceSchema } from '@/lib/structured-data'

const SERVICES_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: SERVICES.map((service, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: buildServiceSchema({ name: service.title, description: service.description }),
  })),
}

export default function Services() {
  return (
    <>
      <Seo
        title="Wedding Planner in Sanawad — Services"
        description="Wedding planning services in Sanawad, Barwaha and the Nimad region: luxury & destination weddings, stage decoration, sangeet choreography, fireworks and corporate events."
        path="/services"
        jsonLd={SERVICES_JSON_LD}
      />
      <PageHero
        tone="muted"
        eyebrow="Serving Sanawad, Barwaha & Nimad"
        title="Our Services"
        description="A full studio of celebration craft — design, production and choreography, run to a single standard, for clients across Sanawad, Barwaha, Khargone and the Nimad region."
      />
      <ServiceCards />
      <FlagshipServices />
      <PageCTA
        title="Ready to design your celebration?"
        description="Share your vision and a lead planner will respond within 48 hours."
        buttonLabel="Start Planning"
      />
    </>
  )
}
