import { useState, useEffect, useMemo } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Home, Users, Sparkles, Palette, CalendarCheck, Phone } from 'lucide-react'
import { Logo } from '@/components/layout/Logo'
import { Button } from '@/components/ui/Button'
import { MenuBar, type GlowMenuItem } from '@/components/ui/glow-menu'
import { NAV_ITEMS } from '@/lib/navigation'
import { useScrollPosition } from '@/hooks/use-scroll-position'
import { cn } from '@/lib/utils'
import { EASE_OUT } from '@/lib/motion'

// One icon per route, in `NAV_ITEMS` order (Home, About, Services, Gallery, Inquiry, Contact).
const NAV_ICONS = [Home, Users, Sparkles, Palette, CalendarCheck, Phone]

// Every item shares the same warm gold treatment on purpose — one accent, one
// "unwavering standard," consistent with the brand voice used across the site
// rather than a multi-hued rainbow glow.
const GOLD_GLOW =
  'radial-gradient(circle, rgb(226 175 56 / 20%) 0%, rgb(204 148 32 / 9%) 50%, rgb(124 76 14 / 0%) 100%)'

const GLOW_NAV_ITEMS: GlowMenuItem[] = NAV_ITEMS.map((item, i) => ({
  label: item.label,
  href: item.href,
  icon: NAV_ICONS[i] ?? Home,
  gradient: GOLD_GLOW,
  iconColor: 'text-[var(--color-accent)]',
}))

// Pages whose hero renders on a white background (see each page's
// `<PageHero tone="muted" />`, and InquiryHero which uses the same tone).
// The navbar's logo/links are styled for a dark backdrop (they read the
// site's root `--color-foreground`, not a section-scoped one, since the
// fixed header sits outside the page's Section tree). Left
// transparent-until-scroll on these routes, that light text would sit
// directly on white and become nearly illegible — so the nav stays solid
// from the start on these routes instead of only after scrolling.
const LIGHT_HERO_ROUTES = new Set(['/about', '/services', '/gallery', '/inquiry'])

/** Mirrors `NavLink`'s `end` matching: exact match for "/", prefix match otherwise. */
function isRouteActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const scrolled = useScrollPosition(16)
  const location = useLocation()
  const navigate = useNavigate()
  const solidNav = scrolled || isOpen || LIGHT_HERO_ROUTES.has(location.pathname)

  const activeLabel = useMemo(
    () => GLOW_NAV_ITEMS.find((item) => isRouteActive(location.pathname, item.href))?.label,
    [location.pathname],
  )

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <header
      // `translateZ(0)` + `will-change` promote the fixed header to its own
      // GPU compositing layer, independent of the page's other animated
      // elements (the About/Services cards sliding/rotating in on scroll).
      // Without this, some mobile browsers (seen on Android Chrome) can
      // visually shift or hide a `position: fixed` element while a sibling
      // layer elsewhere on the page is being created/resized mid-animation
      // — the header itself never actually moves in the DOM, but appears to
      // during the arrival animation and "snaps back" once it settles.
      style={{ transform: 'translateZ(0)', willChange: 'transform' }}
      className={cn(
        'fixed inset-x-0 top-0 z-[var(--z-sticky)] transition-all duration-[var(--duration-base)] ease-[var(--ease-out-soft)]',
        solidNav
          ? 'bg-[var(--color-background)] border-b border-[var(--color-border)] shadow-sm'
          : 'bg-transparent',
      )}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12" aria-label="Primary">
        <Logo />

        {/* Desktop nav — solid pill with per-item flip + gold glow */}
        <div className="hidden xl:flex">
          <MenuBar
            items={GLOW_NAV_ITEMS}
            activeItem={activeLabel}
            onItemClick={(item) => navigate(item.href)}
          />
        </div>

        <div className="hidden items-center gap-3 xl:flex">
          <Button to="/inquiry" variant="gold" size="sm">
            Plan Your Event
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 xl:hidden">
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="flex size-10 items-center justify-center rounded-full text-[var(--color-foreground)]"
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-background)] xl:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-6 sm:px-8">
              {NAV_ITEMS.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.05, ease: EASE_OUT }}
                >
                  <NavLink
                    to={item.href}
                    end={item.href === '/'}
                    className={({ isActive }) =>
                      cn(
                        'block rounded-md px-3 py-3 text-base font-medium text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-muted)]',
                        isActive && 'text-[var(--color-accent)]',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.li>
              ))}
              <li className="mt-3 px-3">
                <Button to="/inquiry" variant="gold" size="md" className="w-full">
                  Plan Your Event
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
