import { createFileRoute } from '@tanstack/react-router'
import { Clock, Mail, MapPin } from 'lucide-react'

export const Route = createFileRoute('/contact')({ component: Contact })

const CONTACT_EMAIL = 'aries@iitd.ac.in'

function Contact() {
  return (
    <main className="px-8 py-10 max-w-5xl">
      <h1 className="text-4xl font-bold text-navy sm:text-6xl">
        Let&rsquo;s Connect!
      </h1>
      <p className="mt-4 max-w-xl text-lg text-[var(--ink-soft)]">
        Get in touch — we&rsquo;re here to collaborate, create, and make an
        impact, together.
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        <div className="card p-6">
          <Mail className="h-6 w-6 text-navy/70" strokeWidth={1.5} />
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
        <div className="card p-6">
          <MapPin className="h-6 w-6 text-navy/70" strokeWidth={1.5} />
          <p className="mt-3 text-sm font-semibold text-[var(--ink-soft)]">
            Location
          </p>
          <p className="mt-1 text-navy">
            Student Activity Centre (SAC), IIT Delhi, Hauz Khas, New Delhi -
            110016
          </p>
        </div>
        <div className="card p-6">
          <Clock className="h-6 w-6 text-navy/70" strokeWidth={1.5} />
          <p className="mt-3 text-sm font-semibold text-[var(--ink-soft)]">
            Response Time
          </p>
          <p className="mt-1 text-navy">
            We typically respond within 24-48 hours.
          </p>
        </div>
      </div>

      <div className="card mt-12 p-8 sm:p-10">
        <p className="text-2xl leading-snug font-semibold text-navy sm:text-3xl">
          &ldquo;We&rsquo;re here to collaborate, create and make an impact —
          together.&rdquo;
        </p>
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=Hey ARIES!`}
          className="mt-6 inline-block rounded-full bg-navy px-6 py-3 text-sm font-semibold text-cream no-underline transition hover:-translate-y-0.5"
        >
          Email Us
        </a>
      </div>
    </main>
  )
}
