import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type Habit = {
  id?: string;
  user_id: string;
  name: string;
  type: string;
  status: "success" | "failed";
  date: string;
  calendar_entries?: Record<string, string>;
};

type HabitUpdate = {
  id: string;
  date?: string;
  status?: "success" | "failed";
  toggleOnly?: boolean;
};

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    // Parse the body of the request
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : null;

    // Ensure that name is a valid string and not empty
    if (!name) {
      return NextResponse.json({ error: "Invalid habit name" }, { status: 400 });
    }

    // Get the current user from the authentication service
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) throw userError;

    // Prepare the habit data to insert into the database
    const habitData: Habit = {
      user_id: userData.user.id,
      name,
      type: name.toLowerCase(),
      status: "success",
      date: new Date().toISOString().split("T")[0], // Date formatted as YYYY-MM-DD
    };

    // Insert habit into the database
    const { data, error } = await supabase.from("habits").insert(habitData).select().single();

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Return success response with the habit data
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

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) throw userError;

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    let query = supabase.from("habits").select("*").eq("user_id", userData.user.id);
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

export async function PUT(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) throw userError;

    const body = (await request.json()) as HabitUpdate;
    const { id, date, status, toggleOnly } = body;

    if (!id || (!toggleOnly && (!date || !status))) {
      return NextResponse.json({
        error: "ID is required. Date and status are required unless toggling only status.",
      }, { status: 400 });
    }

    const { data: habit, error: fetchError } = await supabase
      .from("habits")
      .select("status, calendar_entries")
      .eq("id", id)
      .eq("user_id", userData.user.id)
      .single();

    if (fetchError || !habit) {
      console.error("Error fetching habit:", fetchError);
      return NextResponse.json({ error: "Habit not found" }, { status: 404 });
    }

    const updatedFields: Partial<Habit> = {};
    if (toggleOnly) {
      updatedFields.status = habit.status === "success" ? "failed" : "success";
    } else {
      updatedFields.status = status;
      updatedFields.calendar_entries = { ...habit.calendar_entries, [date as string]: status as string };
    }

    const { error } = await supabase.from("habits").update(updatedFields).eq("id", id).eq("user_id", userData.user.id);
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
