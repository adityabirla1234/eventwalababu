import { Seo } from '@/components/Seo'
import { SEO_CONFIG } from '@/lib/seo-config'
import {
  Hero,
  TrustedBy,
  AboutPreview,
  SignatureServices,
  GalleryPreview,
  WhyChooseUs,
  Process,
  Testimonials,
  InstagramPreview,
  FAQ,
  LuxuryCTA,
} from '@/components/home/sections'

export default function Home() {
  return (
    <>
      <Seo title={SEO_CONFIG.defaultTitle} raw description={SEO_CONFIG.defaultDescription} path="/" />
      <Hero />
      <TrustedBy />
      <AboutPreview />
      <SignatureServices />
      <GalleryPreview />
      <WhyChooseUs />
      <Process />
      <Testimonials />
      <InstagramPreview />
      <FAQ />
      <LuxuryCTA />
    </>
  )
}
