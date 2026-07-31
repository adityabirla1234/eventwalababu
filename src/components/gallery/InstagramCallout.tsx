import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/motion/Reveal'
import { InstagramIcon } from '@/components/icons/InstagramIcon'
import { CONTACT } from '@/lib/navigation'

/** Sends visitors to Instagram for the full, constantly-updated photo/video archive. */
export function InstagramCallout() {
  return (
    <Section spacing="md" className="text-center">
      <Reveal className="mx-auto flex max-w-lg flex-col items-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
          <InstagramIcon className="size-6" />
        </span>
        <h3 className="mt-5 font-serif text-2xl font-semibold text-[var(--color-foreground)] sm:text-3xl">
          Want to see more?
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted-foreground)] sm:text-base">
          For more photos and videos from our celebrations, visit our Instagram page.
        </p>
        <Button
          href={CONTACT.instagram}
          target="_blank"
          rel="noreferrer"
          variant="outline"
          size="lg"
          className="mt-7"
          leftIcon={<InstagramIcon className="size-4" />}
        >
          Visit Our Instagram
        </Button>
      </Reveal>
    </Section>
  )
}
