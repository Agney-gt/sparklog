"use client";
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface ApiResponse {
  data: {
    id: string;
    name: string;
  };
  error?: string;
}

interface AddHabitFormProps {
  onHabitAdded: () => void; 
  category :"good" | "bad"; 
}

export function AddHabitForm({ onHabitAdded,category }: AddHabitFormProps) {
  const [open, setOpen] = useState(false);
  const [habitName, setHabitName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAdd = async () => {
    setErrorMessage("");

    if (!habitName.trim()) {
      setErrorMessage("Habit name cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/habits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: habitName.trim(), category:category  }),
      });

      const data: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add habit");
      }
      setHabitName("");
      setOpen(false);
      onHabitAdded(); // ✅ Refresh the habit list after adding
    } catch (error) {
      console.error("Error adding habit:", error);
      setErrorMessage((error as Error).message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start text-muted-foreground">
          <Plus className="mr-2 h-4 w-4" />
          New
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new habit to battle</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            type="text"
            placeholder="Enter habit (e.g., Procrastination, Junk Food)"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            disabled={loading}
          />
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
          <Button onClick={handleAdd} disabled={!habitName.trim() || loading}>
            {loading ? "Adding..." : "Add Habit"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
