import { PageHero } from '@/components/PageHero'
import { Button } from '@/components/ui/Button'
import { Seo } from '@/components/Seo'

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page Not Found"
        description="The page you're looking for doesn't exist or has been moved."
        path="/404"
        noindex
      />
      <PageHero
        eyebrow="404"
        title="This Page Has Slipped Away"
        description="The page you're looking for doesn't exist or has been moved."
        showBreadcrumb={false}
      >
        <Button to="/" variant="gold" size="lg">
          Back to Home
        </Button>
      </PageHero>
    </>
  )
}
