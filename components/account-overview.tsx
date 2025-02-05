"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { Marketplace } from "./marketplace";

interface AccountOverviewProps {
  id: string; // User ID passed as a prop
}

export function AccountOverview({ id }: AccountOverviewProps) {
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
              src="https://eobemzviqxxlcrwuygkr.supabase.co/storage/v1/object/public/sparklog//2.jpg"
              alt="Marketplace - Isometric View"
              className="h-full w-full object-cover opacity-90"
            />
          </div>
        </CardHeader>
        
      </Card>
      <Marketplace id={id} />
    </>
  );
}
