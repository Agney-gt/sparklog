import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    const body = await request.json();
    const { mood, focus, stress, performance, date } = body;

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!user) throw new Error('User not authenticated');

    const dairyData = {
      user_id: user.id,
      mood: JSON.stringify(mood), // Convert mood object to JSON string
      focus,
      stress,
      performance,
      date: date || new Date().toISOString().split('T')[0], // Use current date if not provided
    };

    // Try to upsert the dairy entry (update if exists, insert if not)
    const { data, error } = await supabase
      .from('daily_dairy')
      .upsert([dairyData], {
        onConflict: 'user_id,date'
      });

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data,
      message: 'Daily dairy entry saved successfully',
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}