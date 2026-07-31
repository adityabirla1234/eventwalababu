/**
 * Site-wide SEO configuration. Centralizing these values keeps every page's
 * <Seo> call, the sitemap, and the structured data in sync.
 *
 * IMPORTANT: replace `siteUrl` with the real production domain before launch —
 * it feeds canonical URLs, Open Graph/Twitter tags, and JSON-LD.
 */
export const SEO_CONFIG = {
  siteUrl: 'https://www.eventwalababu.in',
  siteName: 'EventWalaBabu',
  defaultTitle: 'EventWalaBabu | Best Wedding Planner in Sanawad, Barwaha & Nimad',
  titleTemplate: '%s | EventWalaBabu — Sanawad',
  defaultDescription:
    'EventWalaBabu is the leading wedding planner in Sanawad, serving Barwaha, Khargone and the wider Nimad region — luxury & destination weddings, stage decoration, sangeet choreography, fireworks and corporate events.',
  ogImage: '/og-image.jpg',
  ogImageAlt: 'EventWalaBabu — Celebrations, Curated to Perfection',
  twitterHandle: '@eventwalababu',
  locale: 'en_IN',
  themeColorLight: '#fefdfb',
  themeColorDark: '#0c0a09',
} as const
