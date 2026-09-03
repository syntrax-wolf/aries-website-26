import type { ReactNode } from 'react'
import Reveal from './Reveal'

/** Shared inner-page title block: fade-up, one type scale, optional kicker + action. */
export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow?: ReactNode
  title: ReactNode
  subtitle?: ReactNode
  action?: ReactNode
}) {
  return (
    <Reveal>
      <header
        className={
          action
            ? 'flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end'
            : undefined
        }
      >
        <div className="min-w-0">
          {typeof eyebrow === 'string' ? (
            <span className="eyebrow">{eyebrow}</span>
          ) : (
            eyebrow
          )}
          <h1 className={`page-title ${eyebrow ? 'mt-4' : ''}`}>{title}</h1>
          {subtitle ? <p className="page-lede">{subtitle}</p> : null}
        </div>
        {action ? <div className="flex-shrink-0">{action}</div> : null}
      </header>
    </Reveal>
  )
}
