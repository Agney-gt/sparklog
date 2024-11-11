'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from 'lucide-react'

export function ThoughtMeter() {
  const [consuming, setConsuming] = useState(50)
  const [creating, setCreating] = useState(50)
  const [balance, setBalance] = useState(0)
  const [tip, setTip] = useState('')

  useEffect(() => {
    const newBalance = creating - consuming
    setBalance(newBalance)

    if (newBalance < -20) {
      setTip("Increase creating for a fresh perspective. Try brainstorming or journaling.")
    } else if (newBalance > 20) {
      setTip("Consider consuming more to gather new ideas. Read a book or listen to a podcast.")
    } else {
      setTip("Great balance! Keep alternating between consuming and creating.")
    }
  }, [consuming, creating])

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Thought Meter</CardTitle>
        <CardDescription>Check your balance between consuming and creating</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="consuming" className="text-sm font-medium">
            Consuming
          </label>
          <Slider
            id="consuming"
            min={0}
            max={100}
            step={1}
            value={[consuming]}
            onValueChange={(value) => setConsuming(value[0])}
          />
          <span className="text-sm text-muted-foreground">{consuming}%</span>
        </div>

        <div className="space-y-2">
          <label htmlFor="creating" className="text-sm font-medium">
            Creating
          </label>
          <Slider
            id="creating"
            min={0}
            max={100}
            step={1}
            value={[creating]}
            onValueChange={(value) => setCreating(value[0])}
          />
          <span className="text-sm text-muted-foreground">{creating}%</span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Consuming</span>
            <span>Creating</span>
          </div>
          <Progress value={50 + balance / 2} className="h-2" />
        </div>

        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Tip</AlertTitle>
          <AlertDescription>{tip}</AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}

export default ThoughtMeter;