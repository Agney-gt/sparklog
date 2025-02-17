'use client'

import { useEffect, useState } from 'react'
import { Trophy } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const levelDescriptions = {
  10: 'The empowering starting point. A Novice is one who recognizes ignorance as a catalyst for growth and embraces the journey of mastery to unlock endless possibilities.',
  20: 'A transformative stage of learning. An Initiate observes and practices under experienced mentors, accelerating development and building a solid foundation.',
  30: 'The phase of independence. A Journeyman takes responsibility for their personal growth and contributions, shaping a unique and evolving path.',
  40: 'The journey of refinement. An Artisan dedicates themselves to consistent effort and precision, elevating their skills to achieve excellence in every endeavor.',
  50: 'A stage of profound understanding. An Adept blends mastery of technique with wisdom, making their craft an intuitive and natural extension of themselves.',
  60: 'A position of respect and influence. A Master’s expertise enables leadership, innovation, and the ability to advance their craft to new heights.',
  70: 'The stage of legacy-building. An Elder shares knowledge and mentors others, ensuring the enduring growth and vitality of their community and craft.',
  80: 'A pinnacle of creativity and vision. A Sage merges philosophy and innovation to redefine the craft and inspire future generations.',
  90: 'A role of inspiration and guidance. A Luminary embodies the highest ideals and values of the craft, serving as a model for others to follow.',
  100: 'The ultimate level of achievement. A Grandmaster represents the perfect fusion of skill and spirit, guiding others with wisdom and safeguarding the timeless legacy of the craft.',
}


export default function LevelProgress() {
  const [level, setLevel] = useState<number>(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  useEffect(() => {
    const fetchLevel = async () => {
      try {
        const response = await fetch('/api/user')
        if (!response.ok) throw new Error('Failed to fetch level')
        const data = await response.json()
        setLevel(data.level)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchLevel()
  }, [])

  const getCurrentLevelTitle = (level: number) => {
    const milestone = Math.floor(level / 10) * 10
    return milestone >= 10 ? milestone : 10
  }

  if (loading) return <div className="h-2 bg-gray-200 animate-pulse" />
  if (error) return <div className="h-2 bg-red-500" />

  const progressPercentage = (level / 100) * 100
  const currentMilestone = getCurrentLevelTitle(level)
  const description = levelDescriptions[currentMilestone as keyof typeof levelDescriptions]

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="w-full">
          <div className="relative h-6 bg-gray-200">
            <div 
              className="absolute left-0 top-0 h-full bg-black transition-all duration-1000 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
            {[25, 50, 75].map((milestone) => (
              <div 
                key={milestone}
                className="absolute top-0 bottom-0 w-0.5 bg-white opacity-50"
                style={{ left: `${milestone}%` }}
              />
            ))}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 text-sm font-medium text-gray-700">
            <Trophy 
                className="h-5 w-5 cursor-pointer hover:text-blue-600 transition-colors" 
                onClick={(e) => {
                  e.stopPropagation();
                  router.push('/community');
                }}
              />
              <span>Level {level}</span>
            </div>
            
          </div>
          
        </TooltipTrigger>
        <TooltipContent className="max-w-md p-4">
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
