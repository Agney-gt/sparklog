"use client"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { CalendarGrid } from "./calendar-grid"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { format, addMonths, subMonths } from "date-fns"

// Define an enum for status
enum HabitStatus {
  SUCCESS = "success",
  FAIL = "failed",
}

interface Habit {
  id: string;
  type: string;
  calendar_entries: Record<string, string>;
}

interface HabitHeatMapProps {
  type: string;
  userId: string;
}

export function HabitHeatMap({ type, userId }: HabitHeatMapProps) {
  const [data, setData] = useState<Record<string, HabitStatus>>({});
  const [status, setStatus] = useState<HabitStatus>(HabitStatus.SUCCESS);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [habitId, setHabitId] = useState<string | null>(null);

  // Fetch habits from Supabase
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const res = await fetch(`/api/habits?user_id=${userId}`);
        const result = await res.json();

        if (result.data) {
          const habit = result.data.find((habit: Habit) => habit.type === type);
          if (habit) {
            setHabitId(habit.id);
            const formattedData: Record<string, HabitStatus> = habit.calendar_entries || {};
            setData(formattedData);
          }
        }
      } catch (error) {
        console.error("Error fetching habits:", error);
      }
    };
    fetchHabits();
  }, [userId, type]);

  const total = Object.values(data).filter((value) => value === status).length;


  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="font-medium capitalize">{type}</span>
        </div>
        <button onClick={() => setStatus(status === HabitStatus.SUCCESS ? HabitStatus.FAIL : HabitStatus.SUCCESS)} className="text-sm text-muted-foreground hover:text-foreground">
          {status === HabitStatus.SUCCESS ? "Crap, I did..." : "I resisted!"}
        </button>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <Badge className={cn(status === HabitStatus.SUCCESS ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700")}>
          {status === HabitStatus.SUCCESS ? "You're doing great!" : "You lose."}
        </Badge>
        <span className="text-sm text-muted-foreground">| Total: {total}</span>
      </div>
      <div className="mt-2">
        <div className="flex justify-between items-center mb-2">
          <button onClick={() => setCurrentDate(subMonths(currentDate, 1))} className="p-1">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="text-sm font-medium">{format(currentDate, "MMMM yyyy")}</div>
          <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="p-1">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        {habitId && <CalendarGrid currentDate={currentDate} habitId={habitId} />}
      </div>
    </div>
  );
}