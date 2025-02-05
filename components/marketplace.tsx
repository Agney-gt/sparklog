"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import WisdomQuiz from "@/components/wisdom-quiz";

type MarketplaceItem = {
  id: number;
  image_url: string;
  name: string;
  price: number;
};

export function Marketplace(props: { id: string }) {
  const userId = props.id;
  const [coins, setCoins] = useState<number>(0);
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [inventory, setInventory] = useState<number[]>([]); // Store owned item IDs
  const [loading, setLoading] = useState<boolean>(false);
  const [isQuizActive, setIsQuizActive] = useState<boolean>(false);
  const [pendingPurchase, setPendingPurchase] = useState<{ itemId: number; price: number } | null>(null);

  // Fetch user details (balance + inventory)
  const getUserDetails = async () => {
    try {
      const res = await fetch(`/api/marketplace/user?user_id=${userId}`);
      const data = await res.json();
      setCoins(data.user.balance);
      setInventory(data.user.inventory ? data.user.inventory.map((item: MarketplaceItem) => item.id) : []);
    } catch {
      console.log("Error fetching user details");
    }
  };

  // Fetch marketplace items
  const fetchMarketplaceData = async () => {
    try {
      const response = await fetch("/api/marketplace");
      const data = await response.json();

      if (response.ok && data.success) setItems(data.data.items || []);
    } catch (error) {
      console.error("Error fetching marketplace data:", error);
    }
  };

  // Attempt to purchase an item
  const handleAttemptPurchase = async (itemId: number, price: number) => {
    if (coins < price) {
      alert("Not enough coins!");
      return;
    }
    setPendingPurchase({ itemId, price });
    setIsQuizActive(true);
  };

  // Handle quiz completion and purchase item
  const handleQuizCompletion = async () => {
    setIsQuizActive(false);
    if (!pendingPurchase) return;

    const { itemId } = pendingPurchase;
    setLoading(true);

    try {
      const response = await fetch("/api/marketplace", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, userId }),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        alert("Item purchased successfully!");
        fetchMarketplaceData();
        getUserDetails(); // Refresh user details after purchase
      } else {
        alert(result.error || "Failed to complete purchase.");
      }
    } catch (error) {
      console.error("Error during purchase:", error);
      alert("An error occurred during purchase.");
    } finally {
      setLoading(false);
      setPendingPurchase(null);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    getUserDetails();
    fetchMarketplaceData();
  }, [userId]);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="pb-8">
        <div className="flex items-center gap-3">
          <ShoppingCart className="h-6 w-6" />
          <CardTitle className="text-2xl">Archives</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        {coins !== null && <p className="text-base mb-4">Available Coins: {coins || 0}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.length > 0 ? (
            items.map((item) => (
              <Card key={item.id}>
                <CardContent className="pt-8">
                  <div className="space-y-6">
                    <div className="h-64 w-64 mx-auto flex items-center justify-center overflow-hidden bg-gray-100 rounded-lg">
                      <img
                        src={item.image_url || "/placeholder.svg"}
                        alt={item.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div className="space-y-3">
                      <p className="text-lg font-medium">{item.name}</p>
                      <p className="text-base text-muted-foreground">{item.price} Coins</p>
                    </div>
                    <Button
                      className={`w-full ${loading ? "cursor-wait" : "cursor-pointer"}`}
                      onClick={() => handleAttemptPurchase(item.id, item.price)}
                      disabled={loading || coins < item.price || inventory.includes(item.id)} // Disable if owned
                    >
                      {inventory.includes(item.id) ? "Owned" : loading ? "Processing..." : "Purchase"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-2">No items available in the marketplace.</p>
          )}
        </div>
      </CardContent>

      {/* Wisdom Quiz Popup */}
      {isQuizActive && pendingPurchase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
            <WisdomQuiz itemId={pendingPurchase.itemId} userId={userId} onComplete={handleQuizCompletion} coins={coins} />
          </div>
        </div>
      )}
    </Card>
  );
}
