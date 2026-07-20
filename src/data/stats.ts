export interface Stat {
  label: string
  value: number
  blurb: string
}

/** Home hero stat strip. Source: Figma node 1:6480 (Landing Page). */
export const stats: Stat[] = [
  {
    label: 'Workshops taken',
    value: 17,
    blurb: 'Across classic ML, computer vision, finance and more',
  },
  {
    label: 'Papers Published',
    value: 5,
    blurb: 'Across Graphs, Multi-Agent Systems, Robotics and more',
  },
  {
    label: 'Current members',
    value: 47,
    blurb: 'Across years and branches; the best of IIT Delhi',
  },
  {
    label: 'Projects Shipped',
    value: 24,
    blurb: 'Across Computer vision, Quantitative Finance and more',
  },
]

export const valuePills = [
  'Shipping cool projects',
  'Discussing Interesting Topics',
  'Hosting Industry Events',
  'Researching cool stuff',
] as const

export interface HeadlineStat {
  label: string
  value: string
}

/** Big four-up stat strip that overlaps the hero/section boundary. */
export const headlineStats: HeadlineStat[] = [
  { value: '3000+', label: 'Students Reached' },
  { value: '50+', label: 'Events Conducted' },
  { value: '20+', label: 'Projects Built' },
  { value: '10+', label: 'Industry Collaborations' },
]

export interface Faq {
  q: string
  a: string
}

export const faqs: Faq[] = [
  {
    q: 'Who can join Aries?',
    a: "Any student at IIT Delhi with curiosity and a passion for AI. No matter your branch or year, you're welcome here.",
  },
  {
    q: 'Do I need prior experience in AI?',
    a: 'No. We run beginner-friendly workshops and reading groups alongside advanced research — you grow with the community, wherever you start.',
  },
  {
    q: 'How much time commitment is required?',
    a: 'It flexes with your involvement. Casual members drop into events; project and research members typically spend a few focused hours a week.',
  },
  {
    q: 'What kind of projects does Aries build?',
    a: 'Everything from computer vision and NLP to quantitative finance, multi-agent systems, robotics and learning on graphs — driven by member interest.',
  },
  {
    q: 'Are there any selection rounds?',
    a: 'Open events and workshops need no selection. Core project teams and the executive body run a short, interest-based selection each year.',
  },
]
