import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

export function BlackMarket(props) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch black market items from the backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/marketplace?user_id=USER_ID"); // Replace USER_ID dynamically
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch items");
        }

        setItems(data.data.blackMarketItems || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handlePurchase = async (itemId: string) => {
    try {
      const response = await fetch("/api/marketplace", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: props.id,
          itemId,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to purchase item");
      }

      alert("Item purchased successfully!");
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="h-20 w-20 shrink-0 rounded-lg border bg-card p-2">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-28%20140033-23krpSO0hKCyxoFxuHYJKaEiarzAcd.png"
            alt="Black Market Icon"
            className="h-full w-full"
          />
        </div>
        <div className="space-y-1">
          <CardTitle className="text-2xl">Black Market</CardTitle>
          <p className="text-base text-muted-foreground">
            Missed checking a Habit yesterday? Come here to make up for it!
          </p>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Price: {item.price} coins
                    </p>
                  </div>
                  <Button size="sm" onClick={() => handlePurchase(item.id)}>
                    Buy
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          <Card className="flex items-center justify-center">
            <Button variant="ghost" className="h-full w-full">
              <Plus className="h-4 w-4" />
              <span className="ml-2">New</span>
            </Button>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
