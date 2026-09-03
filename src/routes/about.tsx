import { createFileRoute, Link } from '@tanstack/react-router'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import { valuePills } from '../data/stats'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <main className="page-wrap py-10 pb-20">
      <PageHeader
        eyebrow="About"
        title="ARIES at IIT Delhi"
        subtitle="A student-led AI research and engineering collective. We run reading groups, ship projects, and host talks — with a public record you can check."
      />

      <Reveal delay={0.08}>
        <section className="card mt-12 p-8 sm:p-10">
          <p className="text-xs font-semibold tracking-[0.2em] text-[var(--ink-soft)] uppercase">
            Mission
          </p>
          <p className="mt-4 text-2xl leading-snug font-semibold text-navy sm:text-3xl">
            To foster a community passionate about AI/ML and empower students
            to build impactful solutions.
          </p>
        </section>
      </Reveal>

      <section className="mt-16">
        <h2 className="chapter-label text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
          What we do
        </h2>
        <div className="mt-6 flex flex-col gap-3">
          {valuePills.map((pill, i) => (
            <Reveal key={pill} delay={0.05 * i}>
              <div className="card px-6 py-5 text-lg text-navy">{pill}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal delay={0.06}>
        <section className="card mt-16 flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center">
          <p className="text-xl font-semibold text-navy">
            Want to know who&rsquo;s behind it all?
          </p>
          <Link
            to="/team"
            className="pill flex-shrink-0 px-6 py-3 text-sm font-semibold text-navy no-underline"
          >
            Meet the Team →
          </Link>
        </section>
      </Reveal>
    </main>
  )
}
