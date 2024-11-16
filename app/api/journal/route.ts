import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    // Wait for cookies
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    
    // Get request data
    const body = await request.json()
    const { date, ...journalData } = body

    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError

    
    // Prepare the entry data
    const entryData = {
      user_id: user?.id,
      date: date,
      gratitude: journalData.gratitude || {},
      vent: journalData.vent,
      notes: journalData.notes,
      obligations: journalData.obligations || {},
      mindset: journalData.mindset || {},
      reflections: journalData.reflections || {},
      trajectory: journalData.trajectory || {},
      ffo: journalData.ffo || {}
    }

    // Upsert the entry (update if exists, insert if not)
    const { data, error } = await supabase
      .from('journal_entries')
      .upsert(entryData, {
        onConflict: 'user_id,date', // Specify the unique constraint
        ignoreDuplicates: false // We want to update on conflict
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      data,
      message: 'Journal entry saved successfully'
    })

  } catch (error) {
    console.error('Error processing request:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({  cookies: () => cookieStore })
    
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')
    
    if (!date) {
      return NextResponse.json(
        { error: 'Date is required' }, 
        { status: 400 }
      )
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError

    const formattedDate = new Date(date).toDateString().split('T')[0]

    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('user_id', user?.id)
      .eq('date', formattedDate)
      .single()

    if (error && error.code !== 'PGRST116') {
      throw error
    }

    const { data: datesData, error: datesError } = await supabase
      .from('journal_entries')
      .select('date')
      .eq('user_id', user?.id)
      

    if (datesError) {
      console.error('Error fetching dates:', datesError)
      return NextResponse.json(
        { error: 'Error fetching dates' }, 
        { status: 500 }
      )
    }

    return NextResponse.json({ data: data || {}, markedDates: datesData.map(entry => entry.date) })

  } catch (error) {
    console.error('Error fetching entry:', error)
    return NextResponse.json(
      { error: 'Error fetching journal entry' }, 
      { status: 500 }
    )
  }
}