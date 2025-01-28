import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Fetch user balance from 'users' table
    const { data: user, error } = await supabase
      .from('users')
      .select('coins')
      .eq('id', userId)
      .single();

    if (error || !user) {
      console.error('Error fetching user balance:', error || 'User not found');
      return NextResponse.json(
        { error: 'Failed to fetch user balance' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      balance: user.coins,
    });
  } catch (error) {
    console.error('Error in GET handler:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
