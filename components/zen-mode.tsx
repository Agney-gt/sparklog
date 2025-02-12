"use client";

import { useState, useEffect, useRef } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { createPortal } from "react-dom";

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
    setIsActive(true);
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white transition-all duration-700 relative">

      {/* Fullscreen Zen Mode Popup (Rendered via Portal) */}
      {isActive &&
        createPortal(
          <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black bg-opacity-90">
            {/* Background Image */}
            <Image
              src="https://eobemzviqxxlcrwuygkr.supabase.co/storage/v1/object/public/sparklog//blackbackground.jpg"
              alt="Zen Background"
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 w-full h-full opacity-60"
            />

            {/* Timer UI */}
            <div className="relative z-10">
              <h1 className="text-3xl font-bold text-center text-white">Zen Mode</h1>

              {time === initialTime && (
                <p className="text-center text-gray-300 italic">Take a deep breath & begin...</p>
              )}

              <div className="flex items-center justify-center">
                <span className="text-5xl font-bold text-white">{formatTime(time)}</span>
              </div>
            </div>

          </div>,
          document.body // 🔥 Forces the modal to appear on the full page
        )}

      {/* Start Button (Shown When Not Active) */}
      {!isActive && (
        <div className="relative z-10 rounded-lg shadow-xl p-8 max-w-md w-full space-y-6 border border-gray-300 bg-white">
          <h1 className="text-3xl font-bold text-center text-gray-800">Zen Mode</h1>
          <button
            onClick={toggleTimer}
            className="px-6 py-2 rounded-full font-semibold text-white bg-teal-500 hover:bg-teal-600 transition duration-300 w-full"
          >
            Start Zen Mode
          </button>
        </div>
      )}
    </div>
  );
};
