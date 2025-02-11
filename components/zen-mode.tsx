"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Clock } from "lucide-react";
import Image from "next/image";

interface ZenModeTimerProps {
  initialTime: number; // in seconds
}

export const ZenModeTimer: React.FC<ZenModeTimerProps> = ({ initialTime }) => {
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const hasTriggeredAlert = useRef(false);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
      } else {
        setUserId(data.user?.id || null);
      }
    };
    fetchUser();
  }, [supabase]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0 && !hasTriggeredAlert.current) {
      setIsActive(false);
      hasTriggeredAlert.current = true;

      alert("Time's up! Great job staying focused! 🎯");

      setTimeout(() => {
        setTime(initialTime);
        hasTriggeredAlert.current = false;
      }, 100);

      if (userId) {
        updateZenAlerts(userId);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time, userId]);

  const updateZenAlerts = async (userId: string) => {
    try {
      const response = await fetch("/api/marketplace/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          type: "zen_alert",
        }),
      });

      const data = await response.json();
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
    hasTriggeredAlert.current = false;
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen transition-all duration-700 relative ${
        isActive ? "bg-black" : "bg-white"
      }`}
    >
      {/* Zen Background Image */}
      <Image
        src="/background.png" // Image in the public folder
        alt="Zen Background"
        layout="fill"
        objectFit="cover"
        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Timer UI */}
      <div className="relative z-10 rounded-lg shadow-xl p-8 max-w-md w-full space-y-6 border border-gray-300 bg-white bg-opacity-90">
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
