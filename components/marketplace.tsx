"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

type MarketplaceItem = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export function Marketplace(props: { balance: number; id: string }) {
  const [userId, setUserId] = useState<string | null>(props.id || null);
  const [coins, setCoins] = useState<number>(props.balance || 0);
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  const fetchMarketplaceData = async () => {
    try {
      const response = await fetch("/api/marketplace", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setUserId(props.id);

      if (response.ok && data.success) {
        setCoins(data.data.userBalance || 0);
        setItems(data.data.items || []);
      } else {
        console.error("Error fetching marketplace data:", data.error);
        alert(data.error || "Failed to fetch marketplace data");
      }
    } catch (error) {
      console.error("Unexpected error fetching marketplace data:", error);
      alert("An error occurred while fetching marketplace data.");
    }
  };

  const handlePurchase = async (itemId: number, price: number) => {
    if (coins < price) {
      alert("Not enough coins!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/marketplace", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId, userId }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert("Item purchased successfully!");
        fetchMarketplaceData(); // Refresh data after successful purchase
      } else {
        console.error("Error during purchase:", result.error);
        alert(result.error || "Failed to complete purchase.");
      }
    } catch (error) {
      console.error("Unexpected error during purchase:", error);
      alert("An error occurred during purchase.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketplaceData();
  }, []);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="pb-8">
        <div className="flex items-center gap-3">
          <ShoppingCart className="h-6 w-6" />
          <CardTitle className="text-2xl">Marketplace</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        {coins !== null && (
          <p className="text-base mb-4">Available Coins: {coins}</p>
        )}
        <div className="grid grid-cols-2 gap-4">
          {items.length > 0 ? (
            items.map((item) => (
              <Card key={item.id}>
                <CardContent className="pt-8">
                  <div className="space-y-6">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="h-52 w-full rounded-lg object-cover"
                    />
                    <div className="space-y-3">
                      <p className="text-lg font-medium">{item.name}</p>
                      <p className="text-base text-muted-foreground">
                        {item.price} Coins
                      </p>
                    </div>
                    <Button
                      className={`w-full ${
                        loading ? "cursor-wait" : "cursor-pointer"
                      }`}
                      onClick={() => handlePurchase(item.id, item.price)}
                      disabled={loading || coins < item.price}
                    >
                      {loading ? "Processing..." : "Purchase"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-2">
              No items available in the marketplace.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
