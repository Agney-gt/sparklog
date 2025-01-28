import { Cigarette, Scroll, Wine } from "lucide-react"
import type { HabitType } from "@/types/habits"

export const habitIcons: Record<HabitType, JSX.Element> = {
  Smoking: <Cigarette className="h-5 w-5" />,
  Scrolling: <Scroll className="h-5 w-5" />,
  Drink: <Wine className="h-5 w-5" />,
}

