import type { Faq } from '../data/stats'
import { useExpandOverlay } from './ExpandOverlay'

export default function FaqList({ items }: { items: Faq[] }) {
  const { openKey, toggle } = useExpandOverlay()

  return (
    <div className="aries-faq__list">
      {items.map((item, i) => {
        const key = `faq:${i}`
        const isOpen = openKey === key
        return (
          <div
            key={item.q}
            className={`aries-faq__item${isOpen ? ' expand-raised' : ''}`}
          >
            <button
              type="button"
              className="aries-faq__question"
              onClick={() => toggle(key)}
              aria-expanded={isOpen}
            >
              <span className="aries-faq__number">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="aries-faq__text">{item.q}</span>
              <span className="aries-faq__plus" aria-hidden>
                {isOpen ? '−' : '+'}
              </span>
            </button>
            {isOpen ? <p className="aries-faq__answer">{item.a}</p> : null}
          </div>
        )
      })}
    </div>
  )
}
