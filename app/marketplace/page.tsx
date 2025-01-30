"use client";

import React, { useEffect, useState } from "react";
import HeaderHome from "@/components/HeaderHome"; // Adjust the import path as necessary
import Footer from "@/components/Footer"; // Adjust the import path as necessary
import { BlackMarket } from "@/components/black-market";
import { AccountOverview } from "@/components/account-overview";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"; // Ensure you have this library installed
import { Loader2 } from "lucide-react"; // Icon for loading spinner
import { ZenModeTimer } from "@/components/zen-mode";
const GoalsPage: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchUserId = async () => {
      setLoading(true);
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user?.id) {
          setUserId(session.user.id);
        } else {
          setUserId(null); // User not authenticated
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserId();
  }, [supabase]);

  if (loading) {
    // Display a loading spinner while fetching user data
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!userId) {
    // Handle case where user is not authenticated
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <p className="text-lg text-gray-700">User not authenticated</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderHome />
      <main className="flex-1">
        <AccountOverview id={userId} />
        <BlackMarket id={userId} />
        <ZenModeTimer initialTime={1} id={userId}  /> 
      </main>
      <Footer />
    </div>
  );
};

export default GoalsPage;
