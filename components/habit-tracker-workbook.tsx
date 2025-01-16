"use client"

import React, { useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function HabitTrackerWorkbook() {
  const [streakCount, setStreakCount] = useState(0)
  const [reflections, setReflections] = useState({
    effortless: '',
    factors: '',
    adjustments: ''
  })

  const incrementStreak = () => setStreakCount(prev => prev + 1)
  const resetStreak = () => setStreakCount(0)

  const handleReflectionChange = (field: keyof typeof reflections, value: string) => {
    setReflections(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">🛠️ How to Use This Workbook</h1>

      <Accordion type="single" collapsible className="mb-6">
        <AccordionItem value="classify">
          <AccordionTrigger>1. Classify Your Habits</AccordionTrigger>
          <AccordionContent>
            <p>Each habit falls under a Classifier that focuses on a specific area of life, such as:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Morning Routine for starting your day right.</li>
              <li>Intentional Growth to ensure consistent progress.</li>
              <li>Energy Optimization for sustained vitality.</li>
            </ul>
            <p className="mt-2">You can use these categories to prioritize habits based on your goals.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="track">
          <AccordionTrigger>2. Track Your Progress</AccordionTrigger>
          <AccordionContent>
            <p>For each habit</p>
            <ul className="list-disc pl-6 mt-2">
              <li>
                <Checkbox id="streak" className="mr-2" />
                <label htmlFor="streak">Log your activity daily for at least 7 consecutive days to earn a streak.</label>
              </li>
              <li>
                <Checkbox id="reflect" className="mr-2" />
                <label htmlFor="reflect">Reflect on which habits are sticking and where you face challenges.</label>
              </li>
              <li>
                <Checkbox id="celebrate" className="mr-2" />
                <label htmlFor="celebrate">Use the streak tracker to celebrate milestones and stay motivated.</label>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="reward">
          <AccordionTrigger>3. Reward Your Progress</AccordionTrigger>
          <AccordionContent>
            <p>When you complete a habit consistently:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Reward yourself with small incentives (e.g., a favorite snack, extra leisure time).</li>
              <li>For larger milestones (e.g., a month-long streak), consider a bigger reward like a day off or a meaningful gift.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>💡 Tips for Success</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6">
            <li>
              <strong>Stack habits on existing routines.</strong>
              <br />
              Example: Do stretches right after brushing your teeth.
            </li>
            <li>
              <strong>Start small.</strong>
              <br />
              Focus on consistency over intensity.
            </li>
            <li>
              <strong>Track visually.</strong>
              <br />
              Use a habit tracker to see your streaks grow.
            </li>
            <li>
              <strong>Reflect often.</strong>
              <br />
              Regularly review what's working and refine as needed.
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Streak Tracker</CardTitle>
          <CardDescription>Keep track of your habit streak</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold mb-4">Current Streak: {streakCount} days</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={incrementStreak}>Increment Streak</Button>
          <Button variant="outline" onClick={resetStreak}>Reset Streak</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reflecting on Your Streaks</CardTitle>
          <CardDescription>Weekly Check-In Questions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="effortless" className="block mb-2">Which habits felt effortless to maintain?</label>
            <Input
              id="effortless"
              value={reflections.effortless}
              onChange={(e) => handleReflectionChange('effortless', e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="factors" className="block mb-2">What external factors helped or hindered consistency?</label>
            <Input
              id="factors"
              value={reflections.factors}
              onChange={(e) => handleReflectionChange('factors', e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="adjustments" className="block mb-2">What adjustments can you make for next week?</label>
            <Input
              id="adjustments"
              value={reflections.adjustments}
              onChange={(e) => handleReflectionChange('adjustments', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

