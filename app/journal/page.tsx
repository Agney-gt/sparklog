'use client'
import HabitTrackerGuide from "@/components/habit-tracker-guide"
import MarkdownEditor from "@/components/markdown-editor"
import * as React from "react"
import { addMonths, subYears, format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react'
import { CharacterTree } from "@/components/character-tree"
import { ActionWorkbook } from "@/components/action-workbook"
import Banner from "@/components/banner"
import { Maximize2 } from "lucide-react"
import LevelProgress from '@/components/level-progress'
export default function Component() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [markedDates, setMarkedDates] = React.useState<string[]>([])
  const [journalContent, setJournalContent] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSaving] = React.useState(false);
  
  // Generate an array of dates for the past 5 years plus current year
  const calendarMonths = React.useMemo(() => {
    const currentDate = new Date()
    const fiveYearsAgo = subYears(currentDate, 5)
    const months = []
    let currentMonth = fiveYearsAgo

    while (currentMonth <= currentDate) {
      months.push(new Date(currentMonth))
      currentMonth = addMonths(currentMonth, 1)
    }

    return months.reverse() // Reverse to show most recent first
  }, [])

  const fetchJournalEntry = React.useCallback(async (date: Date) => {
    setIsLoading(true);
    try {
      const formattedDate = format(date, 'yyyy-MM-dd')
      const response = await fetch(`/api/journal?date=${formattedDate}`)
      const { data, markedDates: fetchedMarkedDates } = await response.json()
      if (data) {
        // Handle the journal entry data
        setJournalContent(data.notes || "");
        setMarkedDates(fetchedMarkedDates || [])
      }
    } catch (error) {
      console.error('Error fetching journal entry:', error)
    }
    setIsLoading(false);
  }, [])

  // Fetch initial data
  React.useEffect(() => {
    if (date) {
      fetchJournalEntry(date)
    }
  }, [date, fetchJournalEntry])

  const handleSubmit = async () => {
    if (!date) return;
    
    try {
      const response = await fetch('/api/journal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: format(date, 'yyyy-MM-dd'),
          notes: journalContent, 
          gratitude: {},
          vent: "",
          obligations: {},
          mindset: {},
          reflections: {},
          trajectory: {},
          ffo: {}
        }),
      });
      
      if (response.ok) {
        console.log('Journal entry saved successfully');
        // Refresh the marked dates and content
        fetchJournalEntry(date);
      } else {
        const error = await response.json();
        console.error('Failed to save journal entry:', error.message);
      }
    } catch (error) {
      console.error('Error saving journal entry:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Banner />
      <LevelProgress />
    <div className="flex flex-col lg:flex-row h-screen max-h-screen w-full gap-4 p-4">
      <Card className="lg:w-80 w-full flex-shrink-0 h-auto lg:h-full">
        <CardHeader className="p-4">
          <h2 className="font-semibold">Calendar</h2>
        </CardHeader>
        <CardContent className="p-2 ">
          <ScrollArea className="h-[300px] lg:h-[calc((100vh-8rem)/2)]">
            {calendarMonths.map((month, index) => (
              <div key={index} className="mb-4">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => {
                    setDate(newDate);
                    // On mobile, automatically scroll to the entry section when a date is selected
                    if (window.innerWidth < 1024) {
                      document.getElementById('journal-entry')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  month={month}
                  className="w-full"
                  markedDates={markedDates}
                  setDate={setDate}
                  fetchJournalEntry={fetchJournalEntry}
                />
              </div>
            ))}
          </ScrollArea>
        </CardContent>
        <CardContent className="p-2">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Chat</h3>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => {
                  const iframe = document.querySelector('#taskade-chat') as HTMLIFrameElement;
                  if (iframe) {
                    iframe.requestFullscreen();
                  }
                }}
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="w-full h-[400px] overflow-hidden rounded-md">
              <iframe 
                id="taskade-chat"
                src="https://www.taskade.com/a/01JDKJ5G25N79MH2Z6RDW8BBEH" 
                width="100%" 
                height="100%" 
                style={{ border: 'none' }}
                title="Taskade Chatbot"
                allowFullScreen
              />
            </div>
          </CardContent>
      </Card>
      <Card id="journal-entry" className="flex-grow h-auto lg:h-full overflow-auto">
        <CardHeader className="p-4">
          <h2 className="text-xl font-semibold">Journal out of inspiration, not obligation!</h2>
          <p className="text-sm text-muted-foreground">
            {date?.toLocaleDateString('en-US', { 
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </CardHeader>
        <CardContent className="p-4">
          
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[200px] lg:min-h-[300px]">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              {
                <MarkdownEditor 
                value={journalContent}
                onChange={(value) => setJournalContent(value)}
              />
              }
              {/* ... other entry types ... */}
              <Button 
                className="mt-4 w-full lg:w-auto"
                onClick={handleSubmit}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Entry'
                )}
              </Button>
            </>
          )}
        </CardContent>
        <HabitTrackerGuide/>
        <ActionWorkbook />
        <CharacterTree />
      </Card>
      
      
    </div></div>
  )
}