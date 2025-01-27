"use client"

import { useState } from "react"
import { Calendar, Cigarette, Scroll, Wine } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { type HabitType, HabitEntry, HabitStats } from "@/types/habits"

export default function HabitTracker() {
  const [activeTab, setActiveTab] = useState("heatmap")

  const habitIcons = {
    Smoking: <Cigarette className="h-5 w-5" />,
    Scrolling: <Scroll className="h-5 w-5" />,
    Drink: <Wine className="h-5 w-5" />,
  }

  return (
    <div className="container mx-auto p-4">
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
                {Object.keys(habitIcons).map((habit) => (
                  <div key={habit} className="flex items-center gap-4">
                    {habitIcons[habit as HabitType]}
                    <div className="grid grid-cols-7 gap-1">
                      {Array.from({ length: 35 }).map((_, i) => (
                        <div key={i} className="h-4 w-4 rounded-sm border bg-muted" />
                      ))}
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
                {Object.keys(habitIcons).map((habit) => (
                  <div key={habit} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {habitIcons[habit as HabitType]}
                      <span>{habit}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Success
                      </Button>
                      <Button variant="outline" size="sm">
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
                {Object.keys(habitIcons).map((habit) => (
                  <div key={habit} className="rounded-lg border p-4">
                    <div className="flex items-center gap-2 mb-4">
                      {habitIcons[habit as HabitType]}
                      <span className="font-semibold">{habit}</span>
                    </div>
                    <div className="grid gap-2">
                      <div className="flex justify-between">
                        <span>Weekly:</span>
                        <span>0</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly:</span>
                        <span>0</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Annually:</span>
                        <span>0</span>
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

