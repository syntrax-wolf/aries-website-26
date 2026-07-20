import { useMemo, useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { projects, CATEGORY_COLORS, type ProjectCategory } from '../data/projects'
import Reveal from '../components/Reveal'

export const Route = createFileRoute('/projects/')({ component: Projects })

const easeOut = [0.16, 1, 0.3, 1] as const

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
      {/* ── Hero banner ────────────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f5f0e8 0%, #ede7f9 100%)' }}>
        <div className="flex items-start justify-between gap-8 px-8 py-10">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOut }}
              className="flex items-center gap-3"
            >
              <span className="h-0.5 w-6 rounded bg-accent opacity-70" />
              <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase">
                Projects
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOut, delay: 0.08 }}
              className="mt-4 text-4xl font-extrabold leading-tight text-navy lg:text-5xl"
            >
              Explore. Learn.
              <br />
              Build the Future.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOut, delay: 0.16 }}
              className="mt-4 max-w-md text-base leading-relaxed text-navy/65"
            >
              From hands-on workshops to thought-provoking talks and intense
              hackathons — there&rsquo;s something for every AI enthusiast.
            </motion.p>
          </div>

          {/* Hero image — deer over mountains */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: easeOut, delay: 0.1 }}
            className="relative hidden flex-shrink-0 lg:block"
            style={{ width: 480, height: 220 }}
          >
            <div
              className="absolute inset-0 overflow-hidden rounded-2xl"
              style={{
                background: 'linear-gradient(160deg, #ddd6f3 0%, #c8bef0 50%, #a89ad8 100%)',
              }}
            >
              <img
                src="/deer_cleaned.png"
                alt=""
                className="absolute -bottom-4 -right-4 h-[115%] w-auto object-contain object-bottom"
              />
              {/* Subtle mountain hills */}
              <svg
                viewBox="0 0 480 220"
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 180 L80 120 L160 155 L240 90 L330 140 L410 100 L480 130 L480 220 L0 220Z"
                  fill="rgba(108,90,172,0.45)"
                />
                <path
                  d="M0 200 L100 150 L200 175 L310 130 L420 165 L480 145 L480 220 L0 220Z"
                  fill="rgba(80,62,140,0.55)"
                />
              </svg>
            </div>

            {/* Our Mission card */}
            <div className="absolute -right-6 top-4 w-44 rounded-xl bg-white p-4 shadow-xl">
              <div className="mb-2 grid h-6 w-6 place-items-center rounded bg-navy/10">
                <span className="text-[10px] font-bold text-navy">■</span>
              </div>
              <p className="text-sm font-bold text-navy">Our Mission</p>
              <p className="mt-1 text-[11px] leading-relaxed text-navy/60">
                To foster a community passionate about AI/ML and empower students
                to build impactful solutions.
              </p>
              <Link
                to="/about"
                className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-navy no-underline hover:underline"
              >
                Learn more about us →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Projects section ───────────────────────────────────────── */}
      <div className="px-8 py-10">
        {/* Section eyebrow */}
        <Reveal className="mb-6 flex items-center gap-3">
          <span className="h-0.5 w-6 rounded bg-accent opacity-70" />
          <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase">
            Projects
          </span>
        </Reveal>

        {/* Search */}
        <Reveal className="mb-8">
          <div className="relative max-w-lg">
            <MagnifyingGlass
              className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-navy/40"
              weight="regular"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects by name, tag, or description"
              className="w-full rounded-xl border border-[var(--line)] bg-white py-3 pr-4 pl-11 text-sm text-navy placeholder:text-navy/40 outline-none transition focus:border-accent/40 focus:ring-2 focus:ring-accent/10"
            />
          </div>
        </Reveal>

        {/* Category filters */}
        <Reveal className="mb-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory('all')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              category === 'all'
                ? 'bg-navy text-cream'
                : 'border border-[var(--line)] bg-white text-navy/60 hover:text-navy'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                category === cat
                  ? 'bg-navy text-cream'
                  : 'border border-[var(--line)] bg-white text-navy/60 hover:text-navy'
              }`}
            >
              {cat}
            </button>
          ))}
        </Reveal>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((project, i) => {
            const colors = CATEGORY_COLORS[project.category]
            return (
              <Reveal key={project.id} delay={0.05 * (i % 3)}>
                <Link
                  to="/projects/$projectId"
                  params={{ projectId: project.id }}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white no-underline shadow-[0_8px_32px_-16px_rgba(23,19,67,0.35)] transition hover:-translate-y-1 hover:shadow-[0_16px_40px_-16px_rgba(23,19,67,0.45)]"
                >
                  {/* Image area */}
                  <div
                    className="h-44 w-full flex-shrink-0"
                    style={{ background: project.imageBg ?? '#e8e2d5' }}
                  />

                  {/* Card body */}
                  <div className="flex flex-1 flex-col p-5">
                    {/* Category badge */}
                    <div className="mb-3 flex flex-wrap gap-1.5">
                      <span
                        className="rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                        style={{
                          background: colors.bg,
                          color: colors.text,
                        }}
                      >
                        {project.category}
                      </span>
                    </div>

                    <p className="text-base font-bold text-navy">{project.name}</p>
                    {project.contributors && (
                      <p className="mt-0.5 text-xs text-navy/50">{project.contributors}</p>
                    )}
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-navy/65">
                      {project.description}
                    </p>

                    {/* Tag chips */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-[var(--line)] px-2 py-0.5 text-[11px] font-medium text-navy/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </Reveal>
            )
          })}

          {filtered.length === 0 && (
            <p className="col-span-3 py-8 text-center text-navy/50">
              No projects match your search.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
