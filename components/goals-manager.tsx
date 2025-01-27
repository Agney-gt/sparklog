"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

type Goal = {
  id: string
  title: string
  startDate: Date
  endDate: Date
  progress: number
  exp: number
  coins: number
  category: "growth" | "battle"
}

const mockGoals: Goal[] = [
  {
    id: "1",
    title: "Learn React",
    startDate: new Date("2023-01-01"),
    endDate: new Date("2023-12-31"),
    progress: 50,
    exp: 500,
    coins: 100,
    category: "growth",
  },
  {
    id: "2",
    title: "Complete 30-day fitness challenge",
    startDate: new Date("2023-06-01"),
    endDate: new Date("2023-06-30"),
    progress: 20,
    exp: 200,
    coins: 50,
    category: "battle",
  },
]

export function GoalsManager() {
  const [goals, setGoals] = useState<Goal[]>(mockGoals)
  const [newGoal, setNewGoal] = useState<Partial<Goal>>({
    title: "",
    startDate: new Date(),
    endDate: new Date(),
    category: "growth",
  })

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.startDate && newGoal.endDate && newGoal.category) {
      setGoals([...goals, { ...newGoal, id: Date.now().toString(), progress: 0, exp: 0, coins: 0 } as Goal])
      setNewGoal({ title: "", startDate: new Date(), endDate: new Date(), category: "growth" })
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Goals</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => (
          <Card key={goal.id} className="bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>{goal.title}</CardTitle>
              <CardDescription>{goal.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Progress: {goal.progress}%</p>
              <p>EXP: {goal.exp}</p>
              <p>Coins: {goal.coins}</p>
              <p>Start: {format(goal.startDate, "PP")}</p>
              <p>End: {format(goal.endDate, "PP")}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Add New Goal</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <RadioGroup
                value={newGoal.category}
                onValueChange={(value) => setNewGoal({ ...newGoal, category: value as "growth" | "battle" })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="growth" id="growth" />
                  <Label htmlFor="growth">Growth</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="battle" id="battle" />
                  <Label htmlFor="battle">Battle</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="grid gap-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newGoal.startDate ? format(newGoal.startDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={newGoal.startDate}
                    onSelect={(date) => date && setNewGoal({ ...newGoal, startDate: date })}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newGoal.endDate ? format(newGoal.endDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={newGoal.endDate}
                    onSelect={(date) => date && setNewGoal({ ...newGoal, endDate: date })}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={handleAddGoal} className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Goal
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

