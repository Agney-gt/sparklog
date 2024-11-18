'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

// Dynamically import MDEditor to avoid SSR issues
const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange }) => {
  // Create a data-color-mode attribute handler for dark mode
  React.useEffect(() => {
    document.documentElement.setAttribute('data-color-mode', 'light');
  }, []);

  return (
    <div className="w-full">
      <MDEditor
        value={value}
        onChange={(val) => onChange(val || '')}
        preview="edit"
        height={400}
        visibleDragbar={false}
        hideToolbar={false}
        enableScroll={true}
        textareaProps={{
          placeholder: `Markdown allows you to easily format text using simple symbols. For example, using # for headings or * for bullet points lets you create well-structured, readable entries without the need for a complex interface or tool. This means less time fiddling with menus and more time reflecting on your thoughts.`,
        }}
      />
    </div>
  )
}

export default MarkdownEditor
