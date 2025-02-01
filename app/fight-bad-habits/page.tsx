"use client";
import { useState, useEffect } from "react";
import { Swords } from "lucide-react";
import Image from "next/image";
import { HabitItem } from "@/components/habit-item";
import { AddHabitForm } from "@/components/add-habit-form";
import { DefeatHeatMap } from "@/components/heat-map/defeat-heat-map";
import HabitTracker from "@/components/battle-logs";

interface Habit {
  id: string;
  type: string;
  status: "success" | "failed";
}

export default function BattlePage() {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    fetchHabits();
  }, []);

  // Fetch habits from the API
  const fetchHabits = async () => {
    try {
      const response = await fetch("/api/habits");
      const result = await response.json();
      if (response.ok) {
        setHabits(result.data || []);
      } else {
        console.error("Error fetching habits:", result.error);
      }
    } catch (error) {
      console.error("Network error fetching habits:", error);
    }
  };

  // Toggle habit status through the API
  const toggleHabitStatus = async (id: string) => {
    try {
      const response = await fetch(`/api/habits`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, toggleOnly: true }), // ✅ Toggle only the status
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${errorText}`);
      }
      const result = await response.json();
      setHabits(habits.map((h) => (h.id === id ? { ...h, status: result.updatedFields.status } : h)));
    } catch (error) {
      console.error("Error updating habit:", error);
    }
  };

  // Add a new habit through the API
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-8">
        <Swords className="w-8 h-8" />
        <h1 className="text-3xl font-bold">Battle · Bad Habit</h1>
      </div>
      <div className="mb-8">
        <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg mb-6">
          <Image src="/fight.png" alt="Fighting illustration" width={80} height={80} className="rounded-lg" />
          <div>
            <h2 className="text-xl font-semibold mb-1">Fight</h2>
            <p className="text-muted-foreground mb-2">Fight your Bad Habit! Conquer them!</p>
            <button className="text-sm text-muted-foreground hover:text-foreground">Need help</button>
          </div>
        </div>
        <div className="space-y-1">
          {habits.map((habit) => (
            <HabitItem key={habit.id} type={habit.type} status={habit.status} onToggle={() => toggleHabitStatus(habit.id)} />
          ))}
        </div>
        <div className="mt-4">
          <AddHabitForm/>
        </div>
      </div>
      <DefeatHeatMap />
      <HabitTracker />
    </div>
  );
}