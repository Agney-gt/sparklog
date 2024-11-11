'use client'

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Settings, LogOut, Trophy, Sparkles } from "lucide-react"
import Image from 'next/image'

interface HeaderProps {
  date: Date;
  setDate: (date: Date) => void;
  handleLogout: () => Promise<void>;
  fetchJournalEntry: (date: Date) => Promise<void>;
}

export function Header({ date, setDate, handleLogout, fetchJournalEntry }: HeaderProps) {
  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
    fetchJournalEntry(newDate); // Fetch journal entry for the new date
  };

  return (
    <div className="border-b">
      <div className="container px-4">
        <div className="flex h-16 items-center justify-between">    <div className="flex flex-1 items-center gap-2">
          <Button variant="ghost" size="icon" className="shrink-0" onClick={() => handleDateChange(new Date(date.setDate(date.getDate() - 1)))}>
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Previous day</span>
          </Button>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                <span className="hidden sm:inline-block font-normal">
                  {format(date, "MMMM d, yyyy")}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => date && handleDateChange(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Button variant="ghost" size="icon" className="shrink-0" onClick={() => handleDateChange(new Date(date.setDate(date.getDate() + 1)))}>
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Next day</span>
          </Button>

          <Button variant="ghost" className="hidden sm:inline-block" onClick={() => handleDateChange(new Date())}>
            Today
          </Button>
        </div>

        <div className="container px-4 py-3 text-center">
             <h1 className="text-2xl font-semibold tracking-tight">
          Journal out of inspiration, not obligation
        </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <Trophy className="h-4 w-4 text-yellow-500" />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Level 1</span>
                <Badge variant="secondary" className="rounded-sm">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Novice Writer
                </Badge>
              </div>
              <Progress value={33} className="h-1 w-24" />
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
                <span className="sr-only">Settings</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Stats</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="container px-4 py-3 text-center">
             <h1 className="text-2xl font-semibold tracking-tight">
          Journal out of inspiration, not obligation
        </h1>
      </div>
    </div>
    </div>
  )
}

export default Header;

