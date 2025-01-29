"use client"

import { useState, useEffect } from "react"
import { ChevronRight, Plus, Timer, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { isToday, isTomorrow, isWithinInterval, addHours } from 'date-fns'
import { Task } from "@/types/task"

export default function TaskManager() {
  const [expandedSections, setExpandedSections] = useState<string[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [taskText, setTaskText] = useState("")
  const [taskDate, setTaskDate] = useState("")
  const [taskTime, setTaskTime] = useState("")
  const [userId, setUserId] = useState<string | null>(null)
  const [tasks, setTasks] = useState<Task[]>([]) // Store tasks here

  // Create Supabase client
  const supabase = createClientComponentClient()

  // Fetch user ID on component mount
  useEffect(() => {
    const fetchUserId = async () => {
      const { data: { user } } = await supabase.auth.getUser ()
      if (user) {
        setUserId(user.id)
      }
    }

    fetchUserId()
  }, [])

  // Fetch tasks from the new API route
  useEffect(() => {
    const fetchTasks = async () => {
      if (userId) {
        try {
          const response = await fetch('/api/tasks') // Adjust the endpoint as necessary
          const result = await response.json()

          if (response.ok) {
            setTasks(result.data)
          } else {
            console.error("Error fetching tasks:", result.error)
          }
        } catch (error) {
          console.error("Error fetching tasks:", error)
        }
      }
    }

    fetchTasks()
  }, [userId])

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => 
      prev.includes(section) 
        ? prev.filter((s) => s !== section) 
        : [...prev, section]
    )
  }

  const handleAddTask = async () => {
    // Validate inputs
    if (!taskText || !taskDate || !taskTime) {
      console.error("Please fill in all task details")
      return
    }

    // Ensure user is logged in
    if (!userId) {
      console.error("You must be logged in to add a task")
      return
    }

    try {
      // Insert task into Supabase via the API
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: taskText,
          date: taskDate,
          time: taskTime,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error);
      }

      // Reset form fields
      setTaskText("")
      setTaskDate("")
      setTaskTime("")
      setIsModalOpen(false)

      // Update local tasks state
      setTasks((prev) => [...prev, result.data]) // Add the new task to the local state
    } catch (error) {
      console.error("Error adding task:", error)
    }
  }

  const handleToggleComplete = async (taskId: number, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ completed: !currentStatus })
        .eq('id', taskId)

      if (error) {
        throw error
      }

      // Update local tasks state
      setTasks((prev) => 
        prev.map(task => 
          task.id === taskId ? { ...task, completed: !currentStatus } : task
        )
      )
    } catch (error) {
      console.error("Error updating task completion:", error)
    }
  }

  const handleDeleteTask = async (taskId: number) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq(' id', taskId)

      if (error) {
        throw error
      }

      // Update local tasks state
      setTasks((prev) => prev.filter(task => task.id !== taskId))
    } catch (error) {
      console.error("Error deleting task:", error)
    }
  }

  // Filter tasks based on timeframe
  const filterTasks = (timeframe: string) => {
    const now = new Date();
    return tasks.filter(task => {
      const taskDateTime = new Date(`${task.date}T${task.time}`);
      if (timeframe === "today") {
        return isToday(taskDateTime);
      } else if (timeframe === "tomorrow") {
        return isTomorrow(taskDateTime);
      } else if (timeframe === "next7days") {
        return taskDateTime > now && taskDateTime <= addHours(now, 7 * 24);
      }
      return false;
    });
  };

  // Get upcoming tasks within the next hour
  const getUpcomingTasks = () => {
    const now = new Date();
    return tasks.filter(task => {
      const taskDateTime = new Date(`${task.date}T${task.time}`);
      return isWithinInterval(taskDateTime, { start: now, end: addHours(now, 1) });
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="space-y-6">
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Timer className="h-4 w-4" />
            <span>Urgent</span>
          </div>
        </header>

        <Button 
          variant="ghost" 
          className="w-full justify-start text-muted-foreground hover:text-foreground" 
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>

        {/* Display upcoming tasks */}
        {getUpcomingTasks().length > 0 && (
          <div className="border-t">
            <h3 className="font-semibold">Upcoming Tasks (Next Hour)</h3>
            {getUpcomingTasks().map((task, index) => (
              <div key={index} className="pb-4 pl-6">
                <p className="text-sm text-muted-foreground">{task.text} - {task.date} at {task.time}</p>
              </div>
            ))}
          </div>
        )}

        {(["today", "tomorrow", "next7days"] as const).map((timeframe) => (
          <div key={timeframe} className="border-t">
            <button
              onClick={() => toggleSection(timeframe)}
              className={cn(
                "flex w-full items-center py-4 text-left",
                "hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                expandedSections.includes(timeframe) ? "text-foreground" : "text-muted-foreground",
              )}
              aria-expanded={expandedSections.includes(timeframe)}
            >
              <ChevronRight
                className={cn("mr-2 h-4 w-4 transition-transform", expandedSections.includes(timeframe) && "rotate-90")}
              />
              <span className="capitalize">{timeframe === "next7days" ? "Next 7 days" : timeframe}</span>
            </button>

            {expandedSections.includes(timeframe) && (
              <div className="pb-4 pl-6">
                {filterTasks(timeframe).length > 0 ? (
                  filterTasks(timeframe).map((task, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggleComplete(task.id, task.completed)}
                        className="mr-2"
                      />
                      <p className={`text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {task.text} - {task.date} at {task.time}
                      </p>
                      <Button 
                        variant="outline" 
                        className="ml-2" 
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No tasks for this period</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal for Adding New Task */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>
              Create a new task with details
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="task-text" className="text-right">
                Task
              </label>
              <input
                id="task-text"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                className="col-span-3 border p-2 rounded"
                placeholder="Enter task description"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="task-date" className="text-right">
                Date
              </label>
              <input
                id="task-date"
                type="date"
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
                className="col-span-3 border p-2 rounded"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="task-time" className="text-right">
                Time
              </label>
              <input
                id="task-time"
                type="time"
                value={taskTime}
                onChange={(e) => setTaskTime(e.target.value)}
                className="col-span-3 border p-2 rounded"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAddTask}>
              Add Task
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}