"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

const categories = [
  {
    title: "Learning · Growing",
    subtitle: "♦ Achieve skill refinement! ♦",
    tasks: ["Complete 10+ online courses", "Stick to learning Japanese", "Pass the advanced exams"],
  },
  {
    title: "Health · self-discipline",
    subtitle: "♦ Wellness as Wealth ♦",
    tasks: ["Early bedtime", "Control snacks and beverage intake", "Maintain hydration"],
  },
  {
    title: "Work · Career",
    subtitle: "♦ Empower the workforce ♦",
    tasks: ["Proactively complete tasks", "Maintain weekly updates on YouTube", "Expand side hustle"],
  },
  {
    title: "Interpersonal · Relationships",
    subtitle: "♦ Venture into connections ♦",
    tasks: ["Meet old friends", "Make new friends", "Participate in activities with friends"],
  },
  {
    title: "Finance · Money",
    subtitle: "♦ Smart Money Moves ♦",
    tasks: ["Review finances monthly", "Say no to credit cards", "Regularly deposit 100,000"],
  },
  {
    title: "Family · Life",
    subtitle: "♦ Love yourself ♦",
    tasks: ["Take a family portrait", "Stay in touch with family daily", "Take the family on a trip"],
  },
]

export function VisionBoard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vision Board</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          {categories.map((category) => (
            <div key={category.title} className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{category.title}</h3>
                <p className="text-sm text-primary">{category.subtitle}</p>
              </div>
              <div className="space-y-2">
                {category.tasks.map((task) => (
                  <div key={task} className="flex items-center space-x-2">
                    <Checkbox id={task} />
                    <label
                      htmlFor={task}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {task}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

