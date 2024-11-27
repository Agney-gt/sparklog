"use client"

import * as React from "react"
import { DayPicker } from "react-day-picker"
import { useState } from "react";


import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  markedDates?: string[];
  fetchJournalEntry: (date: Date) => Promise<void>;
  setDate: (date: Date) => void; // Add a prop for marked dates
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  markedDates = [],
  setDate,
  fetchJournalEntry,
   // Default to an empty array
  ...props
}: CalendarProps) {
  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
    fetchJournalEntry(newDate); // Fetch journal entry for the new date
  };
  
  

  return (
    <DayPicker
      onDayClick={handleDateChange}
      modifiers={{
        marked: markedDates.map(date => new Date(date))
      }}
      modifiersClassNames={{
        marked: "bg-black text-white hover:bg-black hover:text-white"
      }}
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-7 w-7 p-0 font-normal aria-selected:opacity-100"
        ),
        
        ...classNames,
      }}
      
        components={{
        IconLeft: () => null,
        IconRight: () => null,
        
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }