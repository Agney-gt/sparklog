import { NextResponse } from "next/server"
import type { HabitEntry, HabitData } from "@/types/habits"

// In a real app, this would be a database
const habits: HabitData = {
  Smoking: {
    entries: [],
    stats: { weekly: 0, monthly: 0, annually: 0, total: 0 },
  },
  Scrolling: {
    entries: [],
    stats: { weekly: 0, monthly: 0, annually: 0, total: 0 },
  },
  Drink: {
    entries: [],
    stats: { weekly: 0, monthly: 0, annually: 0, total: 0 },
  },
}

export async function GET() {
  return NextResponse.json(habits)
}

export async function POST(request: Request) {
  const entry: HabitEntry = await request.json()

  if (!habits[entry.type]) {
    return NextResponse.json({ error: "Invalid habit type" }, { status: 400 })
  }

  // Add new entry
  habits[entry.type].entries.push(entry)

  // Update stats
  const now = new Date()
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)

  const entries = habits[entry.type].entries

  habits[entry.type].stats = {
    weekly: entries.filter((e) => new Date(e.date) > oneWeekAgo).length,
    monthly: entries.filter((e) => new Date(e.date) > oneMonthAgo).length,
    annually: entries.filter((e) => new Date(e.date) > oneYearAgo).length,
    total: entries.length,
  }

  return NextResponse.json(habits[entry.type])
}

