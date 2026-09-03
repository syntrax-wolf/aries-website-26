export interface Stat {
  label: string
  value: number
  blurb: string
}

/** Left blank. Decorative counts were placeholder, not verified. */
export const stats: Stat[] = []

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

/** Left blank. Decorative marketing counts were placeholder, not verified. */
export const headlineStats: HeadlineStat[] = []

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
    a: 'Not at all. We run from-zero workshops every semester — curiosity matters more than experience.',
  },
  {
    q: 'How much time commitment is required?',
    a: 'As much as you want to put in. Most members spend a few hours a week; project leads a bit more around deadlines.',
  },
  {
    q: 'What kind of projects does Aries build?',
    a: 'Everything from research prototypes and hackathon builds to industry collaborations — NLP, vision, robotics and more.',
  },
  {
    q: 'Are there any selection rounds?',
    a: 'Core team positions have a short selection process each year, but events, workshops and most projects are open to everyone.',
  },
  {
    q: 'Can first years join?',
    a: 'Absolutely — first years are the heart of the club. Our intro workshops are designed with you in mind.',
  },
]
