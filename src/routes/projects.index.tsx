import { useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { projects, type ProjectCategory } from '../data/projects'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import ProjectCard from '../components/ProjectCard'

export const Route = createFileRoute('/projects/')({ component: Projects })

function Projects() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<ProjectCategory | 'all'>('all')

  const categories = useMemo(
    () => Array.from(new Set(projects.map((p) => p.category))),
    [],
  )

  const filtered = projects.filter((p) => {
    if (category !== 'all' && p.category !== category) return false
    if (query.trim()) {
      const q = query.toLowerCase()
      const haystack = `${p.name} ${p.description} ${p.tags.join(' ')}`.toLowerCase()
      if (!haystack.includes(q)) return false
    }
    return true
  })

  return (
    <main className="page-wrap py-10 pb-20">
      <PageHeader
        eyebrow="Work"
        title="Projects"
        subtitle="Research pipelines, tools, and papers from the collective — filter by category or search."
      />

      <Reveal delay={0.06} className="mt-10 mb-8">
        <div className="relative max-w-lg">
          <MagnifyingGlass
            className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-[var(--ink-soft)]"
            weight="regular"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects by name, tag, or description"
            className="w-full rounded-xl border border-[var(--line)] bg-white py-3 pr-4 pl-11 text-sm text-navy placeholder:text-[var(--ink-soft)] outline-none transition focus:border-navy/30 focus:ring-2 focus:ring-navy/10"
          />
        </div>
      </Reveal>

      <Reveal className="mb-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCategory('all')}
          className={`tag min-h-11 cursor-pointer transition hover:-translate-y-0.5 hover:border-[var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy lg:min-h-0 ${
            category === 'all' ? 'is-active' : ''
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={`tag min-h-11 cursor-pointer transition hover:-translate-y-0.5 hover:border-[var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy lg:min-h-0 ${
              category === cat ? 'is-active' : ''
            }`}
          >
            {cat}
          </button>
        ))}
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((project, i) => (
          <Reveal key={project.id} className="h-full" delay={0.05 * (i % 3)}>
            <ProjectCard project={project} />
          </Reveal>
        ))}

        {filtered.length === 0 && (
          <p className="col-span-3 py-8 text-center text-[var(--ink-soft)]">
            No projects match your search.
          </p>
        )}
      </div>
    </main>
  )
}
