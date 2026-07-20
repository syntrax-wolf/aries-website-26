import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { mostRecentEvent, pastEvents, upcomingEvents } from '../data/events'

const allEvents = [mostRecentEvent, ...upcomingEvents, ...pastEvents]

export const Route = createFileRoute('/events/$eventId')({
  loader: ({ params }) => {
    const event = allEvents.find((e) => e.id === params.eventId)
    if (!event) throw notFound()
    return event
  },
  component: EventDetail,
})

function EventDetail() {
  const event = Route.useLoaderData()

  return (
    <main className="px-8 py-10 max-w-5xl">
      <Link
        to="/events"
        className="text-sm font-semibold text-[var(--ink-soft)] no-underline hover:text-navy"
      >
        ← Back to Events
      </Link>

      <p className="tag mt-6">{event.date}</p>
      <h1 className="mt-4 text-4xl font-bold text-navy sm:text-5xl">
        {event.name}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--ink-soft)]">
        {event.blurb}
      </p>

      <div className="card mt-16 flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center">
        <div>
          <p className="text-xl font-bold text-navy">
            Want to organise an event with us?
          </p>
          <p className="mt-1 text-[var(--ink-soft)]">
            We&rsquo;re always looking for new collaborations.
          </p>
        </div>
        <div className="flex flex-shrink-0 gap-3">
          <Link
            to="/contact"
            className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-cream no-underline"
          >
            Contact Us
          </Link>
          <Link
            to="/events"
            className="pill px-5 py-2.5 text-sm font-semibold text-navy no-underline"
          >
            View More Events
          </Link>
        </div>
      </div>
    </main>
  )
}
