"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddHabitFormProps {
  onAdd: (type: string) => void
}

export function AddHabitForm({ onAdd }: AddHabitFormProps) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string>("")

  const handleAdd = () => {
    if (selected) {
      onAdd(selected)
      setOpen(false)
      setSelected("")
    }
  }

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
          <DialogTitle>Add new habit to battle</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Select value={selected} onValueChange={setSelected}>
            <SelectTrigger>
              <SelectValue placeholder="Select habit type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="scrolling">Scrolling</SelectItem>
              <SelectItem value="drink">Drink</SelectItem>
              <SelectItem value="smoking">Smoking</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleAdd} disabled={!selected}>
            Add Habit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

