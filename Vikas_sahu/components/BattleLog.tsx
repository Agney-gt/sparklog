import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { HabitData, HabitType } from "@/types/habits"
import { habitIcons } from "@/lib/habitIcons"

export function BattleLog({ habitData }: { habitData: HabitData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Battle Log</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {Object.entries(habitData).map(([habit, data]) => (
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
  )
}

