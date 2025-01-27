"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Calendar, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

interface HabitProps {
  title: string
  total: number
  isGrown?: boolean
  toBeGrown?: boolean
  week: number
}

function WeekGrid() {
  return (
    <div className="grid grid-cols-7 gap-1 text-xs text-muted-foreground mt-2">
      {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
        <div key={i} className="text-center">
          {day}
        </div>
      ))}
    </div>
  )
}

function HabitCard({ title, total, isGrown, toBeGrown }: HabitProps) {
  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium">{title}</h3>
          <div className="flex items-center gap-2">
            {toBeGrown && <span className="text-xs text-red-500">To be grown today</span>}
            {isGrown && <span className="text-xs text-green-500">Grown!</span>}
            <span className="text-xs text-muted-foreground">Total: {total}</span>
          </div>
        </div>
        <div className="text-xs text-center mb-2">---------- 2024 · Sep ----------</div>
        <WeekGrid />
        <div className="grid grid-cols-7 gap-1 mt-1">
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} className="aspect-square border border-gray-100 rounded-sm" />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function GrowthHeatMap() {
  return (
    <TooltipProvider>
      <div className="max-w-3xl mx-auto p-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 border rounded-lg flex items-center justify-center">
            <Calendar className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Growth Heat Map</h2>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              Check out your growth heat map here.
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4" />
                </TooltipTrigger>
                <TooltipContent>Track your daily habits and growth</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <HabitCard title="Workout" total={2} toBeGrown={true} week={1} />
          <HabitCard title="Daily Journal" total={2} isGrown={true} week={1} />
          <HabitCard title="Wake up at 5 a.m." total={1} toBeGrown={true} week={1} />
        </div>

        <Button variant="ghost" className="mt-4 w-full border-2 border-dashed">
          + New
        </Button>
      </div>
    </TooltipProvider>
  )
}

