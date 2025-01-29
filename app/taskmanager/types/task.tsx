export interface Task {
    id: string
    title: string
    isUrgent: boolean
    date: Date
    completed: boolean
  }
  
  export type TimeFrame = "today" | "tomorrow" | "next7days"
  
  