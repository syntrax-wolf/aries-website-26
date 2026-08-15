import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, GithubLogo, Globe, FileText } from '@phosphor-icons/react'
import { projects, CATEGORY_COLORS } from '../data/projects'

export const Route = createFileRoute('/projects/$projectId')({
  loader: ({ params }) => {
    const project = projects.find((p) => p.id === params.projectId)
    if (!project) throw notFound()
    return project
  },
  component: ProjectDetail,
})

function ProjectDetail() {
  const project = Route.useLoaderData()
  const colors = CATEGORY_COLORS[project.category]

  return (
    <div className="page-wrap min-h-screen py-10">
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--ink-soft)] no-underline transition hover:text-navy"
      >
        <ArrowLeft className="h-4 w-4" weight="bold" />
        Back to Projects
      </Link>

      {/* Image hero */}
      <div
        className="mt-6 h-56 w-full rounded-2xl sm:h-72"
        style={{ background: project.imageBg ?? '#e8e2d5' }}
      />

      <div className="mt-8 max-w-2xl">
        {/* Category badge */}
        <span
          className="rounded px-2.5 py-1 text-xs font-bold uppercase tracking-wide"
          style={{ background: colors.bg, color: colors.text }}
        >
          {project.category}
        </span>

        <h1 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">
          {project.name}
        </h1>
        {project.contributors && (
          <p className="mt-2 text-sm text-[var(--ink-soft)]">{project.contributors}</p>
        )}
        <p className="mt-5 text-lg leading-relaxed text-navy/70">
          {project.description}
        </p>

        {/* Tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="mt-8 flex flex-wrap gap-3">
          {project.hasGithub && (
            <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-[var(--line)] bg-white px-4 py-2.5 text-sm font-semibold text-[var(--ink-soft)]" title="Link coming soon">
              <GithubLogo className="h-4 w-4" weight="fill" /> GitHub ↗
            </span>
          )}
          {project.hasDemo && (
            <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-[var(--line)] bg-white px-4 py-2.5 text-sm font-semibold text-[var(--ink-soft)]" title="Link coming soon">
              <Globe className="h-4 w-4" weight="fill" /> Demo ↗
            </span>
          )}
          {project.hasReport && (
            <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-[var(--line)] bg-white px-4 py-2.5 text-sm font-semibold text-[var(--ink-soft)]" title="Link coming soon">
              <FileText className="h-4 w-4" weight="fill" /> Report ↗
            </span>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="card mt-16 flex flex-col items-start justify-between gap-6 px-8 py-6 sm:flex-row sm:items-center">
        <p className="text-lg font-bold text-navy">Want to see more of our work?</p>
        <Link
          to="/projects"
          className="inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-semibold whitespace-nowrap text-cream no-underline transition hover:bg-navy-soft sm:py-2.5"
        >
          All Projects
          <ArrowRight className="h-4 w-4" weight="bold" />
        </Link>
      </div>
    </div>
  )
}
