import ObjectiveList from "@/components/ui/ObjectiveList";
import { Flag } from "lucide-react";

export default function BattleObjectives() {
  return (
    <ObjectiveList 
      category="battle"
      icon={<Flag className="h-8 w-8 text-primary" />}
      heading="Battle Objectives"
      description="Conquer your challenges and grow stronger!"
    />
  );
}