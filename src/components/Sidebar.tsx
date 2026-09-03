import { Link, useRouterState } from '@tanstack/react-router'
import {
  ArrowRightIcon,
  BookOpen,
  CalendarDots,
  CaretLeftIcon,
  GraduationCap,
  House,
  ListIcon,
  PhoneCall,
  SquaresFour,
  UsersFour,
} from '@phosphor-icons/react'
import AriesMark from './icons/AriesMark'
import { useSidebar } from './SidebarContext'

/*
 * Single source of truth for site navigation. This used to disagree with the
 * old top navbar (different items, different order); the navbar is gone and
 * everything routes through here now.
 */
const NAV = [
  { to: '/', label: 'Home', icon: House },
  { to: '/events', label: 'Events', icon: CalendarDots },
  { to: '/projects', label: 'Projects', icon: SquaresFour },
  { to: '/team', label: 'Team', icon: UsersFour },
  { to: '/about', label: 'Resources', icon: BookOpen },
  { to: '/contact', label: 'Contact', icon: PhoneCall },
] as const

/* Items that fit the mobile bottom bar. */
const MOBILE_NAV = [NAV[0], NAV[1], NAV[2], NAV[3], NAV[5]] as const

function useIsActive() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  /*
   * Requires a path-segment boundary. A bare startsWith would light up two
   * items at once the moment a route like /about-us or /contact-sales exists.
   */
  return (to: string) =>
    to === '/'
      ? pathname === '/'
      : pathname === to || pathname.startsWith(`${to}/`)
}

export default function Sidebar() {
  const isActive = useIsActive()
  const { hidden, toggle } = useSidebar()

  return (
    <>
      {/*
       * Reveal button. Only rendered once the rail is hidden, so it never
       * competes with the collapse control inside the rail itself.
       * Top-left. This used to collide with page headings, but that was the
       * old left-aligned `max-w-5xl` containers starting at x≈32px; pages now
       * use the centred `.page-wrap`, which leaves a clear gutter.
       */}
      {hidden && (
        <button
          type="button"
          onClick={toggle}
          aria-label="Show navigation"
          aria-expanded={false}
          aria-controls="sidebar-rail"
          className="fixed top-5 left-5 z-50 hidden h-11 w-11 place-items-center rounded-full bg-navy text-cream shadow-lg transition hover:bg-navy-soft focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none lg:grid"
        >
          <ListIcon className="h-5 w-5" weight="bold" />
        </button>
      )}

      {/* ── Desktop rail ─────────────────────────────────────────── */}
      {/*
       * A warm off-white a shade lighter than the page cream, separated by a
       * hairline rather than a hard colour break — the rail reads as a distinct
       * navigation surface without fighting the page it sits beside.
       */}
      {/*
       * `inert` (React 19) is what actually takes the off-canvas rail out of
       * the tab order. aria-hidden + pointer-events-none hides it from screen
       * readers and the mouse but leaves every link keyboard-focusable, so a
       * Tab user would land on invisible off-screen controls.
       * overflow-y-auto rather than hidden: on a short viewport the pinned CTA
       * and Alumni link would otherwise be clipped with no way to reach them.
       */}
      <aside
        id="sidebar-rail"
        inert={hidden}
        className={`fixed inset-y-0 left-0 z-40 hidden w-[240px] flex-col overflow-y-auto border-r border-[var(--line)] bg-[#fdf9f3] transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] lg:flex ${
          hidden ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        {/* Collapse control */}
        <button
          type="button"
          onClick={toggle}
          aria-label="Hide navigation"
          aria-expanded
          aria-controls="sidebar-rail"
          className="absolute top-5 right-4 z-10 grid h-8 w-8 place-items-center rounded-full text-navy/35 transition hover:bg-navy/5 hover:text-navy focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
        >
          <CaretLeftIcon className="h-4 w-4" weight="bold" />
        </button>

        {/* Logo */}
        <Link
          to="/"
          className="relative flex flex-col items-center pt-10 pb-9 no-underline"
        >
          <AriesMark className="h-12 w-12 text-navy" />
          <p className="mt-3 text-lg font-extrabold tracking-[0.28em] text-navy">
            ARIES
          </p>
          <p className="text-[10px] font-semibold tracking-[0.4em] text-navy/55">
            IIT DELHI
          </p>
        </Link>

        {/* Nav */}
        <nav className="relative flex flex-col gap-1 px-4">
          {NAV.map(({ to, label, icon: Icon }) => {
            const active = isActive(to)

            return (
              <Link
                key={to}
                to={to}
                aria-current={active ? 'page' : undefined}
                className={`group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold no-underline transition-all duration-200 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none ${
                  active
                    ? 'bg-navy text-cream'
                    : 'text-navy/70 hover:bg-navy/[0.05] hover:text-navy'
                }`}
              >
                <Icon
                  className={`h-5 w-5 flex-shrink-0 transition-colors ${
                    active ? 'text-cream' : 'text-navy/45 group-hover:text-navy'
                  }`}
                  weight={active ? 'fill' : 'regular'}
                />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Bottom cluster: primary CTA + alumni */}
        <div className="relative mt-auto flex flex-col gap-2 px-4 pb-8">
          <Link
            to="/contact"
            className="group flex items-center justify-center gap-2 rounded-xl bg-navy px-4 py-3 text-sm font-bold text-cream no-underline transition hover:bg-navy-soft"
          >
            Join Us
            <ArrowRightIcon
              weight="bold"
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            />
          </Link>

          <Link
            to="/alumni"
            aria-current={isActive('/alumni') ? 'page' : undefined}
            className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold no-underline transition-all focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none ${
              isActive('/alumni')
                ? 'bg-navy text-cream'
                : 'text-navy/45 hover:bg-navy/[0.05] hover:text-navy'
            }`}
          >
            <GraduationCap
              className="h-5 w-5 flex-shrink-0"
              weight={isActive('/alumni') ? 'fill' : 'regular'}
            />
            Alumni
          </Link>
        </div>
      </aside>

      {/* ── Mobile bottom bar ────────────────────────────────────── */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex justify-around border-t border-[var(--line)] bg-[#fdf9f3] px-2 py-2 lg:hidden">
        {MOBILE_NAV.map(({ to, label, icon: Icon }) => {
          const active = isActive(to)
          return (
            <Link
              key={to}
              to={to}
              aria-current={active ? 'page' : undefined}
              className={`flex flex-col items-center gap-1 rounded-lg px-2.5 py-1.5 text-[10px] font-semibold no-underline transition-colors ${
                active ? 'text-navy' : 'text-navy/50'
              }`}
            >
              <Icon className="h-5 w-5" weight={active ? 'fill' : 'regular'} />
              {label}
            </Link>
          )
        })}
      </div>
    </>
  )
}
