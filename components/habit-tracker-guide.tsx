import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Zap, Brain, Sun, Gift, Lightbulb } from "lucide-react"
export default function HabitTrackerGuide() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="classify">
          <AccordionTrigger>
            <span className="flex items-center">
            <Sun className="mr-2" />
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
              <li>Mentally log your activity daily for at least 7 consecutive days to earn a streak. </li>
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
            <span className="font-semibold">Cue:</span> The trigger that starts the habit. It could be a specific Time, Location, a Precending Event, Emotional State, or Other People.
          </li>
          <li>
            <span className="font-semibold">Craving:</span> The motivational force behind every habit.
            <br />
            E.g., You don’t want to exercise; you want to feel good after your workout.
          </li>
          <li>
            <span className="font-semibold">Response:</span> The actual habit you perform — a thought or action.
            <br />
            Response depends on motivation and ability.
          </li>
          <li>
            <span className="font-semibold">Reward:</span> The end goal of every habit.
            <ul className="space-y-2 pl-6">
              <li><span className="font-semibold">Short term:</span> Relief from craving.</li>
              <li><span className="font-semibold">Long term:</span> Remember which actions are worth repeating.</li>
            </ul>
          </li>
          <li>
            <span className="font-semibold">Activation Energy:</span> Smaller habits are easier to build.  
            <br />
            <i>Example: Start with 10 pushups/day, not 100.</i>
          </li>
          <li>
            <span className="font-semibold">Mere-exposure effect:</span> The more you do something, the easier it gets.  
            <br />
            <i>Do it for 6 weeks before deciding it’s “too hard.”</i>
          </li>
          <li>
            <span className="font-semibold">Compounding:</span> You won’t see the big results from good habits until years later.  
            <br />
            <i>Trust the process.</i>
          </li>
          <li>
            <span className="font-semibold">2-day rule:</span> Don’t strive for perfection. Strive for never missing 2 days in a row.
          </li>
          <li>
            <span className="font-semibold">Tribalism:</span> Your habits will match the people around you.  
            <br />
            <i>Choose wisely!</i>
          </li>
          <li>
            <span className="font-semibold">Evolution:</span> You’re wired to conserve energy and eat a lot.  
            <br />
            <i>Your crusade for healthy habits won’t be easy.</i>
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
              <li>What can I do to make everything easier?</li>
              <li>What excited me today?</li>
              <li>What drained energy?</li>
              <li>What did I learn?</li>
              <li>How can I add value to others and benefit from service to others?</li>
              <li>How do I push the needle forward?</li>
              <li>If you wanted to tell your past self something, what would it be?</li>
              <li>List 5 things you would fight to get back if they were taken away from you.</li>
              <li>List 5 things you wouldn't fight to get back if they were taken away from you.</li>
              <li>If you knew you wouldn't fail, what would you do?</li>
              <li>How did you interpret this bad situation/event, what objectively happened in this situation, and what significance did you give it?</li>
              <li>How would you comfort a friend in the same situation, and what can you learn or reframe to make it positive?</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

