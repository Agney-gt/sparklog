"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sprout, AlarmClock, Book, Dumbbell, HelpCircle } from "lucide-react"

interface Task {
  id: string
  name: string
  icon: React.ReactNode
  status: "pending" | "completed"
}

export default function HabitTracker() {
  const tasks: Task[] = [
    {
      id: "1",
      name: "Wake up at 5 a.m.",
      icon: <AlarmClock className="h-4 w-4" />,
      status: "pending",
    },
    {
      id: "2",
      name: "Daily Journal",
      icon: <Book className="h-4 w-4" />,
      status: "completed",
    },
    {
      id: "3",
      name: "Workout",
      icon: <Dumbbell className="h-4 w-4" />,
      status: "pending",
    },
  ]

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-background p-2">
            <Sprout className="h-6 w-6" />
          </div>
          <div>
            <CardTitle>Growth Here!</CardTitle>
            <p className="text-sm text-muted-foreground">Nurturing and growth.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <HelpCircle className="h-4 w-4" />
          Need helps
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-2">
              {task.icon}
              <span>{task.name}</span>
            </div>
            <div className="flex items-center gap-2">
              {task.status === "pending" ? (
                <span className="text-red-500 text-xs">To be grown today</span>
              ) : (
                <span className="text-green-500 text-xs">Grown!</span>
              )}
              <Button variant="outline" size="sm">
                Check-in
              </Button>
            </div>
          </div>
        ))}
        <Button variant="ghost" className="w-full justify-start" size="sm">
          + New
        </Button>
      </CardContent>
    </Card>
  )
}

