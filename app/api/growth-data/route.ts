import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
    const supabase = createRouteHandlerClient({ cookies });
    const { data, error } = await supabase
        .from('growth_data')
        .select('*');

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function POST(request: Request) {
    const supabase = createRouteHandlerClient({ cookies });
    const body = await request.json();
    const { data, error } = await supabase
        .from('growth_data')
        .insert([body]);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}
