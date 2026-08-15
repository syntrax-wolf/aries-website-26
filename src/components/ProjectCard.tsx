import { Link } from '@tanstack/react-router'
import { CATEGORY_COLORS, type Project } from '../data/projects'

export default function ProjectCard({ project }: { project: Project }) {
  const colors = CATEGORY_COLORS[project.category]

  return (
    <Link
      to="/projects/$projectId"
      params={{ projectId: project.id }}
      className="card card--interactive flex h-full flex-col overflow-hidden p-0 no-underline"
    >
      {/* Visual area — category colour tint stands in for imagery */}
      <div
        className="flex h-28 flex-shrink-0 items-center justify-center border-b border-[var(--line)]"
        style={{ background: `color-mix(in srgb, ${colors.text} 10%, white)` }}
      >
        <span
          className="text-[11px] font-bold tracking-[0.2em] uppercase"
          style={{ color: colors.text }}
        >
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="text-lg font-bold text-navy">{project.name}</p>
        {project.contributors && (
          <p className="-mt-2 text-xs text-[var(--ink-soft)]">
            {project.contributors}
          </p>
        )}
        <p className="line-clamp-2 text-sm text-[var(--ink-soft)]">
          {project.description}
        </p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
