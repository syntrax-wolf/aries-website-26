import { Link, useNavigate } from '@tanstack/react-router'
import { useExpandOverlay } from '../ExpandOverlay'

const items = [
  {
    title: 'About Us',
    number: '01',
    image: '/figma-assets/landing/whatwedo-1.png',
    icon: '/figma-assets/landing/whatwedo-about.svg',
    href: '/about',
  },
  {
    title: 'Events',
    number: '02',
    image: '/figma-assets/landing/whatwedo-2.png',
    icon: '/figma-assets/landing/whatwedo-events.svg',
    href: '/events',
  },
  {
    title: 'Projects',
    number: '03',
    image: '/figma-assets/landing/whatwedo-3.png',
    icon: '/figma-assets/landing/whatwedo-projects.svg',
    href: '/projects',
  },
  {
    title: 'Team',
    number: '04',
    image: '/figma-assets/landing/whatwedo-4.png',
    icon: '/figma-assets/landing/whatwedo-team.svg',
    href: '/team',
  },
  {
    title: 'Resources',
    number: '05',
    image: '/figma-assets/landing/whatwedo-5.png',
    icon: '/figma-assets/landing/whatwedo-resources.svg',
    href: '/about',
  },
] as const

const featuredProjects = [
  {
    title: 'Aries Copilot',
    description:
      'An AI assistant tailored for campus needs and smart productivity.',
    tags: 'NLP • LLM • Productivity',
  },
  {
    title: 'InsightX',
    description:
      'Extracting insights from complex data using advanced ML pipelines.',
    tags: 'Machine Learning • Data Science',
  },
  {
    title: 'Visionary',
    description: 'Computer vision system for real-world problem solving.',
    tags: 'Computer Vision • Deep Learning',
  },
  {
    title: 'EventHub AI',
    description:
      'AI-powered event management and recommendation platform.',
    tags: 'AI • Web • Recommender Systems',
  },
  {
    title: 'NeuroNet',
    description: 'Exploring neural architectures for smarter tomorrow.',
    tags: 'Deep Learning • Research',
  },
  {
    title: 'Prax AI',
    description:
      'Bringing AI solutions from research to real-world applications.',
    tags: 'AI • Deployment • Impact',
  },
] as const

export default function WhatWeDo() {
  const { openKey, toggle } = useExpandOverlay()
  const navigate = useNavigate()
  const stripRaised = openKey?.startsWith('work:') ? ' expand-raised' : ''

  const handleTileClick = (
    index: number,
    href: (typeof items)[number]['href'],
  ) => {
    const key = `work:${index}`
    if (openKey === key) {
      void navigate({ to: href })
      return
    }

    toggle(key)
  }

  return (
    <>
      <section
        className={`aries-landing-shell aries-whatwedo${stripRaised}`}
        aria-label="What Aries does"
      >
        <div className="aries-whatwedo__strip">
          {items.map((item, index) => {
            const isExpanded = openKey === `work:${index}`

            return (
              <button
                type="button"
                className={`aries-work-tile${
                  isExpanded ? ' aries-work-tile--image-expanded' : ''
                }`}
                key={item.title}
                onClick={() => handleTileClick(index, item.href)}
                aria-expanded={isExpanded}
              >
                <img
                  className="aries-work-tile__image"
                  src={item.image}
                  alt=""
                />

                <img
                  className="aries-work-tile__icon"
                  src={item.icon}
                  alt=""
                />

                <h3 className="aries-work-tile__title">{item.title}</h3>

                <span className="aries-work-tile__number">{item.number}</span>
              </button>
            )
          })}
        </div>

        <div className="aries-whatwedo__timeline" aria-hidden="true">
          {[0, 25, 50, 75, 100].map((left) => (
            <span
              className="aries-whatwedo__dot"
              key={left}
              style={{ left: `${left}%` }}
            />
          ))}
        </div>
      </section>

      <section
        id="featured-projects"
        className="relative overflow-hidden bg-[#f8f5f2] px-6 py-20 lg:px-12 lg:py-24"
      >
        <div className="mx-auto w-full max-w-[1400px]">
          <div className="mb-12 flex items-end justify-between gap-8">
            <div>
              <p className="flex items-center text-sm font-bold tracking-[0.08em] text-purple uppercase">
                <span
                  className="mr-3 inline-block h-[3px] w-9 bg-purple"
                  aria-hidden
                />
                Featured Projects
              </p>

              <h2 className="mt-4 text-4xl leading-tight font-black text-ink md:text-[44px]">
                Projects that create impact
              </h2>
            </div>

            <Link
              to="/projects"
              className="mb-1 shrink-0 text-sm font-semibold text-purple no-underline transition-opacity hover:opacity-70 md:text-base"
            >
              View all projects →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <article
                key={project.title}
                className="group relative min-h-[220px] overflow-hidden rounded-[10px] border border-purple/10 bg-white/90 p-7 shadow-[0_11px_27px_rgba(44,26,90,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(44,26,90,0.10)]"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-16 -right-16 h-36 w-36 rounded-full bg-purple/5 blur-2xl transition-all duration-300 group-hover:bg-purple/10"
                />

                <div className="relative flex items-center gap-2 text-[10px] font-medium tracking-[0.08em] text-muted uppercase">
                  <span className="h-[6px] w-[6px] rounded-full bg-purple" />
                  Project
                </div>

                <h3 className="relative mt-7 text-xl font-bold text-ink md:text-[21px]">
                  {project.title}
                </h3>

                <p className="relative mt-3 max-w-[310px] text-[13px] leading-[1.55] text-ink/75 md:text-sm">
                  {project.description}
                </p>

                <div className="absolute right-7 bottom-5 left-7 flex items-center justify-between gap-4">
                  <span className="text-[10px] text-muted">{project.tags}</span>

                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 shrink-0 items-center justify-center text-lg font-light text-purple transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
