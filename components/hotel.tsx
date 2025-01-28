"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HotelProps {
  id: string; 
}

type Hotel = {
  id: string;
  name: string;
  price: number;
  hp: number;
  image_url: string;
};

export function Hotel({ id }: HotelProps) {

  const [coins, setCoins] = useState<number | null>(null);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);
  const getbalance = async () => {
    const response = await fetch(`/api/marketplace/user?user_id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (response.ok && data.success) {
      setCoins(data.balance);
    } else {
      console.error("Error fetching user balance:", data.error);
      alert(data.error || "Failed to fetch user balance");
    }
    setCoins(data.balance);
    return data.balance;
  };
  // Fetch hotel data from the backend
  const fetchHotelData = async () => {
    try {
      const response = await fetch(`/api/marketplace?user_id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setCoins(data.data.userBalance || 0);
        setHotels(data.data.hotels || []);
      } else {
        console.error("Error fetching hotel data:", data.error);
      }
    } catch (error) {
      console.error("Unexpected error fetching hotel data:", error);
    }
  };

  const handleCheckIn = async (hotelId: string, price: number) => {
    if (coins !== null && coins < price) {
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
        body: JSON.stringify({ hotelId, userId: id }),
      });

      const result = await response.json();
      getbalance();
      if (response.ok && result.success) {
        alert("Hotel stay completed!");
        fetchHotelData(); // Refresh data after successful check-in
      } else {
        console.error("Error during check-in:", result.error);
        alert(result.error || "Failed to check in");
      }
    } catch (error) {
      console.error("Unexpected error during check-in:", error);
      alert("Failed to check in");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotelData();
  }, [id]);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="h-20 w-20 shrink-0 rounded-lg border bg-card p-2">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-28%20140028-A3egoJLnkd8P5aZCPVAPdzuIW7Jkcg.png"
            alt="Hotel Icon"
            className="h-full w-full"
          />
        </div>
        <div className="space-y-1">
          <CardTitle className="text-2xl">Hotel</CardTitle>
          <p className="text-base text-muted-foreground">
            Spend coins to stay in a hotel and restore HP.
          </p>
          {coins !== null && (
            <p className="text-base">Available Coins: {coins}</p>
          )}
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-3 gap-4">
          {hotels.map((hotel) => (
            <Card key={hotel.id}>
              <CardContent className="pt-8">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <p className="text-lg font-medium">{hotel.name}</p>
                    <div className="flex items-center justify-between text-base">
                      <span>Price: {hotel.price} coins</span>
                      <span className="text-green-600">+{hotel.hp} HP</span>
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => handleCheckIn(hotel.id, hotel.price)}
                    disabled={loading || (coins !== null && coins < hotel.price)}
                  >
                    {loading ? "Processing..." : "HOTEL CHECK IN"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
