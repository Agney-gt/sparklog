'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, LineChart, Brain, Compass, History, Lightbulb } from 'lucide-react'

export function JournalingBenefits() {
  const benefits = [
    {
      icon: Target,
      title: "Focused Reflection",
      description: "Structured questions guide your thoughts to key areas, providing clarity and actionable insights often missed in free-form journaling."
    },
    {
      icon: LineChart,
      title: "Progress Tracking",
      description: "Regular reflective prompts create a consistent record, making it easier to observe personal growth and patterns over time."
    },
    {
      icon: Brain,
      title: "Enhanced Self-Awareness",
      description: "Targeted questions encourage deeper self-examination, fostering greater understanding of your motivations, reactions, and behaviors."
    },
    {
      icon: History,
      title: "Accountability",
      description: "Structured journaling creates a system for revisiting goals and commitments, promoting follow-through and personal responsibility."
    },
    {
      icon: Compass,
      title: "Intentional Growth",
      description: "By consistently addressing key life areas, you're more likely to make conscious choices aligned with your long-term objectives."
    },
    {
      icon: Lightbulb,
      title: "Problem-Solving",
      description: "Reflective questions can help break down complex issues, leading to new perspectives and innovative solutions."
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-white">
      {benefits.map((benefit, index) => {
        const Icon = benefit.icon
        return (
          <Card key={index} className="border border-gray-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 w-12 h-12 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{benefit.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{benefit.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}