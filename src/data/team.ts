export type Wing = 'BRAIN' | 'CANVAS'

export interface Member {
  name: string
  role: string
  wing?: Wing
}

/**
 * Sample roster — placeholder content until real members are wired up
 * from the ARIES Project Portal database (see AGENTS.md "Next steps").
 * Source layout: Figma node 1:6097 (FullTeam).
 */
export const coordinators: Member[] = [
  { name: 'Sanidhya Rao', role: 'OC' },
  { name: 'Tamanna Kapoor', role: 'Co-OC' },
  { name: 'Laksh Goel', role: 'Research Lead' },
  { name: 'Raj Chandak', role: 'Panelist' },
]

export const executives: Member[] = [
  { name: 'Aisha Verma', role: 'ML Research', wing: 'BRAIN' },
  { name: 'Dev Malhotra', role: 'Robotics', wing: 'BRAIN' },
  { name: 'Priya Nambiar', role: 'Multi-Agent Systems', wing: 'BRAIN' },
  { name: 'Kabir Sethi', role: 'Quantitative Finance', wing: 'BRAIN' },
  { name: 'Simran Kaur', role: 'Design', wing: 'CANVAS' },
  { name: 'Arjun Bhatia', role: 'Media & Video', wing: 'CANVAS' },
  { name: 'Naina Aggarwal', role: 'Brand & Content', wing: 'CANVAS' },
  { name: 'Vivek Nair', role: 'Web & Product', wing: 'CANVAS' },
]

export const teamYear = '2026 - 27'
