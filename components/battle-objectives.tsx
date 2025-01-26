"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Flag, Plus, X } from "lucide-react";

interface ObjectiveProps {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  progress: number;
  exp: number;
  coins: number;
}

function ObjectiveCard({ id, title, start_date, end_date, progress, exp, coins, onDelete }: ObjectiveProps & { onDelete: (id: string) => void }) {
  return (
    <Card className="w-full">
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{title}</h3>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onDelete(id)} 
          >
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

export default function BattleObjectives() {
  const [battleObjectives, setBattleObjectives] = useState<ObjectiveProps[]>([]);
  const [newObjective, setNewObjective] = useState({
    title: "",
    start_date: "",
    end_date: "",
    progress: 0,
    exp: 0,
    coins: 0,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    async function fetchBattleObjectives() {
      const response = await fetch("/api/goals?category=battle");
      const result = await response.json();
      setBattleObjectives(result.data);
    }
    fetchBattleObjectives();
  }, []);

  async function handleAddObjective() {
    try {
      const response = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newObjective, category: "battle" }),
      });

      const result = await response.json();
      if (result.success) {
        setBattleObjectives((prev) => [...prev, result.data]);
        setNewObjective({ title: "", start_date: "", end_date: "", progress: 0, exp: 0, coins: 0 });
        setIsDialogOpen(false); // Close the dialog after submission
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error("Error adding objective:", error);
    }
  }

  async function handleDeleteObjective(id: string) {
    try {
      const response = await fetch(`/api/goals?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the objective from the state
        setBattleObjectives((prev) => prev.filter((objective) => objective.id !== id));
      } else {
        console.error("Failed to delete objective:", await response.json());
      }
    } catch (error) {
      console.error("Error deleting objective:", error);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="flex items-start gap-4">
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <Flag className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Battle Objectives</h2>
          <p className="text-muted-foreground">Conquer your challenges and grow stronger!</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {battleObjectives.map((objective) => (
          <ObjectiveCard key={objective.id} {...objective} onDelete={handleDeleteObjective} />
        ))}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Card className="w-full flex items-center justify-center p-6 cursor-pointer">
              <Button variant="ghost" className="h-20 w-20 rounded-full">
                <Plus className="h-10 w-10 text-muted-foreground" />
              </Button>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Objective</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Objective title"
                  value={newObjective.title}
                  onChange={(e) => setNewObjective({ ...newObjective, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="start_date">Start Date</Label>
                <Input
                  id="start_date"
                  type="date"
                  value={newObjective.start_date}
                  onChange={(e) => setNewObjective({ ...newObjective, start_date: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="end_date">End Date</Label>
                <Input
                  id="end_date"
                  type="date"
                  value={newObjective.end_date}
                  onChange={(e) => setNewObjective({ ...newObjective, end_date: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="exp">EXP</Label>
                <Input
                  id="exp"
                  type="number"
                  value={newObjective.exp}
                  onChange={(e) => setNewObjective({ ...newObjective, exp: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="coins">Coins</Label>
                <Input
                  id="coins"
                  type="number"
                  value={newObjective.coins}
                  onChange={(e) => setNewObjective({ ...newObjective, coins: Number(e.target.value) })}
                />
              </div>
              <Button onClick={handleAddObjective} className="w-full">
                Add Objective
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
