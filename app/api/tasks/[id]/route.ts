import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const { completed } = await request.json();
    const { data: { user }, error: userError } = await supabase.auth.getUser ();
    if (userError) throw userError;
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('tasks')
      .update({ completed })
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data,
      message: 'Task updated successfully',
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}