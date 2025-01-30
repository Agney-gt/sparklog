import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Refresh session if expired
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Auth callback should be excluded from middleware
  if (req.nextUrl.pathname.startsWith("/auth/callback")) {
    return res
  }

  // Define public paths
  const publicPaths = ["/login", "/signup", "/"]
  const isPublicPath = publicPaths.includes(req.nextUrl.pathname)

  // Protect routes except public paths
  if (!session && !isPublicPath) {
    const redirectUrl = new URL("/login", req.url)
    redirectUrl.searchParams.set("redirect", req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Redirect logged-in users away from public pages
  if (session && isPublicPath) {
    const redirectUrl = new URL("/journal", req.url)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/login",
    "/signup",
    "/journal",
  ],
}


