'use client'

import { useState, useEffect, useCallback } from 'react'
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
  // ... defaultActions data here ...
]

export function ActionWorkbook() {
  const [actions, setActions] = useState<Action[]>([])
  const [newClassifier, setNewClassifier] = useState('')
  const [newAction, setNewAction] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addDefaultActions = useCallback(async () => {
    try {
      setIsSubmitting(true)
      const date = format(new Date(), 'yyyy-MM-dd')

      // Add each default action
      for (const action of defaultActions) {
        const response = await fetch('/api/checklist', {
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
        
        if (!response.ok) {
          console.error('Failed to add action', action);
        }
      }

      // Log to confirm if default actions are added
      console.log('Default actions added, now fetching actions');
      
      // Fetch the newly added actions
      await fetchActions()
    } catch (error) {
      console.error('Error adding default actions:', error)
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  const fetchActions = useCallback(async () => {
    try {
      setIsLoading(true)
      const date = format(new Date(), 'yyyy-MM-dd')
      const response = await fetch(`/api/checklist?date=${date}`)
      const result = await response.json()
      
      console.log('Fetch Actions Response:', result)  // Log response

      if (!result.data || result.data.length === 0) {
        // Prevent further calls if no actions are found
        if (actions.length === 0) {
          console.log('No actions found, adding default actions.');
          await addDefaultActions()
        }
      } else {
        setActions(result.data || [])
      }
    } catch (error) {
      console.error('Error fetching actions:', error)
    } finally {
      setIsLoading(false)
    }
  }, [addDefaultActions, actions.length]) // Ensure we only call addDefaultActions if actions array is empty

  useEffect(() => {
    fetchActions()
  }, [fetchActions])

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
