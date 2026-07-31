import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollRestoration, ScrollToTopButton } from '@/components/layout/ScrollToTop'
import { PageTransition } from '@/components/layout/PageTransition'
import { buildOrganizationSchema } from '@/lib/structured-data'

export function AppLayout() {
  return (
    <div className="flex min-h-dvh flex-col bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(buildOrganizationSchema())}</script>
      </Helmet>

      {/* Visible-on-focus skip link for keyboard users — jumps past the nav straight to page content. */}
      <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[var(--z-toast)] focus-visible:rounded-[var(--radius-sm)] focus-visible:bg-[var(--color-primary)] focus-visible:px-4 focus-visible:py-3 focus-visible:text-sm focus-visible:font-medium focus-visible:text-[var(--color-primary-foreground)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
      >
        Skip to main content
      </a>

      <ScrollRestoration />
      <Navbar />
      <main id="main-content" className="flex-1">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  )
}
