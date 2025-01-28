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







import React from "react"
import { cn } from "@/lib/utils"

interface CalendarGridProps {
  weeks: number[]
  days: string[]
  data: Record<string, string>
}

export function CalendarGrid({ weeks, days, data }: CalendarGridProps) {
  return (
    <div className="grid grid-cols-8 gap-1 text-xs">
      <div className="col-span-1"></div>
      {days.map((day, index) => (
        // Ensure that key is unique by combining the day with the index
        <div key={`${day}-${index}`} className="text-center font-medium text-muted-foreground">
          {day}
        </div>
      ))}

      {weeks.map((week, index) => (
        <React.Fragment key={`${week}-${index}`}>
          <div className="text-muted-foreground">w-{week}</div>
          {Array.from({ length: 7 }).map((_, dayIndex) => {
            const dateKey = `${week}-${dayIndex}`
            return (
              <div
                key={dateKey} // Unique key based on week and dayIndex
                className={cn(
                  "aspect-square rounded-sm",
                  data[dateKey] === "success" && "bg-green-100",
                  data[dateKey] === "fail" && "bg-red-100",
                  !data[dateKey] && "bg-muted",
                )}
              />
            )
          })}
        </React.Fragment>
      ))}
    </div>
  )
}
