'use client'

import * as React from "react"
import { addMonths, subYears, format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Camera, FileAudio, FileVideo, ListTodo, Tags, Timer, Type } from 'lucide-react'

export function JournalApp() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [entryType, setEntryType] = React.useState("text")

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

  // Sample dates with entries for calendar highlighting
  const datesWithEntries = [
    new Date(2024, 0, 5),
    new Date(2024, 0, 10),
    new Date(2024, 0, 15),
    new Date(2023, 11, 25),
    new Date(2022, 5, 1),
    new Date(2021, 2, 15),
    new Date(2020, 8, 22),
    new Date(2019, 4, 30),
  ]

  // Function to check if a date has an entry
  const hasEntry = (date: Date) => {
    return datesWithEntries.some(
      (entryDate) =>
        entryDate.getDate() === date.getDate() &&
        entryDate.getMonth() === date.getMonth() &&
        entryDate.getFullYear() === date.getFullYear()
    )
  }

  return (
    <div className="flex h-screen max-h-screen w-full gap-4 p-4">
      <Card className="w-80 flex-shrink-0">
        <CardHeader className="p-4">
          <h2 className="font-semibold">Journal Calendar</h2>
        </CardHeader>
        <CardContent className="p-2">
          <ScrollArea className="h-[calc(100vh-8rem)]">
            {calendarMonths.map((month, index) => (
              <div key={index} className="mb-4">
                <h3 className="mb-2 text-sm font-medium">{format(month, 'MMMM yyyy')}</h3>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  month={month}
                  className="w-full"
                  modifiers={{
                    hasEntry: (date) => hasEntry(date),
                  }}
                  modifiersStyles={{
                    hasEntry: {
                      backgroundColor: "hsl(var(--primary))",
                      color: "hsl(var(--primary-foreground))",
                    },
                  }}
                />
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
      <Card className="flex-grow">
        <CardHeader className="p-4">
          <h2 className="text-xl font-semibold">What do you do to be involved in the community?</h2>
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
          <div className="mb-4">
            <Select value={entryType} onValueChange={setEntryType}>
              <SelectTrigger>
                <SelectValue placeholder="Select entry type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">
                  <span className="flex items-center gap-2">
                    <Type className="h-4 w-4" />
                    Text Entry
                  </span>
                </SelectItem>
                <SelectItem value="image">
                  <span className="flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    Images
                  </span>
                </SelectItem>
                <SelectItem value="audio">
                  <span className="flex items-center gap-2">
                    <FileAudio className="h-4 w-4" />
                    Audio
                  </span>
                </SelectItem>
                <SelectItem value="video">
                  <span className="flex items-center gap-2">
                    <FileVideo className="h-4 w-4" />
                    Video
                  </span>
                </SelectItem>
                <SelectItem value="tasks">
                  <span className="flex items-center gap-2">
                    <ListTodo className="h-4 w-4" />
                    Tasks
                  </span>
                </SelectItem>
                <SelectItem value="tags">
                  <span className="flex items-center gap-2">
                    <Tags className="h-4 w-4" />
                    Tags
                  </span>
                </SelectItem>
                <SelectItem value="timer">
                  <span className="flex items-center gap-2">
                    <Timer className="h-4 w-4" />
                    Auto Timer
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          {entryType === "text" && (
            <Textarea
              placeholder="Write your journal entry here..."
              className="min-h-[300px]"
            />
          )}
          {entryType === "image" && (
            <div className="flex h-[300px] items-center justify-center rounded-lg border border-dashed border-gray-300">
              <div className="text-center">
                <Camera className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">Drop images here or click to upload</p>
              </div>
            </div>
          )}
          {/* Additional entry type UI components would be added here */}
        </CardContent>
      </Card>
    </div>
  )
}