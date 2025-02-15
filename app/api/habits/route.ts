import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type Habit = {
  id?: string;
  user_id: string;
  name: string;
  type: string;
  category: "good" | "bad";
  status: "success" | "failed";
  date: string;
  calendar_entries?: Record<string, string>;
};


// Create a new habit
export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const body = await request.json();
    const { name, category } = body;

    if (!name || !["good", "bad"].includes(category)) {
      return NextResponse.json({ error: "Invalid habit data" }, { status: 400 });
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) throw userError;

    const habitData: Habit = {
      user_id: userData.user.id,
      name: name.trim(),
      type: name.toLowerCase(),
      category,
      status: "success",
      date: new Date().toISOString().split("T")[0],
    };

    const { data, error } = await supabase.from("habits").insert(habitData).select().single();

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data, message: "Habit added successfully" });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Fetch habits (optionally filter by category)
export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) throw userError;

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let query = supabase.from("habits").select("*").eq("user_id", userData.user.id);
    if (category) query = query.eq("category", category);

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching habits:", error);
      return NextResponse.json({ error: "Error fetching habits" }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching habits:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
export async function PUT(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) throw userError;

    const { id, date, status, image } = await request.json();
    const today = new Date().toISOString().split("T")[0];

    if (!id || !date || !status) {
      return NextResponse.json({ error: "ID, date, and status are required." }, { status: 400 });
    }

    // Fetch existing habit entry
    const { data: habit, error: habitError } = await supabase
      .from("habits")
      .select("calendar_entries, category")
      .eq("id", id)
      .eq("user_id", userData.user.id)
      .single();

    if (habitError || !habit) {
      return NextResponse.json({ error: "Habit not found" }, { status: 404 });
    }

    // Compute streak and reward
    const updatedEntries = { ...habit.calendar_entries };
    const previousEntry = updatedEntries[date];
    updatedEntries[date] = { image: image || previousEntry?.image || "", status, last_updated: today };

    let streak = 0;
    let reward = 5;
    const sortedDates = Object.keys(updatedEntries).sort((a, b) => a.localeCompare(b));

    for (const d of sortedDates.reverse()) {
      if (updatedEntries[d].status === "success") {
        streak++;
        reward = Math.pow(2, streak) * 5; // Exponential reward calculation
      } else if (updatedEntries[d].status === "failed") {
        reward = 0;
      } else {
        break;
      }
    }

    // Update habit
    const { error: updateError } = await supabase
      .from("habits")
      .update({ calendar_entries: updatedEntries })
      .eq("id", id);

    if (updateError) {
      return NextResponse.json({ error: "Error updating habit" }, { status: 500 });
    }

    // Fetch user progress (balance & HP)
    const { data: userProgress, error: progressError } = await supabase
      .from("user_progress")
      .select("balance, HP")
      .eq("user_id", userData.user.id)
      .single();

    if (progressError || !userProgress) {
      return NextResponse.json({ error: "User progress not found" }, { status: 500 });
    }

    const newBalance = userProgress.balance + reward;
    let newHP = userProgress.HP;

    // ✅ Increase HP by 10 when habit is successful
    if (status === "success") {
      newHP = Math.min(100, userProgress.HP + 5); // HP can't exceed 100
    }

    // ✅ Decrease HP by 10 when habit fails
    if (status === "failed") {
      newHP = Math.max(0, userProgress.HP - 10); // HP can't go below 0
    }

    // Update user progress
    const { error: balanceError } = await supabase
      .from("user_progress")
      .update({ balance: newBalance, HP: newHP })
      .eq("user_id", userData.user.id);

    if (balanceError) {
      return NextResponse.json({ error: "Error updating user progress" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Habit updated successfully",
      newBalance,
      newHP,
      reward,
      streak,
    });
  } catch (error) {
    console.error("Error updating habit:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


export async function DELETE(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) throw userError;

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Habit ID is required" }, { status: 400 });
    }

    const { error } = await supabase.from("habits").delete().eq("id", id).eq("user_id", userData.user.id);
    if (error) {
      console.error("Error deleting habit:", error);
      return NextResponse.json({ error: "Error deleting habit" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Habit deleted successfully" });
  } catch (error) {
    console.error("Unexpected error deleting habit:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
