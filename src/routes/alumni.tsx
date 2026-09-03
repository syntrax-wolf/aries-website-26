import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Search } from 'lucide-react'
import MemberCard from '../components/MemberCard'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import { alumni } from '../data/alumni'

export const Route = createFileRoute('/alumni')({ component: Alumni })

function Alumni() {
  const [query, setQuery] = useState('')
  const named = alumni.filter((a) => a.name.trim())

  const filtered = named.filter((a) => {
    if (!query.trim()) return true
    const q = query.toLowerCase()
    return `${a.name} ${a.role} ${a.company}`.toLowerCase().includes(q)
  })

  return (
    <main className="page-wrap py-10 pb-20">
      <PageHeader
        eyebrow="People"
        title="Alumni"
        subtitle="Former coordinators and executives, now building elsewhere."
      />

      {named.length > 0 && (
        <Reveal delay={0.06}>
          <div className="card card--flat relative mt-10 max-w-md">
            <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-[var(--ink-soft)]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search alumni..."
              className="w-full bg-transparent py-3 pr-4 pl-11 text-sm text-navy outline-none"
            />
          </div>
        </Reveal>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((person, i) => (
          <Reveal key={person.name} delay={0.04 * (i % 3)}>
            <MemberCard
              name={person.name}
              role={person.role}
              subtitle={person.company}
            />
          </Reveal>
        ))}
        {filtered.length === 0 && (
          <p className="text-[var(--ink-soft)]">
            {named.length === 0
              ? 'No names listed yet.'
              : 'No alumni match your search.'}
          </p>
        )}
      </div>

      <Reveal delay={0.06}>
        <section className="card mt-16 flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center">
          <div>
            <p className="text-xl font-semibold text-navy">Are you an alumnus?</p>
            <p className="mt-1 text-[var(--ink-soft)]">
              We&rsquo;d like to feature you. Reach out and stay connected.
            </p>
          </div>
          <Link
            to="/contact"
            className="pill flex-shrink-0 px-6 py-3 text-sm font-semibold text-navy no-underline"
          >
            Get featured →
          </Link>
        </section>
      </Reveal>
    </main>
  )
}
