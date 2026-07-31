import {
  Gem,
  Plane,
  LayoutTemplate,
  PartyPopper,
  Cake,
  Music4,
  Sparkles,
  Building2,
  Flower2,
  Utensils,
  Users,
} from 'lucide-react'

export const SERVICES = [
  {
    icon: Gem,
    title: 'Luxury Weddings',
    description: 'Bespoke weddings designed around your story, from first sketch to final farewell.',
    features: ['Full design & production', 'Vendor curation', 'On-site direction'],
    image: 'https://images.unsplash.com/photo-1774024051461-433f8f16faac?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
  {
    icon: Plane,
    title: 'Destination Weddings',
    description: 'Seamless celebrations anywhere in the world — logistics handled, wonder delivered.',
    features: ['End-to-end travel logistics', 'Local vendor network', 'Guest experience planning'],
    image: 'https://images.unsplash.com/photo-1727425383452-2be55354f06e?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
  {
    icon: LayoutTemplate,
    title: 'Stage Decoration',
    description: 'Statement stages built for grand moments, engineered as much as they are designed.',
    features: ['Custom set construction', 'Floral & fabric styling', 'Lighting design'],
    image: 'https://images.unsplash.com/photo-1601482441062-b9f13131f33a?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
  {
    icon: PartyPopper,
    title: 'Venue Decoration',
    description: 'Transforming spaces into experiences, tailored to the architecture you\u2019re given.',
    features: ['Full venue transformation', 'Entry & pathway design', 'Tablescape styling'],
    image: 'https://images.unsplash.com/photo-1641996250159-9d2bbfb483fa?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
  {
    icon: Cake,
    title: 'Birthday & Milestone Events',
    description: 'Milestone birthdays and anniversaries, celebrated with the same precision as our weddings.',
    features: ['Theme development', 'Entertainment curation', 'Guest favors & styling'],
    image: 'https://images.unsplash.com/photo-1727178757622-26389a0538f5?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
  {
    icon: Music4,
    title: 'Sangeet & Choreography',
    description: 'Choreographed performances and production that dazzle from the first beat.',
    features: ['Professional choreography', 'Rehearsal direction', 'Show production'],
    image: 'https://images.unsplash.com/photo-1758550445980-4d099c6de8d8?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
  {
    icon: Sparkles,
    title: 'Fireworks & Special Effects',
    description: 'Spectacular finales — cold pyro, fireworks and light, safely orchestrated.',
    features: ['Licensed pyrotechnics', 'Cold spark entries', 'Certified technicians'],
    image: 'https://images.unsplash.com/photo-1533230408708-8f9f91d1235a?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
  {
    icon: Building2,
    title: 'Corporate Events',
    description: 'Polished, on-brand experiences for launches, galas and leadership offsites.',
    features: ['Brand-led design', 'Stage & AV production', 'Guest logistics'],
    image: 'https://images.unsplash.com/photo-1745573672923-6cf4c5979dd2?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
  {
    icon: Flower2,
    title: 'Floral & Set Design',
    description: 'Fresh floral installations and set pieces, sourced and built for the moment.',
    features: ['Fresh & preserved florals', 'Installation engineering', 'Sustainable sourcing'],
    image: 'https://images.unsplash.com/photo-1611679099138-65bc8ab31945?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
  {
    icon: Utensils,
    title: 'Catering Curation',
    description: 'Menus and hospitality curated with partner chefs to match the tone of your evening.',
    features: ['Chef partner curation', 'Menu design & tasting', 'Service staff coordination'],
    image: 'https://images.unsplash.com/photo-1724847664903-ef526403bd6b?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
  {
    icon: Users,
    title: 'Family Programs',
    description: 'End-to-end coordination of every family function and ritual — planned as one seamless wedding, start to finish.',
    features: ['Full wedding, start to finish', 'Every family function coordinated', 'One planner across all events'],
    image: 'https://images.unsplash.com/photo-1505932794465-147d1f1b2c97?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
] as const

export const FLAGSHIP_SERVICES = [
  {
    eyebrow: 'Signature Offering',
    title: 'Luxury & Destination Weddings',
    description:
      'From a first design conversation to the final farewell, our lead planners run every wedding to the minute — vendors briefed to one standard, logistics handled quietly, so you experience your own day as a guest.',
    points: ['9\u201312 month design & planning runway', 'Dedicated lead planner & production team', 'Full destination logistics where required'],
    imgUrl: 'https://images.unsplash.com/photo-1587271636175-90d58cdad458?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
  {
    eyebrow: 'Signature Offering',
    title: 'Stage Production & Special Effects',
    description:
      'Our production team engineers stages the way an architect would — structurally sound, beautifully lit, and closed out with licensed pyrotechnics and choreographed light for a finale your guests will describe for years.',
    points: ['Custom stage engineering & lighting', 'Licensed pyrotechnics & cold spark', 'Certified on-site technicians'],
    imgUrl: 'https://images.unsplash.com/photo-1783298224795-97f5193eb40b?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
] as const
