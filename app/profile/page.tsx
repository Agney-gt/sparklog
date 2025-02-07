"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Card, CardContent} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface NPC {
  name: string
  imageSrc: string
}

const npcs: NPC[] = [
  { name: "NPC 1", imageSrc: "https://eobemzviqxxlcrwuygkr.supabase.co/storage/v1/object/public/sparklog//2.jpg" },
  { name: "NPC 2", imageSrc: "https://eobemzviqxxlcrwuygkr.supabase.co/storage/v1/object/public/sparklog//3.jpg" },
]

const dialogues = [
  { npc: "NPC 1", text: "Hello, traveler! Welcome to our village." },
  { npc: "NPC 2", text: "Yes, welcome! It's been a while since we've had visitors." },
  { npc: "NPC 1", text: "How was your journey? I hope it wasn't too treacherous." },
  { npc: "NPC 2", text: "Oh, don't scare them! I'm sure it was a pleasant trip." },
  { npc: "NPC 1", text: "You're right, my apologies. Would you like a tour of our village?" },
  { npc: "NPC 2", text: "That's a great idea! We have so much to show you." },
]



interface UserProgress {
  user_id: string;
  level: number;
  total_quests_completed: number;
  user_name: string;
  balance: number;
  zen_alerts: number;
  skill_points: number[];
}

const skills = ["Writing", "Financial", "Learning", "Video Editing", "Health", "Creativity"];

export default function CharacterProfile() {
  const [userData, setUserData] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();
  const [currentDialogue, setCurrentDialogue] = useState(0)

  const handleNext = () => {
    if (currentDialogue < dialogues.length - 1) {
      setCurrentDialogue(currentDialogue + 1)
    }
  }

  const handleBack = () => {
    if (currentDialogue > 0) {
      setCurrentDialogue(currentDialogue - 1)
    }
  }


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error || !user) {
          console.error("Error fetching user:", error);
          return;
        }

        const userId = user.id;
        const response = await fetch(`/api/marketplace/user?user_id=${userId}`);
        const data = await response.json();

        if (data.success) {
          setUserData({
            ...data.user,
            skill_points: data.user.skill_points || [0, 0, 0, 0, 0, 0],
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  if (!userData) {
    return <div className="text-center text-lg font-semibold">User data not found.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Character Identity */}
      <Card className="p-6">
        <CardContent className="grid md:grid-cols-2 gap-12">
          {/* Quest */}
          <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
            <div className="flex mb-6">
              {npcs.map((npc, index) => (
                <div key={npc.name} className={`w-1/2 ${index === 0 ? "pr-4" : "pl-4"}`}>
                  <div
                    className={`h-32 w-32 rounded-full mx-auto mb-4 overflow-hidden ${dialogues[currentDialogue].npc === npc.name ? "ring-4 ring-blue-500" : ""}`}
                  >
                    <Image
                      src={npc.imageSrc || "/placeholder.svg"}
                      alt={npc.name}
                      width={128}
                      height={128}
                      className="object-cover"
                    />
                  </div>
                  <p className="text-center font-semibold">{npc.name}</p>
                </div>
              ))}
            </div>
            <div className="bg-gray-100 rounded-lg p-4 mb-6 min-h-[400px]">
              <p className="text-lg">{dialogues[currentDialogue].text}</p>
            </div>
            <div className="flex justify-between">
              <Button onClick={handleBack} disabled={currentDialogue === 0} variant="outline">
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button onClick={handleNext} disabled={currentDialogue === dialogues.length - 1}>
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>  
          {/* Avatar & Stats */}
          <div className="space-y-8">
            <div className="flex justify-center">
              <Image src="/avatar.png" alt="Character Avatar" width={550} height={550} className="rounded-xl shadow-lg" />
            </div>
            <div className="space-y-4 text-lg">
              <div className="flex items-center justify-between font-semibold">
                <span>{userData.user_name || "User"}</span>
                <span>Level {userData.level || 1}</span>
                <span>{userData.balance || 0} Coins</span>
              </div>
              {/* HP Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-base font-medium">
                  <span>HP:</span>
                  <span>1000 / 1000</span>
                </div>
                <Progress value={100} className="h-3" />
              </div>
            </div>
            <div className="h-[400px] flex justify-center items-center mx-auto">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                data={skills.map((skill, i) => ({
                  subject: skill,
                  value: userData.skill_points[i] || 0,
                }))}
                margin={{ top: 30, right: 40, bottom: 30, left: 40 }}
              >
                <PolarGrid gridType="circle" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 14 }} />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tickCount={5}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 7 }}
                />
                <Radar name="Skills" dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          </div>

          {/* Skill Radar Chart */}
          
        </CardContent>
      </Card>

      
    </div>
  );
}
