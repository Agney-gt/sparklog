import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { HabitData, HabitType } from "@/types/habits"
import { habitIcons } from "@/lib/habitIcons"

function getHeatMapColor(count: number) {
  if (count === 0) return "bg-muted"
  if (count < 3) return "bg-green-200"
  if (count < 5) return "bg-green-400"
  return "bg-green-600"
}

export function HeatMap({ habitData }: { habitData: HabitData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Defeat Heat Map</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {Object.entries(habitData).map(([habit, data]) => (
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
  )
}

