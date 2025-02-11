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

interface HabitEntry {
  image?: string;
  status?: "success" | "failed";
  last_updated?: string;
}

interface HabitData {
  [date: string]: HabitEntry;
}

interface CalendarGridProps {
  currentDate: Date;
  habitId: string;
}

export function CalendarGrid({ currentDate, habitId }: CalendarGridProps) {
  const [data, setData] = useState<HabitData>({});
  const [pendingUpdates, setPendingUpdates] = useState<HabitData>({});
  const [isSaving, setIsSaving] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [hasUpdatedToday, setHasUpdatedToday] = useState(false);

  useEffect(() => {
    async function fetchCalendarData() {
      if (!habitId) return;

      try {
        const response = await fetch(`/api/habits?id=${habitId}`);
        const result = await response.json();

        if (!response.ok) {
          console.error("Error fetching habit data:", result);
          return;
        }

        const habit = result.data.find((h: { id: string }) => h.id === habitId);
        if (habit) {
          setData(habit.calendar_entries || {});

          // Check if any habit has been updated today
          const today = format(new Date(), "yyyy-MM-dd");
          const updatedToday = Object.values(habit.calendar_entries || {}).some(
            (entry) => (entry as HabitEntry).last_updated === today
          );
          
          setHasUpdatedToday(updatedToday);
        } else {
          console.error("Habit not found in fetched data");
        }
      } catch (error) {
        console.error("Error fetching habit data:", error);
      }
    }

    fetchCalendarData();
  }, [habitId]);

  function handleDateClick(date: Date) {
    if (hasUpdatedToday) return;
  
    const dateKey = format(date, "yyyy-MM-dd");
    const entry = data[dateKey];
  
    setSelectedDate(dateKey);
    setPreviewImage(entry?.image || null);
  
    if (!entry?.image) {
      return; // Allow the user to upload an image without showing an alert
    }
  
    // Toggle the status
    const newStatus = entry.status === "success" ? "failed" : "success";
  
    const today = format(new Date(), "yyyy-MM-dd");
  
    setData((prev) => ({
      ...prev,
      [dateKey]: {
        ...entry,
        status: newStatus,
        last_updated: today,
      },
    }));
  
    setPendingUpdates((prev) => ({
      ...prev,
      [dateKey]: {
        ...entry,
        status: newStatus,
        last_updated: today,
      },
    }));
  }
  
  

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (hasUpdatedToday || !habitId || !selectedDate) return;

    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const today = format(new Date(), "yyyy-MM-dd");

      setData((prev) => ({
        ...prev,
        [selectedDate]: {
          image: base64String,
          status: "success",
          last_updated: today,
        },
      }));

      setPendingUpdates((prev) => ({
        ...prev,
        [selectedDate]: {
          image: base64String,
          status: "success",
          last_updated: today,
        },
      }));

      setPreviewImage(base64String);
    };

    reader.readAsDataURL(file);
  }

  async function handleSave() {
    if (hasUpdatedToday || Object.keys(pendingUpdates).length === 0) return;
    setIsSaving(true);
  
    try {
      for (const [date, entry] of Object.entries(pendingUpdates)) {
        const response = await fetch("/api/habits", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: habitId,
            date,                  // ✅ Add date
            status: entry.status,  // ✅ Add status
            image: entry.image,    // ✅ Add image (optional)
          }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error saving habit updates:", errorData);
          return;
        }
      }
  
      setPendingUpdates({});
      setHasUpdatedToday(true);
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setIsSaving(false);
    }
  }
  
  
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startingDayIndex = monthStart.getDay();
  const daysToAdd = startingDayIndex === 0 ? 6 : startingDayIndex - 1;
  const paddedDays = Array(daysToAdd).fill(null);

  return (
    <div>
      {hasUpdatedToday && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-center">
          You have already updated a status today.
        </div>
      )}

      {/* Calendar Heatmap */}
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
          const entry = data[dateKey];

          return (
            <button
              key={dateKey}
              onClick={() => handleDateClick(date)}
              disabled={hasUpdatedToday}
              className={cn(
                "aspect-square rounded-sm transition-colors flex items-center justify-center border-2",
                !isSameMonth(date, currentDate) && "opacity-50",
                isToday(date) && "border-blue-500",
                entry?.status === "success" ? "border-green-500" : "",
                entry?.status === "failed" ? "border-red-500" : "",
                entry?.image ? "bg-blue-100 hover:bg-blue-200" : "bg-muted hover:bg-muted-foreground/10",
                hasUpdatedToday && "cursor-not-allowed opacity-50"
              )}
            >
              {entry?.image ? (
                <img src={entry.image} alt="Uploaded" className="w-full h-full object-cover rounded-sm" />
              ) : (
                format(date, "d")
              )}
            </button>
          );
        })}
      </div>

      {/* Image Upload Card (Always Visible When Date is Selected) */}
      {selectedDate && (
        <div className="mt-6 p-4 bg-white shadow-md rounded-md">
          <h3 className="text-lg font-semibold mb-2">Upload Image for {selectedDate}</h3>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="mt-2" disabled={hasUpdatedToday} />
          {previewImage && <img src={previewImage} alt="Preview" className="mt-4 w-full h-40 object-cover rounded-md" />}
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={isSaving || hasUpdatedToday}
        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition disabled:bg-gray-400"
      >
        {isSaving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
