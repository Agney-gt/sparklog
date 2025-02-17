'use client'

import { useEffect, useState } from 'react'
import { Trophy, Compass, Flame, Anchor } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const phaseDescriptions = {
  1: 'You face Dark waters filled with self-doubt and fear. Navigate through wreckage and find the flickering light of awareness.',
  2: 'Dense jungles of emotional struggles and past trauma. Cut through the vines to rebuild your foundation.',
  3: 'A volcanic forge where skills and resilience are tested. Shape yourself through discipline and perseverance.',
  4: 'The golden shores of mastery, where confidence and purpose shine. Treasure lies in living fully and sharing wisdom.'
};

const getPhase = (level: number) => {
  if (level <= 25) return 1;
  if (level <= 50) return 2;
  if (level <= 75) return 3;
  return 4;
};

export default function LevelProgress() {
  const [level, setLevel] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchLevel = async () => {
      try {
        const response = await fetch('/api/user');
        if (!response.ok) throw new Error('Failed to fetch level');
        const data = await response.json();
        setLevel(data.level);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchLevel();
  }, []);

  if (loading) return <div className="h-2 bg-gray-200 animate-pulse" />;
  if (error) return <div className="h-2 bg-red-500" />;

  const progressPercentage = (level / 100) * 100;
  const phase = getPhase(level);
  const description = phaseDescriptions[phase];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="w-full">
          <div className={`relative h-6 rounded-lg overflow-hidden border-2 border-gray-800 ${
            phase === 1 ? 'bg-blue-900' : phase === 2 ? 'bg-green-800' : phase === 3 ? 'bg-red-800' : 'bg-yellow-600'
          }`}>
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
            <div className="absolute inset-0 flex items-center justify-center gap-2 text-sm font-medium text-white">
              {phase === 1 && <Anchor className="h-5 w-5" />}
              {phase === 2 && <Compass className="h-5 w-5" />}
              {phase === 3 && <Flame className="h-5 w-5" />}
              {phase === 4 && <Trophy className="h-5 w-5 cursor-pointer hover:text-blue-600 transition-colors" onClick={(e) => { e.stopPropagation(); router.push('/community'); }} />}
              <span>Level {level}</span>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-md p-4">
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

