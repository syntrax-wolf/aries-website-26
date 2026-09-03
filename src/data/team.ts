export type Wing = 'BRAIN' | 'CANVAS'

export interface Member {
  name: string
  role: string
  wing?: Wing
}

/**
 * Roster left blank until real members are provided.
 * Do not fill with placeholder names.
 */
export const coordinators: Member[] = []

export const executives: Member[] = []

export const teamYear = '2026-27'
