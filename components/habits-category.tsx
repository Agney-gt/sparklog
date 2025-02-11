"use client";

import { useState, useEffect, Suspense } from "react";
import { Swords, Sprout } from "lucide-react";
import Image from "next/image";
import { HabitItem } from "@/components/habit-item";
import { AddHabitForm } from "@/components/add-habit-form";
import { DefeatHeatMap } from "@/components/heat-map/defeat-heat-map";
import HabitTracker from "@/components/battle-logs";
import { useCategoryParam } from "@/app/habits/SearchParamsHandler";

// ✅ Define Habit interface
interface Habit {
  id: string;
  user_id: string;
  name: string;
  type: string;
  category: "good" | "bad";
  status: "success" | "failed";
  date: string;
  lastUpdated?: string; // ✅ Track last update date
  calendar_entries: Record<string, { image: string; status: "success" | "failed" }>;
}

// ✅ Define Props Interface
interface HabitCategoryPageProps {
  category?: "good" | "bad"; // ✅ Optional category prop
}

// ✅ Main Habit Category Component
export function HabitCategoryPage({ category }: HabitCategoryPageProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryFetcher providedCategory={category} />
    </Suspense>
  );
}

// ✅ Determines Category from URL or Props
function CategoryFetcher({ providedCategory }: { providedCategory?: "good" | "bad" }) {
  const queryCategory = useCategoryParam();
  const category = providedCategory || queryCategory;

  if (category !== "good" && category !== "bad") {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold text-red-500">Invalid category</h2>
        <p>Please use `category="good"` or `category="bad"`, or set `?category=good/bad` in the URL.</p>
      </div>
    );
  }

  return <HabitsPageContent category={category} />;
}

// ✅ Main Habits Page Logic
function HabitsPageContent({ category }: { category: "good" | "bad" }) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHabits();
  }, [category]);

  // ✅ Fetch Habits
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

  // ✅ Toggle Habit Status (Once Per Day)
  const toggleHabitStatus = async (id: string) => {
    const today = new Date().toISOString().split("T")[0];
    const habit = habits.find((h) => h.id === id);

    if (habit?.lastUpdated === today) {
      alert("You can only update this habit once per day!");
      return;
    }

    try {
      const response = await fetch(`/api/habits`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, toggleOnly: true, lastUpdated: today }),
      });

      if (!response.ok) {
        throw new Error(`Error updating habit: ${response.statusText}`);
      }

      const result = await response.json();
      setHabits((prev) =>
        prev.map((habit) =>
          habit.id === id ? { ...habit, status: result.updatedFields.status, lastUpdated: today } : habit
        )
      );
    } catch (err) {
      console.error("Error updating habit:", err);
    }
  };

  // ✅ Delete Habit
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

  // ✅ Format Calendar Entries
  const formattedHabits = habits.map((habit) => ({
    ...habit,
    calendar_entries: Object.fromEntries(
      Object.entries(habit.calendar_entries || {}).map(([date, entry]) => [date, { ...entry, status: entry.status }])
    ),
  }));

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* ✅ Page Header */}
      <div className="flex items-center gap-3 mb-8">
        {category === "bad" ? <Swords className="w-8 h-8" /> : <Sprout className="w-8 h-8" />}
        <h1 className="text-3xl font-bold">
          {category === "bad" ? "Combat · Create Your Battles" : "Growth · Good Habits"}
        </h1>
      </div>

      {/* ✅ Habit Category Card */}
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
            <h2 className="text-xl font-semibold mb-1">{category === "bad" ? "Fight" : "Growth here!"}</h2>
            <p className="text-muted-foreground mb-2">
              {category === "bad" ? "Fight your Bad Habit! Conquer them!" : "Nurturing and growth"}
            </p>
            <button className="text-sm text-muted-foreground hover:text-foreground">Need help</button>
          </div>
        </div>

        {/* ✅ Error Handling */}
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        {/* ✅ Habit List */}
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

        {/* ✅ Add Habit Form */}
        <div className="mt-4">
          <AddHabitForm onHabitAdded={fetchHabits} category={category} />
        </div>
      </div>

      {/* ✅ Habit Tracking Components */}
      <DefeatHeatMap habits={formattedHabits} text={category === "bad" ? "Defeat Heat Map" : "Growth Heat Map"} />
      <HabitTracker habits={formattedHabits} text={category === "bad" ? "Battle Log" : "Growth Statistics"} />
    </div>
  );
}
