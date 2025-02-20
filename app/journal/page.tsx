'use client'
import { useState, useCallback, useEffect } from 'react'
import CodeMirrorEditor from "@/components/CodeMirrorEditor" // Import the new CodeMirror component
import * as React from "react"
import { addMonths, subYears, format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react'
import Banner from "@/components/banner"
import LevelProgress from '@/components/level-progress'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import CharacterProfile from '../profile/page'
import MarketplacePage from '../marketplace/page'
import { HabitCategoryPage } from '@/components/habits-category'
import { ZenModeTimer } from '@/components/zen-mode'
import TCGGame from '../battle/page'

export default function Component() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  const cards = [
    { title: 'Profile', component: <CharacterProfile /> },
    { title: 'Archives', component: <MarketplacePage /> },
    { title: 'Combat', component: <HabitCategoryPage category="bad" /> },
    { title: 'Recharge', component: <ZenModeTimer initialTime={600} /> },
    { title: 'Battle', component: <TCGGame /> }
  ]

  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [markedDates, setMarkedDates] = React.useState<string[]>([])
  const [journalContent, setJournalContent] = React.useState<string>("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [isSaving] = React.useState(false)

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
    setIsLoading(true)
    try {
      const formattedDate = format(date, 'yyyy-MM-dd')
      const response = await fetch(`/api/journal?date=${formattedDate}`)
      const { data, markedDates: fetchedMarkedDates } = await response.json()
      if (data) {
        setJournalContent(data.notes || "")
        setMarkedDates(fetchedMarkedDates || [])
      }
    } catch (error) {
      console.error('Error fetching journal entry:', error)
    }
    setIsLoading(false)
  }, [])

  // Fetch initial data
  React.useEffect(() => {
    if (date) {
      fetchJournalEntry(date)
    }
  }, [date, fetchJournalEntry])

  const handleSubmit = async () => {
    if (!date) return

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
      })

      if (response.ok) {
        console.log('Journal entry saved successfully')
        fetchJournalEntry(date)
      } else {
        const error = await response.json()
        console.error('Failed to save journal entry:', error.message)
      }
    } catch (error) {
      console.error('Error saving journal entry:', error)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Banner />
      <LevelProgress />
      <div className="flex flex-col lg:flex-row min-h-screen w-full gap-4 p-2 sm:p-4">
        {/*
        <Card className="lg:w-80 w-full flex-shrink-0 ">
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
            <div className="w-full h-[780px] overflow-hidden rounded-md">
              <iframe 
                id="taskade-chat"
                src="https://www.taskade.com/a/01JDKJ5G25N79MH2Z6RDW8BBEH" 
                width="100%" 
                height="100%" 
                style={{ border: 'none' }}
                title="Taskade Chatbot"
                allow="clipboard-write; clipboard-read"
                allowFullScreen
              />
            </div>
          </CardContent>
        </Card>
        */}
        <Card id="journal-entry" className="flex-grow min-h-[calc(100vh-10rem)] lg:h-full overflow-hidden">
          <div className="container mx-auto p-2 sm:p-4 h-full">
            <div className="relative h-full">
              <div className="overflow-hidden h-full" ref={emblaRef}>
                <div className="flex h-full">
                  {cards.map((card, index) => (
                    <div className="flex-[0_0_100%] flex flex-col h-full" key={index}>
                      <Card className="min-h-[calc(100vh-10rem)] mx-2 lg:mx-4 flex flex-col h-full">
                        <CardHeader>
                          <CardTitle>{card.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow overflow-auto max-h-[calc(100vh-15rem)]">
                          {card.title === 'Profile' ? (
                            <div>
                              {/* Responsive layout for Profile */}
                              <div className="flex flex-col lg:flex-row">
                                {/* On small screens, character identity comes first (order-1) */}
                                <div className="w-full lg:w-3/4 pl-0 lg:pl-2 mt-4 lg:mt-0 order-1 lg:order-2">
                                  {card.component}
                                </div>
                                {/* On small screens, calendar comes below (order-2) but on large screens, it's to the left */}
                                <div className="w-full lg:w-1/4 pr-0 h-full lg:pr-2 flex flex-col order-2 lg:order-1">
                                  <h2 className="font-semibold">Calendar</h2>
                                  <ScrollArea className="h-[280px] lg:h-[calc(80vh-4rem)] overflow-auto">
                                    {calendarMonths.map((month, index) => (
                                      <div key={index} className="mb-4 h-full">
                                        <Calendar
                                          mode="single"
                                          selected={date}
                                          onSelect={(newDate) => {
                                            setDate(newDate)
                                            if (window.innerWidth < 1024) {
                                              document
                                                .getElementById('journal-entry')
                                                ?.scrollIntoView({ behavior: 'smooth' })
                                            }
                                          }}
                                          month={month}
                                          className="w-full h-full border-none"
                                          markedDates={markedDates}
                                          setDate={setDate}
                                          fetchJournalEntry={fetchJournalEntry}
                                        />
                                      </div>
                                    ))}
                                  </ScrollArea>
                                </div>
                              </div>

                              <CardHeader className="p-4">
                                <h2 className="text-xl font-semibold">
                                  Journal out of inspiration, not obligation!
                                </h2>
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
                                    <div className="max-h-[50vh] overflow-auto">
                                      <CodeMirrorEditor
                                        value={journalContent}
                                        onChange={(value) => setJournalContent(value)}
                                      />
                                    </div>
                                    <div id="image-preview" className="mt-4"></div>
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
                            </div>
                          ) : (
                            card.component
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <Button onClick={scrollPrev} disabled={!canScrollPrev} variant="default" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex space-x-2">
                  {cards.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 w-2 rounded-full ${index === selectedIndex ? 'bg-primary' : 'bg-gray-300'}`}
                    />
                  ))}
                </div>
                <Button onClick={scrollNext} disabled={!canScrollNext} variant="default" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
