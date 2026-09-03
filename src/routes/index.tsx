import { createFileRoute } from '@tanstack/react-router'
import Hero from '../components/hero/Hero'
import AriesAboutHero from '../components/landing/AriesAboutHero'
import WhatWeDo from '../components/landing/WhatWeDo'
import FaqList from '../components/FaqList'
import { faqs } from '../data/stats'
import {
  ExpandOverlayProvider,
  useExpandOverlay,
} from '../components/ExpandOverlay'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <ExpandOverlayProvider>
      <main>
        <Hero />
        <AriesAboutHero />
        <WhatWeDo />
        <FaqSection />
      </main>
    </ExpandOverlayProvider>
  )
}

function FaqSection() {
  const { openKey } = useExpandOverlay()
  const raised = openKey?.startsWith('faq:') ? ' expand-raised' : ''

  return (
    <section className={`aries-landing-shell aries-faq-section${raised}`}>
      <div className="aries-faq">
        <div>
          <div className="aries-section-label">FAQs</div>

          <h2 className="aries-faq__title">
            Frequently Asked <span>Questions</span>
          </h2>

          <p className="aries-faq__copy">
            Everything you need to know about Aries and how to get involved.
          </p>
        </div>

        <FaqList items={faqs} />
      </div>
    </section>
  )
}
