"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface User {
  username: string;
  level: number;
  coins: number;
  hp: number;
  master_objective: string;
  minor_objective: string;
  strengths: string;
  weaknesses: string;
}

export default function CharacterIdentity() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      let { data } = await supabase.from("users").select("*").single();
      setUser(data);
    }
    fetchUser();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold">{user.username} • Level {user.level} • {user.coins} Coins</h2>
      <p>HP: {user.hp} / 1000</p>
      <p>🎯 Master Objective: {user.master_objective}</p>
      <p>🎸 Minor Objective: {user.minor_objective}</p>
      <p>💪 Strengths: {user.strengths}</p>
      <p>⚠️ Weaknesses: {user.weaknesses}</p>
    </div>
  );
}
