import Objective_tab_parts from "@/components/ui/Objective_tab_parts";
import { BarChart3 } from "lucide-react";

export default function GrowthObjectives() {
  return (
    <ObjectiveList 
      category="growth"
      icon={<BarChart3 className="h-8 w-8 text-primary" />}
      heading="Growth Objectives"
      description="Track your personal growth goals!"
    />
  );
}
