import { cn } from "@/lib/utils";
import { useState } from "react";

interface HabitItemProps {
  id: string;
  type: string;
  status: "success" | "failed";
  onToggle: () => void;
  onDelete: (id: string) => void;
}

export function HabitItem({ id, type, status, onToggle, onDelete }: HabitItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/habits?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        onDelete(id);
      } else {
        console.error("Failed to delete habit");
      }
    } catch (error) {
      console.error("Error deleting habit:", error);
    } finally {
      setIsDeleting(false);
    }
  };

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
        <button
          onClick={handleDelete}
          className="text-sm text-red-500 hover:text-red-700"
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
