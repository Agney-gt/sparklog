'use client'

import { useState, useEffect } from 'react'
import { SessionProvider } from "next-auth/react"
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { startOfDay } from 'date-fns'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import ThoughtMeter from "@/components/thought-meter";
import { Header } from '@/components/header'

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
  };

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
      <Header 
        date={date} 
        setDate={setDate} 
        handleLogout={handleLogout} 
        fetchJournalEntry={fetchJournalEntry}
      />
      <Card className="w-full max-w-4xl mx-auto bg-gray-100">
        
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {(isLoading || isFetching) && (
              <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
                <div className="animate-spin">Loading...</div>
              </div>
            )}
            <ThoughtMeter />
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
            <AccordionItem value="vent">
              <AccordionTrigger className="bg-blue-200">🔥 V - Vent</AccordionTrigger>
              <AccordionContent>
                <Card className="bg-white shadow-md p-4">
                  <Textarea
                    {...register('vent')}
                    placeholder="Write freely about anything that's frustrating or bothering you. Let it all out without judgment or concern for how it sounds. Venting helps you get started and anger can help motivate us to do something."
                    className="h-32 mb-2"
                  />
                </Card>
              </AccordionContent>
            </AccordionItem>

            {/* Obligations Section */}
            <AccordionItem value="obligations">
              <AccordionTrigger className="bg-blue-200">📝 O - Obligations</AccordionTrigger>
              <AccordionContent>
                <Card className="bg-white shadow-md p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <Textarea
                      {...register('obligations.bare_minimum')}
                      placeholder="List your bare minimum goals for the day. For example, 30 minutes of exercise."
                      className="h-24 mb-2"
                    />
                    <Textarea
                      {...register('obligations.kaizen_goals')}
                      placeholder="List your high quality improvement goals. For example, if you are feeling like it, be 1% better than yesterday and do 33 minutes of exercise."
                      className="h-24 mb-2"
                    />
                  </div>
                </Card>
              </AccordionContent>
            </AccordionItem>

            {/* Mindset Section */}
            <AccordionItem value="mindset">
              <AccordionTrigger className="bg-blue-200">🧠 M - Mindset</AccordionTrigger>
              <AccordionContent>
                <Card className="bg-white shadow-md p-4">
                  <Input
                    {...register('mindset.affirmation')}
                    placeholder="Affirmation"
                    className="mb-2"
                  />
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
                </Card>
              </AccordionContent>
            </AccordionItem>

            {/* Insights Section */}
            <AccordionItem value="insights">
              <AccordionTrigger className="bg-blue-200">💡 I - Insights</AccordionTrigger>
              <AccordionContent>
                <Card className="bg-white shadow-md p-4">
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
                </Card>
              </AccordionContent>
            </AccordionItem>

            {/* Trajectory Section */}
            <AccordionItem value="trajectory">
              <AccordionTrigger className="bg-blue-200">🚀 T - Trajectory</AccordionTrigger>
              <AccordionContent>
                <Card className="bg-white shadow-md p-4">
                <Textarea
                        {...register('trajectory.current.against')}
                        placeholder="Things you did that go against the target. For example, if your target is health and fitness, ordering from uber eats would come here."
                        className="h-24"
                      />
                  <Textarea
                        {...register('trajectory.current.towards')}
                        placeholder="Things you did that help achieve the target. For example, resisting impulse buys"
                        className="h-24"
                      />
                  <Textarea
                        {...register('trajectory.current.actionable')}
                        placeholder="Actionable items or rewards. For example, added to savings."
                        className="h-24"
                      />
                </Card>
              </AccordionContent>
            </AccordionItem>
            {/* Long Term Tragectory Section */}
            <AccordionItem value="LTT">
              <AccordionTrigger className="bg-blue-200">Long Term Trajectory</AccordionTrigger>
              <AccordionContent>
                <Card className="bg-white shadow-md p-4">
                <Textarea
                        {...register('trajectory.longTerm.past')}
                        placeholder="What did you want 5 years back?"
                        className="h-24"
                      />
                  <Textarea
                        {...register('trajectory.longTerm.present')}
                        placeholder="What do you want now?"
                        className="h-24"
                      />
                  <Textarea
                        {...register('trajectory.longTerm.future')}
                        placeholder="What do you want 5 years in the future?"
                        className="h-24"
                      />
                </Card>
              </AccordionContent>
            </AccordionItem>

            {/* Fears, Fixes, and Outcomes Section */}
            <AccordionItem value="ffo">
              <AccordionTrigger className="bg-blue-200">Fears, Fixes, and Outcomes</AccordionTrigger>
              <AccordionContent>
                <Card className="bg-white shadow-md p-4">
                <Textarea
                    {...register('ffo.fears')}
                    placeholder="E.g., I'm worried no one is going to look at my content"
                    className="h-24"
                  />
                  <Textarea
                    {...register('ffo.fixes')}
                    placeholder="E.g., Post it everywhere"
                    className="h-24"
                  />
                  <Textarea
                    {...register('ffo.outcomes')}
                    placeholder="E.g., Even if a single person benefits, it's great"
                    className="h-24"
                  />
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