"use client"

import { Calendar } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useHabitData } from "@/hooks/useHabitData"
import { HeatMap } from "@/components/HeatMap"
import { FightHabits } from "@/components/FightHabits"
import { BattleLog } from "@/components/BattleLog"

export default function HabitTracker() {
  const { habitData, logHabit } = useHabitData()

  if (!habitData) {
    return <div>Loading...</div>
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
          <HeatMap habitData={habitData} />
        </TabsContent>

        <TabsContent value="fight" className="mt-4">
          <FightHabits habitData={habitData} onLogHabit={logHabit} />
        </TabsContent>

        <TabsContent value="stats" className="mt-4">
          <BattleLog habitData={habitData} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

