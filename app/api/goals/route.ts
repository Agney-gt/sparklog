import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const cookieStore = cookies(); 
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const body = await request.json();
    const { title, start_date, end_date, progress, exp, coins, category } = body;

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;

    const goalData = {
      user_id: user?.id,
      title,
      start_date,
      end_date,
      progress,
      exp,
      coins,
      category,
    };

    const { data, error } = await supabase
      .from('goals')
      .insert(goalData)
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data, message: 'Goal saved successfully' });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const cookieStore = cookies(); 
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let query = supabase.from('goals').select('*').eq('user_id', user?.id);
    if (category) query = query.eq('category', category);

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching goals:', error);
      return NextResponse.json({ error: 'Error fetching goals' }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching goals:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const cookieStore = cookies(); 
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Goal ID is required' }, { status: 400 });
    }

    const { error } = await supabase.from('goals').delete().eq('id', id);

    if (error) {
      console.error('Error deleting goal:', error);
      return NextResponse.json({ error: 'Error deleting goal' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Goal deleted successfully' });
  } catch (error) {
    console.error('Error deleting goal:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
