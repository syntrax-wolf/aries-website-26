import { createFileRoute } from '@tanstack/react-router'
import { Clock, Mail, MapPin } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'

export const Route = createFileRoute('/contact')({ component: Contact })

const CONTACT_EMAIL = 'aries@iitd.ac.in'

function Contact() {
  return (
    <main className="page-wrap py-10 pb-20">
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        subtitle="For collaborations, talks, and project briefs — we typically reply within 24–48 hours."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        <Reveal>
          <div className="card h-full p-6">
            <Mail className="h-5 w-5 text-navy/70" strokeWidth={1.5} />
            <p className="mt-3 text-sm font-semibold text-[var(--ink-soft)]">
              Email
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-1 block font-semibold text-navy underline decoration-2 underline-offset-4"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="card h-full p-6">
            <MapPin className="h-5 w-5 text-navy/70" strokeWidth={1.5} />
            <p className="mt-3 text-sm font-semibold text-[var(--ink-soft)]">
              Location
            </p>
            <p className="mt-1 text-navy">
              Student Activity Centre (SAC), IIT Delhi, Hauz Khas, New Delhi -
              110016
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="card h-full p-6">
            <Clock className="h-5 w-5 text-navy/70" strokeWidth={1.5} />
            <p className="mt-3 text-sm font-semibold text-[var(--ink-soft)]">
              Response time
            </p>
            <p className="mt-1 text-navy">
              We typically respond within 24–48 hours.
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.08}>
        <div className="card mt-12 p-8 sm:p-10">
          <p className="text-2xl leading-snug font-semibold text-navy sm:text-3xl">
            Working on a paper, a workshop idea, or a project you want ARIES
            involved in? Email a short brief and we&rsquo;ll route it to the
            right wing.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Hey ARIES!`}
            className="mt-6 inline-block rounded-full bg-navy px-6 py-3 text-sm font-semibold text-cream no-underline transition hover:-translate-y-0.5"
          >
            Email us
          </a>
        </div>
      </Reveal>
    </main>
  )
}
