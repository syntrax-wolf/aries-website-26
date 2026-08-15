import { useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { projects, type ProjectCategory } from '../data/projects'
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
    <div className="min-h-screen bg-cream">
      {/* Page header */}
      <div className="page-wrap pt-10">
        <Reveal>
          <span className="eyebrow">Projects</span>
          <h1 className="mt-4 text-4xl font-bold text-navy sm:text-6xl">
            Explore. Learn. Build the Future.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-[var(--ink-soft)]">
            From hands-on workshops to thought-provoking talks and intense
            hackathons — there&rsquo;s something for every AI enthusiast.
          </p>
        </Reveal>
      </div>

      {/* Projects section */}
      <div className="page-wrap py-10">
        {/* Search */}
        <Reveal className="mb-8">
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
              className="w-full rounded-xl border border-[var(--line)] bg-white py-3 pr-4 pl-11 text-sm text-navy placeholder:text-[var(--ink-soft)] outline-none transition focus:border-accent/40 focus:ring-2 focus:ring-accent/10"
            />
          </div>
        </Reveal>

        {/* Category filters */}
        <Reveal className="mb-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory('all')}
            className={`inline-flex min-h-11 items-center justify-center rounded-lg px-3 py-1.5 text-xs font-semibold transition lg:min-h-0 ${
              category === 'all'
                ? 'bg-navy text-cream'
                : 'border border-[var(--line)] bg-white text-[var(--ink-soft)] hover:text-navy'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`inline-flex min-h-11 items-center justify-center rounded-lg px-3 py-1.5 text-xs font-semibold transition lg:min-h-0 ${
                category === cat
                  ? 'bg-navy text-cream'
                  : 'border border-[var(--line)] bg-white text-[var(--ink-soft)] hover:text-navy'
              }`}
            >
              {cat}
            </button>
          ))}
        </Reveal>

        {/* Grid */}
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
      </div>
    </div>
  )
}
