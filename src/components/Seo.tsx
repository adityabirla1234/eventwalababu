import { Helmet } from 'react-helmet-async'
import { SEO_CONFIG } from '@/lib/seo-config'

export interface SeoProps {
  /** Page-specific title. Rendered as "<title> | EventWalaBabu". Pass a full title and set `raw` to skip the suffix. */
  title: string
  /** Skip the " | EventWalaBabu" suffix — used for the homepage, which already carries the full brand title. */
  raw?: boolean
  description: string
  /** Path only, e.g. "/about". Combined with siteUrl to build the canonical + og:url. */
  path: string
  /** Set true on error/utility pages (404) so search engines don't index them. */
  noindex?: boolean
  /** Override the default social share image (absolute or root-relative path). */
  image?: string
  /** JSON-LD structured data object(s) to embed as <script type="application/ld+json">. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

/**
 * Per-page document head manager. Sets title, meta description, canonical URL,
 * Open Graph, Twitter Card and optional JSON-LD structured data. Mount once
 * near the top of every routed page component.
 */
export function Seo({ title, raw = false, description, path, noindex = false, image, jsonLd }: SeoProps) {
  const fullTitle = raw ? title : `${title} | ${SEO_CONFIG.siteName}`
  const canonicalUrl = `${SEO_CONFIG.siteUrl}${path === '/' ? '' : path}`
  const ogImage = image
    ? image.startsWith('http')
      ? image
      : `${SEO_CONFIG.siteUrl}${image}`
    : `${SEO_CONFIG.siteUrl}${SEO_CONFIG.ogImage}`
  const jsonLdList = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SEO_CONFIG.siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={SEO_CONFIG.ogImageAlt} />
      <meta property="og:locale" content={SEO_CONFIG.locale} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SEO_CONFIG.twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLdList.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  )
}
