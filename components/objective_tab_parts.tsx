"use client";

import { useEffect, useState } from "react";
import Objective_tab from "./Objective_tab";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

interface ObjectiveProps {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  progress: number;
  exp: number;
  coins: number;
}

interface ObjectiveListProps {
  category: "growth" | "battle";
  icon: JSX.Element;
  heading: string;
  description: string;
}

export default function Objective_tab_parts({ category, icon, heading, description }: ObjectiveListProps) {
  const [objectives, setObjectives] = useState<ObjectiveProps[]>([]);
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
    async function fetchObjectives() {
      const response = await fetch(`/api/goals?category=${category}`);
      const result = await response.json();
      setObjectives(result.data);
    }
    fetchObjectives();
  }, [category]);

  async function handleAddObjective() {
    try {
      const response = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newObjective, category }),
      });

      const result = await response.json();
      if (result.success) {
        setObjectives((prev) => [...prev, result.data]);
        setNewObjective({ title: "", start_date: "", end_date: "", progress: 0, exp: 0, coins: 0 });
        setIsDialogOpen(false);
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error("Error adding objective:", error);
    }
  }

  async function handleDeleteObjective(id: string | number) {
    try {
      const response = await fetch(`/api/goals?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setObjectives((prev) => prev.filter((objective) => objective.id !== id));
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
        <div className="p-4 bg-white rounded-lg shadow-sm">{icon}</div>
        <div>
          <h2 className="text-2xl font-bold">{heading}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {objectives.map((objective) => (
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
              {["title", "start_date", "end_date", "exp", "coins"].map((field) => (
                <div key={field}>
                  <Label htmlFor={field}>{field.replace("_", " ").toUpperCase()}</Label>
                  <Input
                    id={field}
                    type={
                      field === "title" ? "text" :
                      field.includes("date") ? "date" : "number"
                    }
                    value={newObjective[field as keyof typeof newObjective]}
                    onChange={(e) => setNewObjective({ ...newObjective, [field]: e.target.value })}
                  />
                </div>
              ))}
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
