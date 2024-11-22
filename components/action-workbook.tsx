'use client'

import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash2, Loader2 } from 'lucide-react'
import { format } from 'date-fns'

type Action = {
  id: string
  user_id: string
  classifier: string
  text: string
  is_completed: boolean
  date: string
  created_at: string
}

const defaultActions: Omit<Action, 'user_id' | 'date' | 'created_at'>[] = [
  { id: '1', classifier: "Morning Routine", text: "Expose yourself to sunlight for 10 minutes, hydrate with lemon water, and follow with a quick 5-minute stretching routine to awaken your body.", is_completed: false },
  { id: '2', classifier: "Intentional Growth", text: "Identify one small improvement from yesterday and take an action to keep progressing in that area today.", is_completed: false },
  { id: '3', classifier: "Energy Optimization", text: "Take a 10-minute power nap or alternate between hot and cold water in the shower to refresh and recharge your energy.", is_completed: false },
  { id: '4', classifier: "Skill-Building", text: "Dedicate 30 minutes to learning a new skill, such as practicing a language, coding, or exploring a creative hobby.", is_completed: false },
  { id: '5', classifier: "Time Management", text: "Organize tomorrow’s tasks by creating a prioritized to-do list, ensuring the most important tasks are scheduled first.", is_completed: false },
  { id: '6', classifier: "Adventure & Exploration", text: "Try something new today, like exploring a different neighborhood, trying a new cuisine, or engaging in an unfamiliar activity.", is_completed: false },
  { id: '7', classifier: "Body Awareness", text: "Engage in a practice to increase body awareness, such as doing yoga, tracking your posture, or practicing mindfulness in movement.", is_completed: false },
  { id: '8', classifier: "Legacy Building", text: "Write down a valuable lesson you’ve learned recently, or start a collection of memories you want to preserve for future generations.", is_completed: false },
  { id: '9', classifier: "Sustainability Practices", text: "Make one eco-friendly choice today, such as using reusable bags, choosing sustainable products, or reducing waste in a daily activity.", is_completed: false },
  { id: '10', classifier: "Creativity Boost", text: "Brainstorm new ideas for a creative project or activity, and take the first step toward bringing one idea to life.", is_completed: false },
  { id: '11', classifier: "Self-Discovery", text: "Take a personality test or spend 15 minutes reflecting on your core values to gain a deeper understanding of yourself.", is_completed: false },
  { id: '12', classifier: "Relationship-Building", text: "Reach out to a friend or family member today with a meaningful message or invite them to connect in person or virtually.", is_completed: false },
  { id: '13', classifier: "Cultural Enrichment", text: "Engage with a new cultural experience today, whether by reading an article, watching a film, or cooking a traditional dish from another country.", is_completed: false },
  { id: '14', classifier: "Personal Safety", text: "Review and update your passwords or learn a new personal safety tip, such as basic self-defense moves or emergency preparedness.", is_completed: false },
  { id: '15', classifier: "Self-Expression", text: "Spend time expressing yourself creatively today, whether through writing, painting, or curating an outfit that reflects your personality.", is_completed: false },
  { id: '16', classifier: "Memory Enhancement", text: "Engage in a memory exercise, such as recalling a past event in vivid detail or memorizing a meaningful quote to reinforce mental recall.", is_completed: false },
  { id: '17', classifier: "Environmental Awareness", text: "Take a walk outside to connect with nature, or pick up litter in your community to contribute to environmental cleanliness.", is_completed: false },
  { id: '18', classifier: "Digital Organization", text: "Spend 30 minutes decluttering your digital files or organizing your email inbox to reduce digital stress and increase productivity.", is_completed: false },
  { id: '19', classifier: "Problem-Solving", text: "Identify a problem you’re currently facing and come up with three possible solutions. Choose one to take action on immediately.", is_completed: false },
  { id: '20', classifier: "Gratitude Practices", text: "Write down three things you’re grateful for today and reflect on how they positively impact your life.", is_completed: false },
  { id: '21', classifier: "Overcoming Fear", text: "Identify a small fear or challenge you’ve been avoiding and take a step to face it today, whether through research, practice, or a small action.", is_completed: false },
  { id: '22', classifier: "Internal Dialogue", text: "Practice affirming positive thoughts to yourself today, such as repeating a mantra or reminding yourself of your capabilities.", is_completed: false },
  { id: '23', classifier: "No Junk Habits", text: "Replace one unproductive habit today with a more intentional, value-adding activity, such as replacing scrolling on your phone with reading a book.", is_completed: false }
]

export function ActionWorkbook() {
  const [actions, setActions] = useState<Action[]>([])
  const [newClassifier, setNewClassifier] = useState('')
  const [newAction, setNewAction] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addDefaultActions = async () => {
    try {
      setIsSubmitting(true)
      const date = format(new Date(), 'yyyy-MM-dd')
      
      // Add each default action
      for (const action of defaultActions) {
        await fetch('/api/checklist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            date,
            classifier: action.classifier,
            action: action.text
          })
        })
      }
      
      // Fetch the newly added actions
      await fetchActions()
    } catch (error) {
      console.error('Error adding default actions:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const fetchActions = async () => {
    try {
      setIsLoading(true)
      const date = format(new Date(), 'yyyy-MM-dd')
      const response = await fetch(`/api/checklist?date=${date}`)
      const { data } = await response.json()
      
      if (!data || data.length === 0) {
        await addDefaultActions()
      } else {
        setActions(data || [])
      }
    } catch (error) {
      console.error('Error fetching actions:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchActions()
  }, [])

  const addNewAction = async () => {
    if (!newClassifier || !newAction) return
    
    try {
      setIsSubmitting(true)
      const response = await fetch('/api/checklist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: format(new Date(), 'yyyy-MM-dd'),
          classifier: newClassifier,
          action: newAction
        })
      })

      if (!response.ok) {
        throw new Error('Failed to add action')
      }

      setNewClassifier('')
      setNewAction('')
      await fetchActions()
    } catch (error) {
      console.error('Error adding action:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleAction = async (action: Action) => {
    try {
      const response = await fetch('/api/checklist', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: action.id,
          is_completed: !action.is_completed
        })
      })

      if (!response.ok) {
        throw new Error('Failed to toggle action')
      }

      await fetchActions()
    } catch (error) {
      console.error('Error toggling action:', error)
    }
  }

  const deleteAction = async (action: Action) => {
    try {
      const response = await fetch(`/api/checklist?id=${action.id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete action')
      }

      await fetchActions()
    } catch (error) {
      console.error('Error deleting action:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[400px] flex-col">
        <Loader2 className="h-8 w-8 animate-spin mb-4" />
        <p className="text-center text-sm text-gray-600">
        Preparing your workbook... this won't take more than a minute!
        </p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6 flex gap-4">
        <Input
          placeholder="Type your Classifier here"
          value={newClassifier}
          onChange={(e) => setNewClassifier(e.target.value)}
          className="max-w-xs"
        />
        <Input
          placeholder="Set your Action with Intention"
          value={newAction}
          onChange={(e) => setNewAction(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={addNewAction} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding...
            </>
          ) : (
            'Add Action'
          )}
        </Button>
      </div>
      <ScrollArea className="h-[600px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Classifier</TableHead>
              <TableHead className="w-[400px]">7 Day Streak</TableHead>
              <TableHead className="text-center">Reward When Habit Sticks</TableHead>
              <TableHead className="w-[100px]">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {actions.map((action) => (
              <TableRow key={action.id}>
                <TableCell className="font-medium">{action.classifier}</TableCell>
                <TableCell>{action.text}</TableCell>
                <TableCell className="text-center">
                  <Checkbox
                    checked={action.is_completed}
                    onCheckedChange={() => toggleAction(action)}
                    aria-label={`Mark "${action.text}" as completed`}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteAction(action)}
                    aria-label={`Delete action "${action.text}"`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  )
}