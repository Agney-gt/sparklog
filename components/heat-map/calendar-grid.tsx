import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
} from "date-fns";

interface CalendarGridProps {
  currentDate: Date;
  habitId: string;
}

export function CalendarGrid({ currentDate, habitId }: CalendarGridProps) {
  const [data, setData] = useState<Record<string, string>>({});
  const [pendingUpdates, setPendingUpdates] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function fetchCalendarData() {
      try {
        const response = await fetch(`/api/habits?id=${habitId}`);
        const result = await response.json();

        console.log("Fetched Data:", result);

        const habit = result.data.find((h: any) => h.id === habitId);

        if (habit) {
          console.log("Setting calendar data:", habit.calendar_entries);
          setData(habit.calendar_entries || {});
        } else {
          console.error("Habit not found in fetched data");
        }
      } catch (error) {
        console.error("Error fetching habit data:", error);
      }
    }

    if (habitId) fetchCalendarData();
  }, [habitId]);

  function handleDateToggle(date: Date) {
    if (!habitId) {
      console.error("Habit ID is missing.");
      return;
    }

    const dateKey = format(date, "yyyy-MM-dd");
    const currentStatus = data[dateKey];
    const newStatus = currentStatus === "success" ? "failed" : "success";

    console.log(`Toggling date ${dateKey} from ${currentStatus} to ${newStatus}`);

    setData((prev) => ({ ...prev, [dateKey]: newStatus }));
    setPendingUpdates((prev) => ({ ...prev, [dateKey]: newStatus }));
  }

  async function handleSave() {
    if (Object.keys(pendingUpdates).length === 0) return;

    setIsSaving(true);
    try {
      const updatesArray = Object.entries(pendingUpdates).map(([date, status]) => ({
        id: habitId,
        date,
        status,
      }));

      for (const update of updatesArray) {
        console.log("Sending update:", update);
        const response = await fetch("/api/habits", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(update),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error saving updates:", errorData);
        }
      }

      console.log("Updates saved successfully");
      setPendingUpdates({});
    } catch (error) {
      console.error("Network error:", error);
    }
    setIsSaving(false);
  }

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const startingDayIndex = monthStart.getDay();
  const daysToAdd = startingDayIndex === 0 ? 6 : startingDayIndex - 1;
  const paddedDays = Array(daysToAdd).fill(null);

  return (
    <div>
      <div className="grid grid-cols-7 gap-1 text-xs">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day} className="text-center font-medium text-muted-foreground p-2">
            {day}
          </div>
        ))}

        {paddedDays.map((_, index) => (
          <div key={`pad-${index}`} className="aspect-square" />
        ))}

        {daysInMonth.map((date) => {
          const dateKey = format(date, "yyyy-MM-dd");
          return (
            <button
              key={dateKey}
              onClick={() => handleDateToggle(date)}
              className={cn(
                "aspect-square rounded-sm transition-colors flex items-center justify-center",
                !isSameMonth(date, currentDate) && "opacity-50",
                isToday(date) && "border border-blue-500",
                data[dateKey] === "success" && "bg-green-100 hover:bg-green-200",
                data[dateKey] === "failed" && "bg-red-100 hover:bg-red-200",
                !data[dateKey] && "bg-muted hover:bg-muted-foreground/10"
              )}
            >
              {format(date, "d")}
            </button>
          );
        })}
      </div>

      <button
        onClick={handleSave}
        disabled={Object.keys(pendingUpdates).length === 0 || isSaving}
        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition disabled:bg-gray-400"
      >
        {isSaving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
