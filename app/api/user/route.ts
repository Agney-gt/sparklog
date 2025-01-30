
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const getSupabaseClient = () => createRouteHandlerClient({ cookies: () => cookies() });

const handleError = (message) => NextResponse.json({ error: message }, { status: 500 });

export async function POST(request: Request) {
  try {
    const supabase = getSupabaseClient();
    const body = await request.json();
    const { data, error } = await supabase.from('users').insert(body).select().single();
    if (error) return handleError(error.message);
    return NextResponse.json({ success: true, data });
  } catch {
    return handleError('Internal server error');
  }
}

export async function GET() {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from('users').select('*');
    if (error) return handleError('Error fetching users');
    return NextResponse.json({ data });
  } catch {
    return handleError('Internal server error');
  }
}

