import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import {
  eventCategories,
  majorEvents,
  mostRecentEvent,
  pastEvents,
  upcomingEvents,
  type EventCategory,
} from '../data/events'

export const Route = createFileRoute('/events/')({ component: Events })

function Events() {
  const [activeCategory, setActiveCategory] = useState<EventCategory | 'all'>(
    'all',
  )

  const filteredPastEvents =
    activeCategory === 'all'
      ? pastEvents
      : pastEvents.filter((e) => e.category === activeCategory)

  return (
    <main className="page-wrap py-10">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-4xl font-bold text-navy sm:text-6xl">Events</h1>
          <p className="mt-4 max-w-xl text-lg text-[var(--ink-soft)]">
            Everything happening around ARIES — talks, workshops, hackathons,
            and the annual fixtures.
          </p>
        </div>
        <a
          href="https://calendar.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="pill flex-shrink-0 px-5 py-3 text-sm font-semibold whitespace-nowrap text-navy no-underline"
        >
          ↗ Save all events to Google Calendar
        </a>
      </div>

      {/* Most recent event */}
      <section className="card mt-12 grid gap-6 p-8 sm:grid-cols-[2fr_3fr] sm:items-center sm:p-10">
        <div>
          <p className="tag">Most Recent</p>
          <h2 className="mt-4 text-2xl font-bold text-navy sm:text-3xl">
            {mostRecentEvent.name}
          </h2>
          <p className="mt-1 text-sm text-[var(--ink-soft)]">
            {mostRecentEvent.date}
          </p>
        </div>
        <div>
          <p className="text-[var(--ink-soft)]">{mostRecentEvent.blurb}</p>
          <Link
            to="/events/$eventId"
            params={{ eventId: mostRecentEvent.id }}
            className="mt-4 -mx-2 -my-2.5 inline-block px-2 py-2.5 font-semibold text-navy underline decoration-2 underline-offset-4"
          >
            Read More
          </Link>
        </div>
      </section>

      {/* Upcoming events — scrollable row */}
      <section className="mt-16">
        {/*
         * "View the Full Calendar ↗" used to sit here linking to /events — the
         * page it was already on. Removed rather than repointed: the real
         * external calendar link already lives in the page header above.
         */}
        <h2 className="text-2xl font-bold text-navy sm:text-3xl">
          Upcoming Events
        </h2>
        <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
          {upcomingEvents.map((event) => (
            <Link
              key={event.id}
              to="/events/$eventId"
              params={{ eventId: event.id }}
              className="card card--interactive w-72 flex-shrink-0 p-6 no-underline"
            >
              <p className="text-sm text-[var(--ink-soft)]">{event.date}</p>
              <p className="mt-2 text-lg font-bold text-navy">
                {event.name}
              </p>
              <p className="mt-2 line-clamp-3 text-sm text-[var(--ink-soft)]">
                {event.blurb}
              </p>
              <span className="mt-3 inline-block text-sm font-semibold text-navy">
                Read More
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Major / annual events — table */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-navy sm:text-3xl">
          Major Events
        </h2>
        <div className="card card--flat mt-6 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--line)] bg-[var(--surface-soft)] text-sm text-[var(--ink-soft)]">
                <th className="px-5 py-3 font-semibold">Event</th>
                <th className="px-5 py-3 font-semibold">When</th>
                <th className="px-5 py-3 font-semibold">About</th>
              </tr>
            </thead>
            <tbody>
              {majorEvents.map((event) => (
                <tr
                  key={event.id}
                  className="border-b border-[var(--line)] last:border-0"
                >
                  <td className="px-5 py-4 font-bold whitespace-nowrap text-navy">
                    {event.name}
                  </td>
                  <td className="px-5 py-4 text-sm whitespace-nowrap text-[var(--ink-soft)]">
                    {event.window}
                  </td>
                  <td className="px-5 py-4 text-sm text-[var(--ink-soft)]">
                    {event.blurb}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Past events */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-navy sm:text-3xl">
          Past Events
        </h2>
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`tag min-h-11 cursor-pointer transition hover:-translate-y-0.5 hover:border-[var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] lg:min-h-0 ${activeCategory === 'all' ? 'is-active' : ''}`}
          >
            All
          </button>
          {eventCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`tag min-h-11 cursor-pointer transition hover:-translate-y-0.5 hover:border-[var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] lg:min-h-0 ${activeCategory === cat.id ? 'is-active' : ''}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {filteredPastEvents.map((event) => (
            <Link
              key={event.id}
              to="/events/$eventId"
              params={{ eventId: event.id }}
              className="card card--interactive p-6 no-underline"
            >
              <p className="text-xs font-semibold text-[var(--ink-soft)]">
                {event.date}
              </p>
              <p className="mt-2 font-bold text-navy">{event.name}</p>
              <p className="mt-2 text-sm text-[var(--ink-soft)]">
                {event.blurb}
              </p>
            </Link>
          ))}
          {filteredPastEvents.length === 0 && (
            <p className="text-[var(--ink-soft)]">
              No events in this category yet — check back soon.
            </p>
          )}
        </div>
      </section>
    </main>
  )
}
