'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

interface ReflectionPoint {
  title: string
  description: string
}

const reflectionPoints: ReflectionPoint[] = [
  {
    title: "Focused Reflection",
    description: "Structured questions zero in on critical areas of your life. For example, answering \"What energized me today?\" over a month might reveal patterns, such as how social interactions boost your motivation on workdays but deplete your energy on weekends. This clarity helps refine your schedule for optimal productivity."
  },
  {
    title: "Progress Tracking",
    description: "By journaling responses to \"What progress did I make toward my goals this week?\", you create a narrative of growth. Over a month, you may notice recurring obstacles, like procrastination on administrative tasks, and take steps to address them by delegating or scheduling them earlier in the day."
  },
  {
    title: "Enhanced Self-Awareness",
    description: "Questions like \"What triggered me emotionally today?\" invite deeper introspection. A month of responses might highlight that specific situations, like unclear feedback from colleagues, consistently frustrate you. Recognizing this pattern can prompt you to address communication habits or clarify expectations proactively."
  },
  {
    title: "Accountability",
    description: "Structured journaling revisits goals consistently. Consider the question \"What promise did I keep to myself this week?\" Over time, you'll notice where you're excelling or falling short, such as committing to regular exercise but skipping meal prep. This reflection can motivate adjustments for better adherence."
  },
  {
    title: "Intentional Growth",
    description: "Consistently reflecting on \"What one action can I take tomorrow to align with my long-term goals?\" transforms aspirations into achievable steps. Over a month, you might observe a clear pathway forming, such as daily learning sessions stacking up to master a new skill."
  },
  {
    title: "Problem-Solving",
    description: "Addressing \"What's one challenge I faced today, and how did I respond?\" fosters analytical thinking. After a month, you might see patterns like overthinking simple problems or missing key steps. These insights can inform strategies, like using decision frameworks or prioritizing tasks more effectively."
  }
]

interface CircularProgressIndicatorProps {
  progress: number
  size?: number
  strokeWidth?: number
}

function CircularProgressIndicator({ progress, size = 200, strokeWidth = 20 }: CircularProgressIndicatorProps) {
  const center = size / 2
  const radius = center - strokeWidth / 2
  const circumference = 2 * Math.PI * radius

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: 'rotate(-90deg)' }}
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke="#E6E6E6"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke="#4169E3"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (progress / 100) * circumference }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </svg>
      <div 
        className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-blue-600"
        aria-live="polite"
        aria-atomic="true"
      >
        {Math.round(progress)}%
      </div>
    </div>
  )
}

export default function AnimatedReflectionProgress() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      const nextIndex = (currentIndex + 1) % reflectionPoints.length
      setCurrentIndex(nextIndex)
      setProgress(((nextIndex + 1) / reflectionPoints.length) * 100)
    }, 5000) // Change point every 5 seconds
    return () => clearTimeout(timer)
  }, [currentIndex])

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8"><span className="text-blue-600">Unlocking Clarity, Growth and Flow</span></h1>
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <CircularProgressIndicator progress={progress} />
        <div className="mt-8 md:mt-0 md:ml-8 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-blue-50 p-6 rounded-lg"
            >
              <h2 className="text-xl font-semibold mb-4">{reflectionPoints[currentIndex].title}</h2>
              <p className="text-gray-700">{reflectionPoints[currentIndex].description}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reflectionPoints.map((point, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg flex items-center ${
              (index <= currentIndex || currentIndex === 0) ? 'bg-green-100' : 'bg-gray-100'
            }`}
          >
            <CheckCircle
              className={`w-6 h-6 mr-2 ${
                (index <= currentIndex || currentIndex === 0) ? 'text-green-500' : 'text-gray-400'
              }`}
            />
            <span className={(index <= currentIndex || currentIndex === 0) ? 'text-green-700' : 'text-gray-500'}>
              {point.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}