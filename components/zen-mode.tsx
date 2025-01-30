import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Clock } from "lucide-react";

interface ZenModeTimerProps {
  initialTime: number; // in seconds
  id: string; // User ID required for API request
}

export const ZenModeTimer: React.FC<ZenModeTimerProps> = ({ initialTime, id }) => {
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const hasTriggeredAlert = useRef(false); // Prevents duplicate API calls

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0 && !hasTriggeredAlert.current) {
      setIsActive(false);
      hasTriggeredAlert.current = true; // Mark that the alert was triggered

      alert("Time's up! Great job staying focused! 🎯");

      // Reset timer *after* alert is dismissed
      setTimeout(() => {
        setTime(initialTime);
        hasTriggeredAlert.current = false; // Reset alert trigger
      }, 100);

      // Call API to update zen_alerts
      updateZenAlerts(id);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time, id]);

  const updateZenAlerts = async (userId: string) => {
    try {
      const response = await fetch("/api/marketplace/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          type: "zen_alert", // Using the existing type field
        }),
      });

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        console.error("Failed to update zen_alerts:", data.error);
      }
    } catch (error) {
      console.error("Error updating zen_alerts:", error);
    }
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setTime(initialTime);
    setIsActive(false);
    hasTriggeredAlert.current = false; // Reset alert trigger
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center mt-20 mb-20 max-h-500 p-4">
      <div className="rounded-lg shadow-xl p-8 max-w-md w-full space-y-6 border border-gray-300">
        <h1 className="text-3xl font-bold text-center text-gray-800">Zen Mode</h1>
        <div className="flex items-center justify-center space-x-4">
          <Clock className="w-8 h-8 text-gray-700" />
          <span className="text-5xl font-bold text-gray-700">{formatTime(time)}</span>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={toggleTimer}
            className={`px-6 py-2 rounded-full font-semibold text-white ${
              isActive ? "bg-red-500 hover:bg-red-600" : "bg-teal-500 hover:bg-teal-600"
            } transition duration-300 ease-in-out`}
          >
            {isActive ? "Pause" : "Start"}
          </button>
          <button
            onClick={resetTimer}
            className="px-6 py-2 rounded-full font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition duration-300 ease-in-out"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
