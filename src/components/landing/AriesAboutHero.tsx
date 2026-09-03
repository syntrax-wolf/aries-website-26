import { Link } from '@tanstack/react-router'

const facts = [
  {
    icon: '/figma-assets/landing/hero-spark-1.svg',
    text: 'A student-led AI research & engineering collective',
  },
  {
    icon: '/figma-assets/landing/hero-campus.svg',
    text: 'Founded at IIT Delhi',
  },
  {
    icon: '/figma-assets/landing/hero-curiosity.svg',
    text: 'Driven by curiosity, powered by collaboration',
  },
  {
    icon: '/figma-assets/landing/hero-impact-1.svg',
    text: 'Building real-world impact through AI',
  },
] as const

export default function AriesAboutHero() {
  return (
    <section
      className="aries-landing-shell aries-hero"
      aria-labelledby="aries-hero-title"
    >
      <div className="aries-hero__grid">
        <div>
          <div className="aries-section-label">About Aries</div>

          <h1 className="aries-hero__title" id="aries-hero-title">
            More than a club, a track record you can <em>Ctrl+F</em>
          </h1>

          <p className="aries-hero__copy">
            Aries is a student-led AI research and engineering collective at IIT
            Delhi driven by curiosity and powered by collaboration.
          </p>

          <div className="aries-hero__actions">
            <Link
              className="aries-button aries-button--primary"
              to="/projects"
            >
              Explore Our Work <span aria-hidden="true">→</span>
            </Link>

            <Link className="aries-button aries-button--ghost" to="/contact">
              Join the Collective <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <article className="aries-hero-card" aria-label="Aries definition">
          <span className="aries-hero-card__spark" aria-hidden="true" />

          <h2>Aries</h2>

          <p className="aries-hero-card__pronunciation">/'eer-iz/</p>

          <p className="aries-hero-card__type">noun</p>

          <div className="aries-hero-card__rule" />

          <p className="aries-hero-card__definition">
            The first sign of the zodiac in astrology, characterised by an
            absolute courage and immense ambition. The Aries mind strives for
            prominence in every project it undertakes.
          </p>

          <ul className="aries-hero-card__facts">
            {facts.map((fact) => (
              <li key={fact.text}>
                <img src={fact.icon} alt="" />
                <span>{fact.text}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  )
}
