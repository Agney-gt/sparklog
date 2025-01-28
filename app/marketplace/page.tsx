"use client";
import React, { useEffect, useState } from "react";
import HeaderHome from "@/components/HeaderHome"; // Adjust the import path as necessary
import Footer from "@/components/Footer"; // Adjust the import path as necessary
import { BlackMarket } from "@/components/black-market";
import { AccountOverview } from "@/components/account-overview";
import { Hotel } from "@/components/hotel";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"; // Ensure you have this library installed
import { Loader2 } from "lucide-react"; // Icon for loading spinner (you can replace it with any spinner component/library)

const GoalsPage = () => {
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        setLoading(true); // Start loading
        const {
          data: { session },
        } = await supabase.auth.getSession();
        const userId = session?.user?.id;
        setId(userId);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchUserId();
  }, [supabase]);

  if (loading) {
    // Display loading spinner while fetching user ID
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!id) {
    // Handle case where user is not authenticated
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <p className="text-lg text-gray-700">User not authenticated</p>
      </div>
    );
  }

  return (
    <div>
      <HeaderHome />
      <AccountOverview id={id} />
      <BlackMarket id={id} />
      <Hotel id={id} />
      <Footer id={id} />
    </div>
  );
};

export default GoalsPage;
