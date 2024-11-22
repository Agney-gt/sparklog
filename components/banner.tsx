'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function Banner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-primary text-primary-foreground w-full p-4">
      <div className="container mx-auto flex items-center justify-between">
        <p className="text-sm sm:text-base font-medium">
        For the best user experience, try the web app on your computer screen.
        </p>
        <Button
          variant="ghost"
          size="icon"
          className="text-primary-foreground hover:bg-primary-foreground/20"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
    </div>
  )
}

