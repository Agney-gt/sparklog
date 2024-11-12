'use client'

import { useState, useEffect } from 'react'
import { SessionProvider } from "next-auth/react"
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { format } from 'date-fns'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const ALL_TABS = [
  'Gratitude',
  'Vent',
  'Obligations',
  'Mindset',
  'Insights',
  'Trajectory',
  'FFO'
]

export function JournalPage() {
  const router = useRouter()
  const { register, handleSubmit, reset } = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [startIndex, setStartIndex] = useState(0)
  const supabase = createClientComponentClient()

  const visibleTabs = ALL_TABS.slice(startIndex, startIndex + 3)
  
  const handleNext = () => {
    if (startIndex + 3 < ALL_TABS.length) {
      setStartIndex(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(prev => prev - 1)
    }
  }

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true)
      // Your existing submit logic here
      console.log(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="text-center">
            <div className="text-sm text-gray-600">
              {format(new Date(), 'EEEE, MMMM d, yyyy')}
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Journal Sections */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Tabs defaultValue="Gratitude" className="w-full">
            <div className="flex items-center gap-2 mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrev}
                disabled={startIndex === 0}
                className="shrink-0"
                aria-label="Previous tabs"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <TabsList className="flex-1">
                {visibleTabs.map(tab => (
                  <TabsTrigger key={tab} value={tab} className="flex-1">
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleNext}
                disabled={startIndex + 3 >= ALL_TABS.length}
                className="shrink-0"
                aria-label="Next tabs"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <TabsContent value="Gratitude">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-2xl font-bold mb-4">Gratitude</h2>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Something mundane</label>
                    <Input {...register('gratitude.mundane')} placeholder="Something mundane you're grateful for..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Something that happened by chance</label>
                    <Input {...register('gratitude.chance')} placeholder="A fortunate coincidence..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Something you made happen</label>
                    <Input {...register('gratitude.made_happen')} placeholder="An achievement you're proud of..." />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="Vent">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-2xl font-bold mb-4">Vent</h2>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Let it all out</label>
                    <Textarea
                      {...register('vent')}
                      placeholder="Write freely about anything that's frustrating or bothering you. Let it all out without judgment or concern for how it sounds. Venting helps you get started and anger can help motivate us to do something."
                      className="resize-none h-48"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="Obligations">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-2xl font-bold mb-4">Obligations</h2>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Bare minimum goals</label>
                    <Textarea
                      {...register('obligations.bare_minimum')}
                      placeholder="List your bare minimum goals for the day. For example, 30 minutes of exercise."
                      className="resize-none h-24"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">High-quality improvement goals</label>
                    <Textarea
                      {...register('obligations.kaizen_goals')}
                      placeholder="List your high-quality improvement goals. For example, if you are feeling like it, be 1% better than yesterday and do 33 minutes of exercise."
                      className="resize-none h-24"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="Mindset">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-2xl font-bold mb-4">Mindset</h2>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Affirmation</label>
                    <Input {...register('mindset.affirmation')} placeholder="Your daily affirmation..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Objective analysis</label>
                    <Textarea
                      {...register('mindset.reframe.objective')}
                      placeholder="When something bad happens, analyze what objectively happened?"
                      className="resize-none h-24"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Meaning and significance</label>
                    <Textarea
                      {...register('mindset.reframe.meaning')}
                      placeholder="What did you make it mean or what significance did you give to the event?"
                      className="resize-none h-24"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Comforting a friend</label>
                    <Textarea
                      {...register('mindset.reframe.comfort')}
                      placeholder="How would you comfort a friend in the same situation?"
                      className="resize-none h-24"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Positive reframing</label>
                    <Textarea
                      {...register('mindset.reframe.positive')}
                      placeholder="What mental gymnastics can you do to reframe this bad event into something positive or what did you learn from this event?"
                      className="resize-none h-24"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="Insights">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-2xl font-bold mb-4">Insights</h2>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Making things easier</label>
                    <Textarea {...register('reflections.easier')} placeholder="What can I do to make everything easier?" className="resize-none h-20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Excitement</label>
                    <Textarea {...register('reflections.excited')} placeholder="What excited me today?" className="resize-none h-20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Energy drainers</label>
                    <Textarea {...register('reflections.drained')} placeholder="What drained energy?" className="resize-none h-20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Learnings</label>
                    <Textarea {...register('reflections.learned')} placeholder="What did I learn?" className="resize-none h-20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Adding value</label>
                    <Textarea {...register('reflections.value')} placeholder="How can I add value to others and benefit from service to others?" className="resize-none h-20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Moving forward</label>
                    <Textarea {...register('reflections.needle')} placeholder="How do I push the needle forward?" className="resize-none h-20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message to past self</label>
                    <Textarea {...register('reflections.past_self')} placeholder="If you wanted to tell your past self something, what would it be?" className="resize-none h-20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Things to fight for</label>
                    <Textarea {...register('reflections.fightToGetBack')} placeholder="List 5 things you would fight to get back if they were taken away from you" className="resize-none h-24" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Things not to fight for</label>
                    <Textarea {...register('reflections.wouldntFightFor')} placeholder="List 5 things you wouldn't fight to get back if they were taken away from you" className="resize-none h-24" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Pareto principle</label>
                    <Textarea {...register('reflections.pareto')} placeholder="What 20% of actions are producing 80% of results?" className="resize-none h-24" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Without failure</label>
                    <Textarea {...register('reflections.noFailure')} placeholder="If you knew you wouldn't fail, what would you do?" className="resize-none h-24" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="Trajectory">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-2xl font-bold mb-4">Trajectory</h2>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Against the target</label>
                    <Textarea
                      {...register('trajectory.current.against')}
                      placeholder="Things you did that go against the target. For example, if your target is health and fitness, ordering from Uber Eats would come here."
                      className="resize-none h-24"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Towards the target</label>
                    <Textarea
                      {...register('trajectory.current.towards')}
                      placeholder="Things you did that help achieve the target. For example, resisting impulse buys."
                      className="resize-none h-24"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Actionable items or rewards</label>
                    <Textarea
                      {...register('trajectory.current.actionable')}
                      placeholder="Actionable items or rewards. For example, added to savings."
                      className="resize-none h-24"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">5 years ago</label>
                    <Textarea
                      {...register('trajectory.longTerm.past')}
                      placeholder="What did you want 5 years back?"
                      className="resize-none h-24"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Present desires</label>
                    <Textarea
                      {...register('trajectory.longTerm.present')}
                      placeholder="What do you want now?"
                      className="resize-none h-24"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">5 years from now</label>
                    <Textarea
                      {...register('trajectory.longTerm.future')}
                      placeholder="What do you want 5 years in the future?"
                      className="resize-none h-24"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="FFO">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-2xl font-bold mb-4">Fears, Fixes, and Outcomes</h2>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Fears</label>
                    <Textarea
                      {...register('ffo.fears')}
                      placeholder="E.g., I'm worried no one is going to look at my content"
                      className="resize-none h-24"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Fixes</label>
                    <Textarea
                      {...register('ffo.fixes')}
                      placeholder="E.g., Post it everywhere"
                      className="resize-none h-24"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Outcomes</label>
                    <Textarea
                      {...register('ffo.outcomes')}
                      placeholder="E.g., Even if a single person benefits, it's great"
                      className="resize-none h-24"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Button
            type="submit"
            className="w-full mt-6 bg-black hover:bg-gray-800 text-white h-12 rounded-full"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Journal Entry'}
          </Button>
        </form>

        {/* Progress Indicator */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">You've completed</p>
          <p className="text-2xl font-bold text-black">12 journal entries!</p>
        </div>
      </div>
    </div>
  )
}