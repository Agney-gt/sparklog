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

    // Fetch user balance from 'user_progress' table
    const { data: user, error } = await supabase
      .from('user_progress')
      .select('balance')
      .eq('user_id', userId)
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
      balance: user.balance,
    });
  } catch (error) {
    console.error('Error in GET handler:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const { user_id } = await request.json();

    if (!user_id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Fetch the current balance
    const { data: user, error: fetchError } = await supabase
      .from('user_progress')
      .select('balance')
      .eq('user_id', user_id)
      .single();

    if (fetchError || !user) {
      console.error('Error fetching user balance:', fetchError || 'User not found');
      return NextResponse.json(
        { error: 'Failed to fetch user balance' },
        { status: 404 }
      );
    }

    const newBalance = user.balance + 50;

    // Update the balance
    const { error: updateError } = await supabase
      .from('user_progress')
      .update({ balance: newBalance })
      .eq('user_id', user_id);

    if (updateError) {
      console.error('Error updating balance:', updateError);
      return NextResponse.json(
        { error: 'Failed to update balance' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      balance: newBalance,
    });
  } catch (error) {
    console.error('Error in POST handler:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}