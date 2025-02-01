"use client";

import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Card, CardHeader, CardContent } from "../ui/card";
import { HabitHeatMap } from "./habit-heat-map";

export function DefeatHeatMap() {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const [userId, setUserId] = useState<string | null>(null);
  const [habitTypes, setHabitTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndHabits = async () => {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.error("Error fetching session:", sessionError);
        setLoading(false);
        return;
      }

      const user = sessionData?.session?.user;
      if (!user) {
        setUserId(null);
        setLoading(false);
        return;
      }

      setUserId(user.id);

      // Fetch distinct habit types from the database
      const { data, error: habitsError } = await supabase
        .from("habits")
        .select("type")
        .eq("user_id", user.id);

      if (habitsError) {
        console.error("Error fetching habit types:", habitsError);
      } else {
        // Extract unique habit types
        const uniqueTypes = Array.from(new Set(data.map((habit) => habit.type)));
        setHabitTypes(uniqueTypes);
        
      }

      setLoading(false);
    };

    fetchUserAndHabits();

    // Listen for authentication state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  if (loading) return <p>Loading...</p>;
  if (!userId) return <p>User not logged in</p>;

  return (
    <Card className="mt-8">
      <CardHeader>
        <h2 className="text-xl font-semibold mb-1">Defeat Heat Map</h2>
      </CardHeader>
      <CardContent>
        {habitTypes.length > 0 ? (
          habitTypes.map((type) => <HabitHeatMap key={type} type={type} userId={userId} />)
        ) : (
          <p>No habits tracked yet.</p>
        )}
      </CardContent>
    </Card>
  );
}
