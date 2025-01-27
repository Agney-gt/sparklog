import objective_tab_parts from "@/components/ui/objective_tab_parts";
import { Flag } from "lucide-react";

export default function BattleObjectives() {
  return (
    <Objective_tab_parts 
      category="battle"
      icon={<Flag className="h-8 w-8 text-primary" />}
      heading="Battle Objectives"
      description="Conquer your challenges and grow stronger!"
    />
  );
}
