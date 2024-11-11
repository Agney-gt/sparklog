'use client'

import { useState, useEffect } from 'react'
import { SessionProvider } from "next-auth/react"
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { startOfDay } from 'date-fns'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
type JournalFormData = {
  gratitude: {
    mundane: string;
    chance: string;
    made_happen: string;
  };
  vent: string;
  obligations: {
    bare_minimum: string;
    kaizen_goals: string;
  };
  mindset: {
    affirmation: string;
    reframe: {
      objective: string;
      meaning: string;
      comfort: string;
      positive: string;
    };
  };
  reflections: {
    excited: string;
    drained: string;
    learned: string;
    value: string;
    needle: string;
    past_self: string;
    fightToGetBack: string;
    wouldntFightFor: string;
    pareto: string;
    noFailure: string;
  };
  trajectory: {
    current: {
      against: string;
      towards: string;
      actionable: string;
    };
    longTerm: {
      past: string;
      present: string;
      future: string;
    };
  };
  ffo: {
    fears: string;
    fixes: string;
    outcomes: string;
  };
  date:string;
}

function JournalEntry() {
  const router = useRouter()
  const [date, setDate] = useState(startOfDay(new Date()))
  const { register, handleSubmit, reset } = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClientComponentClient()
  const [isFetching, setIsFetching] = useState(false)

  const fetchJournalEntry = async (date: Date) => {
    try {
      setIsFetching(true)
      const formattedDate = date.toISOString()
      
      const response = await fetch(`/api/journal?date=${formattedDate}`)
      const { data } = await response.json()
      
      if (data) {
        reset({
          gratitude: {
            mundane: data.gratitude?.mundane || '',
            chance: data.gratitude?.chance || '',
            made_happen: data.gratitude?.made_happen || ''
          },
          
          vent: data.vent || '',
          
          obligations: {
            bare_minimum: data.obligations?.bare_minimum || '',
            kaizen_goals: data.obligations?.kaizen_goals || ''
          },
          
          mindset: {
            affirmation: data.mindset?.affirmation || '',
            reframe: {
              objective: data.mindset?.reframe?.objective || '',
              meaning: data.mindset?.reframe?.meaning || '',
              comfort: data.mindset?.reframe?.comfort || '',
              positive: data.mindset?.reframe?.positive || ''
            }
          },
          
          reflections: {
            excited: data.reflections?.excited || '',
            drained: data.reflections?.drained || '',
            learned: data.reflections?.learned || '',
            value: data.reflections?.value || '',
            needle: data.reflections?.needle || '',
            past_self: data.reflections?.past_self || '',
            fightToGetBack: data.reflections?.fightToGetBack || '',
            wouldntFightFor: data.reflections?.wouldntFightFor || '',
            pareto: data.reflections?.pareto || '',
            noFailure: data.reflections?.noFailure || ''
          },
          
          trajectory: {
            current: {
              against: data.trajectory?.current?.against || '',
              towards: data.trajectory?.current?.towards || '',
              actionable: data.trajectory?.current?.actionable || ''
            },
            longTerm: {
              past: data.trajectory?.longTerm?.past || '',
              present: data.trajectory?.longTerm?.present || '',
              future: data.trajectory?.longTerm?.future || ''
            }
          },
          
          ffo: {
            fears: data.ffo?.fears || '',
            fixes: data.ffo?.fixes || '',
            outcomes: data.ffo?.outcomes || ''
          }
        })
      } else {
        reset({
          gratitude: {
            mundane: '',
            chance: '',
            made_happen: ''
          },
          vent: '',
          obligations: {
            bare_minimum: '',
            kaizen_goals: ''
          },
          mindset: {
            affirmation: '',
            reframe: {
              objective: '',
              meaning: '',
              comfort: '',
              positive: ''
            }
          },
          reflections: {
            excited: '',
            drained: '',
            learned: '',
            value: '',
            needle: '',
            past_self: '',
            fightToGetBack: '',
            wouldntFightFor: '',
            pareto: '',
            noFailure: ''
          },
          trajectory: {
            current: {
              against: '',
              towards: '',
              actionable: ''
            },
            longTerm: {
              past: '',
              present: '',
              future: ''
            }
          },
          ffo: {
            fears: '',
            fixes: '',
            outcomes: ''
          }
        })
      }

      console.log('Fetched data:', data)
    } catch (error) {
      console.error('Error fetching journal entry:', error)
    } finally {
      setIsFetching(false)
    }
  }

  const navigateDate = async (direction: 'prev' | 'next') => {
    const newDate = new Date(date)
    if (direction === 'next') {
      newDate.setDate(newDate.getDate() + 1)
    } else {
      newDate.setDate(newDate.getDate() - 1)
    }
    const newStartOfDay = startOfDay(newDate)
    setDate(newStartOfDay)
    await fetchJournalEntry(newStartOfDay)
  }

  useEffect(() => {
    fetchJournalEntry(date)
  }, [])

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    try {
      setIsLoading(true);
      const journalData: JournalFormData = {
        gratitude: data.gratitude || null,
        vent: data.vent || null,
        obligations: data.obligations || null,
        mindset: data.mindset || null,
        reflections: data.reflections || null,
        trajectory: data.trajectory || null,
        ffo: data.ffo || null,
        date: new Date().toISOString(),
      };
  
      const response = await fetch('/api/journal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(journalData),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.error || 'Failed to save entry');
      }
  
      alert('Journal entry saved successfully!');
    } catch (error) {
      console.error('Error saving entry:', error);
      alert('Error saving journal entry');
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      router.push('/login')
      router.refresh()
    } catch (error) {
      console.error('Error logging out:', error)
      alert('Error logging out')
    }
  }

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          router.push('/login')
          return
        }
      } catch (error) {
        console.error('Error checking auth status:', error)
        router.push('/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkUser()
  }, [])

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin">Loading...</div>
    </div>
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto bg-gray-100">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-bold">Journal out of inspiration, not obligation - {format(date, 'MMMM d, yyyy')}</CardTitle>
              <div className="mt-2">
                <Badge variant="secondary">Level 1</Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => navigateDate('prev')} title="Previous day">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={() => {
              const today = startOfDay(new Date())
              setDate(today)
              fetchJournalEntry(today)
            }}>
              Today
            </Button>
            <Button variant="outline" size="icon" onClick={() => navigateDate('next')} title="Next day">
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {(isLoading || isFetching) && (
              <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
                <div className="animate-spin">Loading...</div>
              </div>
            )}
            <Accordion type="multiple">
            {/* Gratitude Section */}
            <AccordionItem value="gratitude">
              <AccordionTrigger className="bg-blue-200">🌟 Gratitude</AccordionTrigger>
              <AccordionContent>
                <Card className="bg-white shadow-md p-4">
                  <Input {...register('gratitude.mundane')} placeholder="1. Something mundane" className="mb-2" />
                  <Input {...register('gratitude.chance')} placeholder="2. Something that happened by chance" className="mb-2" />
                  <Input {...register('gratitude.made_happen')} placeholder="3. Something you made happen" className="mb-2" />
                </Card>
              </AccordionContent>
            </AccordionItem>

            {/* Vent Section */}
            <AccordionItem value={''}>
              <AccordionTrigger className="bg-blue-200">🔥 V - Vent</AccordionTrigger>
              <AccordionContent>
                <Card className="bg-white shadow-md p-4">
                  <Textarea
                    {...register('vent')}
                    placeholder="Write freely about anything that's frustrating or bothering you."
                    className="h-32 mb-2"
                  />
                </Card>
              </AccordionContent>
            </AccordionItem>

            {/* Obligations Section */}
            <AccordionItem value={''}>
              <AccordionTrigger className="bg-blue-200">📝 O - Obligations</AccordionTrigger>
              <AccordionContent>
                <Card className="bg-white shadow-md p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <Textarea
                      {...register('obligations.bare_minimum')}
                      placeholder="Bare Minimum for the Day"
                      className="h-24 mb-2"
                    />
                    <Textarea
                      {...register('obligations.kaizen_goals')}
                      placeholder="High Quality Kaizen Goals"
                      className="h-24 mb-2"
                    />
                  </div>
                </Card>
              </AccordionContent>
            </AccordionItem>

            {/* Mindset Section */}
            <AccordionItem value={''}>
              <AccordionTrigger className="bg-blue-200">🧠 M - Mindset</AccordionTrigger>
              <AccordionContent>
                <Card className="bg-white shadow-md p-4">
                  <Input
                    {...register('mindset.affirmation')}
                    placeholder="Affirmation"
                    className="mb-2"
                  />
                  <Textarea {...register('mindset.reframe.objective')} placeholder="Objective" className="h-20 mb-2" />
                  <Textarea {...register('mindset.reframe.meaning')} placeholder="Meaning" className="h-20 mb-2" />
                  <Textarea {...register('mindset.reframe.comfort')} placeholder="Comfort" className="h-20 mb-2" />
                  <Textarea {...register('mindset.reframe.positive')} placeholder="Positive" className="h-20 mb-2" />
                </Card>
              </AccordionContent>
            </AccordionItem>

            {/* Insights Section */}
            <AccordionItem value={''}>
              <AccordionTrigger className="bg-blue-200">💡 I - Insights</AccordionTrigger>
              <AccordionContent>
                <Card className="bg-white shadow-md p-4">
                  <Textarea {...register('reflections.excited')} placeholder="What excited me today?" className="h-20 mb-2" />
                  <Textarea {...register('reflections.drained')} placeholder="What drained energy?" className="h-20 mb-2" />
                  <Textarea {...register('reflections.learned')} placeholder="What did I learn?" className="h-20 mb-2" />
                  <Textarea {...register('reflections.value')} placeholder="How can I add value to others?" className="h-20 mb-2" />
                  <Textarea {...register('reflections.needle')} placeholder="How do I push the needle forward?" className="h-20 mb-2" />
                  <Textarea {...register('reflections.past_self')} placeholder="If you wanted to tell your past self something, what would it be?" className="h-20 mb-2" />
                </Card>
              </AccordionContent>
            </AccordionItem>

            {/* Trajectory Section */}
            <AccordionItem value={''}>
              <AccordionTrigger className="bg-blue-200">🚀 T - Trajectory</AccordionTrigger>
              <AccordionContent>
                <Card className="bg-white shadow-md p-4">
                  <Textarea {...register('trajectory.current.against')} placeholder="Against Target" className="h-24 mb-2" />
                  <Textarea {...register('trajectory.current.towards')} placeholder="Towards Target" className="h-24 mb-2" />
                  <Textarea {...register('trajectory.current.actionable')} placeholder="Actionable/Reward" className="h-24 mb-2" />
                </Card>
              </AccordionContent>
            </AccordionItem>

            {/* Fears, Fixes, and Outcomes Section */}
            <AccordionItem value={''}>
              <AccordionTrigger className="bg-blue-200">Fears, Fixes, and Outcomes</AccordionTrigger>
              <AccordionContent>
                <Card className="bg-white shadow-md p-4">
                  <Textarea {...register('ffo.fears')} placeholder="Fears" className="h-24 mb-2" />
                  <Textarea {...register('ffo.fixes')} placeholder="Fixes" className="h-24 mb-2" />
                  <Textarea {...register('ffo.outcomes')} placeholder="Outcomes" className="h-24 mb-2" />
                </Card>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Submit Button */}
          <Button type="submit" className="w-full mt-4 bg-blue-500 text-white hover:bg-blue-600 transition duration-200" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Journal Entry'}
          </Button>
        </form>  
        </CardContent>
      </Card>
    </div>
  )
}

export default function JournalEntryPage() {
  return (
    <SessionProvider>
      <JournalEntry />
    </SessionProvider>
  )
}