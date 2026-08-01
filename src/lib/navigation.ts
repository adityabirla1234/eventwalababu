import type { NavItem } from '@/types'

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Inquiry', href: '/inquiry' },
  { label: 'Contact', href: '/contact' },
]

export const BRAND_NAME = 'EventWalaBabu'
export const BRAND_TAGLINE = 'Celebrations, Curated to Perfection'

export const CONTACT = {
  phone: '+91 77470 83488',
  whatsapp: '+91 77470 83488',
  whatsappDefaultMessage: "Hi EventWalaBabu, I'd like to plan an event with you.",
  email: 'eventwalababu23@gmail.com',
  instagram: 'https://instagram.com/eventwalababu',
  address: 'Sanawad, Madhya Pradesh, India',
  addressLine: 'EventWalaBabu Studio, Pravin Singh Solanki Market, Sanawad, Madhya Pradesh 451111',
  mapQuery: 'Pravin Singh Solanki Market, Sanawad, Madhya Pradesh',
  responseTime: 'Within 24 hours',
  hours: [
    { day: 'Monday – Saturday', time: '10:00 AM – 7:00 PM' },
    { day: 'Sunday', time: 'By appointment only' },
  ],
}

/** Digits-only phone number, suitable for tel:/wa.me links. */
export function toDialDigits(phone: string) {
  return phone.replace(/[^\d+]/g, '')
}

/** Builds a wa.me deep link with an optional prefilled message. */
export function buildWhatsAppLink(message: string = CONTACT.whatsappDefaultMessage) {
  const digits = toDialDigits(CONTACT.whatsapp).replace('+', '')
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}

/** No-API-key Google Maps embed URL for the studio address. */
export function buildMapEmbedSrc() {
  return `https://www.google.com/maps?q=${encodeURIComponent(CONTACT.mapQuery)}&output=embed`
}

/** Google Maps "get directions" link. */
export function buildMapDirectionsLink() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.mapQuery)}`
}
