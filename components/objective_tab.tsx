"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X } from "lucide-react";

interface ObjectiveProps {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  progress: number;
  exp: number;
  coins: number;
  onDelete: (id: string | number) => void;
}

export default function objective_tab({ id, title, start_date, end_date, progress, exp, coins, onDelete }: ObjectiveProps) {
  return (
    <Card className="w-full">
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{title}</h3>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onDelete(id)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-3">
          <div className="text-sm text-muted-foreground">Start Date: {start_date}</div>
          <div className="text-sm text-muted-foreground">End Date: {end_date}</div>
          <Progress value={progress} className="h-2" />
          <div className="text-sm">+ {exp} EXP, + {coins} Coins</div>
        </div>
      </CardContent>
    </Card>
  );
}
