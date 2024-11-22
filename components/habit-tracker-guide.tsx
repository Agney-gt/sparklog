import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CheckCircle, Zap, Brain, Sun, Gift, Lightbulb } from "lucide-react"

export default function HabitTrackerGuide() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-6">🛠️ Habit Stack</h1>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="classify">
          <AccordionTrigger>
            <span className="flex items-center">
              <CheckCircle className="mr-2" />
              1. Classify Your Habits
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <p>Each habit falls under a Classifier that focuses on a specific area of life, such as:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><span className="font-semibold">Morning Routine</span> for starting your day right.</li>
              <li><span className="font-semibold">Intentional Growth</span> to ensure consistent progress.</li>
              <li><span className="font-semibold">Energy Optimization</span> for sustained vitality.</li>
            </ul>
            <p className="mt-2">You can use these categories to prioritize habits based on your goals.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="track">
          <AccordionTrigger>
            <span className="flex items-center">
              <Zap className="mr-2" />
              2. Track Your Progress
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <p>For each habit:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Log your activity daily for at least 7 consecutive days to earn a streak.</li>
              <li>Reflect on which habits are sticking and where you face challenges.</li>
              <li>Use the streak tracker to celebrate milestones and stay motivated.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="reward">
          <AccordionTrigger>
            <span className="flex items-center">
              <Gift className="mr-2" />
              3. Reward Your Progress
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <p>When you complete a habit consistently:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Reward yourself with small incentives (e.g., a favorite snack, extra leisure time).</li>
              <li>For larger milestones (e.g., a month-long streak), consider a bigger reward like a day off or a meaningful gift.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="tips">
          <AccordionTrigger>
            <span className="flex items-center">
              <Lightbulb className="mr-2" />
              Tips for Success
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2">
              <li>
                <span className="font-semibold">Stack habits on existing routines.</span>
                <br />
                Example: Do stretches right after brushing your teeth.
              </li>
              <li>
                <span className="font-semibold">Start small.</span>
                <br />
                Focus on consistency over intensity.
              </li>
              <li>
                <span className="font-semibold">Track visually.</span>
                <br />
                Use a habit tracker to see your streaks grow.
              </li>
              <li>
                <span className="font-semibold">Reflect often.</span>
                <br />
                Regularly review what's working and refine as needed.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="reflect">
          <AccordionTrigger>
            <span className="flex items-center">
              <Brain className="mr-2" />
              Reflecting on Your Streaks
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="font-semibold">Weekly Check-In Questions:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Which habits felt effortless to maintain?</li>
              <li>What external factors helped or hindered consistency?</li>
              <li>What adjustments can you make for next week?</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

