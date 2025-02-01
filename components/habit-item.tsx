import { cn } from "@/lib/utils";
interface HabitItemProps {
  type: string,
  status: "success" | "failed"
  onToggle: () => void
}

export function HabitItem({ type, status, onToggle }: HabitItemProps) {
  return (
    <div className="flex items-center justify-between py-2 px-4 hover:bg-muted/50 rounded-lg">
      <div className="flex items-center gap-3">

        <span className="capitalize">{type}</span>
      </div>
      <div className="flex items-center gap-4">
        <span
          className={cn(
            "text-sm px-3 py-1 rounded-full",
            status === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700",
          )}
        >
          {status === "success" ? "You're doing great!" : "You lose."}
        </span>
        <button onClick={onToggle} className="text-sm text-muted-foreground hover:text-foreground">
          Crap, I did...
        </button>
      </div>
    </div>
  )
}

