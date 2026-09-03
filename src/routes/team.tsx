import { createFileRoute, Link } from '@tanstack/react-router'
import AriesEmblem from '../components/icons/AriesEmblem'
import MemberCard from '../components/MemberCard'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import { coordinators, executives, teamYear } from '../data/team'

export const Route = createFileRoute('/team')({ component: Team })

function named(members: typeof coordinators) {
  return members.filter((m) => m.name.trim())
}

function Team() {
  const namedCoordinators = named(coordinators)
  const namedExecutives = named(executives)
  const brain = namedExecutives.filter((m) => m.wing === 'BRAIN')
  const canvas = namedExecutives.filter((m) => m.wing === 'CANVAS')
  const hasRoster = namedCoordinators.length > 0 || namedExecutives.length > 0

  return (
    <main className="page-wrap py-10 pb-20">
      <PageHeader
        eyebrow={<p className="tag">{teamYear}</p>}
        title="Team"
        subtitle="Coordinators and executives who run workshops, papers, and projects this year."
      />

      {hasRoster && (
        <Reveal delay={0.08}>
          <div className="card card--dark relative mt-10 flex h-56 items-center overflow-hidden p-8 sm:h-72 sm:p-10">
            <AriesEmblem className="absolute -right-10 -bottom-10 h-64 w-64 text-white/10 sm:h-80 sm:w-80" />
            <p className="z-10 max-w-md text-xl leading-snug font-semibold text-cream sm:text-2xl">
              Every workshop, paper, and project on this site was built by the
              people below. {teamYear} roster.
            </p>
          </div>
        </Reveal>
      )}

      <section className="mt-16">
        <h2 className="chapter-label text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
          Coordinators
        </h2>
        {namedCoordinators.length === 0 ? (
          <p className="mt-6 text-[var(--ink-soft)]">No names listed yet.</p>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {namedCoordinators.map((member, i) => (
              <Reveal key={member.name} delay={0.04 * (i % 4)}>
                <MemberCard name={member.name} role={member.role} />
              </Reveal>
            ))}
          </div>
        )}
      </section>

      <section className="mt-16">
        <h2 className="chapter-label text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
          Executives
        </h2>
        {namedExecutives.length === 0 ? (
          <p className="mt-6 text-[var(--ink-soft)]">No names listed yet.</p>
        ) : (
          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            <div>
              <span className="eyebrow">Brain</span>
              <div className="mt-4 grid gap-4">
                {brain.map((member, i) => (
                  <Reveal key={member.name} delay={0.04 * i}>
                    <MemberCard name={member.name} role={member.role} />
                  </Reveal>
                ))}
              </div>
            </div>
            <div>
              <span className="eyebrow">Canvas</span>
              <div className="mt-4 grid gap-4">
                {canvas.map((member, i) => (
                  <Reveal key={member.name} delay={0.04 * i}>
                    <MemberCard name={member.name} role={member.role} />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      <Reveal delay={0.06}>
        <section className="card mt-16 flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center">
          <div>
            <p className="text-xl font-semibold text-navy">
              Looking for someone who&rsquo;s graduated?
            </p>
            <p className="mt-1 text-[var(--ink-soft)]">
              Coordinators and executives from earlier years.
            </p>
          </div>
          <Link
            to="/alumni"
            className="pill flex-shrink-0 px-6 py-3 text-sm font-semibold text-navy no-underline"
          >
            Alumni →
          </Link>
        </section>
      </Reveal>
    </main>
  )
}
