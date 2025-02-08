import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// GET: Fetch checklist items for a specific date
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')
    
    if (!date) {
      return NextResponse.json({ error: 'Date parameter is required' }, { status: 400 })
    }

    // Pass `cookies` directly to `createRouteHandlerClient`
    const supabase = createRouteHandlerClient({ cookies })

    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError

    const { data, error } = await supabase
      .from('checklist_items')
      .select('*')
      .eq('user_id', user?.id)
      .eq('date', date) // Include the date filter
      .order('created_at', { ascending: true })

    if (error) throw error

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error fetching checklist items:', error)
    return NextResponse.json({ error: 'Failed to fetch checklist items' }, { status: 500 })
  }
}

// POST: Create new checklist item
export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    console.log("Supabase :- ",supabase)

    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError

    const { date, classifier, action } = await request.json()

    if (!date || !classifier || !action) {
      return NextResponse.json(
        { error: 'Date, classifier, and action are required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('checklist_items')
      .insert({
        user_id: user?.id,
        date,
        text: action,
        classifier,
        is_completed: false
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error creating checklist item:', error)
    return NextResponse.json({ error: 'Failed to create checklist item' }, { status: 500 })
  }
}

// PATCH: Update item status
export async function PATCH(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError

    const { id, is_completed } = await request.json()

    if (!id || typeof is_completed !== 'boolean') {
      return NextResponse.json(
        { error: 'Item ID and completion status are required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('checklist_items')
      .update({ is_completed })
      .eq('id', id)
      .eq('user_id', user?.id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error updating checklist item:', error)
    return NextResponse.json({ error: 'Failed to update checklist item' }, { status: 500 })
  }
}

// DELETE: Remove item
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Item ID is required' }, { status: 400 })
    }

    const supabase = createRouteHandlerClient({ cookies })

    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError

    const { error } = await supabase
      .from('checklist_items')
      .delete()
      .eq('id', id)
      .eq('user_id', user?.id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting checklist item:', error)
    return NextResponse.json({ error: 'Failed to delete checklist item' }, { status: 500 })
  }
}