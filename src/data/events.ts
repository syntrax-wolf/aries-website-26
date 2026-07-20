export type EventCategory =
  | 'workshop'
  | 'seminar'
  | 'hackathon'
  | 'field-trip'

export interface EventItem {
  id: string
  name: string
  category: EventCategory
  date: string
  blurb: string
  upcoming?: boolean
}

/** Source: Figma nodes 1:6156 / 39:2 (Events Page) and 1:6393 (Individual Event). */
export const mostRecentEvent: EventItem = {
  id: 'scai-visitor-talk',
  name: 'ScAI Visitor Talk',
  category: 'seminar',
  date: 'Sunday, 7th June',
  blurb:
    'ARIES members attended a talk by Professor Veeravalli on fluid dynamics and its applications to modern AI systems.',
}

export const upcomingEvents: EventItem[] = [
  {
    id: 'rave-night',
    name: 'Rave Night',
    category: 'field-trip',
    date: 'Sunday, 7th June',
    blurb: "They Hate Us cause they ain't us — a house party by Raj Chandak.",
    upcoming: true,
  },
  {
    id: 'paper-trails-12',
    name: 'Paper Trails, #12',
    category: 'seminar',
    date: 'Sunday, 7th June',
    blurb:
      'ARIES members discuss a recent paper on fluid dynamics and its applications, presented by Professor Veeravalli.',
    upcoming: true,
  },
  {
    id: 'scai-visitor-talk',
    name: 'ScAI Visitor Talk',
    category: 'seminar',
    date: 'Sunday, 7th June',
    blurb:
      'Exploring the real-world impact of AI beyond the hype, with Professor Veeravalli.',
    upcoming: true,
  },
]

export interface MajorEvent {
  id: string
  name: string
  window: string
  blurb: string
}

/** Source: Figma node 39:2 (annual events table). */
export const majorEvents: MajorEvent[] = [
  {
    id: 'tryst',
    name: 'Tryst',
    window: '28-30 May',
    blurb: "IIT Delhi's National Tech Fest featuring multiple national-scale competitions.",
  },
  {
    id: 'tech-gc',
    name: 'CAIC GC',
    window: 'Feb - March',
    blurb: "IIT Delhi's Intra-Hostel General Championship for Computing & AI.",
  },
  {
    id: 'inter-iit',
    name: 'Inter IIT',
    window: 'December',
    blurb: 'The Inter IIT Tech Meet featuring industry-backed problem statements.',
  },
  {
    id: 'shipathon',
    name: 'Shipathon',
    window: 'January',
    blurb: "ARIES's fresher-only hackathon, recognising AI/ML talent at IIT Delhi.",
  },
]

export const eventCategories: { id: EventCategory; label: string }[] = [
  { id: 'workshop', label: 'Workshops' },
  { id: 'seminar', label: 'Seminars' },
  { id: 'hackathon', label: 'Hackathons' },
  { id: 'field-trip', label: 'Field Trips' },
]

/** Source: Figma nodes 1:6156 / 39:2 (Past Events grid). */
export const pastEvents: EventItem[] = [
  {
    id: 'transparency-ai-labels',
    name: 'Transparency is not the same as truth: labeling AI-generated content',
    category: 'seminar',
    date: 'Jun 1, 2026',
    blurb:
      'A CISPA study examines how users perceive AI labels and what impact they have on trust.',
  },
  {
    id: 'shipathon-1-nasiko',
    name: 'Shipathon 1: Powered by Nasiko',
    category: 'hackathon',
    date: 'May, 2026',
    blurb:
      'Our flagship Shipathon competition, focused on AI agents in extended contexts.',
  },
  {
    id: 'farandwise-4',
    name: 'FarAndWise #4: Harshit, UG Researcher @ NUS',
    category: 'seminar',
    date: 'May, 2026',
    blurb:
      'A talk on the application of fractional calculus to modelling battery degradation.',
  },
  {
    id: 'paper-trails-7',
    name: 'Paper Trails #7: The Next 700 Programming Languages',
    category: 'seminar',
    date: 'Apr, 2026',
    blurb:
      "Laksh Goel, ARIES Advisor, discusses the widely influential paper by Claude Shannon.",
  },
]
