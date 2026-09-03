import { Link } from '@tanstack/react-router'
import { ArrowRightIcon } from '@phosphor-icons/react'
import AriesMark from './icons/AriesMark'
import MountainRange from './hero/MountainRange'

const COLUMNS = [
  {
    heading: 'Navigate',
    links: [
      { to: '/events', label: 'Events' },
      { to: '/projects', label: 'Projects' },
      { to: '/team', label: 'Team' },
      /* Alumni lives only in the desktop rail's bottom cluster, which is
       * hidden below lg — without this entry the route is unreachable on
       * mobile by any means other than typing the URL. */
      { to: '/alumni', label: 'Alumni' },
      { to: '/about', label: 'Resources' },
    ],
  },
  {
    heading: 'Connect',
    /* "Join Us" was a third label pointing at /contact alongside "Contact Us" —
     * two names for one destination in the same column. Dropped. */
    links: [
      { to: '/contact', label: 'Contact Us' },
      { to: '/contact', label: 'Newsletter' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { to: '/about', label: 'Privacy Policy' },
      { to: '/about', label: 'Terms of Service' },
    ],
  },
] as const

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      {/* Mountain silhouette baked into the footer background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-full opacity-40"
      >
        <MountainRange depth={2} className="absolute inset-0 h-full w-full" />
      </div>

      <div className="page-wrap relative z-10 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.6fr]">
          {/* Brand */}
          <div className="max-w-xs">
            <Link to="/" className="-my-1 flex items-center gap-3 py-1 no-underline">
              <AriesMark className="h-9 w-9 text-cream" />
              <span className="flex flex-col leading-none">
                <span className="text-lg font-extrabold tracking-[0.28em] text-cream">
                  ARIES
                </span>
                <span className="mt-1 text-[10px] font-semibold tracking-[0.42em] text-cream/70">
                  IIT DELHI
                </span>
              </span>
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-cream/70">
              Building AI beyond the classroom. Together, we learn, build and
              create impact.
            </p>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="text-base font-bold text-cream">{col.heading}</p>
              <ul className="mt-5 flex flex-col gap-3.5 text-sm">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-cream/70 no-underline transition hover:text-cream"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <p className="text-base font-bold text-cream">Stay in the loop</p>
            <p className="mt-5 text-sm leading-relaxed text-cream/70">
              Get updates on events, projects and opportunities.
            </p>
            <form
              className="mt-5 flex items-center gap-2 rounded-full border border-white/25 bg-white/5 py-1.5 pr-1.5 pl-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                aria-label="Email address"
                className="min-w-0 flex-1 bg-transparent text-sm text-cream placeholder:text-cream/50 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full bg-cream text-navy transition hover:bg-white sm:h-9 sm:w-9"
              >
                <ArrowRightIcon className="h-4 w-4" weight="bold" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 text-center text-sm text-cream/60">
          &copy; {year} Aries, IIT Delhi. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
