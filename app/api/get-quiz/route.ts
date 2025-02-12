import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const itemId = searchParams.get("itemId");

    if (!itemId) {
      return NextResponse.json({ error: "Missing itemId" }, { status: 400 });
    }

    const cookieStore = cookies(); // Use cookies directly
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const { data, error } = await supabase
      .from("items")
      .select("quiz_questions")
      .eq("id", itemId)
      .single();

    if (error) {
      console.error("Error fetching quiz questions:", error);
      return NextResponse.json({ error: "Failed to fetch quiz" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data,
      message: "Quiz questions retrieved successfully",
    });
  } catch (error) {
    console.error("Error in GET /api/get-quiz:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { user_id } = await req.json();

    if (!user_id) {
      return NextResponse.json({ error: "Missing user_id" }, { status: 400 });
    }

    const cookieStore = cookies(); // Use cookies directly
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    // Fetch current skill points
    const { data, error: fetchError } = await supabase
      .from("user_progress")
      .select("skill_points")
      .eq("user_id", user_id)
      .single();

    if (fetchError) {
      console.error("Error fetching skill points:", fetchError);
      return NextResponse.json({ error: "Failed to fetch skill points" }, { status: 500 });
    }

    // Increase all skill points by 1
    const updatedSkillPoints = data.skill_points.map((point: number) => point + 1);

    // Update the database
    const { error: updateError } = await supabase
      .from("user_progress")
      .update({ skill_points: updatedSkillPoints })
      .eq("user_id", user_id);

    if (updateError) {
      console.error("Error updating skill points:", updateError);
      return NextResponse.json({ error: "Failed to update skill points" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Skill points updated successfully" });
  } catch (error) {
    console.error("Error updating skill points:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
