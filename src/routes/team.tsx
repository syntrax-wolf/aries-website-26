import { createFileRoute, Link } from '@tanstack/react-router'
import AriesEmblem from '../components/icons/AriesEmblem'
import MemberCard from '../components/MemberCard'
import { coordinators, executives, teamYear } from '../data/team'

export const Route = createFileRoute('/team')({ component: Team })

function Team() {
  const brain = executives.filter((m) => m.wing === 'BRAIN')
  const canvas = executives.filter((m) => m.wing === 'CANVAS')

  return (
    <main className="px-8 py-10 max-w-5xl">
      <p className="tag">{teamYear}</p>
      <h1 className="mt-4 text-4xl font-bold text-navy sm:text-6xl">
        Meet the Team
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-[var(--ink-soft)]">
        The people behind the workshops, papers, and projects — coordinators,
        executives, and everyone who keeps ARIES shipping.
      </p>

      <div className="card relative mt-10 flex h-64 items-center justify-center overflow-hidden bg-navy sm:h-80">
        <AriesEmblem className="absolute -right-10 -bottom-10 h-64 w-64 text-white/10 sm:h-80 sm:w-80" />
        <p className="z-10 text-sm font-semibold tracking-[0.2em] text-white/70 uppercase">
          Full Team Photo — {teamYear}
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
            <p className="text-xs font-semibold tracking-[0.2em] text-[var(--ink-soft)] uppercase">
              Brain
            </p>
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
            <p className="text-xs font-semibold tracking-[0.2em] text-[var(--ink-soft)] uppercase">
              Canvas
            </p>
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
            Our alumni are building, leading, and inspiring across the world.
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
