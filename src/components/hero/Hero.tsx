import { useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowRight } from '@phosphor-icons/react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

const easeOut = [0.16, 1, 0.3, 1] as const

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  // Track scroll from the top of the hero until it has fully left the viewport.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Parallax: the sky/sun drifts DOWN fastest (it "sets"), the deer/cliff
  // foreground trails behind more slowly, and the copy lifts gently. The copy
  // keeps its full color/opacity as it scrolls — no fade.
  const range = reduce ? [0, 0] : undefined
  const sky = useTransform(scrollYProgress, [0, 1], range ?? [0, 280])
  const deer = useTransform(scrollYProgress, [0, 1], range ?? [0, 110])
  const copy = useTransform(scrollYProgress, [0, 1], range ?? [0, -70])

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* --- Parallax scene (behind everything) --- */}
      <div className="absolute inset-0 -z-10">
        {/* Sky */}
        <motion.div
          style={{ y: sky }}
          className="absolute inset-x-0 -top-[15%] h-[140%]"
        >
          <img
            src="/background.png"
            alt=""
            className="h-full w-full object-cover object-top"
            fetchPriority="high"
          />
        </motion.div>

        {/* Foreground deer + cliff, anchored bottom, weighted to the right */}
        <motion.div
          style={{ y: deer }}
          className="absolute inset-x-0 bottom-0"
        >
          <img
            src="/deer_cleaned.png"
            alt="A stag with circuit-board antlers standing on a cliff at sunset"
            className="h-auto w-full object-contain object-bottom select-none"
            draggable={false}
          />
        </motion.div>

        {/* Soft cream fade into the next section */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-cream" />
      </div>

      {/* --- Hero copy --- */}
      <motion.div
        style={{ y: copy }}
        className="page-wrap relative flex flex-1 items-center pt-24 pb-40 sm:pt-20 lg:pt-16"
      >
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.1 }}
            className="text-base font-medium text-navy/80 sm:text-lg lg:text-xl"
          >
            Official AI &amp; ML Club of IIT Delhi
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.18 }}
            className="mt-4 text-[clamp(2.75rem,10vw,6rem)] leading-[0.98] font-extrabold tracking-tight text-navy"
          >
            Building the
            <br />
            Future with AI.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.3 }}
            className="mt-5 text-xl font-semibold text-navy sm:text-2xl lg:text-3xl"
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
