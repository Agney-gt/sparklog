"use client";

import { useState, useCallback, useEffect } from "react";
import { Brain, Activity } from "lucide-react";
import TaskList from "@/components/dairy-component";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format, subDays } from "date-fns";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface TaskCounts {
  morning: number;
  noon: number;
  evening: number;
}

type DateFilter = 'today' | 'yesterday' | 'last7days';

export default function Home() {
  const router = useRouter();
  const supabase = createClientComponentClient()
  const [mood, setMood] = useState<TaskCounts>({ morning: 0, noon: 0, evening: 0 });
  const [focus] = useState(2);
  const [stress] = useState(3);
  const [performance, setPerformance] = useState(1);
  const [dateFilter, setDateFilter] = useState<DateFilter>('today');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isSaving, setIsSaving] = useState(false);
  const [, setUserId] = useState<string | null>(null)

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

  const handleDateFilterChange = (value: DateFilter) => {
    setDateFilter(value);
    switch (value) {
      case 'today':
        setSelectedDate(new Date());
        break;
      case 'yesterday':
        setSelectedDate(subDays(new Date(), 1));
        break;
      case 'last7days':
        setSelectedDate(subDays(new Date(), 6));
        break;
    }
  };

  const handleTaskCountChange = useCallback((counts: TaskCounts) => {
    setMood(counts);
    
    const totalTasks = counts.morning + counts.noon + counts.evening;
    const completedTasks = 
      (7 - counts.morning) + 
      (7 - counts.noon) + 
      (7 - counts.evening);
    
    const maxPossibleTasks = totalTasks * 3;
    const performanceScore = Math.ceil((completedTasks / maxPossibleTasks) * 5);
    setPerformance(Math.min(Math.max(performanceScore, 1), 5));
  }, []);

  const renderProgressBar = (count: number, label: string) => {
    const sections = Array.from({ length: 7 }, (_, i) => (
      <div
        key={i}
        className={`h-full flex-1 ${
          i < count
            ? 'bg-primary'
            : 'bg-gray-300'
        } ${i > 0 ? 'border-l border-white' : ''}`}
      />
    ));

    return (
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm text-gray-600 w-20">{label}</span>
        <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden flex">
          {sections}
        </div>
      </div>
    );
  };

  const saveDairyEntry = async () => {
    if (isSaving) return;
  
    setIsSaving(true);
    const payload = {
      mood,
      focus,
      stress,
      performance,
      date: format(selectedDate, 'yyyy-MM-dd'),
    };
  
    console.log('Saving dairy entry with payload:', payload);
  
    try {
      const response = await fetch('/api/dairy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API error:', errorData);
        throw new Error(errorData.message || 'Failed to save dairy entry');
      }
  
      // Optionally handle success
    } catch (error) {
      console.error('Error saving dairy entry:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">DAIRY</h1>
            <div className="flex items-center gap-4">
              <Select value={dateFilter} onValueChange={handleDateFilterChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="last7days">Last 7 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="font-medium">Task Progress</h2>
                {renderProgressBar(mood.morning, "Morning")}
                {renderProgressBar(mood.noon, "Noon")}
                {renderProgressBar(mood.evening, "Evening")}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-blue-500" />
                    <span className="text-sm text-gray-600">Focus Level</span>
                  </div>
                  <span className="text-sm font-medium">{focus}/2</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-red-500" />
                    <span className="text-sm text-gray-600">Stress Level</span>
                  </div>
                  <span className="text-sm font-medium">{stress}/3</span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Performance Index ({performance}/5)</h3>
                <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-green-500 h-full transition-all duration-300"
                    style={{ width: `${(performance / 5) * 100}%` }}
                  />
                </div>
              </div>

              <button
                onClick={saveDairyEntry}
                disabled={isSaving}
                className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Saving...' : 'Save Dairy Entry'}
              </button>
            </div>

            <div className="space-y-6">
              <h1 className="text-xl font-bold text-gray-900">Tasks</h1>
              <TaskList 
                onTaskCountChange={handleTaskCountChange}
                selectedDate={selectedDate}
                dateFilter={dateFilter}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}