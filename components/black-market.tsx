import { Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function BlackMarket() {
  return (
    <div className="p-6 space-y-4">
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-semibold">Black Market</h2>
          <Info className="h-4 w-4 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground">Missed checking a Habit yesterday? Come here to make up for it!</p>
      </div>
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-semibold">Check-in Recovery</h3>
              <p className="text-sm text-muted-foreground">Price: 50 coins</p>
            </div>
            <Button size="sm" variant="outline">
              Buy
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

