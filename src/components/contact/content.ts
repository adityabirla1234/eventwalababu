import { ShieldCheck, Clock3, Globe2, HeartHandshake } from 'lucide-react'

export const CONTACT_TRUST_POINTS = [
  { icon: Clock3, label: 'Replies Within 24 Hrs', description: 'Every message reaches a real planner' },
  { icon: ShieldCheck, label: 'No Spam, Ever', description: 'Your details stay private' },
  { icon: Globe2, label: '18 Cities Served', description: 'India & select international venues' },
  { icon: HeartHandshake, label: 'Free First Consult', description: 'No obligation to book' },
] as const

export const CONTACT_FAQS = [
  {
    question: 'What is the fastest way to reach the team?',
    answer:
      'WhatsApp typically gets the quickest response, followed by a phone call during studio hours. For detailed planning requests, the inquiry form remains the most thorough option.',
  },
  {
    question: 'Can I visit the studio without an appointment?',
    answer:
      'We recommend booking ahead so a planner familiar with your event type is available to walk you through past work and available dates.',
  },
  {
    question: 'Do you take on events outside Sanawad?',
    answer:
      'Yes \u2014 while our studio is based in Sanawad, we regularly plan weddings in Barwaha, Khargone and across the Nimad region, as well as destination celebrations further afield in India and abroad.',
  },
  {
    question: 'What makes EventWalaBabu the best wedding planner in Sanawad?',
    answer:
      'We are a Sanawad-based studio, so we know the venues, vendors and logistics of Sanawad, Barwaha and the Nimad region firsthand \u2014 no outstation planner can match that. Combined with 450+ celebrations designed since 2019, that local expertise is why most of our new clients arrive through a referral.',
  },
  {
    question: 'How soon will I hear back after reaching out?',
    answer:
      'We reply to every phone call, WhatsApp message and form submission within 24 hours, usually much sooner during business hours.',
  },
] as const
