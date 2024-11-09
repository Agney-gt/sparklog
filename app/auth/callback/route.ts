import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')

    if (code) {
      const supabase = createRouteHandlerClient({ cookies })
      await supabase.auth.exchangeCodeForSession(code)
    }

    // Redirect to journal page with cache-busting query parameter
    return NextResponse.redirect(new URL(`/journal?t=${Date.now()}`, requestUrl.origin))
  } catch (error) {
    console.error('Auth callback error:', error)
    // Redirect to login with error parameter
    return NextResponse.redirect(
      new URL(`/login?error=auth-callback-error&t=${Date.now()}`, requestUrl.origin)
    )
  }
} 