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
    description: "Thinking about questions like 'What made me feel good today?' helps you begin to notice patterns if done consistently. For example, if creative tasks boost your energy, you can plan your day to stay productive and reach your goals."
  },
  {
    title: "Progress Tracking",
    description: "By regularly asking 'What progress did I make toward my goals this week?', you cross the threshold from just dreaming to actively creating your story of growth. Fuel your affirmations with evidence."
  },
  {
    title: "Enhanced Self-Awareness",
    description: "Questions like 'What triggered me emotionally today?' help you face the trials and challenges along your journey and spot stress causes, like noise or change. This awareness lets you make proactive changes to reduce distractions and stay focused."
  },
  {
    title: "Accountability",
    description: "Reflecting on 'What promise did I keep to myself this week?' builds accountability and creates catharsis. Over time, you'll spot patterns and feel motivated to make improvements."
  },
  {
    title: "Intentional Growth",
    description: "Over time, these small, steady actions bring clarity and drive progress toward important goals like gaining expertise or forming better habits."
  },
  {
    title: "Problem-Solving",
    description: "Answering 'What's one challenge I faced today, and how did I respond?' creates catharsis by revealing patterns like overthinking. This clarity helps you better understand ourselves and others."
  }
];


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