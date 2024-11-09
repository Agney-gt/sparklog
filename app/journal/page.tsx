'use client'

import { useState, useEffect } from 'react'
import { useSession, SessionProvider } from "next-auth/react"
import { useForm } from 'react-hook-form'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { startOfDay } from 'date-fns'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

function JournalEntry() {
  const router = useRouter()
  const { data: session } = useSession()
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

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true)
      
      const journalData = {
        obligations: data.obligations || null,
        priorities: data.priorities || null,
        recreation: data.recreation || null,
        aspirations: data.aspirations || null,
        gratitude: data.gratitude || null,
        insights: data.insights || null,
        challenges: data.challenges || null,
        emotions: data.emotions || null,
        wins: data.wins || null,
        date: date.toISOString()
      }
  
      const response = await fetch('/api/journal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(journalData),
      })
  
      const result = await response.json()
  
      if (!response.ok) {
        throw new Error(result.error || 'Failed to save entry')
      }
  
      alert('Journal entry saved successfully!')
    } catch (error) {
      console.error('Error saving entry:', error)
      alert('Error saving journal entry')
    } finally {
      setIsLoading(false)
    }
  }

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
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <CardTitle>Journal out of inspiration, not obligation - {format(date, 'MMMM d, yyyy')}</CardTitle>
              <div className="mt-2">
                <Badge variant="secondary">Level 1</Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateDate('prev')}
              title="Previous day"
              disabled={isFetching}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                const today = startOfDay(new Date())
                setDate(today)
                fetchJournalEntry(today)
              }}
              disabled={isFetching}
            >
              Today
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateDate('next')}
              title="Next day"
              disabled={isFetching}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              disabled={isFetching}
            >
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
            <div>
              <h2 className="text-xl font-semibold mb-2">🌟 Gratitude</h2>
              <p className="mb-2">Write down 3 things you are grateful for today:</p>
              <div className="space-y-2">
                <Input {...register('gratitude.mundane')} placeholder="1. Something mundane" />
                <Input {...register('gratitude.chance')} placeholder="2. Something that happened by chance" />
                <Input {...register('gratitude.made_happen')} placeholder="3. Something you made happen" />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">🔥 V - Vent</h2>
              <Textarea
                {...register('vent')}
                placeholder="Write freely about anything that's frustrating or bothering you. Let it all out without judgment or concern for how it sounds. Venting helps you get started and anger can help motivate us to do something."
                className="h-32"
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">📝 O - Obligations</h2>
              
              
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <h3 className="font-semibold mb-1">Bare Minimum for the Day</h3>
                  <Textarea
                    {...register('obligations.bare_minimum')}
                    placeholder="List your bare minimum goals for the day. For example, 30 minutes of exercise."
                    className="h-24"
                  />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">High Quality Kaizen Goals</h3>
                  <Textarea
                    {...register('obligations.kaizen_goals')}
                    placeholder="List your high quality improvement goals. For example, if you are feeling like it, be 1% better than yesterday and do 33 minutes of exercise."
                    className="h-24"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">🧠 M - Mindset</h2>
              <Input
                {...register('mindset.affirmation')}
                placeholder="For example, I am healthy BECAUSE I ate a healthy meal and exercised for 30 minutes this morning."
                className="mb-2"
              />
              <h3 className="font-semibold mt-4 mb-2">Reframing</h3>
              <div className="space-y-2">
                <Textarea
                  {...register('mindset.reframe.objective')}
                  placeholder="When something bad happens, analyse what objectively happened?"
                  className="h-20"
                />
                <Textarea
                  {...register('mindset.reframe.meaning')}
                  placeholder="What did you make it mean or what significance did you give to the event?"
                  className="h-20"
                />
                <Textarea
                  {...register('mindset.reframe.comfort')}
                  placeholder="How would you comfort a friend in the same situation?"
                  className="h-20"
                />
                <Textarea
                  {...register('mindset.reframe.positive')}
                  placeholder="What mental gymnastics can you do to reframe this bad event into something positive or what did you learn from this event?"
                  className="h-20"
                />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">💡 I - Insights</h2>
              <div className="space-y-2">
                <Textarea {...register('reflections.excited')} placeholder="What can i do to make everything easier?" className="h-20" />
                <Textarea {...register('reflections.excited')} placeholder="What excited me today?" className="h-20" />
                <Textarea {...register('reflections.drained')} placeholder="What drained energy?" className="h-20" />
                <Textarea {...register('reflections.learned')} placeholder="What did I learn?" className="h-20" />
                <Textarea {...register('reflections.value')} placeholder="How can I add value to others and benefit from service to others?" className="h-20" />
                <Textarea {...register('reflections.needle')} placeholder="How do I push the needle forward?" className="h-20" />
                <Textarea {...register('reflections.past_self')} placeholder="If you wanted to tell your past self something, what would it be?" className="h-20" />
                <Textarea 
                  {...register('reflections.fightToGetBack')} 
                  placeholder="List 5 things you would fight to get back if they were taken away from you" 
                  className="h-24" 
                />
                <Textarea 
                  {...register('reflections.wouldntFightFor')} 
                  placeholder="List 5 things you wouldn't fight to get back if they were taken away from you" 
                  className="h-24" 
                />
                <Textarea 
                  {...register('reflections.pareto')} 
                  placeholder="What 20% of actions are producing 80% of results?" 
                  className="h-24" 
                />
                <Textarea 
                  {...register('reflections.noFailure')} 
                  placeholder="If you knew you wouldn't fail, what would you do?" 
                  className="h-24" 
                />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">🚀 T - Trajectory</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mt-4 mb-2">Current Trajectory</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-medium mb-1">Against Target</h4>
                      <Textarea
                        {...register('trajectory.current.against')}
                        placeholder="Things you did that go against the target. For example, if your target is health and fitness, ordering from uber eats would come here."
                        className="h-24"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Towards Target</h4>
                      <Textarea
                        {...register('trajectory.current.towards')}
                        placeholder="Things you did that help achieve the target. For example, resisting impulse buys"
                        className="h-24"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Actionable/Reward</h4>
                      <Textarea
                        {...register('trajectory.current.actionable')}
                        placeholder="Actionable items or rewards. For example, added to savings."
                        className="h-24"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mt-4 mb-2">Long-term Trajectory</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-medium mb-1">5 Years Ago</h4>
                      <Textarea
                        {...register('trajectory.longTerm.past')}
                        placeholder="What did you want 5 years back?"
                        className="h-24"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Present</h4>
                      <Textarea
                        {...register('trajectory.longTerm.present')}
                        placeholder="What do you want now?"
                        className="h-24"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">5 Years in Future</h4>
                      <Textarea
                        {...register('trajectory.longTerm.future')}
                        placeholder="What do you want 5 years in the future?"
                        className="h-24"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Fears, Fixes, and Outcomes</h2>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium mb-1">Fears</h4>
                  <Textarea
                    {...register('ffo.fears')}
                    placeholder="E.g., I'm worried no one is going to look at my content"
                    className="h-24"
                  />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Fixes</h4>
                  <Textarea
                    {...register('ffo.fixes')}
                    placeholder="E.g., Post it everywhere"
                    className="h-24"
                  />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Outcomes</h4>
                  <Textarea
                    {...register('ffo.outcomes')}
                    placeholder="E.g., Even if a single person benefits, it's great"
                    className="h-24"
                  />
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
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