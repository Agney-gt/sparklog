'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash2 } from 'lucide-react'

type Action = {
  id: string
  classifier: string
  action: string
}

export function ActionWorkbook() {
  const [actions, setActions] = useState<Action[]>([
    { id: '1', classifier: "Morning Routine", action: "Expose yourself to sunlight for 10 minutes, hydrate with lemon water, and follow with a quick 5-minute stretching routine to awaken your body." },
    { id: '2', classifier: "Morning Routine", action: "Journal your dreams or waking thoughts, visualize a successful day, and write down an \"I will\" statement to anchor your intentions." },
    { id: '3', classifier: "Morning Routine", action: "Dedicate 20 minutes to a creative task that excites you, whether writing, drawing, or brainstorming." },
    { id: '4', classifier: "Intentional Growth", action: "Write down a small improvement from yesterday and brainstorm three ideas to improve personal or professional projects." },
    { id: '5', classifier: "Intentional Growth", action: "Listen to an audiobook for 15 minutes, then research and outline a new life goal with actionable steps." },
    { id: '6', classifier: "Intentional Growth", action: "Spend focused time overcoming a fear by researching or practicing strategies that build confidence." },
  ])

  const [completedActions, setCompletedActions] = useState<{ [key: string]: boolean }>({})
  const [newClassifier, setNewClassifier] = useState('')
  const [newAction, setNewAction] = useState('')

  const toggleAction = (actionId: string) => {
    setCompletedActions(prev => ({
      ...prev,
      [actionId]: !prev[actionId]
    }))
  }

  const addNewAction = () => {
    if (newClassifier && newAction) {
      const newId = Date.now().toString()
      setActions(prev => [...prev, { id: newId, classifier: newClassifier, action: newAction }])
      setNewClassifier('')
      setNewAction('')
    }
  }

  const deleteAction = (id: string) => {
    setActions(prev => prev.filter(action => action.id !== id))
    setCompletedActions(prev => {
      const { [id]: _, ...rest } = prev
      return rest
    })
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Action Workbook</h1>
      <div className="mb-6 flex gap-4">
        <Input
          placeholder="Classifier"
          value={newClassifier}
          onChange={(e) => setNewClassifier(e.target.value)}
          className="max-w-xs"
        />
        <Input
          placeholder="Action"
          value={newAction}
          onChange={(e) => setNewAction(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={addNewAction}>Add Action</Button>
      </div>
      <ScrollArea className="h-[600px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Classifier</TableHead>
              <TableHead className="w-[400px]">Action</TableHead>
              <TableHead className="text-center">Completed</TableHead>
              <TableHead className="w-[100px]">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {actions.map((action) => (
              <TableRow key={action.id}>
                <TableCell className="font-medium">{action.classifier}</TableCell>
                <TableCell>{action.action}</TableCell>
                <TableCell className="text-center">
                  <Checkbox
                    checked={completedActions[action.id] || false}
                    onCheckedChange={() => toggleAction(action.id)}
                    aria-label={`Mark "${action.action}" as completed`}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteAction(action.id)}
                    aria-label={`Delete action "${action.action}"`}
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