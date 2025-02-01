"use client";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { HabitHeatMap } from "./habit-heat-map";

interface Habit {
  user_id: string;
  type: string;
}

interface DefeatHeatMapProps {
  habits: Habit[];
}

export function DefeatHeatMap({ habits }: DefeatHeatMapProps) {
  if (habits.length === 0) return <p>No habits tracked yet.</p>;

  const userId = habits[0].user_id;
  const habitTypes = Array.from(new Set(habits.map((habit) => habit.type)));

  return (
    <Card className="mt-8">
      <CardHeader>
        <h2 className="text-xl font-semibold mb-1">Defeat Heat Map</h2>
      </CardHeader>
      <CardContent>
        {habitTypes.map((type) => (
          <HabitHeatMap key={type} type={type} userId={userId} />
        ))}
      </CardContent>
    </Card>
  );
}
