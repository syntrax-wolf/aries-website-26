export type ProjectCategory =
  | 'Hackathon'
  | 'Industry Project'
  | 'Product Design'
  | 'AI Tools'
  | 'Publication'
  | 'Research'
  | 'Computer Vision'
  | 'Robotics'

/** Colour scheme for each category badge */
export const CATEGORY_COLORS: Record<ProjectCategory, { bg: string; text: string }> = {
  Hackathon: { bg: '#ffe4cc', text: '#c45c00' },
  'Industry Project': { bg: '#ccf0e8', text: '#007a52' },
  'Product Design': { bg: '#e0d4f7', text: '#5b28d9' },
  'AI Tools': { bg: '#d4e8ff', text: '#1a5eb8' },
  Publication: { bg: '#e8d4f7', text: '#7c28c9' },
  Research: { bg: '#d4f0e0', text: '#1a7a52' },
  'Computer Vision': { bg: '#ffd4d4', text: '#b81a1a' },
  Robotics: { bg: '#d4eeff', text: '#1a5eb8' },
}

export interface Project {
  id: string
  name: string
  description: string
  category: ProjectCategory
  tags: string[]
  contributors?: string
  /** placeholder colour for the card image area */
  imageBg?: string
  hasGithub?: boolean
  hasDemo?: boolean
  hasReport?: boolean
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 'aura-anomaly-detection',
    name: 'AURA — Anomaly Detection',
    description:
      'Unsupervised anomaly detection pipeline for real-world industrial IoT sensor streams.',
    category: 'Research',
    tags: ['PyTorch', 'Time Series', 'Anomaly Detection'],
    contributors: 'with Sanidhya, Tamanna',
    imageBg: '#e8e2d5',
    hasGithub: true,
    hasDemo: true,
    hasReport: true,
    featured: true,
  },
  {
    id: 'muse-mindful-journal',
    name: 'Muse — Mindful Journal App',
    description:
      'A mobile journaling app that helps users track mood, reflect, and build mindfulness habits.',
    category: 'Product Design',
    tags: ['Product Design', 'AI Tools'],
    imageBg: '#e2dde8',
    hasGithub: true,
  },
  {
    id: 'iclr-submission',
    name: 'Multi-Agent Coordination',
    description:
      'Published research on multi-agent systems under partial observability, accepted at ICLR 2026.',
    category: 'Publication',
    tags: ['Learning on graphs'],
    contributors: 'with Raj, Sanidhya',
    imageBg: '#e8e5d5',
    hasReport: true,
  },
  {
    id: 'navix-autonomous-rover',
    name: 'Navix — Autonomous Rover',
    description:
      'A ROS-based autonomous navigation rover using LiDAR, SLAM, and path-planning algorithms.',
    category: 'Robotics',
    tags: ['NLP', 'LangGraph'],
    imageBg: '#d8e2e8',
    hasGithub: true,
    hasDemo: true,
  },
  {
    id: 'graph-learning-toolkit',
    name: 'Graph Learning Toolkit',
    description:
      'LangGraph-based multi-agent framework for reasoning over large knowledge graphs.',
    category: 'AI Tools',
    tags: ['NLP', 'Multi-agent'],
    imageBg: '#dde8d8',
    hasGithub: true,
  },
  {
    id: 'finquant',
    name: 'FinQuant — Options Pricer',
    description:
      'A GPU-accelerated Monte Carlo options pricing engine with real-time volatility surface fitting.',
    category: 'Hackathon',
    tags: ['Quant Finance', 'CUDA', 'Python'],
    imageBg: '#e8ddd5',
    hasGithub: true,
    hasDemo: true,
  },
]
