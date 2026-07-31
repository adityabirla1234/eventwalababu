import { Navigation } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { CONTACT, buildMapEmbedSrc, buildMapDirectionsLink } from '@/lib/navigation'
import { cn } from '@/lib/utils'

interface GoogleMapProps {
  className?: string
  /** Fixed aspect/height utility classes for the iframe wrapper. */
  heightClassName?: string
}

/** Studio location map, framed to match the brand's card treatment. */
export function GoogleMap({ className, heightClassName = 'h-80 sm:h-96' }: GoogleMapProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] shadow-md shadow-black/5',
        className,
      )}
    >
      <iframe
        title="EventWalaBabu studio location"
        src={buildMapEmbedSrc()}
        className={cn('w-full grayscale-[15%] contrast-[1.05]', heightClassName)}
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        aria-label={`Map showing ${CONTACT.addressLine}`}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-5">
        <div className="pointer-events-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-medium leading-relaxed text-white/90 sm:text-sm">{CONTACT.addressLine}</p>
          <Button
            href={buildMapDirectionsLink()}
            target="_blank"
            rel="noreferrer"
            variant="gold"
            size="sm"
            leftIcon={<Navigation className="size-3.5" />}
            className="shrink-0 self-start sm:self-auto"
          >
            Get Directions
          </Button>
        </div>
      </div>
    </div>
  )
}
