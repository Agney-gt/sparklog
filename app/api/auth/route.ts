import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export async function GET(request: Request) {
  // Extract code from the query string
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (!code) {
    return NextResponse.json({ message: 'Code parameter is missing' }, { status: 400 });
  }

  try {
    // Use cookies() function here to pass it to Supabase client
    const cookieStore = cookies(); // Call cookies() to retrieve cookies
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    // Exchange the authorization code for a session
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error('Supabase Auth error:', error.message);
      return NextResponse.json({ message: 'Authorization failed' }, { status: 401 });
    }

    // Redirect to /journal after successful authentication
    return NextResponse.redirect(new URL('/journal', requestUrl.origin));
  } catch (error) {
    console.error('Auth callback error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
