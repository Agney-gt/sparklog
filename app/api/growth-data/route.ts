import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Define the expected structure of the request body
interface GoodHabitsData {
    habit_name: string; // Column to store the habit name
    exp_earn: number; // Column to store the experience earned
}

export async function GET() {
    const supabase = createRouteHandlerClient({ cookies });
    const { data, error } = await supabase
        .from('good_habits')
        .select('*');

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function POST(request: Request) {
    const supabase = createRouteHandlerClient({ cookies });
    const body: GoodHabitsData = await request.json(); // Ensure correct typing

    // Validation: Check if required fields are present
    if (!body.habit_name || body.exp_earn === undefined) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('good_habits')
        .insert([body]);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 }); // Return 201 status for successful insertion
}
