import { Link, useRouterState } from '@tanstack/react-router'
import {
  CalendarDots,
  GraduationCap,
  House,
  SquaresFour,
  UsersFour,
  PhoneCall,
  BookOpen,
} from '@phosphor-icons/react'
import AriesMark from './icons/AriesMark'

const NAV = [
  { to: '/', label: 'Home', icon: House },
  { to: '/projects', label: 'Projects', icon: SquaresFour },
  { to: '/team', label: 'Team', icon: UsersFour },
  { to: '/contact', label: 'Contact', icon: PhoneCall },
  { to: '/events', label: 'Events', icon: CalendarDots },
  { to: '/about', label: 'Resources', icon: BookOpen },
] as const

export default function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  return (
    <>
      {/* ── Desktop sidebar ─────────────────────────────────────── */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[210px] flex-col overflow-hidden lg:flex"
        style={{
          background: 'linear-gradient(160deg, #0f1a5c 0%, #0a1240 40%, #060d30 100%)',
        }}
      >
        {/* Starfield overlay */}
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.55) 1px, transparent 1px),
                            radial-gradient(circle, rgba(255,255,255,0.35) 1px, transparent 1px),
                            radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)`,
          backgroundSize: '80px 80px, 50px 50px, 120px 120px',
          backgroundPosition: '10px 10px, 35px 25px, 60px 50px',
        }} />

        {/* Logo */}
        <div className="relative flex flex-col items-center pb-8 pt-10">
          <AriesMark className="h-12 w-12 text-white" />
          <p className="mt-3 text-lg font-extrabold tracking-[0.28em] text-white">ARIES</p>
          <p className="text-[10px] font-semibold tracking-[0.4em] text-white/60">IIT DELHI</p>
        </div>

        {/* Nav */}
        <nav className="relative flex flex-col gap-1 px-4">
          {NAV.map(({ to, label, icon: Icon }) => {
            const active = to === '/'
              ? pathname === '/'
              : pathname.startsWith(to)

            return (
              <Link
                key={to}
                to={to}
                className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold no-underline transition-all duration-200 ${
                  active
                    ? 'bg-white text-navy shadow-lg'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon
                  className={`h-5 w-5 flex-shrink-0 ${active ? 'text-navy' : 'text-white/60 group-hover:text-white'}`}
                  weight={active ? 'fill' : 'regular'}
                />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Alumni link at bottom */}
        <div className="relative mt-auto px-4 pb-8">
          <Link
            to="/alumni"
            className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold no-underline transition-all ${
              pathname.startsWith('/alumni')
                ? 'bg-white text-navy shadow-lg'
                : 'text-white/50 hover:bg-white/10 hover:text-white/80'
            }`}
          >
            <GraduationCap
              className="h-5 w-5 flex-shrink-0"
              weight={pathname.startsWith('/alumni') ? 'fill' : 'regular'}
            />
            Alumni
          </Link>
        </div>
      </aside>

      {/* ── Mobile bottom bar ────────────────────────────────────── */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 flex justify-around border-t border-white/10 px-2 py-2 lg:hidden"
        style={{ background: '#0a1240' }}
      >
        {NAV.slice(0, 5).map(({ to, label, icon: Icon }) => {
          const active = to === '/' ? pathname === '/' : pathname.startsWith(to)
          return (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center gap-1 rounded-lg px-3 py-1.5 text-[10px] font-semibold no-underline ${
                active ? 'text-white' : 'text-white/50'
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
