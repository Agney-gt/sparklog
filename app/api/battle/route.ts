import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// GET: Fetch user HP, MP, and inventory
export async function GET(): Promise<NextResponse> {
  try {
    // Create the Supabase client inside the request scope
    const supabase = createRouteHandlerClient({ cookies });

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('user_progress')
      .select('HP, MP, inventory')
      .eq('user_id', user.id)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error  }, { status: 500 });
  }
}

// PUT: Update user HP and MP
export async function PUT(req: Request): Promise<NextResponse> {
  try {
    // Create the Supabase client inside the request scope
    const supabase = createRouteHandlerClient({ cookies });

    const body = await req.json();
    const { HP, MP } = body as { HP: number; MP: number }; // Explicitly type the request body

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (HP === undefined || MP === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { error } = await supabase
      .from('user_progress')
      .update({ HP, MP })
      .eq('user_id', user.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'User stats updated successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error  }, { status: 500 });
  }
}