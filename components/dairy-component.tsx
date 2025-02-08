"use client";

import { useEffect, useState, useCallback } from 'react';
import { format, isWithinInterval, subDays } from 'date-fns';
import { CheckCircle2, Circle, Loader2, Sun, Clock, Moon } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Task {
  id: string;
  text: string;
  date: string;
  time: string;
  completed: boolean;
}

type TimeFilter = 'all' | 'morning' | 'noon' | 'evening';

interface TaskListProps {
  onTaskCountChange: (counts: { morning: number; noon: number; evening: number }) => void;
  selectedDate: Date;
  dateFilter: 'today' | 'yesterday' | 'last7days';
}

export default function TaskList({ onTaskCountChange, selectedDate, dateFilter }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');
  const [, setUserId] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClientComponentClient()
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const startDate = dateFilter === 'last7days' 
        ? format(subDays(new Date(), 6), 'yyyy-MM-dd') 
        : format(selectedDate, 'yyyy-MM-dd');
      
      const url = `${timeFilter === 'all' ? '/api/tasks' : `/api/tasks?timeFilter=${timeFilter}`}?startDate=${startDate}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const result = await response.json();
      
      const filteredTasks = result.data.filter((task: Task) => {
        const taskDate = new Date(task.date);
        if (dateFilter === 'last7days') {
          return isWithinInterval(taskDate, {
            start: subDays(new Date(), 6),
            end: new Date()
          });
        }
        return format(taskDate, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
      });
      
      setTasks(filteredTasks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [timeFilter, selectedDate, dateFilter]);

  useEffect(() => {
    const fetchUserId = async () => {
      const { data: { user } } = await supabase.auth.getUser ()
      if (user) {
        setUserId(user.id)
      } else{
        router.push('/login')
      }
    }

    fetchUserId()
  }, [])

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  

  useEffect(() => {
    console.log('Tasks:', tasks);
  }, [tasks]);

  const calculateTaskCounts = useCallback(() => {
    const morningTasks = tasks.filter(task => {
      const hour = parseInt(task.time.split(':')[0], 10);
      return hour < 12 && !task.completed;
    }).length;

    const noonTasks = tasks.filter(task => {
      const hour = parseInt(task.time.split(':')[0], 10);
      return hour >= 12 && hour < 17 && !task.completed;
    }).length;

    const eveningTasks = tasks.filter(task => {
      const hour = parseInt(task.time.split(':')[0], 10);
      return hour >= 17 && !task.completed;
    }).length;

    return { morning: morningTasks, noon: noonTasks, evening: eveningTasks };
  }, [tasks]);

  useEffect(() => {
    const counts = calculateTaskCounts();
    onTaskCountChange(counts);
  }, [calculateTaskCounts, onTaskCountChange]);

  const handleTaskCompletion = async (taskId: string, completed: boolean) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ completed: !completed })
        .eq('id', taskId)

      if (error) {
        throw new Error('Failed to update task');
      }

      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId ? { ...task, completed } : task
        )
      );
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-destructive p-4">
        <p>{error}</p>
      </div>
    );
  }

  const getTasksByTime = (timeSlot: 'morning' | 'noon' | 'evening') => {
    return tasks.filter(task => {
      const hour = parseInt(task.time.split(':')[0], 10);
      switch (timeSlot) {
        case 'morning':
          return hour < 12;
        case 'noon':
          return hour >= 12 && hour < 17;
        case 'evening':
          return hour >= 17;
        default:
          return false;
      }
    });
  };

  const renderTimeSection = (
    timeSlot: 'morning' | 'noon' | 'evening',
    icon: React.ReactNode,
    title: string
  ) => {
    const filteredTasks = getTasksByTime(timeSlot);
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold">
          {icon}
          <span>{title}</span>
        </div>
        {filteredTasks.length === 0 ? (
          <div className="text-center text-muted-foreground p-4">
            <p>No tasks for this time period</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredTasks.map((task) => (
              <Card key={task.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => handleTaskCompletion(task.id, !task.completed)}
                    className="focus:outline-none"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
                    )}
                  </button>
                  <div className="flex-1">
                    <p className={`text-lg ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {task.text}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span>{format(new Date(task.date), 'MMM dd, yyyy')}</span>
                      <span>{task.time}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <Select value={timeFilter} onValueChange={(value: TimeFilter) => setTimeFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tasks</SelectItem>
            <SelectItem value="morning">Morning (Before 12 PM)</SelectItem>
            <SelectItem value="noon">Noon (12 PM - 5 PM)</SelectItem>
            <SelectItem value="evening">Evening (After 5 PM)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {renderTimeSection(
        'morning',
        <Sun className="h-5 w-5 text-yellow-500" />,
        'Morning Tasks'
      )}
      {renderTimeSection(
        'noon',
        <Clock className="h-5 w-5 text-blue-500" />,
        'Noon Tasks'
      )}
      {renderTimeSection(
        'evening',
        <Moon className="h-5 w-5 text-indigo-500" />,
        'Evening Tasks'
      )}
    </div>
  );
}