import { useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowRight } from '@phosphor-icons/react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Clouds from './Clouds'
import FallingStars from './FallingStars'

const easeOut = [0.16, 1, 0.3, 1] as const

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const range = reduce ? [0, 0] : undefined
  const sky = useTransform(scrollYProgress, [0, 1], range ?? [0, 280])
  const deer = useTransform(scrollYProgress, [0, 1], range ?? [0, 110])
  const copy = useTransform(scrollYProgress, [0, 1], range ?? [0, -70])

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100dvh] flex-col overflow-hidden"
    >
      {/*
       * One frame on every breakpoint — the PR desktop stack. Sky stays in
       * its own isolated context (z-0) so the moon cannot paint over the
       * stag; the stag is a sibling at z-[3], contain-sized, never a
       * full-bleed cover crop. Mobile drops the extra 140% parallax zoom
       * so more of the dusk plate stays in the first screen.
       */}
      <div className="absolute inset-0 isolate z-0 overflow-hidden">
        <motion.div
          style={{ y: sky }}
          className="absolute inset-0 z-0 lg:inset-x-0 lg:-top-[15%] lg:h-[140%]"
        >
          <Clouds />
          <FallingStars />
        </motion.div>

        {/*
         * Evening light. Weighted to the crown and fading out before the
         * horizon, so the painted sunset still burns along the ridge — dusk,
         * not night.
         */}
        <div
          aria-hidden
          className="absolute inset-0 z-[2]"
          style={{
            background:
              'linear-gradient(180deg, rgba(20,16,62,0.66) 0%, rgba(28,21,76,0.44) 28%, rgba(34,24,86,0.2) 52%, rgba(23,19,67,0.04) 76%)',
          }}
        />

        {/* Left-edge scrim: gives the cream headline a darker ground to sit on. */}
        <div
          aria-hidden
          className="absolute inset-0 z-[4]"
          style={{
            background:
              'linear-gradient(100deg, rgba(20,16,62,0.7) 0%, rgba(23,19,67,0.46) 24%, rgba(23,19,67,0.18) 48%, rgba(23,19,67,0) 68%)',
          }}
        />
      </div>

      {/*
       * Stag — same bottom-anchored overlay as desktop. On a phone the plate
       * is a bit wider than the viewport and right-weighted so the circuit
       * antlers read without becoming a cropped slab; lg+ is w-full contain.
       */}
      <motion.div
        style={{ y: deer }}
        className="absolute inset-x-0 bottom-0 z-[3]"
      >
        <img
          src="/deer_cleaned.png"
          alt="A stag with circuit-board antlers standing on a cliff at sunset"
          className="block h-auto w-[165%] max-w-none -ml-[40%] object-contain object-bottom select-none lg:ml-0 lg:w-full"
          draggable={false}
        />
        <div className="absolute inset-x-0 bottom-0 z-[5] h-28 bg-gradient-to-b from-transparent to-cream" />
      </motion.div>

      {/*
       * Hero copy overlays the dusk sky. Mobile sits it at the top so it
       * clears the stag; lg+ is the original vertically-centered lockup.
       */}
      <motion.div
        style={{ y: copy }}
        className="page-wrap absolute inset-0 z-10 flex items-start pt-10 pb-28 sm:items-center sm:pt-14 sm:pb-12 lg:pt-16 lg:pb-40"
      >
        <div className="relative max-w-[16rem] sm:max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.1 }}
            className="text-base font-medium text-cream/85 [text-shadow:0_2px_18px_rgba(20,16,62,0.8)] sm:text-lg lg:text-xl"
          >
            Official AI &amp; ML Club of IIT Delhi
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.18 }}
            className="mt-3 text-[clamp(2.4rem,9.5vw,6rem)] leading-[0.98] font-extrabold tracking-tight text-cream [text-shadow:0_3px_32px_rgba(20,16,62,0.75)] sm:mt-4 sm:text-[clamp(2.75rem,10vw,6rem)]"
          >
            Building the
            <br />
            Future with AI.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.3 }}
            className="mt-3 text-lg font-semibold text-cream/85 [text-shadow:0_2px_20px_rgba(20,16,62,0.8)] sm:mt-5 sm:text-2xl lg:text-3xl"
          >
            Research. Build. Create Impact.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.42 }}
            className="mt-8 flex flex-wrap gap-3 sm:mt-10 sm:gap-4"
          >
            <Link
              to="/events"
              className="group inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-cream no-underline shadow-lg shadow-navy/20 transition hover:-translate-y-0.5 hover:bg-navy-soft sm:px-7 sm:text-base"
            >
              Explore Events
              <ArrowRight
                weight="bold"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-navy/25 bg-white/50 px-6 py-3.5 text-sm font-semibold text-navy no-underline backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/80 sm:px-7 sm:text-base"
            >
              View Projects
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
