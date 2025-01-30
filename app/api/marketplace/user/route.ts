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

    // Fetch full user data from 'user_progress' table
    const { data: user, error } = await supabase
      .from('user_progress')
      .select('*') // Fetch all user details
      .eq('user_id', userId)
      .single();

    if (error || !user) {
      console.error('Error fetching user data:', error || 'User not found');
      return NextResponse.json(
        { error: 'Failed to fetch user data' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user, // Return full user details
    });
  } catch (error) {
    console.error('Error in GET handler:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
// Updates the user_prpogress table (provide the columns and user_id)
export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const requestData = await request.json();

    const { user_id, ...updateFields } = requestData;
    
    if (!user_id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    if (Object.keys(updateFields).length === 0) {
      return NextResponse.json(
        { error: 'No fields provided for update' },
        { status: 400 }
      );
    }
    if(updateFields.type=="reward"){  // Handling question rewards
      updateFields.balance = (updateFields.balance ?? 0) + 50;
      delete updateFields.type;
    }
    if (updateFields.type === "zen_alert") { //Handling zen alerts
      updateFields.zen_alerts = (updateFields.zen_alerts || 0) + 1; 
      delete updateFields.type;
    }
    // Update the user data with the provided fields
    const { error: updateError } = await supabase
      .from('user_progress')
      .update(updateFields)
      .eq('user_id', user_id);

    if (updateError) {
      console.error('Error updating user data:', updateError);
      return NextResponse.json(
        { error: 'Failed to update user data' },
        { status: 500 }
      );
    }

    // Fetch the updated user data
    const { data: updatedUser, error: fetchError } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', user_id)
      .single();

    if (fetchError || !updatedUser) {
      return NextResponse.json(
        { error: 'Failed to retrieve updated user data' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error in POST handler:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
