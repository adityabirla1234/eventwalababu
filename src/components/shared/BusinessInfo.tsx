import { Clock, MapPin } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { InstagramIcon } from '@/components/icons/InstagramIcon'
import { CONTACT } from '@/lib/navigation'
import { cn } from '@/lib/utils'

interface BusinessInfoProps {
  className?: string
}

/** Studio hours + address + social presence, in one reference card. */
export function BusinessInfo({ className }: BusinessInfoProps) {
  return (
    <Card variant="bordered" className={cn(className)}>
      <div className="mb-5 flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
          <Clock className="size-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted-foreground)]">
            Studio Hours
          </p>
          <dl className="mt-1.5 space-y-1">
            {CONTACT.hours.map((slot) => (
              <div key={slot.day} className="flex flex-wrap items-baseline gap-x-2 text-sm">
                <dt className="font-medium text-[var(--color-foreground)]">{slot.day}:</dt>
                <dd className="text-[var(--color-muted-foreground)]">{slot.time}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mb-5 flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
          <MapPin className="size-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted-foreground)]">
            Studio Address
          </p>
          <p className="mt-1.5 text-sm text-[var(--color-foreground)]">{CONTACT.addressLine}</p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
          <InstagramIcon className="size-5" />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted-foreground)]">
            Follow Along
          </p>
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noreferrer"
            className="mt-1.5 inline-block text-sm font-medium text-[var(--color-foreground)] hover:text-[var(--color-accent)]"
          >
            @eventwalababu
          </a>
        </div>
      </div>
    </Card>
  )
}
