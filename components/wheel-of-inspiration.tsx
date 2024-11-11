'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const quotes = [
  "What's one insight from the content you found online today that you could expand on in your journal?",
  "How might writing a quick reflection about something you saw online today bring clarity to your thoughts?",
  "Could you jot down a few sentences about how the online content you consumed today made you feel?",
  "What if you summarized the most meaningful thing you came across online today in a paragraph?",
  "How might capturing your top takeaways from today's online content in your own words deepen your understanding?",
  "Could you outline one way to apply something you read or watched online today in your journal?",
  "What's one question you're left with after consuming today's online content, and how would you answer it?",
  "How can you use journaling to brainstorm new ideas inspired by what you consumed online today?",
  "Could you list three takeaways from what you read or watched online today and reflect on them?",
  "What if you free-wrote your thoughts on something interesting you found online today?",
  "Could you journal about how the online content you consumed today relates to your current projects or goals?",
  "What's one idea from today's online content that you could reframe in your own unique perspective?",
  "Could you journal about any doubts or disagreements you have with today's online content?",
  "How would journaling about your favorite online discovery today help make it actionable?",
  "Could you explore how today's online content might impact your life if you applied it?",
  "What's one lesson from today's online content that aligns with your personal values? Could you reflect on that?",
  "Could you write about one way today's online content might inspire a new habit or project?",
  "What if you reflected on the ideas you found online today to reinforce what resonates with you?",
  "Could you keep a 'Creative Journal' where you turn online content into brainstormed ideas?",
  "How might summarizing today's most valuable online idea help you retain it long-term?",
  "What could you create right now with what you've learned online?",
  "Is there an idea simmering in your mind that deserves a bit of your time today?",
  "How might 10 minutes of creating make today feel more fulfilling?",
  "What's one thing you can create that reflects your unique perspective?",
  "How can you turn what you just consumed online into something of your own?",
  "What if you gave yourself permission to create imperfectly today?",
  "How would it feel to create something small today, just for yourself?",
  "What could you make in 15 minutes that adds value to your day?",
  "Could you summarize the best thing you've learned online today in your own words?",
  "What might happen if you spent the next few minutes creating instead of consuming?",
  "How could you document your thoughts or feelings from online content today in a simple way?",
  "What's one tiny creative act you could complete in the next 5 minutes?",
  "Is there a small project you could start that would bring you joy?",
  "What did you discover online today that you can build on in your own style?",
  "How might creating something small help you make sense of today's ideas?",
  "How can you apply what you consumed online today in a creative way?",
  "What if you spent the next few minutes experimenting without judgment?",
  "What's the simplest way to express what you've learned online today?",
  "Could you create a quick outline or sketch of an idea from today's online content?",
  "What if you made a habit of creating a little each day?"
]

const segments = [
  { color: 'from-red-500 to-pink-500', label: 'Create' },
  { color: 'from-orange-500 to-amber-500', label: 'Reflect' },
  { color: 'from-yellow-500 to-lime-500', label: 'Explore' },
  { color: 'from-green-500 to-emerald-500', label: 'Learn' },
  { color: 'from-teal-500 to-cyan-500', label: 'Grow' },
  { color: 'from-blue-500 to-indigo-500', label: 'Innovate' },
  { color: 'from-purple-500 to-fuchsia-500', label: 'Imagine' },
  { color: 'from-pink-500 to-rose-500', label: 'Inspire' },
]

export function WheelOfInspiration() {
  const [rotation, setRotation] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null)
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null)
  const wheelRef = useRef<HTMLDivElement>(null)

  const spinWheel = () => {
    if (isSpinning) return
    setIsSpinning(true)
    const spinRotation = 360 * 10 + Math.floor(Math.random() * 360)
    setRotation(rotation + spinRotation)
    setTimeout(() => {
      setIsSpinning(false)
      const selectedIndex = Math.floor(((rotation + spinRotation) % 360) / (360 / segments.length))
      setSelectedSegment(segments[selectedIndex].label)
    }, 5000)
  }

  useEffect(() => {
    if (selectedSegment) {
      setSelectedQuote(quotes[Math.floor(Math.random() * quotes.length)])
    }
  }, [selectedSegment])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-transparent">
      <div className="relative w-64 h-64 md:w-96 md:h-96">
        <div className="absolute top-0 left-1/2 w-1 h-8 bg-white -ml-0.5 z-10"></div>
        <motion.div
          ref={wheelRef}
          animate={{ rotate: rotation }}
          transition={{ duration: 5, ease: "easeOut" }}
          className="w-full h-full rounded-full overflow-hidden shadow-xl"
        >
          {segments.map((segment, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-1/2 h-1/2 origin-bottom-right bg-gradient-to-r ${segment.color} ${isSpinning ? '' : 'hover:opacity-80 transition-opacity'}`}
              style={{
                transform: `rotate(${index * 45}deg) skew(45deg)`,
              }}
            >
              <span className="absolute bottom-6 right-8 text-white font-bold transform -rotate-[75deg] skew-y-[45deg]">
                {segment.label}
              </span>
            </div>
          ))}
        </motion.div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Sparkles className="w-12 h-12 text-yellow-300" />
          </motion.div>
        </div>
      </div>
      <Button
        onClick={spinWheel}
        disabled={isSpinning}
        className="mt-32 px-6 py-3 bg-white text-black rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition-colors"
      >
        {isSpinning ? 'Spinning...' : 'Spin the Wheel'}
      </Button>
      {selectedSegment && (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-4">View Inspiration</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{selectedSegment}</DialogTitle>
            </DialogHeader>
            <p className="text-center py-4">{selectedQuote}</p>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export default WheelOfInspiration;