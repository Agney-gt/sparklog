
"use client"

import { useState } from "react"
import { Swords } from "lucide-react"
import Image from "next/image"
import { HabitItem } from "@/components/habit-item"
import { AddHabitForm } from "@/components/add-habit-form"
import { DefeatHeatMap } from "@/components/heat-map/defeat-heat-map"

interface Habit {
  id: string
  type: "scrolling" | "drink" | "smoking"
  status: "success" | "fail"
}

export default function BattlePage() {
  const [habits, setHabits] = useState<Habit[]>([
    { id: "1", type: "scrolling", status: "success" },
    { id: "2", type: "drink", status: "fail" },
    { id: "3", type: "smoking", status: "success" },
  ])

  const toggleHabitStatus = (id: string) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, status: habit.status === "success" ? "fail" : "success" } : habit,
      ),
    )
  }

  const addHabit = (type: string) => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      type: type as "scrolling" | "drink" | "smoking",
      status: "success",
    }
    setHabits([...habits, newHabit])
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-8">
        <Swords className="w-8 h-8" />
        <h1 className="text-3xl font-bold">Battle · Bad Habit</h1>
      </div>

      <div className="mb-8">
        <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg mb-6">
          <Image src="/fight.png" alt="Fighting illustration" width={80} height={80} className="rounded-lg" />
          <div>
            <h2 className="text-xl font-semibold mb-1">Fight</h2>
            <p className="text-muted-foreground mb-2">Fight your Bad Habit! Conquer them!</p>
            <button className="text-sm text-muted-foreground hover:text-foreground">Need help</button>
          </div>
        </div>

        <div className="space-y-1">
          {habits.map((habit) => (
            <HabitItem
              key={habit.id}
              type={habit.type}
              status={habit.status}
              onToggle={() => toggleHabitStatus(habit.id)}
            />
          ))}
        </div>

        <div className="mt-4">
          <AddHabitForm onAdd={addHabit} />
        </div>
      </div>

      <DefeatHeatMap />
    </div>
  )
}

