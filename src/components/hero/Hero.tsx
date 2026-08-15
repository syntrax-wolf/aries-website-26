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
      className="relative flex flex-col overflow-hidden lg:min-h-[100dvh]"
    >
      {/*
       * Mobile only: the sky (moon + starfield) is its own boxed scene at the
       * top of the hero — normal document flow, fixed-ish height — with the
       * stag rendered as a separate block immediately after it. That keeps
       * the two from ever overlapping, so the moon can't paint over the
       * silhouette (which is what made the stag disappear entirely on narrow
       * screens) and the stag isn't a cropped, dominant, full-bleed slab.
       * At lg+ this box switches back to `absolute inset-0` — i.e. the exact
       * full-bleed layer the desktop composition has always used.
       */}
      <div className="relative isolate h-[58dvh] max-h-[560px] min-h-[400px] overflow-hidden lg:absolute lg:inset-0 lg:z-0 lg:h-auto lg:max-h-none lg:min-h-0">
        <motion.div
          style={{ y: sky }}
          className="absolute inset-x-0 -top-[15%] z-0 h-[140%]"
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
       * Stag — a normal-flow block right after the sky scene on mobile, so it
       * reads as its own beat below the moon rather than a cropped backdrop.
       * At lg+: absolute, bottom-anchored, in front of the sky — byte-identical
       * to the original desktop composition.
       */}
      <motion.div
        style={{ y: deer }}
        className="relative z-0 lg:absolute lg:inset-x-0 lg:bottom-0 lg:z-[3]"
      >
        <img
          src="/deer_cleaned.png"
          alt="A stag with circuit-board antlers standing on a cliff at sunset"
          className="h-auto w-full object-contain object-bottom select-none"
          draggable={false}
        />
        <div className="absolute inset-x-0 bottom-0 z-[5] h-28 bg-gradient-to-b from-transparent to-cream" />
      </motion.div>

      {/*
       * Hero copy. Absolutely positioned so it overlays the sky scene (the
       * cream text needs that dark backdrop to stay legible) rather than
       * taking its own slot in the flow. On mobile it matches the sky box's
       * own height exactly; at lg+ it covers the full section, reproducing
       * the original flex-centered composition.
       */}
      <motion.div
        style={{ y: copy }}
        className="page-wrap absolute inset-x-0 top-0 z-10 flex h-[58dvh] max-h-[560px] min-h-[400px] items-center pt-12 pb-10 sm:pt-14 sm:pb-12 lg:inset-0 lg:h-auto lg:max-h-none lg:min-h-0 lg:pt-16 lg:pb-40"
      >
        <div className="relative max-w-2xl">
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
            className="mt-4 text-[clamp(2.75rem,10vw,6rem)] leading-[0.98] font-extrabold tracking-tight text-cream [text-shadow:0_3px_32px_rgba(20,16,62,0.75)]"
          >
            Building the
            <br />
            Future with AI.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.3 }}
            className="mt-5 text-xl font-semibold text-cream/85 [text-shadow:0_2px_20px_rgba(20,16,62,0.8)] sm:text-2xl lg:text-3xl"
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
