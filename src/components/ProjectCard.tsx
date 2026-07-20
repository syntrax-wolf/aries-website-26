import { Link } from '@tanstack/react-router'
import type { Project } from '../data/projects'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to="/projects/$projectId"
      params={{ projectId: project.id }}
      className="card flex flex-col gap-3 p-6 no-underline transition hover:-translate-y-0.5"
    >
      <p className="text-xs font-semibold tracking-wide text-[var(--ink-soft)] uppercase">
        {project.category}
      </p>
      <p className="text-lg font-bold text-navy">{project.name}</p>
      <p className="line-clamp-2 text-sm text-[var(--ink-soft)]">
        {project.description}
      </p>
      <div className="mt-1 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
      {project.contributors && (
        <p className="mt-1 text-xs text-[var(--ink-soft)]">
          {project.contributors}
        </p>
      )}
    </Link>
  )
}
