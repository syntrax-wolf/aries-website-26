import { createFileRoute } from '@tanstack/react-router'
import {
  ArrowRightIcon,
  CalendarBlankIcon,
  ChatCircleDotsIcon,
  HandshakeIcon,
  MagnifyingGlassIcon,
  RocketLaunchIcon,
  UsersThreeIcon,
} from '@phosphor-icons/react'
import Hero from '../components/hero/Hero'
import Reveal from '../components/Reveal'
import FaqList from '../components/FaqList'
import { faqs, headlineStats } from '../data/stats'

export const Route = createFileRoute('/')({ component: Home })

const STAT_ICONS = [UsersThreeIcon, CalendarBlankIcon, RocketLaunchIcon, HandshakeIcon]

const WHAT_WE_DO = [
  { icon: RocketLaunchIcon, label: 'Shipping cool projects' },
  { icon: ChatCircleDotsIcon, label: 'Discussing Interesting Topics' },
  { icon: CalendarBlankIcon, label: 'Hosting Industry Events' },
  { icon: MagnifyingGlassIcon, label: 'Researching cool stuff' },
] as const

function Home() {
  return (
    <main>
      <Hero />

      {/* --- Stat strip (below the fold, own spacing) --- */}
      <section className="page-wrap relative z-10 pt-14 sm:pt-20">
        <Reveal className="card grid grid-cols-2 gap-y-8 rounded-[2rem] bg-white/95 px-6 py-8 backdrop-blur sm:grid-cols-4 sm:divide-x sm:divide-[var(--line)] sm:px-4 sm:py-10">
          {headlineStats.map((stat, i) => {
            const Icon = STAT_ICONS[i]
            return (
              <div
                key={stat.label}
                className="flex flex-col items-center px-4 text-center"
              >
                <Icon className="h-10 w-10 text-accent sm:h-11 sm:w-11" weight="regular" />
                <p className="mt-4 text-3xl font-extrabold text-navy sm:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-medium text-navy/60 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            )
          })}
        </Reveal>
      </section>

      {/* --- What we do + Aries dictionary --- */}
      <section className="page-wrap grid gap-12 py-24 lg:grid-cols-2 lg:gap-16 lg:py-32">
        <div>
          <Reveal>
            <span className="eyebrow" data-both>
              What we do
            </span>
            <h2 className="mt-6 max-w-md text-4xl leading-[1.05] font-extrabold text-navy sm:text-5xl">
              More than a club, a track record you can{' '}
              <span className="accent-mark">Ctrl + F</span>
            </h2>
          </Reveal>

          <div className="mt-10 flex flex-col gap-5">
            {WHAT_WE_DO.map((item, i) => (
              <Reveal key={item.label} delay={0.08 * i}>
                <div className="group flex items-center gap-4 rounded-[1.75rem] bg-white px-5 py-4 shadow-[0_20px_45px_-30px_rgba(23,19,67,0.5)] transition hover:-translate-y-0.5 sm:gap-5 sm:px-6 sm:py-5">
                  <span className="icon-tile h-12 w-12 flex-shrink-0 sm:h-14 sm:w-14">
                    <item.icon className="h-6 w-6" weight="fill" />
                  </span>
                  <span className="flex-1 text-base font-bold text-navy sm:text-lg">
                    {item.label}
                  </span>
                  <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-lavender text-accent transition group-hover:bg-accent group-hover:text-white sm:h-11 sm:w-11">
                    <ArrowRightIcon className="h-5 w-5" weight="bold" />
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Dictionary card */}
        <Reveal delay={0.12} className="lg:pt-4">
          <div className="relative h-full overflow-hidden rounded-[2rem] bg-navy p-9 text-cream shadow-[0_40px_80px_-40px_rgba(23,19,67,0.7)] sm:p-12">
            <span className="absolute top-8 right-9 h-3 w-3 rounded-full bg-accent-soft" />
            <span
              aria-hidden
              className="pointer-events-none absolute -right-10 -bottom-16 h-56 w-56 rounded-full bg-accent/40 blur-3xl"
            />

            <p className="text-6xl font-extrabold tracking-tight sm:text-7xl">
              Aries
            </p>
            <p className="mt-5 text-2xl font-bold text-accent-soft">noun</p>
            <p className="mt-3 text-lg text-cream/70">
              /&#712;er-&#275;z/ &bull; &#712;e-, &#712;&#275;z-, &#712;&#257;r-&#275;z, -r&#275;z/
            </p>

            <div className="my-7 h-px w-full bg-white/12" />

            <p className="max-w-md text-lg leading-relaxed text-cream/90">
              The first sign of the zodiac in astrology, characterised by an
              absolute courage and immense ambition. The Aries mind strives for
              prominence in every project it undertakes.
            </p>

            <div className="my-7 h-px w-full bg-white/12" />

            <ul className="flex flex-col gap-4 text-lg text-cream/90">
              <li>A student-led AI research and engineering collective</li>
              <li>Founded at IIT Delhi</li>
              <li className="relative pl-5">
                <span className="absolute top-2.5 left-0 h-1 w-3 rounded bg-accent-soft" />
                Driven by curiosity, powered by collaboration
              </li>
            </ul>
          </div>
        </Reveal>
      </section>

      {/* --- FAQ --- */}
      <section className="bg-lavender py-24 lg:py-32">
        <div className="page-wrap grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <span className="eyebrow" data-both>
                FAQs
              </span>
              <h2 className="mt-6 text-5xl leading-[1.02] font-extrabold text-navy">
                Frequently
                <br />
                Asked{' '}
                <span className="accent-mark">Questions</span>
              </h2>
              <p className="mt-6 max-w-xs text-lg leading-relaxed text-navy/60">
                Everything you need to know about Aries and how to get involved.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <FaqList items={faqs} />
          </Reveal>
        </div>
      </section>
    </main>
  )
}
