import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, Plus, RefreshCcw, BookOpen, Sun } from "lucide-react"

interface StatisticProps {
  label: string
  value: number
}

function StatisticRow({ label, value }: StatisticProps) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-mono">{value}</span>
    </div>
  )
}

interface ActivityCardProps {
  title: string
  icon: React.ReactNode
  total: number
  isGrown?: boolean
  statistics: {
    weekly: number
    monthly: number
    annually: number
  }
}

function ActivityCard({ title, icon, total, isGrown, statistics }: ActivityCardProps) {
  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          {icon}
          <span className="font-medium">{title}</span>
        </div>
        <div className="mb-4">
          <div className="text-sm mb-1">Check-in</div>
          <div className={`text-sm ${isGrown ? "text-green-600" : "text-red-500"}`}>
            {isGrown ? "Grown!" : "To be grown today"}
            <span className="text-muted-foreground ml-2">| Total: {total}</span>
          </div>
        </div>
        <div className="space-y-2 border-t pt-4">
          <div className="text-sm font-medium mb-2">Statistic</div>
          <StatisticRow label="Weekly" value={statistics.weekly} />
          <StatisticRow label="Monthly" value={statistics.monthly} />
          <StatisticRow label="Annually" value={statistics.annually} />
        </div>
      </CardContent>
    </Card>
  )
}

export default function GrowthStatistic() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="p-2 bg-gray-100 rounded-lg">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Growth Statistic</h2>
            <p className="text-sm text-muted-foreground">
              Check out your growth statistic here.{" "}
              <Button variant="link" className="p-0 h-auto text-sm">
                Need helps
              </Button>
            </p>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <ActivityCard
          title="Workout"
          icon={<RefreshCcw className="w-4 h-4" />}
          total={2}
          isGrown={false}
          statistics={{ weekly: 0, monthly: 0, annually: 2 }}
        />
        <ActivityCard
          title="Daily Journal"
          icon={<BookOpen className="w-4 h-4" />}
          total={2}
          isGrown={true}
          statistics={{ weekly: 1, monthly: 1, annually: 2 }}
        />
        <ActivityCard
          title="Wake up at 5 a.m."
          icon={<Sun className="w-4 h-4" />}
          total={1}
          isGrown={false}
          statistics={{ weekly: 0, monthly: 0, annually: 1 }}
        />
      </div>

      <Button variant="outline" className="w-full py-6">
        <Plus className="w-4 h-4 mr-2" />
        New
      </Button>
    </div>
  )
}

