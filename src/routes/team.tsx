import { createFileRoute, Link } from '@tanstack/react-router'
import AriesEmblem from '../components/icons/AriesEmblem'
import MemberCard from '../components/MemberCard'
import { coordinators, executives, teamYear } from '../data/team'

export const Route = createFileRoute('/team')({ component: Team })

function Team() {
  const brain = executives.filter((m) => m.wing === 'BRAIN')
  const canvas = executives.filter((m) => m.wing === 'CANVAS')

  return (
    <main className="page-wrap py-10">
      <p className="tag">{teamYear}</p>
      <h1 className="mt-4 text-4xl font-bold text-navy sm:text-6xl">
        Meet the Team
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-[var(--ink-soft)]">
        The people behind the workshops, papers, and projects — coordinators,
        executives, and everyone who keeps ARIES shipping.
      </p>

      <div className="card card--dark relative mt-10 flex h-64 items-center overflow-hidden p-8 sm:h-80 sm:p-10">
        <AriesEmblem className="absolute -right-10 -bottom-10 h-64 w-64 text-white/10 sm:h-80 sm:w-80" />
        <p className="z-10 max-w-md text-xl leading-snug font-semibold text-cream sm:text-2xl">
          Every workshop, paper, and project on this site was built by the
          people below — {teamYear}&rsquo;s roster of coordinators and
          executives.
        </p>
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-navy sm:text-3xl">
          Coordinators
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {coordinators.map((member) => (
            <MemberCard
              key={member.name}
              name={member.name}
              role={member.role}
            />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-navy sm:text-3xl">
          Executives
        </h2>
        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Brain</span>
            <div className="mt-4 grid gap-4">
              {brain.map((member) => (
                <MemberCard
                  key={member.name}
                  name={member.name}
                  role={member.role}
                />
              ))}
            </div>
          </div>
          <div>
            <span className="eyebrow">Canvas</span>
            <div className="mt-4 grid gap-4">
              {canvas.map((member) => (
                <MemberCard
                  key={member.name}
                  name={member.name}
                  role={member.role}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="card mt-16 flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center">
        <div>
          <p className="text-xl font-bold text-navy">
            Looking for someone who&rsquo;s graduated?
          </p>
          <p className="mt-1 text-[var(--ink-soft)]">
            See the coordinators and executives who came before this
            year&rsquo;s roster.
          </p>
        </div>
        <Link
          to="/alumni"
          className="pill flex-shrink-0 px-6 py-3 text-sm font-semibold text-navy no-underline"
        >
          Meet our Alumni →
        </Link>
      </section>
    </main>
  )
}
