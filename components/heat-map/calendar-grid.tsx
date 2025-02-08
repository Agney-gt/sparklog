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

interface Habit {
  id: string;
  calendar_entries: Record<string, { image: string; status: "success" | "failed" }>;
}

interface ApiResponse {
  data: Habit[];
}

interface CalendarGridProps {
  currentDate: Date;
  habitId: string;
}

export function CalendarGrid({ currentDate, habitId }: CalendarGridProps) {
  const [data, setData] = useState<Record<string, { image: string; status: "success" | "failed" }>>({});
  const [pendingUpdates, setPendingUpdates] = useState<Record<string, { image: string; status: "success" | "failed" }>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchCalendarData() {
      if (!habitId) return;

      try {
        const response = await fetch(`/api/habits?id=${habitId}`);
        const result: ApiResponse = await response.json();

        if (!response.ok) {
          console.error("Error fetching habit data:", result);
          return;
        }

        const habit = result.data.find((h) => h.id === habitId);
        if (habit) {
          setData(habit.calendar_entries || {});
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
    const dateKey = format(date, "yyyy-MM-dd");
    const entry = data[dateKey];

    setSelectedDate(dateKey);
    setPreviewImage(entry?.image || null);
    setIsModalOpen(!entry?.image); // Open modal only if no image exists

    setData((prev) => ({
      ...prev,
      [dateKey]: {
        image: entry?.image || "",
        status: entry?.status === "success" ? "failed" : "success",
      },
    }));

    setPendingUpdates((prev) => ({
      ...prev,
      [dateKey]: {
        image: entry?.image || "",
        status: entry?.status === "success" ? "failed" : "success",
      },
    }));
  }

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (!selectedDate || !habitId) return;

    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setData((prev) => ({
        ...prev,
        [selectedDate]: { image: base64String, status: prev[selectedDate]?.status || "success" },
      }));
      setPendingUpdates((prev) => ({
        ...prev,
        [selectedDate]: { image: base64String, status: prev[selectedDate]?.status || "success" },
      }));
      setPreviewImage(base64String);
      setIsModalOpen(false); // Close modal after upload
    };
    reader.readAsDataURL(file);
  }

  async function handleSave() {
    if (Object.keys(pendingUpdates).length === 0) return;
    setIsSaving(true);

    try {
      for (const [date, entry] of Object.entries(pendingUpdates)) {
        const response = await fetch("/api/habits", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: habitId, date, image: entry.image, status: entry.status }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error saving updates:", errorData);
        }
      }
      setPendingUpdates({});
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
              className={cn(
                "aspect-square rounded-sm transition-colors flex items-center justify-center border-2",
                !isSameMonth(date, currentDate) && "opacity-50",
                isToday(date) && "border-blue-500",
                entry?.status === "success" ? "border-green-500" : "",
                entry?.status === "failed" ? "border-red-500" : "",
                entry?.image ? "bg-blue-100 hover:bg-blue-200" : "bg-muted hover:bg-muted-foreground/10"
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

      {/* Screen Popup Modal for Image Upload */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md w-full">
            <h3 className="text-lg font-semibold mb-2">Upload Image for {selectedDate}</h3>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-2"
              disabled={!!previewImage} // Disable input if image already uploaded
            />
            {previewImage && <img src={previewImage} alt="Preview" className="mt-4 w-full h-40 object-cover rounded-md" />}
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

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
