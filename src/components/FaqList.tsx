import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Faq } from '../data/stats'

export default function FaqList({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState(0)

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div
            key={item.q}
            className="rounded-3xl bg-white p-2 shadow-[0_18px_40px_-28px_rgba(23,19,67,0.4)]"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-4 rounded-2xl px-4 py-4 text-left"
            >
              <span
                className={`icon-tile h-9 w-9 flex-shrink-0 text-xs font-bold transition ${
                  isOpen ? '' : 'opacity-90'
                }`}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="flex-1 text-lg font-bold text-navy">
                {item.q}
              </span>
              <span className="text-2xl leading-none font-light text-navy/70">
                {isOpen ? '\u2212' : '+'}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="mx-4 mb-3 rounded-2xl bg-lavender px-6 py-5 text-[15px] leading-relaxed text-navy/80">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
