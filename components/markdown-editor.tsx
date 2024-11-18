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
          placeholder: `Markdown Guide:
H1 Header ## H2 Subheader ### H3 Smaller Header Bold | Italic | Strikethrough Create a bullet list using "-" or "*". 1. Numbered list: Start lines with "1.", "2.", etc. > Use ">" for blockquotes. Inline code wraps text in single backticks. Use triple backticks for code blocks. Example: console.log('Hello, World!'); Link text creates a hyperlink. `,
        }}
      />
    </div>
  )
}

export default MarkdownEditor
