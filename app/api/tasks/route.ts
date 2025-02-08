import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// Handle POST requests for creating tasks
export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const body = await request.json();
    const { text, date, time } = body;

    const { data: { user }, error: userError } = await supabase.auth.getUser ();
    if (userError) throw userError;

    const taskData = {
      user_id: user?.id,
      text,
      date,
      time,
      completed: false,
    };

    const { data, error } = await supabase
      .from('tasks')
      .insert([taskData])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data,
      message: 'Task created successfully',
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Handle GET requests for fetching tasks
export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const { data: { user }, error: userError } = await supabase.auth.getUser ();
    if (userError) throw userError;

    const { searchParams } = new URL(request.url);
    const timeFilter = searchParams.get('timeFilter');

    let query = supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user?.id);

    if (timeFilter === 'morning') {
      query = query.gte('time', '00:00').lt('time', '12:00');
    } else if (timeFilter === 'noon') {
      query = query.gte('time', '12:00').lt('time', '17:00');
    } else if (timeFilter === 'evening') {
      query = query.gte('time', '17:00').lte('time', '23:59');
    }

    const { data, error } = await query
      .order('date', { ascending: true })
      .order('time', { ascending: true });

    if (error) {
      console.error('Error fetching tasks:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data: data || [] });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ error: 'Error fetching tasks' }, { status: 500 });
  }
}
