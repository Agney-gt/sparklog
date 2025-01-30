import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
  
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    
  
    const body = await request.json()
    const { text, date, time } = body

  
    const { data: { user }, error: userError } = await supabase.auth.getUser ()
    if (userError) throw userError

    
    const taskData = {
      user_id: user?.id,
      text,
      date,
      time,
      completed: false 
    }
    const { data, error } = await supabase
      .from('tasks')
      .insert([taskData])
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      data,
      message: 'Task created successfully'
    })

  } catch (error) {
    console.error('Error processing request:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({  cookies: () => cookieStore })
    

    const { data: { user }, error: userError } = await supabase.auth.getUser ()
    if (userError) throw userError

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user?.id)

    if (error) {
      console.error('Error fetching tasks:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data: data || [] })

  } catch (error) {
    console.error('Error fetching tasks:', error)
    return NextResponse.json(
      { error: 'Error fetching tasks' }, 
      { status: 500 }
    )
  }
}