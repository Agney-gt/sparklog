"use client"

import { useState, useEffect } from "react"
import { Calendar, Cigarette, Scroll, Wine } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { type HabitType, HabitEntry, type HabitData, type HabitStatus } from "@/types/habits"

export default function HabitTracker() {
  const [habitData, setHabitData] = useState<HabitData | null>(null)

  const habitIcons = {
    Smoking: <Cigarette className="h-5 w-5" />,
    Scrolling: <Scroll className="h-5 w-5" />,
    Drink: <Wine className="h-5 w-5" />,
  }

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

  const getHeatMapColor = (count: number) => {
    if (count === 0) return "bg-muted"
    if (count < 3) return "bg-green-200"
    if (count < 5) return "bg-green-400"
    return "bg-green-600"
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 max-w-2xl">
        <h1 className="text-2xl font-bold mb-2">Habit Battle Tracker</h1>
        <p className="text-muted-foreground">
          Track and conquer your habits with our battle system. Each day is a new fight against your bad habits. Log
          your victories and defeats, view your progress on the heat map, and check your battle statistics to see how
          far you've come.
        </p>
      </div>
      <Tabs defaultValue="heatmap" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="heatmap">
            <Calendar className="mr-2 h-4 w-4" />
            Heat Map
          </TabsTrigger>
          <TabsTrigger value="fight">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WqqVtwKTVuDU137luED0MQTVnK0PTQ.png"
              alt="Fight"
              className="mr-2 h-4 w-4"
            />
            Fight
          </TabsTrigger>
          <TabsTrigger value="stats">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20(2)-wJYHvUlCBRf55j9a7p0NTmUBntBPj4.png"
              alt="Stats"
              className="mr-2 h-4 w-4"
            />
            Battle Log
          </TabsTrigger>
        </TabsList>

        <TabsContent value="heatmap" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Defeat Heat Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {habitData &&
                  Object.entries(habitData).map(([habit, data]) => (
                    <div key={habit} className="flex items-center gap-4">
                      {habitIcons[habit as HabitType]}
                      <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: 35 }).map((_, i) => {
                          const date = new Date()
                          date.setDate(date.getDate() - i)
                          const count = data.entries.filter(
                            (entry) =>
                              new Date(entry.date).toDateString() === date.toDateString() && entry.status === "success",
                          ).length
                          return (
                            <div
                              key={i}
                              className={`h-4 w-4 rounded-sm ${getHeatMapColor(count)}`}
                              title={`${date.toDateString()}: ${count} successes`}
                            />
                          )
                        })}
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fight" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Fight your Bad Habits!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {habitData &&
                  Object.entries(habitData).map(([habit, data]) => (
                    <div key={habit} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {habitIcons[habit as HabitType]}
                        <span>{habit}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => logHabit(habit as HabitType, "success")}>
                          Success
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => logHabit(habit as HabitType, "failure")}>
                          Failure
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Battle Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {habitData &&
                  Object.entries(habitData).map(([habit, data]) => (
                    <div key={habit} className="rounded-lg border p-4">
                      <div className="flex items-center gap-2 mb-4">
                        {habitIcons[habit as HabitType]}
                        <span className="font-semibold">{habit}</span>
                      </div>
                      <div className="grid gap-2">
                        <div className="flex justify-between">
                          <span>Weekly:</span>
                          <span>{data.stats.weekly}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Monthly:</span>
                          <span>{data.stats.monthly}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Annually:</span>
                          <span>{data.stats.annually}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

