import { User, ShoppingCart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function AccountSummary() {
  return (
    <div className="grid gap-4 p-6">
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <h2 className="font-semibold">My Account</h2>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="bg-white/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5" />
              <h3 className="font-semibold">My Cart</h3>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Total: 1 items • 3000 coins</p>
          </CardContent>
        </Card>
        <Card className="bg-white/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5" />
              <h3 className="font-semibold">My Purchase</h3>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Total: 1 items • 200 coins</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

