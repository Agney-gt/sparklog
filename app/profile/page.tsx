"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, Camera, Heart, Lightbulb, PenTool, Wallet } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import Image from "next/image";

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
const skillIcons = {
  Health: Heart,
  Creativity: Lightbulb,
  Writing: PenTool,
  "Video Editing": Camera,
  Financial: Wallet,
  Learning: Brain,
};

export default function CharacterProfile() {
  const [userData, setUserData] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

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
        <CardHeader>
          <CardTitle className="text-3xl text-center border-2 border-border inline-block px-10 py-3 mx-auto">
            CHARACTER IDENTITY
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-12">
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
          </div>

          {/* Skill Radar Chart */}
          <div className="h-[500px]">
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
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 14 }}
                />
                <Radar name="Skills" dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Skill Points */}
      <Card className="p-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Brain className="h-6 w-6" />
            Skill Points
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {skills.map((skill, index) => {
            const Icon = skillIcons[skill as keyof typeof skillIcons];
            const skillValue = userData.skill_points[index] || 0;
            return (
              <div key={skill} className="space-y-3">
                <div className="flex items-center justify-between text-lg">
                  <div className="flex items-center gap-3">
                    <Icon className="h-6 w-6 text-primary" />
                    <span className="font-semibold">{skill}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-base text-muted-foreground">{skillValue} / 500</span>
                    <span className="text-base bg-muted px-3 py-1 rounded-lg font-medium">
                      LV {Math.floor(skillValue / 100) + 1}
                    </span>
                  </div>
                </div>
                <Progress value={(skillValue / 500) * 100} className="h-3" />
              </div>
            );
          })}
        </CardContent>
      </Card>
       {/* Vision Board */}
       <Card className="p-6">
        <CardHeader>
          <CardTitle className="text-3xl text-center border-2 border-border inline-block px-10 py-3 mx-auto">
            VISION BOARD
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8">
          {/* Learning Section */}
          <div className="space-y-4">
            <div className="bg-muted/50 px-4 py-2">
              <h3 className="text-xl font-semibold">Learning · Growing</h3>
            </div>
            <div className="space-y-2 px-4">
              <h4 className="text-primary text-lg font-medium">♦ Achieve skill refinement! ♦</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="h-5 w-5 rounded border-primary" />
                  <span>Complete 10+ online courses</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="h-5 w-5 rounded border-primary" />
                  <span>Stick to learning Japanese</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="h-5 w-5 rounded border-primary" />
                  <span>Pass the advanced exams</span>
                </label>
              </div>
            </div>
          </div>

          {/* Health Section */}
          <div className="space-y-4">
            <div className="bg-muted/50 px-4 py-2">
              <h3 className="text-xl font-semibold">Health · self-discipline</h3>
            </div>
            <div className="space-y-2 px-4">
              <h4 className="text-violet-500 text-lg font-medium">✧ Wellness as Wealth ✧</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="h-5 w-5 rounded border-violet-500" />
                  <span>Early bedtime</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="h-5 w-5 rounded border-violet-500" />
                  <span>Control snacks and beverage intake</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="h-5 w-5 rounded border-violet-500" />
                  <span>Maintain hydration</span>
                </label>
              </div>
            </div>
          </div>

          {/* Work Section */}
          <div className="space-y-4">
            <div className="bg-muted/50 px-4 py-2">
              <h3 className="text-xl font-semibold">Work · Career</h3>
            </div>
            <div className="space-y-2 px-4">
              <h4 className="text-pink-500 text-lg font-medium">✧ Empower the workforce ✧</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="h-5 w-5 rounded border-pink-500" />
                  <span>Proactively complete tasks</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="h-5 w-5 rounded border-pink-500" />
                  <span>Maintain weekly updates on YouTube</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="h-5 w-5 rounded border-pink-500" />
                  <span>Expand side hustle</span>
                </label>
              </div>
            </div>
          </div>

          {/* Interpersonal Section */}
          <div className="space-y-4">
            <div className="bg-muted/50 px-4 py-2">
              <h3 className="text-xl font-semibold">Interpersonal · Relationships</h3>
            </div>
            <div className="space-y-2 px-4">
              <h4 className="text-amber-500 text-lg font-medium">✧ Venture into connections ✧</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="h-5 w-5 rounded border-amber-500" />
                  <span>Meet old friends</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="h-5 w-5 rounded border-amber-500" />
                  <span>Make new friends</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="h-5 w-5 rounded border-amber-500" />
                  <span>Participate in activities with friends</span>
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


