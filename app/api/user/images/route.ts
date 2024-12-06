import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    
    if (!file) {
      return NextResponse.json(
        { status: 400 }
      );
    }

    const supabase = createRouteHandlerClient({ cookies });
    
    // Upload file to Supabase storage
    const { data, error } = await supabase.storage
      .from('sparklog')
      .upload(`${Date.now()}-${file.name}`, file);

    if (error) {
      return NextResponse.json(
        { error: 'Error uploading file' },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('sparklog')
      .getPublicUrl(data.path);

    return NextResponse.json({
      alt: file.name,
      url: publicUrl
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}