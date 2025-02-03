"use client";

import { useState, useEffect, Suspense } from "react";
import { Swords, Sprout } from "lucide-react";
import Image from "next/image";
import { HabitItem } from "@/components/habit-item";
import { AddHabitForm } from "@/components/add-habit-form";
import { DefeatHeatMap } from "@/components/heat-map/defeat-heat-map";
import HabitTracker from "@/components/battle-logs";
import { useCategoryParam } from "./SearchParamsHandler"; // ✅ Use extracted category logic

interface Habit {
  id: string;
  user_id: string;
  name: string;
  type: string;
  category: "good" | "bad";
  status: "success" | "failed";
  date: string;
  calendar_entries: Record<string, "success" | "failed">;
}

export default function HabitCategoryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryFetcher />
    </Suspense>
  );
}

// ✅ Separate component for fetching category
function CategoryFetcher() {
  const category = useCategoryParam();

  if (category !== "good" && category !== "bad") {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold text-red-500">Invalid category</h2>
        <p>Please use ?category=good or ?category=bad in the URL.</p>
      </div>
    );
  }

  return <HabitsPageContent category={category} />;
}

// ✅ Extracted habits logic into a separate component
function HabitsPageContent({ category }: { category: "good" | "bad" }) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHabits();
  }, [category]);

  const fetchHabits = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/habits?category=${category}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch habits: ${response.statusText}`);
      }
      const result = await response.json();
      setHabits(result.data || []);
    } catch (err) {
      console.error("Error fetching habits:", err);
      setError("Failed to load habits. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleHabitStatus = async (id: string) => {
    try {
      const response = await fetch(`/api/habits`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, toggleOnly: true }),
      });

      if (!response.ok) {
        throw new Error(`Error updating habit: ${response.statusText}`);
      }

      const result = await response.json();
      setHabits((prev) =>
        prev.map((habit) =>
          habit.id === id ? { ...habit, status: result.updatedFields.status } : habit
        )
      );
    } catch (err) {
      console.error("Error updating habit:", err);
    }
  };

  const deleteHabit = async (id: string) => {
    try {
      const response = await fetch(`/api/habits?id=${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete habit");
      }

      setHabits((prev) => prev.filter((habit) => habit.id !== id));
    } catch (err) {
      console.error("Failed to delete habit:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-8">
        {category === "bad" ? <Swords className="w-8 h-8" /> : <Sprout className="w-8 h-8" />}
        <h1 className="text-3xl font-bold">
          {category === "bad" ? "Battle · Bad Habits" : "Growth · Good Habits"}
        </h1>
      </div>
      <div className="mb-8">
        <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg mb-6">
          <Image
            src={category === "bad" ? "/fight.png" : "/growth.png"}
            alt={category === "bad" ? "Fighting illustration" : "Growth illustration"}
            width={80}
            height={80}
            className="rounded-lg"
          />
          <div>
            <h2 className="text-xl font-semibold mb-1">
              {category === "bad" ? "Fight" : "Growth here!"}
            </h2>
            <p className="text-muted-foreground mb-2">
              {category === "bad"
                ? "Fight your Bad Habit! Conquer them!"
                : "Nurturing and growth"}
            </p>
            <button className="text-sm text-muted-foreground hover:text-foreground">
              Need help
            </button>
          </div>
        </div>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <div className="space-y-1">
          {loading ? (
            <p>Loading habits...</p>
          ) : (
            habits.map((habit) => (
              <HabitItem
                key={habit.id}
                id={habit.id}
                type={habit.type}
                status={habit.status}
                onToggle={() => toggleHabitStatus(habit.id)}
                onDelete={() => deleteHabit(habit.id)}
              />
            ))
          )}
        </div>
        <div className="mt-4">
          <AddHabitForm onHabitAdded={fetchHabits} category={category} />
        </div>
      </div>
      <DefeatHeatMap habits={habits} text={category === "bad" ? "Defeat Heat Map" : "Growth Heat Map"} />
      <HabitTracker habits={habits} text={category === "bad" ? "Battle Log" : "Growth Statistics"} />
    </div>
  );
}
