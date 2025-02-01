import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const body = await request.json();
    let { name } = body;

    // Ensure name is a string before trimming
    if (typeof name !== "string") {
      return NextResponse.json({ error: "Invalid habit name" }, { status: 400 });
    }

    name = name.trim();

    if (!name) {
      return NextResponse.json({ error: "Habit name cannot be empty" }, { status: 400 });
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;

    const habitData = {
      user_id: user?.id,
      name,
      type: name.toLowerCase(),
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


export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    let query = supabase.from("habits").select("*").eq("user_id", user?.id);
    if (type) query = query.eq("type", type);

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

// Handle updating habit status
export async function PUT(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;

    const body = await request.json();
    const { id, date, status, toggleOnly } = body; // ✅ Added toggleOnly flag

    if (!id || (!toggleOnly && (!date || !status))) {
      return NextResponse.json({ error: "ID is required. Date and status are required unless toggling only status." }, { status: 400 });
    }

    // Fetch the current habit data
    const { data: habit, error: fetchError } = await supabase
      .from("habits")
      .select("status, calendar_entries")
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    if (fetchError || !habit) {
      console.error("Error fetching habit:", fetchError);
      return NextResponse.json({ error: "Habit not found" }, { status: 404 });
    }

    let updatedFields: { status?: string; calendar_entries?: Record<string, string> } = {};

    if (toggleOnly) {
      // ✅ Toggle only the habit status without modifying calendar_entries
      updatedFields.status = habit.status === "success" ? "failed" : "success";
    } else {
      // ✅ Update calendar_entries while keeping status intact
      updatedFields.status = status;
      updatedFields.calendar_entries = { ...habit.calendar_entries, [date]: status };
    }

    // Perform the update
    const { error } = await supabase
      .from("habits")
      .update(updatedFields)
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      console.error("Error updating habit:", error);
      return NextResponse.json({ error: "Error updating habit" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Habit updated successfully", updatedFields });
  } catch (error) {
    console.error("Unexpected error updating habit:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
