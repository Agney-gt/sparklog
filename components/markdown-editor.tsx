'use client'

import { useEffect, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { Card } from "@/components/ui/card"
import "@uiw/react-md-editor/markdown-editor.css"
import "@uiw/react-markdown-preview/markdown.css"

// Dynamically import MDEditor with loading fallback
const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { 
    ssr: false,
    loading: () => (
      <Card className="w-full h-[400px] animate-pulse bg-muted" />
    )
  }
)

export default function Component({ 
  value = '', 
  onChange = () => {} 
}: { 
  value?: string
  onChange?: (value: string) => void 
}) {
  // Debounced value for performance
  const [localValue, setLocalValue] = useState(value)

  // Debounced onChange handler
  const debouncedOnChange = useCallback((val: string | undefined) => {
    const timeoutId = setTimeout(() => {
      onChange(val || '')
    }, 100)
    return () => clearTimeout(timeoutId)
  }, [onChange])

  // Handle value changes with debouncing
  const handleChange = useCallback((val: string | undefined) => {
    setLocalValue(val || '')
    debouncedOnChange(val)
  }, [debouncedOnChange])

  // Set color mode for the editor
  useEffect(() => {
    document.documentElement.setAttribute('data-color-mode', 'light')
    
    // Cleanup on unmount
    return () => {
      document.documentElement.removeAttribute('data-color-mode')
    }
  }, [])

  return (
    <div className="w-full">
      <MDEditor
        value={localValue}
        onChange={handleChange}
        preview="edit"
        height={400}
        visibleDragbar={false}
        hideToolbar={false}
        enableScroll
        textareaProps={{
          placeholder: "Reflect and create an amazing markdown journal entry with the Chatbot! 🚀 Try a Quest by simply copying and pasting it into the Chatbot. Begin your journal entry with the quest title as a header, such as # A Noble Crown or # Shining Brightly. Complete your quest after three days of journaling.",
          'aria-label': 'Markdown editor',
        }}
        previewOptions={{
          className: 'prose prose-sm max-w-none dark:prose-invert',
        }}
      />
    </div>
  )
}