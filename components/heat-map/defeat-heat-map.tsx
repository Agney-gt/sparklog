"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "../ui/card";
import { HabitHeatMap } from "./habit-heat-map";

// Define Habit type based on backend response
interface Habit {
  user_id: string;
  type: string;
}

export function DefeatHeatMap() {
  const [userId, setUserId] = useState<string | null>(null);
  const [habitTypes, setHabitTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        setLoading(true);

        // Fetch habits from the API route
        const response = await fetch("/api/habits");
        if (!response.ok) {
          throw new Error(`Failed to fetch habits: ${response.statusText}`);
        }

        const result: { data?: Habit[]; error?: string } = await response.json();
        if (result.error) {
          throw new Error(result.error);
        }

        if (!result.data || result.data.length === 0) {
          setHabitTypes([]);
          setUserId(null);
        } else {
          // Extract unique habit types
          const uniqueTypes = Array.from(new Set(result.data.map((habit) => habit.type)));
          setHabitTypes(uniqueTypes);
          setUserId(result.data[0]?.user_id || null);
        }
      } catch (err) {
        console.error("Error fetching habits:", err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!userId) return <p>User not logged in</p>;

  return (
    <Card className="mt-8">
      <CardHeader>
        <h2 className="text-xl font-semibold mb-1">Defeat Heat Map</h2>
      </CardHeader>
      <CardContent>
        {habitTypes.length > 0 ? (
          habitTypes.map((type) => <HabitHeatMap key={type} type={type} userId={userId} />)
        ) : (
          <p>No habits tracked yet.</p>
        )}
      </CardContent>
    </Card>
  );
}
