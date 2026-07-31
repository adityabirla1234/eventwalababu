import { CONTACT } from '@/lib/navigation'
import { SEO_CONFIG } from '@/lib/seo-config'

/** Site-wide LocalBusiness/EventPlanning schema — embed once, near the app root. */
export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EventPlanningService',
    '@id': `${SEO_CONFIG.siteUrl}/#organization`,
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    logo: `${SEO_CONFIG.siteUrl}/og-image.jpg`,
    image: `${SEO_CONFIG.siteUrl}/og-image.jpg`,
    description: SEO_CONFIG.defaultDescription,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Pravin Singh Solanki Market',
      addressLocality: 'Sanawad',
      addressRegion: 'Madhya Pradesh',
      postalCode: '451111',
      addressCountry: 'IN',
    },
    // TODO: replace with the studio's exact Google Maps coordinates for Sanawad
    // (pulls the pin straight from Search/Maps rather than the postal centroid).
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 22.1608,
      longitude: 76.0872,
    },
    // Service-area keywords: keep this list aligned with the local terms the
    // business wants to rank for (Sanawad, Barwaha, Khargone/Nimad region).
    areaServed: [
      { '@type': 'City', name: 'Sanawad' },
      { '@type': 'City', name: 'Barwaha' },
      { '@type': 'City', name: 'Khargone' },
      { '@type': 'AdministrativeArea', name: 'Nimad Region, Madhya Pradesh' },
    ],
    sameAs: [CONTACT.instagram],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:00',
        closes: '19:00',
      },
    ],
    priceRange: '$$$',
  }
}

/** Per-service schema — embed on the Services page for each offering (weddings, decor, etc). */
export function buildServiceSchema(service: { name: string; description: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.name,
    name: `${service.name} | EventWalaBabu`,
    description: service.description,
    provider: { '@id': `${SEO_CONFIG.siteUrl}/#organization` },
    areaServed: ['Sanawad', 'Barwaha', 'Khargone', 'Nimad Region'],
  }
}

/** Breadcrumb schema derived from a simple label/path trail. */
export function buildBreadcrumbSchema(trail: { label: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: `${SEO_CONFIG.siteUrl}${item.path}`,
    })),
  }
}

/** FAQPage schema — pass the same question/answer items rendered by FaqAccordion. */
export function buildFaqSchema(items: readonly { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}
