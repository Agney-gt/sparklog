import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

const products = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 1500,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3PMOIJ4fW6AnvlZTjGmnFQ8tezERx4.png",
  },
  {
    id: 2,
    name: "Travel to Japan",
    price: 3000,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-64CyDqZiJJlmEQW0pMRavub2Yz8bDk.png",
  },
  {
    id: 3,
    name: "15-inch MacBook Air",
    price: 2500,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6gb0S97rfIBObVp3fzCPfBSWFXUHLJ.png",
  },
]

export function Marketplace() {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold">Marketplace</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="bg-white/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain rounded-md"
                />
              </div>
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.price} Coins</p>
            </CardContent>
            <CardFooter className="pt-0">
              <Button className="w-full" variant="outline">
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

