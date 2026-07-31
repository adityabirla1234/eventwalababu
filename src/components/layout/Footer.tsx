import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/layout/Logo'
import { InstagramIcon } from '@/components/icons/InstagramIcon'
import { NAV_ITEMS, BRAND_TAGLINE, CONTACT } from '@/lib/navigation'

const SERVICES = [
  'Luxury Weddings',
  'Destination Weddings',
  'Stage Decoration',
  'Venue Decoration',
  'Sangeet & Choreography',
  'Fireworks & Special Effects',
  'Corporate Events',
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface-inverse)] text-[var(--color-surface-inverse-foreground)]">
      <Container size="lg" className="grid gap-12 py-16 sm:py-20 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Logo className="h-9 sm:h-10" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">{BRAND_TAGLINE}</p>
          <div className="mt-6 flex gap-3">
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="EventWalaBabu on Instagram"
              className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-[var(--color-gold-400)] hover:text-[var(--color-gold-400)]"
            >
              <InstagramIcon className="size-4" />
            </a>
          </div>
        </div>

        <nav aria-label="Footer navigation">
          <h3 className="mb-4 font-serif text-sm font-semibold uppercase tracking-widest text-white/50">
            Navigate
          </h3>
          <ul className="space-y-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="group relative inline-block text-sm text-white/70 transition-colors hover:text-[var(--color-gold-400)]"
                >
                  {item.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[var(--color-gold-400)] transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="mb-4 font-serif text-sm font-semibold uppercase tracking-widest text-white/50">
            Services
          </h3>
          <ul className="space-y-3">
            {SERVICES.map((service) => (
              <li key={service} className="text-sm text-white/70">
                {service}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-serif text-sm font-semibold uppercase tracking-widest text-white/50">
            Get in Touch
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-sm text-white/70">
              <Phone className="mt-0.5 size-4 shrink-0 text-[var(--color-gold-400)]" aria-hidden="true" />
              <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="hover:text-[var(--color-gold-400)]">
                {CONTACT.phone}
              </a>
            </li>
            <li className="flex items-start gap-3 text-sm text-white/70">
              <Mail className="mt-0.5 size-4 shrink-0 text-[var(--color-gold-400)]" aria-hidden="true" />
              <a href={`mailto:${CONTACT.email}`} className="hover:text-[var(--color-gold-400)]">
                {CONTACT.email}
              </a>
            </li>
            <li className="flex items-start gap-3 text-sm text-white/70">
              <MapPin className="mt-0.5 size-4 shrink-0 text-[var(--color-gold-400)]" aria-hidden="true" />
              <span>{CONTACT.address}</span>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container size="lg" className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/50 sm:flex-row">
          <p>&copy; {year} EventWalaBabu. All rights reserved.</p>
          <p>Crafted with care for celebrations that last a lifetime.</p>
        </Container>
      </div>
    </footer>
  )
}
