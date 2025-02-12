import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// GET: Fetch user level from user_progress table
export async function GET() {
  try {
    const cookieStore = await cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError

    const { data, error } = await supabase
      .from('user_progress')
      .select('level')
      .eq('user_id', user?.id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        // No record found - create initial progress record
        const { data: newProgress, error: insertError } = await supabase
          .from('user_progress')
          .insert([{ user_id: user?.id, level: 1 }])
          .select('level')
          .single()

        if (insertError) throw insertError
        return NextResponse.json({ level: newProgress.level })
      }
      throw error
    }

    return NextResponse.json({ level: data.level })
  } catch (error) {
    console.error('Error fetching user level:', error)
    return NextResponse.json({ error: 'Failed to fetch user level' }, { status: 500 })
  }
}
