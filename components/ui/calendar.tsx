"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker, DayProps } from "react-day-picker"
import { useState } from "react";

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  markedDates?: string[];
  handleDateChange: (date: Date) => void; // Add a prop for marked dates
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  markedDates = [],
  handleDateChange,
   // Default to an empty array
  ...props
}: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined); // State for selected date

  // Function to check if a date is marked
  const isMarkedDate = (date: Date) => {
    const formattedDate = date.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
    return markedDates.includes(formattedDate);
  };
  const onDayClicks = (date: Date) => {
    console.log("Selected date:", date)
    setSelectedDate(date);
    handleDateChange(date); // Use handleDateChange to update the date in the parent
  };
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      onDayClick={(date) => onDayClicks(date)}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
        Day: ({ date }: DayProps) => (
          <div className="relative" onClick={() => setSelectedDate(date)}>
            <div className={cn("h-9 w-9 text-center", { "bg-blue-200": selectedDate?.toDateString() === date.toDateString() })}>
              {date.getDate()}
              {isMarkedDate(date) && (
                <span className="absolute bottom-0 left-0 right-0 text-red-500 text-xs">•</span>
              )}
            </div>
          </div>
        ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }