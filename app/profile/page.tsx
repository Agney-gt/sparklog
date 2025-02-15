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
  { name: "Ancient", imageSrc: decodeURIComponent("https://eobemzviqxxlcrwuygkr.supabase.co/storage/v1/object/public/sparklog/1.jpg") },
  { name: "Wanderer", imageSrc: decodeURIComponent("https://eobemzviqxxlcrwuygkr.supabase.co/storage/v1/object/public/sparklog/3.jpg") },
]

const dialogues = [[
  {
    "npc": "Mentor Sage",
    "text": "Greetings, seeker of clarity. You tread carefully, as though each step might awaken hidden dangers. Such is the way of those who have lived in realms of uncertainty, forever guarded and never truly at ease. Yet, wisdom lies not just in caution, but in understanding the paths of reason—both deductive and inductive."
  },
  {
    "npc": "Anxious Traveler",
    "text": "Mentor, I find myself trapped, oscillating between panic and paralysis when faced with stress. How can I navigate this maze of fear and find peace?"
  },
  {
    "npc": "Mentor Sage",
    "text": "To master your challenges, first understand Deductive Reasoning. This is the art of beginning with a general truth and applying it to specific instances. Consider this: All who walk through fire unscathed possess resilience. You are learning to walk through fires of stress. Therefore, you have the potential for resilience. Use this logic to construct a mental fortress against fear."
  },
  {
    "npc": "Anxious Traveler",
    "text": "And what of Inductive Reasoning, mentor? How does it aid me in my quest for calm?"
  },
  {
    "npc": "Mentor Sage",
    "text": "Inductive Reasoning is the path from specifics to general truths. Observe the quiet deer: In countless encounters, it senses danger and survives by retreating. From these observations, it learns that alertness ensures survival. Apply this to your life: Reflect on moments when calmness has led to clarity under stress and recognize the pattern of success in those moments. From these, derive a guiding principle for future encounters."
  },
  {
    "npc": "Anxious Traveler",
    "text": "But how do these methods help when the pressures feel overwhelming, and my mind clouds over with doubt?"
  },
  {
    "npc": "Mentor Sage",
    "text": "In moments of overwhelm, use Deductive Reasoning to remind yourself of universal truths you hold dear, such as the belief in your innate ability to learn and adapt. Use Inductive Reasoning to build confidence from past victories, no matter how small. Each success is a stone on which to stand firm against the tides of pressure. Thus, by embracing both reasoning paths, you illuminate the darkness of stress with the light of understanding."
  }
],[
  {
    "npc": "Teacher",
    "text": "In the world of knowledge, we are faced with challenges that test not only our intellect but our resilience. Deductive reasoning, my student, is akin to walking a well-trodden path. It begins with established truths and leads us to conclusions that are logical and certain. When authority imposes unreasonable tasks, utilize deduction to dissect their demands, separating what is necessary from what is merely noise."
  },
  {
    "npc": "Student",
    "text": "But what if the challenges I face are not so clear, Master? I often find myself overwhelmed by stress, unsure of the steps to take."
  },
  {
    "npc": "Teacher",
    "text": "In times of uncertainty, inductive reasoning becomes your guide. Like the bird that learns the rhythm of seasons by observing the world around it, you must gather experiences, look for patterns, and form hypotheses. Inductive reasoning allows you to draw general conclusions from specific instances of stress, gradually piecing together a method to handle chaos."
  },
  {
    "npc": "Student",
    "text": "Yet, how do I apply this reasoning when stress takes hold and my thoughts scatter like leaves in the wind?"
  },
  {
    "npc": "Teacher",
    "text": "Begin by acknowledging the stress, not as an enemy, but as a source of information. Use deductive reasoning to trace its roots and understand its triggers. Then, employ inductive reasoning to identify what has eased such burdens before. Combine these insights, and you will develop a strategy to manage stress before it overpowers you."
  },
  {
    "npc": "Student",
    "text": "I see now, Master, that reasoning is not simply a tool for the mind but a shield for the heart. With practice, I can confront stress with grace and insight."
  },
  {
    "npc": "Teacher",
    "text": "Indeed, dear pupil. Master the art of reasoning, and you will find that stress is but a challenge like any other—one that can be understood, managed, and ultimately overcome. Let your reasoning guide you, and you will navigate even the most turbulent of storms with clarity and composure of a turtle - taking a step back to observe."
  }
],[
  {
    "npc": "Ethereal Oracle",
    "text": "In the realm where knowledge wields greater power than any sword, you find yourself amidst shadows cast by authority's oppressive hand. Fear not the unknown, for it is within the uncharted that true wisdom awaits. Embrace change as the serpent sheds its skin, revealing the vibrant life beneath old layers."
  },
  {
    "npc": "Seeker",
    "text": "Yet, O Oracle, the path of change appears fraught with peril. Here in this place of known sorrow, at least I am familiar with the pain. How do I dare to step beyond into the void, where failure might await to brand me unworthy?"
  },
  {
    "npc": "Ethereal Oracle",
    "text": "Consider the oak, mighty and unyielding, yet it is the reed that bends with the storm and survives. By remaining still, you choose the known chains over the freedom of potential. The risk of failure is the mortar that binds the pillars of growth. Fear not to stretch beyond the familiar, for even the stars were born from chaos and darkness."
  },
  {
    "npc": "Seeker",
    "text": "I fear that failure will be a testament to my inadequacy. How can one move forward when the mere thought of falling disquiets the soul?"
  },
  {
    "npc": "Ethereal Oracle",
    "text": "Learn from the fox, who treads the boundary of the forest, ever seeking new paths and opportunities. Failure is not the abyss but a teacher. Each misstep is a whisper of the wind guiding you back to strength. Inaction is the true peril, for it is in inaction that potential is squandered."
  },
  {
    "npc": "Seeker",
    "text": "Then shall I face the winds of change, not as a leaf adrift but as a sailor who masters the turbulent seas. Guide me, Oracle, towards the resilience needed to embrace the unknown."
  },
  {
    "npc": "Ethereal Oracle",
    "text": "Let the cosmos be your guide, where the dance of celestial bodies mirrors your journey. With each step into the unknown, you forge the path of your own destiny. Stand unafraid before the challenges of power and control, for it is through the crucible of experience that your true power will be realized. Embrace the journey, for it is yours alone to conquer."
  }
],[ { "npc": "Sage of the Celestial Realms", "text": "In this dominion where knowledge reigns supreme above all else, you stand at the brink of your own greatness, yet a shadow of doubt lingers like the unwelcome curtain of night. Success, that shimmering beacon, beckons you forward, but you tremble at the thought of its unattainable permanence." }, { "npc": "Wary Adventurer", "text": "O Sage, when fortune smiles upon me, I am gripped by an overwhelming tide of unease, fearing that I might falter and squander the gifts I’ve been bestowed. How do I embrace success without dreading the imminent fall?" }, { "npc": "Sage of the Celestial Realms", "text": "Reflect upon the phoenix, ever reborn from the ashes of its own making. It does not mourn the flame nor fear the rebirth. Your success is not an ominous harbinger of downfall, but a testament to your capacity for renewal and elevation. Trust in your ability to navigate the rise, not just the fall." }, { "npc": "Wary Adventurer", "text": "Yet, even as I taste triumph, I brace for the inevitable descent. Each moment of joy is accompanied by a whisper of doubt—how can I cease this self-sabotage and finally allow myself to succeed?" }, { "npc": "Sage of the Celestial Realms", "text": "Consider the spider, who weaves its web with patience and precision, knowing full well that it may be torn apart yet again. Success is the web you weave through daily endeavors. When the winds tear at it, rebuild without fear. Understand that each strand is a testament to your resilience and perseverance." }, { "npc": "Wary Adventurer", "text": "So, to thrive is to accept both the sunlight and the storm, to build and rebuild without despair. I shall walk this path of success, accepting its trials as part of the sacred dance of growth." }, { "npc": "Sage of the Celestial Realms", "text": "Indeed, walk with pride and purpose. Let the cosmos guide your steps, knowing that each victory is a star in your constellation. Embrace this journey with courage and wisdom, for each step forward reveals the depth of your own potential. Fear not your brilliance; it is the light meant to illuminate your path." } ],
[
  {
    "npc": "Mystic Seer",
    "text": "In this realm where the power of wisdom shines brighter than all, you find yourself amid the turmoil of self-sabotage, where serenity should reign. You forge chaos from peace, not from malice, but from a yearning for the known comfort of storms."
  },
  {
    "npc": "Conflicted Soul",
    "text": "O Seer of Timeless Wisdom, in times of tranquility, I am restless, and when stability graces my path, I find myself tearing down what I have built. How do I cease this madness and embrace the calm?"
  },
  {
    "npc": "Mystic Seer",
    "text": "Consider the river, ever flowing, never stagnant. It carves its path not through force but through persistence. Acknowledge that conflict arises not from the peaceful waters, but from those who refuse to let the current carry them. You must learn to flow with the river, trusting in the direction it leads you."
  },
  {
    "npc": "Conflicted Soul",
    "text": "Yet, in the embrace of calm, I feel out of place, like a rogue wave threatening to break the peace. How do I quell the urge to stir unrest in the still waters of my life?"
  },
  {
    "npc": "Mystic Seer",
    "text": "Observe the otter, who finds joy in both play and rest, adept in its aquatic world. It does not seek to disrupt, but thrives within the perpetual dance of tranquility and motion. Cultivate this balance, for peace is not the absence of motion, but the presence of harmony."
  },
  {
    "npc": "Conflicted Soul",
    "text": "So, I am to find solace in peace, to engage with life’s flow without creating unnecessary strife. I shall strive to cherish the calm, knowing it as a friend rather than a foe."
  },
  {
    "npc": "Mystic Seer",
    "text": "Yes, tread softly upon the path of serenity. Let the cosmos whisper its secrets to you, teaching you the art of balance. Embrace both the gentle breeze and the tumultuous gale, for each has its place. Your journey is to harmonize with all aspects, creating a life of enduring peace and strength."
  }
],


                   
                   
                   

]
                   
                   




interface UserProgress {
  user_id: string;
  level: number;
  total_quests_completed: number;
  user_name: string;
  balance: number;
  zen_alerts: number;
  skill_points: number[];
  HP:number;
  MP:number;
}

const skills = ["Writing", "Financial", "Learning", "Video Editing", "Health", "Creativity"];

export default function CharacterProfile() {
  const [userData, setUserData] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();
  const [currentDialogue, setCurrentDialogue] = useState(0)

  const handleNext = () => {
    if (userData && currentDialogue < dialogues[userData.level].length - 1) {
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
                    className={`h-32 w-32 rounded-full mx-auto mb-4 overflow-hidden ${dialogues[userData.level][currentDialogue].npc === npc.name ? "ring-4 ring-blue-500" : ""}`}
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
              <p className="text-lg">{dialogues[userData.level][currentDialogue].text}</p>
            </div>
            <div className="flex justify-between">
              <Button onClick={handleBack} disabled={currentDialogue === 0} variant="outline">
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button onClick={handleNext} disabled={currentDialogue === dialogues[userData.level].length - 1}>
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
                  <span>{userData.HP}</span>
                </div>
                <Progress value={userData.HP} className="h-3" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-base font-medium">
                  <span>MP:</span>
                  <span>{userData.MP}</span>
                </div>
                <Progress value={userData.MP} className="h-3" />
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
