import { createFileRoute, Link } from '@tanstack/react-router'
import { valuePills } from '../data/stats'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <main className="px-8 py-10 max-w-5xl">
      <h1 className="text-4xl font-bold text-navy sm:text-6xl">
        Find out about us
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--ink-soft)]">
        ARIES is a student-led AI research and engineering collective founded
        at IIT Delhi. We&rsquo;re not just learning AI — we&rsquo;re building
        with it, breaking it, and making it better.
      </p>

      <section className="card mt-12 p-8 sm:p-10">
        <p className="text-xs font-semibold tracking-[0.2em] text-[var(--ink-soft)] uppercase">
          Our Mission
        </p>
        <p className="mt-4 text-2xl leading-snug font-semibold text-navy sm:text-3xl">
          To foster a community passionate about AI/ML and empower students
          to build impactful solutions.
        </p>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-navy sm:text-3xl">
          What we do
        </h2>
        <div className="mt-6 flex flex-col gap-4">
          {valuePills.map((pill) => (
            <div key={pill} className="pill px-6 py-5 text-lg text-navy">
              {pill}
            </div>
          ))}
        </div>
      </section>

      <section className="card mt-16 flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center">
        <div>
          <p className="text-xl font-bold text-navy">
            Want to know who&rsquo;s behind it all?
          </p>
        </div>
        <Link
          to="/team"
          className="pill flex-shrink-0 px-6 py-3 text-sm font-semibold text-navy no-underline"
        >
          Meet the Team →
        </Link>
      </section>
    </main>
  )
}
