import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      // Handle error (e.g., log it, redirect to an error page, etc.)
      console.error("Error exchanging code for session:", error.message);
      return NextResponse.redirect(new URL("/error", requestUrl.origin)); // Redirect to an error page
    }
  } else {
    // Handle case where code is missing
    return NextResponse.redirect(new URL("/login", requestUrl.origin)); // Redirect to login if no code
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL("/journal", requestUrl.origin));
}