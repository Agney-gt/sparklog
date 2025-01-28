import { useState, useEffect } from "react"
import type { HabitData, HabitType, HabitStatus } from "@/types/habits"

export function useHabitData() {
  const [habitData, setHabitData] = useState<HabitData | null>(null)

  useEffect(() => {
    fetchHabitData()
  }, [])

  const fetchHabitData = async () => {
    try {
      const response = await fetch("/api/habits")
      const data = await response.json()
      setHabitData(data)
    } catch (error) {
      console.error("Failed to fetch habit data:", error)
    }
  }

  const logHabit = async (type: HabitType, status: HabitStatus) => {
    try {
      const response = await fetch("/api/habits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          status,
          date: new Date().toISOString(),
        }),
      })
      const updatedHabit = await response.json()
      setHabitData((prev) => (prev ? { ...prev, [type]: updatedHabit } : null))
    } catch (error) {
      console.error("Failed to log habit:", error)
    }
  }

  return { habitData, logHabit }
}

