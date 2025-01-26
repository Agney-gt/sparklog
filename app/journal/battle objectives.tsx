import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Bookmark, Plus, HelpCircle, Ban } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function BattleObjectives() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg p-6 mb-8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 shrink-0 bg-white border rounded-lg p-2 flex items-center justify-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iEkyqtbBZlPWDfYMEaB3SA2pHFfuUB.png"
                alt="Battle fortress icon"
                className="w-18 h-18"
              />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Battle Objectives</h1>
              <p className="text-gray-600 mt-1">Set your battle objectives and earn coins and EXP!</p>
              <button className="inline-flex items-center text-gray-500 mt-2 hover:text-gray-700">
                <HelpCircle className="w-4 h-4 mr-1" />
                Need helps
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <Tabs defaultValue="achievements">
            <TabsList className="w-full justify-start bg-gray-100 border-b rounded-none h-auto p-0">
              <TabsTrigger
                value="achievements"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-white"
              >
                <Trophy className="w-5 h-5" />
              </TabsTrigger>
              <TabsTrigger
                value="bookmarks"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-white"
              >
                <Bookmark className="w-5 h-5" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-kKTDzxsTHEurPegU0HFW6f3nw1i2Rj.png"
                  alt="No smoking icon"
                  className="w-5 h-5"
                />
                <h3 className="text-lg font-medium">Quit Smoking!</h3>
              </div>
              <div className="space-y-2 text-sm text-gray-500">
                <div>
                  <div>Start Date:</div>
                  <div className="text-gray-400">@July 1, 2024</div>
                </div>
                <div>
                  <div>End Date:</div>
                  <div className="text-gray-400">@July 31, 2024</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-gray-500 mb-2">Time Remaining:</div>
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                    <div
                      className="w-full bg-primary"
                      style={{
                        backgroundImage: "linear-gradient(to right, #4f46e5 50%, transparent 50%)",
                        backgroundSize: "20px 20px",
                      }}
                    ></div>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-500 mt-1">100%</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-2">Rewards:</div>
                <div className="space-y-1">
                  <div className="text-sm">+ 100 EXP</div>
                  <div className="text-sm">+ 100 Coins</div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-500">Current Progress:</div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Success
                  </Badge>
                </div>
                <Progress value={100} className="h-2" />
                <div className="text-right text-sm text-gray-500 mt-1">100%</div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-1/5 mx-auto">
                Close
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex items-center justify-center min-h-[400px]">
            <Button variant="ghost" className="flex flex-col items-center gap-2">
              <Plus className="w-6 h-6 text-gray-400" />
              <span className="text-gray-400">New</span>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}

