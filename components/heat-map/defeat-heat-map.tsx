
import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { HabitHeatMap } from "./habit-heat-map"

const defaultData = {
  smoking: {
    status: "success",
    data: {
      "2024-09-02": "success",
      "2024-09-14": "success",
      "2024-09-21": "success",
    },
  },
  scrolling: {
    status: "success",
    data: {
      "2024-09-03": "success",
    },
  },
  drink: {
    status: "fail",
    data: {
      "2024-09-14": "fail",
      "2024-09-22": "fail",
    },
  },
}

export function DefeatHeatMap() {
  return (
    <Card className="mt-8">
      <CardHeader className="flex-row items-start gap-4 space-y-0">
        <Image src="/cal.png" alt="Calendar icon" width={80} height={80} className="rounded-lg" />
        <div>
          <h2 className="text-xl font-semibold mb-1">Defeat Heat Map</h2>
          <p className="text-muted-foreground mb-2">Check out your battle heat map here.</p>
          <button className="text-sm text-muted-foreground hover:text-foreground">Need help</button>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        {Object.entries(defaultData).map(([type, data]) => (
          <HabitHeatMap
            key={type}
            type={type as "scrolling" | "drink" | "smoking"}
            initialStatus={data.status as "success" | "fail"}
            initialData={data.data}
          />
        ))}
      </CardContent>
    </Card>
  )
}

