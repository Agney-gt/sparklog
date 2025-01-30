"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Package } from "lucide-react";
import { Marketplace } from "./marketplace";

type UserData = {
  balance: number;
  purchaseItems: number;
  purchaseTotal: number;
};

interface AccountOverviewProps {
  id: string; // User ID passed as a prop
}

export function AccountOverview({ id }: AccountOverviewProps) {
  const [userData, setUserData] = useState<UserData>({
    balance: 0,
    purchaseItems: 0,
    purchaseTotal: 0,
  });
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchUserData() {
      try {
        setError("");
        if (!id) {
          throw new Error("User not logged in");
        }

        const res = await fetch(`/api/marketplace/user?user_id=${id}`);
        const userData = await res.json();

        if (!res.ok) {
          throw new Error(userData.error || "Failed to fetch user data");
        }

        const { user } = userData; // Assuming API response is { success: true, user: { ... } }

        setUserData({
          balance: user.balance || 0,
          purchaseItems: user.inventory?.length || 0,
          purchaseTotal:
            user.inventory?.reduce(
              (sum: number, purchase: { price: number }) => sum + purchase.price,
              0
            ) || 0,
        });
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || "An unexpected error occurred");
        } else {
          setError("An unexpected error occurred");
        }
      } 
    }

    fetchUserData();
  }, [id]);
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <div className="relative h-52 w-full overflow-hidden rounded-t-lg bg-black">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UyJlafCvkvI4stCm8gkypp9kACO1XG.png"
              alt="Life RPG Marketplace - Isometric View"
              className="h-full w-full object-cover opacity-90"
            />
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 pt-8">
          <div className="flex items-center gap-3">
            <User className="h-6 w-6" />
            <CardTitle className="text-2xl">My Account</CardTitle>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Package className="h-6 w-6" />
                  <div>
                    <p className="text-lg font-medium">My Purchases</p>
                    <p className="text-base text-muted-foreground">
                      Total: {userData.purchaseItems} items • {userData.purchaseTotal} coins
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      <Marketplace id={id} />
    </>
  );
}
