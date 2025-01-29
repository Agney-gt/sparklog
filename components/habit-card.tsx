import { useEffect } from "react";
import { CheckIcon, XIcon } from "lucide-react";
import { Card } from "@/components/ui/card"; // Ensure this path is correct

interface HabitCardProps {
  title: string;
  total: number;
  isGrown?: boolean;
  toBeGrown?: boolean;
  weeks: number[];
}

export function HabitCard({ title, total, isGrown, toBeGrown, weeks }: HabitCardProps) {
  useEffect(() => {
    // Ensure fetchActions is defined or remove this line
    // fetchActions();
  }, []); // Updated dependency array

  return (
    <Card className="p-4 w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">{title}</h3>
        <span className="text-sm text-muted-foreground">Check-in</span>
      </div>
      <div className="flex items-center gap-2 mb-4">
        {isGrown && (
          <div className="flex items-center gap-1 text-sm text-green-600">
            <CheckIcon className="w-4 h-4" />
            <span>Grown!</span>
          </div>
        )}
        {toBeGrown && (
          <div className="flex items-center gap-1 text-sm text-red-600">
            <XIcon className="w-4 h-4" />
            <span>To be grown today</span>
          </div>
        )}
        <span className="text-sm text-muted-foreground">| Total: {total}</span>
      </div>
      <div className="border-t pt-4">
        <div className="text-center mb-2 text-sm text-muted-foreground">---------- 2024 · Sep ----------</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {weeks.map((week) => (
            <div key={week} className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground w-8">w-{week}</span>
              <div className="grid grid-cols-7 gap-1 flex-1">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="aspect-square rounded-sm bg-muted border border-border" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
