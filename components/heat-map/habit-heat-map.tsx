"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { CalendarGrid } from "./calendar-grid"
import { Smartphone, Wine, Cigarette, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { format, addMonths, subMonths } from "date-fns"

interface HabitHeatMapProps {
  type: "scrolling" | "drink" | "smoking"
  userId: string
}

export function HabitHeatMap({ type, userId }: HabitHeatMapProps) {
  const [data, setData] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<"success" | "fail">("success")
  const [currentDate, setCurrentDate] = useState(new Date())
  const [habitId, setHabitId] = useState<string | null>(null);

  const icons = {
    scrolling: Smartphone,
    drink: Wine,
    smoking: Cigarette,
  }

  const Icon = icons[type]

  // Fetch habits from Supabase
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const res = await fetch(`/api/habits?user_id=${userId}`);
        const result = await res.json();
        if (result.data) {
          const habit = result.data.find((habit: any) => habit.type === type);
          if (habit) {
            setHabitId(habit.id);
            const formattedData: Record<string, string> = habit.calendar_entries || {};
            setData(formattedData);
          }
        }
      } catch (error) {
        console.error("Error fetching habits:", error);
      }
    };
  
    fetchHabits();
  }, [userId, type]);
  const total = Object.values(data).filter((value) => value === status).length

  const toggleDate = async (date: Date) => {
    const dateKey = format(date, "yyyy-MM-dd")

    setData((prevData) => {
      const newData = { ...prevData }
      if (newData[dateKey] === status) {
        delete newData[dateKey]
        updateHabit(dateKey, null) // Remove habit from DB
      } else {
        newData[dateKey] = status
        updateHabit(dateKey, status) // Update habit in DB
      }
      return newData
    })
  }

  const updateHabit = async (date: string, newStatus: string | null) => {
    if (newStatus) {
      // Add or update habit
      await fetch("/api/habits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, type, name: type, status: newStatus, date }),
      })
    } else {
      // Delete habit
      await fetch("/api/habits?user_id=${}", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, date }),
      })
    }
  }

  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="font-medium capitalize">{type}</span>
        </div>
        <button onClick={() => setStatus(status === "success" ? "fail" : "success")} className="text-sm text-muted-foreground hover:text-foreground">
          {status === "success" ? "Crap, I did..." : "I resisted!"}
        </button>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Badge className={cn(status === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700")}>
          {status === "success" ? "You're doing great!" : "You lose."}
        </Badge>
        <span className="text-sm text-muted-foreground">| Total: {total}</span>
      </div>

      <div className="mt-2">
        <div className="flex justify-between items-center mb-2">
          <button onClick={() => setCurrentDate(subMonths(currentDate, 1))} className="p-1">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="text-sm font-medium">{format(currentDate, "MMMM yyyy")}</div>
          <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="p-1">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
       {habitId && <CalendarGrid currentDate={currentDate} habitId={habitId} />}
      </div>
    </div>
  )
}
