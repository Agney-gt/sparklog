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

    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const { data, error } = await supabase
      .from("items")
      .select("quiz_questions")
      .eq("id", itemId)
      .single();

    if (error) throw new Error("Failed to fetch quiz");

    return NextResponse.json({
      success: true,
      data,
      message: "Quiz questions retrieved",
    });
  } catch (error) {
    console.error("Error in GET /api/get-quiz:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
