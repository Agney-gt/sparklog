"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Flag, HelpCircle, Plus, X } from "lucide-react"

interface ObjectiveProps {
  title: string
  startDate: string
  endDate: string
  progress: number
  exp: number
  coins: number
}

function ObjectiveCard({ title, startDate, endDate, progress, exp, coins }: ObjectiveProps) {
  return (
    <Card className="w-full">
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{title}</h3>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Start Date:</div>
            <div className="font-medium">{startDate}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">End Date:</div>
            <div className="font-medium">{endDate}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Time Remaining:</div>
            <Progress value={100} className="h-2" />
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Rewards:</div>
            <div className="space-y-1">
              <div className="text-sm">+ {exp} EXP</div>
              <div className="text-sm">+ {coins} Coins</div>
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">Current Progress:</div>
            <div className="flex items-center gap-2">
              <Progress value={progress} className="h-2" />
              <Badge variant="success" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                Success
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function BattleObjectives() {
  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="flex items-start gap-4">
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <Flag className="h-8 w-8 text-primary" />
        </div>
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Battle Objectives</h2>
          <p className="text-muted-foreground">Set your battle objectives and earn coins and EXP!</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <HelpCircle className="h-4 w-4" />
        Need helps
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <ObjectiveCard
          title="Quit Smoking!"
          startDate="July 1, 2024"
          endDate="July 31, 2024"
          progress={200}
          exp={100}
          coins={100}
        />
        <Card className="w-full flex items-center justify-center p-6">
          <Button variant="ghost" className="h-20 w-20 rounded-full">
            <Plus className="h-10 w-10 text-muted-foreground" />
          </Button>
        </Card>
      </div>
    </div>
  )
}

