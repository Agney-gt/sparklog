import { Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

const hotels = [
  {
    id: 1,
    name: "Premium Hotel",
    price: 300,
    hp: 500,
    type: "PREMIUM HOTEL",
  },
  {
    id: 2,
    name: "Ordinary Hotel",
    price: 200,
    hp: 150,
    type: "ORDINARY HOTEL",
  },
  {
    id: 3,
    name: "Budget Hotel",
    price: 100,
    hp: 50,
    type: "BUDGET HOTEL",
  },
]

export function Hotel() {
  return (
    <div className="p-6 space-y-4">
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-semibold">Hotel</h2>
          <Info className="h-4 w-4 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground">Spending coins to stay in a hotel and restore HP.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {hotels.map((hotel) => (
          <Card key={hotel.id} className="bg-white/50 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="mb-4">
                <div className="inline-block p-4 rounded-lg bg-muted">
                  <h3 className="text-xs font-mono tracking-wider">{hotel.type}</h3>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-center space-x-4 text-sm">
                  <span className="text-muted-foreground">Price: {hotel.price} coins</span>
                  <span className="text-green-600">+{hotel.hp} HP</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                HOTEL CHECK-IN
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

