// import React from "react"
// import { cn } from "@/lib/utils"

// interface CalendarGridProps {
//   weeks: number[]
//   days: string[]
//   data: Record<string, string>
// }

// export function CalendarGrid({ weeks, days, data }: CalendarGridProps) {
//   return (
//     <div className="grid grid-cols-8 gap-1 text-xs">
//       <div className="col-span-1"></div>
//       {days.map((day) => (
//         <div key={day} className="text-center font-medium text-muted-foreground">
//           {day}
//         </div>
//       ))}

//       {weeks.map((week) => (
//         <React.Fragment key={week}>
//           <div className="text-muted-foreground">w-{week}</div>
//           {Array.from({ length: 7 }).map((_, index) => {
//             const dateKey = `${week}-${index}`
//             return (
//               <div
//                 key={dateKey}
//                 className={cn(
//                   "aspect-square rounded-sm",
//                   data[dateKey] === "success" && "bg-green-100",
//                   data[dateKey] === "fail" && "bg-red-100",
//                   !data[dateKey] && "bg-muted",
//                 )}
//               />
//             )
//           })}
//         </React.Fragment>
//       ))}
//     </div>
//   )
// }







// import React from "react"
// import { cn } from "@/lib/utils"

// interface CalendarGridProps {
//   weeks: number[]
//   days: string[]
//   data: Record<string, string>
// }

// export function CalendarGrid({ weeks, days, data }: CalendarGridProps) {
//   return (
//     <div className="grid grid-cols-8 gap-1 text-xs">
//       <div className="col-span-1"></div>
//       {days.map((day, index) => (
//         // Ensure that key is unique by combining the day with the index
//         <div key={`${day}-${index}`} className="text-center font-medium text-muted-foreground">
//           {day}
//         </div>
//       ))}

//       {weeks.map((week, index) => (
//         <React.Fragment key={`${week}-${index}`}>
//           <div className="text-muted-foreground">w-{week}</div>
//           {Array.from({ length: 7 }).map((_, dayIndex) => {
//             const dateKey = `${week}-${dayIndex}`
//             return (
//               <div
//                 key={dateKey} // Unique key based on week and dayIndex
//                 className={cn(
//                   "aspect-square rounded-sm",
//                   data[dateKey] === "success" && "bg-green-100",
//                   data[dateKey] === "fail" && "bg-red-100",
//                   !data[dateKey] && "bg-muted",
//                 )}
//               />
//             )
//           })}
//         </React.Fragment>
//       ))}
//     </div>
//   )
// }




import React from "react"
import { cn } from "@/lib/utils"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from "date-fns"

interface CalendarGridProps {
  currentDate: Date
  data: Record<string, string>
  onDateToggle: (date: Date) => void
}

export function CalendarGrid({ currentDate, data, onDateToggle }: CalendarGridProps) {
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const startingDayIndex = monthStart.getDay()
  const daysToAdd = startingDayIndex === 0 ? 6 : startingDayIndex - 1
  const paddedDays = Array(daysToAdd).fill(null)

  return (
    <div className="grid grid-cols-7 gap-1 text-xs">
      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
        <div key={day} className="text-center font-medium text-muted-foreground p-2">
          {day}
        </div>
      ))}

      {paddedDays.map((_, index) => (
        <div key={`pad-${index}`} className="aspect-square" />
      ))}

      {daysInMonth.map((date) => {
        const dateKey = format(date, "yyyy-MM-dd")
        return (
          <button
            key={dateKey}
            onClick={() => onDateToggle(date)}
            className={cn(
              "aspect-square rounded-sm transition-colors flex items-center justify-center",
              !isSameMonth(date, currentDate) && "opacity-50",
              isToday(date) && "border border-blue-500",
              data[dateKey] === "success" && "bg-green-100 hover:bg-green-200",
              data[dateKey] === "fail" && "bg-red-100 hover:bg-red-200",
              !data[dateKey] && "bg-muted hover:bg-muted-foreground/10",
            )}
          >
            {format(date, "d")}
          </button>
        )
      })}
    </div>
  )
}

