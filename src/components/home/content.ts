import {
  Gem,
  Plane,
  LayoutTemplate,
  PartyPopper,
  Cake,
  Music4,
  Sparkles,
  Building2,
} from 'lucide-react'

export const SIGNATURE_SERVICES = [
  {
    index: 'I',
    icon: Gem,
    title: 'Luxury Weddings',
    description: 'Bespoke weddings designed around your story, from first sketch to final farewell.',
    href: '/services',
    imgUrl: 'https://images.unsplash.com/photo-1587271636175-90d58cdad458?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
  {
    index: 'II',
    icon: Plane,
    title: 'Destination Weddings',
    description: 'Seamless celebrations anywhere in the world — logistics handled, wonder delivered.',
    href: '/services',
    imgUrl: 'https://images.unsplash.com/photo-1526092817387-8f07b2904e48?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
  {
    index: 'III',
    icon: LayoutTemplate,
    title: 'Stage & Venue Decor',
    description: 'Statement stages and transformed spaces, built for the moments that matter.',
    href: '/services',
    imgUrl: 'https://images.unsplash.com/photo-1745573673583-a51f665ae48e?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
  {
    index: 'IV',
    icon: PartyPopper,
    title: 'Sangeet & Choreography',
    description: 'Choreographed performances and production that dazzle from the first beat.',
    href: '/services',
    imgUrl: 'https://images.unsplash.com/photo-1745573674206-1d4805fcc427?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
  {
    index: 'V',
    icon: Cake,
    title: 'Milestone Celebrations',
    description: 'Birthdays and anniversaries, celebrated with the same precision as our weddings.',
    href: '/services',
    imgUrl: 'https://images.unsplash.com/photo-1744891471118-f74c0453cd21?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
  {
    index: 'VI',
    icon: Sparkles,
    title: 'Fireworks & Special Effects',
    description: 'Spectacular finales — cold pyro, fireworks and light, safely orchestrated.',
    href: '/services',
    imgUrl: 'https://images.unsplash.com/photo-1783298224795-97f5193eb40b?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
  {
    index: 'VII',
    icon: Building2,
    title: 'Corporate Events',
    description: 'Polished, on-brand experiences for launches, galas and leadership offsites.',
    href: '/services',
    imgUrl: 'https://images.unsplash.com/photo-1745573672923-6cf4c5979dd2?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
  {
    index: 'VIII',
    icon: Music4,
    title: 'Entertainment Curation',
    description: 'Artists, musicians and performers curated to match the tone of your evening.',
    href: '/services',
    imgUrl: 'https://images.unsplash.com/photo-1698934641149-93431f3bd4f7?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
] as const

export const VENUE_CATEGORIES = [
  'Heritage Palaces',
  'Five-Star Resorts',
  'Private Estates',
  'Destination Villas',
  'Royal Havelis',
  'Beachfront Resorts',
  'Rooftop Venues',
  'Garden Estates',
] as const

export const PROCESS_STEPS = [
  {
    index: '01',
    title: 'Discover',
    description: 'A candid first conversation — your story, your people, your vision for the day.',
  },
  {
    index: '02',
    title: 'Design',
    description: 'Mood boards, palettes and spatial concepts, refined until they feel unmistakably yours.',
  },
  {
    index: '03',
    title: 'Curate',
    description: 'Vendors, artisans and performers hand-selected and briefed to a single standard.',
  },
  {
    index: '04',
    title: 'Execute',
    description: 'On-site production and choreography, run to the minute by our lead planners.',
  },
  {
    index: '05',
    title: 'Celebrate',
    description: 'You arrive as a guest at your own event. We handle everything else, quietly.',
  },
] as const

export const WHY_CHOOSE_US = [
  { value: 6, suffix: '+', label: 'Years of Craft', description: 'Refining the art of the celebration since 2019.' },
  { value: 450, suffix: '+', label: 'Celebrations Designed', description: 'Weddings, galas and milestones brought to life.' },
  { value: 18, suffix: '', label: 'Cities Served', description: 'Across India and select destinations abroad.' },
  { value: 98, suffix: '%', label: 'Referred by Past Clients', description: 'Most new stories arrive through a trusted introduction.' },
] as const

export const TESTIMONIALS = [
  {
    quote:
      "EventWalaBabu didn't just decorate our wedding — they understood our families before they touched a single flower. Every evening felt considered, right down to the light.",
    name: 'Ananya & Rohan',
    role: 'Destination Wedding, Udaipur',
  },
  {
    quote:
      'We hired them for a 400-person corporate gala with three weeks notice. What we got looked like it had been planned for a year.',
    name: 'Vikram Sethi',
    role: 'CEO, Sethi Industries',
  },
  {
    quote:
      'The sangeet stage alone was worth the entire budget. Guests are still asking who designed it.',
    name: 'Meera Kapoor',
    role: 'Mother of the Bride, Indore',
  },
  {
    quote:
      'Calm, exacting, and quietly brilliant under pressure. That is the highest compliment I can give an events team.',
    name: 'Farah Ali',
    role: 'Event Producer, Mumbai',
  },
] as const

export const FAQS = [
  {
    question: 'How far in advance should we book EventWalaBabu?',
    answer:
      'For weddings, we recommend 9–12 months ahead to secure premier venues and our full design team. For corporate and milestone events, 6–8 weeks is typically enough — though we have delivered in three.',
  },
  {
    question: 'Do you work outside India?',
    answer:
      'Yes. Destination weddings are one of our signature services — our team has produced celebrations across Southeast Asia, the Gulf and Europe, handling logistics end to end.',
  },
  {
    question: 'Can you work within an existing venue or vendor list?',
    answer:
      'Absolutely. Some clients come to us for full-service planning, others want our design and stage direction layered onto vendors they already trust. We adapt to either.',
  },
  {
    question: 'What is included in the fireworks and special effects service?',
    answer:
      'Licensed pyrotechnics, cold spark entries, choreographed light and — where permitted — aerial fireworks, all coordinated with your venue\u2019s safety requirements and run by certified technicians.',
  },
  {
    question: 'How do we start the conversation?',
    answer:
      'Share a few details through our inquiry form and a lead planner will respond within 48 hours to schedule your first design conversation.',
  },
] as const

export const INSTAGRAM_TILES = [
  {
    label: 'Mandap Design',
    tag: '#EventWalaBabu',
    imgUrl: 'https://images.unsplash.com/photo-1587271636175-90d58cdad458?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
  {
    label: 'Sangeet Night',
    tag: '#CelebrationsCurated',
    imgUrl: 'https://images.unsplash.com/photo-1745573673583-a51f665ae48e?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
  {
    label: 'Fireworks Finale',
    tag: '#EventWalaBabu',
    imgUrl: 'https://images.unsplash.com/photo-1783298224795-97f5193eb40b?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
  {
    label: 'Reception Décor',
    tag: '#TheGoldenThread',
    imgUrl: 'https://images.unsplash.com/photo-1526092817387-8f07b2904e48?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
  {
    label: 'Destination Vows',
    tag: '#EventWalaBabu',
    imgUrl: 'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
  {
    label: 'Corporate Gala',
    tag: '#CelebrationsCurated',
    imgUrl: 'https://images.unsplash.com/photo-1745573672923-6cf4c5979dd2?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
] as const
