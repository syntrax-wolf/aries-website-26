import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const easeOut = [0.16, 1, 0.3, 1] as const

/** Fades + lifts its children into view once, when scrolled into the viewport. */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: easeOut, delay }}
    >
      {children}
    </motion.div>
  )
}
