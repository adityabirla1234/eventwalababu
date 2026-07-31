import {
  Gem,
  Plane,
  LayoutTemplate,
  Building2,
  PartyPopper,
  Music4,
  Sparkles,
  Briefcase,
  ShieldCheck,
  Clock,
  Users,
  Award,
} from 'lucide-react'

export const EVENT_TYPE_ICONS: Record<string, typeof Gem> = {
  'luxury-wedding': Gem,
  'destination-wedding': Plane,
  'stage-decoration': LayoutTemplate,
  'venue-decoration': Building2,
  birthday: PartyPopper,
  'sangeet-choreography': Music4,
  'fireworks-effects': Sparkles,
  corporate: Briefcase,
}

export const INQUIRY_TRUST_POINTS = [
  { icon: ShieldCheck, label: '100% Confidential', description: 'Your plans stay between us' },
  { icon: Clock, label: 'Response Within 24 Hrs', description: 'A lead planner, not a bot' },
  { icon: Users, label: '450+ Celebrations', description: 'Delivered across 18 cities' },
  { icon: Award, label: 'Certified Specialists', description: 'Licensed pyrotechnics & crew' },
] as const

export const INQUIRY_FAQS = [
  {
    question: 'What happens right after I submit this form?',
    answer:
      'A lead planner reviews your details personally and reaches out within 24 hours through your preferred contact method to schedule a discovery call.',
  },
  {
    question: 'Is this consultation free?',
    answer:
      'Yes. The first conversation — understanding your vision, date and budget — is complimentary and carries no obligation to book.',
  },
  {
    question: 'I don\u2019t have exact numbers yet — can I still submit?',
    answer:
      'Absolutely. Approximate guest counts and budget ranges are enough to start; we\u2019ll refine everything together on the call.',
  },
  {
    question: 'Will my information be shared with third parties?',
    answer:
      'Never. Details you share are used solely by our planning team to prepare your consultation and are not sold or shared externally.',
  },
] as const
