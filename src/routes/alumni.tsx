import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Search } from 'lucide-react'
import MemberCard from '../components/MemberCard'
import { alumni } from '../data/alumni'

export const Route = createFileRoute('/alumni')({ component: Alumni })

function Alumni() {
  const [query, setQuery] = useState('')

  const filtered = alumni.filter((a) => {
    if (!query.trim()) return true
    const q = query.toLowerCase()
    return `${a.name} ${a.role} ${a.company}`.toLowerCase().includes(q)
  })

  return (
    <main className="page-wrap py-10">
      <h1 className="text-4xl font-bold text-navy sm:text-6xl">Alumni</h1>
      <p className="mt-4 max-w-xl text-lg text-[var(--ink-soft)]">
        Our alumni are building, leading, and inspiring across the world.
      </p>

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

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((person) => (
          <MemberCard
            key={person.name}
            name={person.name}
            role={person.role}
            subtitle={person.company}
          />
        ))}
        {filtered.length === 0 && (
          <p className="text-[var(--ink-soft)]">No alumni match your search.</p>
        )}
      </div>

      <section className="card mt-16 flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center">
        <div>
          <p className="text-xl font-bold text-navy">Are you an alumnus?</p>
          <p className="mt-1 text-[var(--ink-soft)]">
            We&rsquo;d love to feature you. Reach out and stay connected!
          </p>
        </div>
        <Link
          to="/contact"
          className="pill flex-shrink-0 px-6 py-3 text-sm font-semibold text-navy no-underline"
        >
          Get Featured →
        </Link>
      </section>
    </main>
  )
}
