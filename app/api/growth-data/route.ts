import { NextResponse } from 'next/server';
import supabase from '../../../lib/supabaseClient'; // Adjust the path if necessary

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('growth_data') // Replace with your actual table name
      .select('*');

    if (error) {
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching growth data:', error);
    return NextResponse.json({ error: 'Failed to fetch growth data' }, { status: 500 });
  }
}
