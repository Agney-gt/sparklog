import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { HabitData, HabitType, HabitStatus } from "@/types/habits"
import { habitIcons } from "@/lib/habitIcons"

export function FightHabits({
  habitData,
  onLogHabit,
}: {
  habitData: HabitData
  onLogHabit: (type: HabitType, status: HabitStatus) => void
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fight your Bad Habits!</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {Object.entries(habitData).map(([habit, data]) => (
            <div key={habit} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {habitIcons[habit as HabitType]}
                <span>{habit}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => onLogHabit(habit as HabitType, "success")}>
                  Success
                </Button>
                <Button variant="outline" size="sm" onClick={() => onLogHabit(habit as HabitType, "failure")}>
                  Failure
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

