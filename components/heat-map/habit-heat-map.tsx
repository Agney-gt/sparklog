import { Badge } from "@/components/ui/badge"
import { CalendarGrid } from "./calendar-grid"
import { Smartphone, Wine, Cigarette } from "lucide-react"
import { cn } from "@/lib/utils"

interface HabitHeatMapProps {
  type: "scrolling" | "drink" | "smoking"
  status: "success" | "fail"
  total: number
  data: Record<string, string>
}

export function HabitHeatMap({ type, status, total, data }: HabitHeatMapProps) {
  const icons = {
    scrolling: Smartphone,
    drink: Wine,
    smoking: Cigarette,
  }

  const Icon = icons[type]
  const weeks = [35, 36, 37, 38, 39, 40]
  const days = ["M", "T", "W", "T", "F", "S", "S"]

  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-muted-foreground" />
          <span className="font-medium capitalize">{type}</span>
        </div>
        <button className="text-sm text-muted-foreground hover:text-foreground">Crap, I did...</button>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Badge
          variant="secondary"
          className={cn(status === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700")}
        >
          {status === "success" ? "You're doing great!" : "You lose."}
        </Badge>
        <span className="text-sm text-muted-foreground">| Total: {total}</span>
      </div>

      <div className="mt-2">
        <div className="text-sm text-muted-foreground mb-2 text-center">---------- 2024 · Sep ----------</div>
        <CalendarGrid weeks={weeks} days={days} data={data} />
      </div>
    </div>
  )
}

