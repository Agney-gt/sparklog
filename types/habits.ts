export type HabitType = "Smoking" | "Scrolling" | "Drink"

export type HabitStatus = "success" | "failure"

export interface HabitEntry {
  type: HabitType
  status: HabitStatus
  date: string
  note: string
}

export interface HabitStats {
  weekly: number
  monthly: number
  annually: number
  total: number
}

export interface HabitData {
  [key: string]: {
    entries: HabitEntry[]
    stats: HabitStats
  }
}

