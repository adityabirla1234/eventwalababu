import { z } from 'zod'

/* ---------------------------------------------------------------------- */
/*  Option data                                                            */
/* ---------------------------------------------------------------------- */

export const EVENT_TYPE_OPTIONS = [
  { label: 'Luxury Wedding', value: 'luxury-wedding' },
  { label: 'Destination Wedding', value: 'destination-wedding' },
  { label: 'Stage Decoration', value: 'stage-decoration' },
  { label: 'Venue Decoration', value: 'venue-decoration' },
  { label: 'Birthday Event', value: 'birthday' },
  { label: 'Sangeet & Choreography', value: 'sangeet-choreography' },
  { label: 'Fireworks & Special Effects', value: 'fireworks-effects' },
  { label: 'Corporate Event', value: 'corporate' },
] as const

export const GUEST_COUNT_OPTIONS = [
  { label: 'Under 100', value: 'under-100' },
  { label: '100 – 250', value: '100-250' },
  { label: '250 – 500', value: '250-500' },
  { label: '500+', value: '500-plus' },
]

export const VENUE_STATUS_OPTIONS = [
  {
    value: 'booked',
    label: 'Venue Already Booked',
    description: 'We\u2019ll design around your confirmed space.',
  },
  {
    value: 'shortlisted',
    label: 'Shortlisting Options',
    description: 'We\u2019ll help you choose the right one.',
  },
  {
    value: 'need-help',
    label: 'Need Help Finding One',
    description: 'Our team will source venues for you.',
  },
] as const

export const BUDGET_OPTIONS = [
  { value: 'under-5l', label: 'Under \u20b95 Lakhs' },
  { value: '5-15l', label: '\u20b95 \u2013 15 Lakhs' },
  { value: '15-30l', label: '\u20b915 \u2013 30 Lakhs' },
  { value: '30-50l', label: '\u20b930 \u2013 50 Lakhs' },
  { value: '50l-plus', label: '\u20b950 Lakhs+' },
  { value: 'prefer-to-discuss', label: 'Prefer to Discuss' },
] as const

export const SERVICE_OPTIONS = [
  { value: 'full-planning', label: 'Full Event Planning' },
  { value: 'stage-mandap', label: 'Stage & Mandap Design' },
  { value: 'venue-decoration', label: 'Venue Decoration' },
  { value: 'lighting-design', label: 'Lighting Design' },
  { value: 'sangeet-choreography', label: 'Sangeet Choreography' },
  { value: 'fireworks-effects', label: 'Fireworks & Special Effects' },
  { value: 'entertainment', label: 'Entertainment & Artists' },
  { value: 'catering', label: 'Catering Coordination' },
  { value: 'photography', label: 'Photography Curation' },
  { value: 'hospitality', label: 'Guest Hospitality' },
] as const

/** Common dial codes, India first since that's the studio's home market. */
export const COUNTRY_CODE_OPTIONS = [
  { value: '+91', label: '+91 (India)' },
  { value: '+1', label: '+1 (US/Canada)' },
  { value: '+44', label: '+44 (UK)' },
  { value: '+971', label: '+971 (UAE)' },
  { value: '+65', label: '+65 (Singapore)' },
  { value: '+61', label: '+61 (Australia)' },
  { value: '+966', label: '+966 (Saudi Arabia)' },
  { value: '+974', label: '+974 (Qatar)' },
  { value: '+968', label: '+968 (Oman)' },
  { value: '+973', label: '+973 (Bahrain)' },
  { value: '+60', label: '+60 (Malaysia)' },
  { value: '+27', label: '+27 (South Africa)' },
  { value: '+49', label: '+49 (Germany)' },
  { value: '+33', label: '+33 (France)' },
  { value: '+64', label: '+64 (New Zealand)' },
] as const

/* ---------------------------------------------------------------------- */
/*  Schema                                                                 */
/* ---------------------------------------------------------------------- */

export const inquirySchema = z
  .object({
    // Step 1 — Event Details
    eventType: z.enum(
      EVENT_TYPE_OPTIONS.map((o) => o.value) as [string, ...string[]],
      { message: 'Please select an event type' },
    ),
    eventDate: z.string().min(1, 'Please select a tentative date'),
    guestCount: z.string().min(1, 'Please select an estimated guest count'),
    location: z.string().min(2, 'Please tell us the city or region'),
    venueStatus: z.enum(
      VENUE_STATUS_OPTIONS.map((o) => o.value) as [string, ...string[]],
      { message: 'Please let us know where things stand with your venue' },
    ),
    venueName: z.string().optional(),

    // Step 2 — Budget & Vision
    budget: z.enum(
      BUDGET_OPTIONS.map((o) => o.value) as [string, ...string[]],
      { message: 'Please select a budget range' },
    ),
    theme: z.string().min(2, 'Share a theme or style direction'),
    services: z.array(z.string()).min(1, 'Select at least one service'),
    description: z
      .string()
      .min(10, 'Tell us a little more about your vision (min. 10 characters)'),

    // Step 3 — Contact Information
    name: z.string().min(2, 'Please enter your full name'),
    phoneCountryCode: z.string().min(1, 'Select a country code'),
    phone: z
      .string()
      .regex(/^\d{10}$/, 'Enter a valid 10-digit phone number'),
    email: z.string().email('Enter a valid email address'),
    sameAsPhone: z.boolean().optional(),
    whatsappCountryCode: z.string().optional(),
    whatsapp: z.string().optional(),
  })
  .superRefine((values, ctx) => {
    if (!values.sameAsPhone) {
      if (!values.whatsappCountryCode) {
        ctx.addIssue({ code: 'custom', message: 'Select a country code', path: ['whatsappCountryCode'] })
      }
      if (!values.whatsapp || !/^\d{10}$/.test(values.whatsapp)) {
        ctx.addIssue({
          code: 'custom',
          message: 'Enter a valid 10-digit WhatsApp number, or mark it same as your phone',
          path: ['whatsapp'],
        })
      }
    }
  })

export type InquiryFormValues = z.infer<typeof inquirySchema>

/** Field groups validated before advancing each step of the wizard. */
export const STEP_FIELDS: Record<number, (keyof InquiryFormValues)[]> = {
  1: ['eventType', 'eventDate', 'guestCount', 'location', 'venueStatus'],
  2: ['budget', 'theme', 'services', 'description'],
  3: ['name', 'phoneCountryCode', 'phone', 'email', 'whatsappCountryCode', 'whatsapp'],
  4: [],
}

export const STEP_LABELS = ['Event', 'Vision & Budget', 'Your Details', 'Review'] as const

export const DEFAULT_INQUIRY_VALUES: Partial<InquiryFormValues> = {
  services: [],
  sameAsPhone: false,
  phoneCountryCode: '+91',
  whatsappCountryCode: '+91',
}

/* ---------------------------------------------------------------------- */
/*  Lookup helpers (used by the Review step)                              */
/* ---------------------------------------------------------------------- */

function labelFrom(options: readonly { value: string; label: string }[], value?: string) {
  return options.find((o) => o.value === value)?.label ?? value ?? '\u2014'
}

export const lookupEventType = (v?: string) => labelFrom(EVENT_TYPE_OPTIONS, v)
export const lookupGuestCount = (v?: string) => labelFrom(GUEST_COUNT_OPTIONS, v)
export const lookupVenueStatus = (v?: string) => labelFrom(VENUE_STATUS_OPTIONS, v)
export const lookupBudget = (v?: string) => labelFrom(BUDGET_OPTIONS, v)
export const lookupServices = (values: string[] = []) =>
  values.map((v) => labelFrom(SERVICE_OPTIONS, v))

/** Joins a country code + 10-digit number for display (e.g. "+91 9876543210"). */
export function formatPhoneNumber(countryCode?: string, number?: string) {
  if (!number) return '\u2014'
  return countryCode ? `${countryCode} ${number}` : number
}

/**
 * Formats the full inquiry as a WhatsApp message. This is the entire
 * "submission" — there's no backend/API here by design. The message is
 * opened as a pre-filled wa.me chat to the studio's own WhatsApp number,
 * and the person sends it themselves from their own WhatsApp.
 */
export function buildInquiryMessage(values: InquiryFormValues, referenceId: string) {
  const effectiveWhatsappCode = values.sameAsPhone ? values.phoneCountryCode : values.whatsappCountryCode
  const effectiveWhatsapp = values.sameAsPhone ? values.phone : values.whatsapp

  const lines = [
    `New Event Inquiry — Ref. ${referenceId}`,
    '',
    '*Event Details*',
    `Event Type: ${lookupEventType(values.eventType)}`,
    `Tentative Date: ${values.eventDate || '\u2014'}`,
    `Estimated Guests: ${lookupGuestCount(values.guestCount)}`,
    `City / Region: ${values.location || '\u2014'}`,
    `Venue: ${
      values.venueName
        ? `${lookupVenueStatus(values.venueStatus)} \u2014 ${values.venueName}`
        : lookupVenueStatus(values.venueStatus)
    }`,
    '',
    '*Vision & Budget*',
    `Budget Range: ${lookupBudget(values.budget)}`,
    `Theme: ${values.theme || '\u2014'}`,
    `Services: ${lookupServices(values.services).join(', ') || '\u2014'}`,
    `Vision Notes: ${values.description || '\u2014'}`,
    '',
    '*Contact Information*',
    `Name: ${values.name || '\u2014'}`,
    `Phone: ${formatPhoneNumber(values.phoneCountryCode, values.phone)}`,
    `Email: ${values.email || '\u2014'}`,
    `WhatsApp: ${formatPhoneNumber(effectiveWhatsappCode, effectiveWhatsapp)}`,
  ]

  return lines.join('\n')
}
