import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowRightIcon, ListIcon, XIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import AriesMark from './icons/AriesMark'

const NAV_LINKS = [
  { to: '/events', label: 'Events' },
  { to: '/projects', label: 'Projects' },
  { to: '/team', label: 'Team' },
  { to: '/about', label: 'Resources' },
  { to: '/contact', label: 'Contact Us' },
] as const

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const solid = scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid
          ? 'border-b border-[var(--line)] bg-cream/85 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <nav className="page-wrap flex items-center justify-between gap-4 py-4 lg:h-[88px] lg:py-0">
        <Link
          to="/"
          className="flex flex-shrink-0 items-center gap-2.5 no-underline sm:gap-3"
          onClick={() => setOpen(false)}
        >
          <AriesMark className="h-8 w-8 text-navy sm:h-9 sm:w-9" />
          <span className="flex flex-col leading-none">
            <span className="text-lg font-extrabold tracking-[0.28em] text-navy sm:text-xl">
              ARIES
            </span>
            <span className="mt-1 text-[10px] font-semibold tracking-[0.4em] text-navy/70 sm:text-[11px]">
              IIT DELHI
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-9 text-[15px] lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="nav-link"
              activeProps={{ className: 'nav-link is-active' }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-cream no-underline transition hover:-translate-y-0.5 hover:bg-navy-soft"
          >
            Join Us
            <ArrowRightIcon
              weight="bold"
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="grid h-10 w-10 place-items-center rounded-full text-navy transition hover:bg-navy/5 lg:hidden"
        >
          {open ? (
            <XIcon className="h-6 w-6" weight="bold" />
          ) : (
            <ListIcon className="h-6 w-6" weight="bold" />
          )}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-[var(--line)] bg-cream/95 backdrop-blur-xl lg:hidden"
          >
            <div className="page-wrap flex flex-col gap-1 py-4 text-base">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="rounded-xl px-3 py-3 font-medium text-navy no-underline transition hover:bg-navy/5"
                  activeProps={{ className: 'rounded-xl px-3 py-3 font-semibold text-accent bg-accent/5 no-underline' }}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-cream no-underline"
                onClick={() => setOpen(false)}
              >
                Join Us
                <ArrowRightIcon className="h-4 w-4" weight="bold" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
