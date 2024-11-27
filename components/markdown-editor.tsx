'use client'

import React from "react";
import MDEditor from '@uiw/react-md-editor';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  return (
    <div className="container">
      <MDEditor
        value={value}
        onChange={(val) => onChange(val || '')}
        enableScroll
        height={400}
        textareaProps={{
          placeholder: "Coding, Markdown, and Journaling have one thing in common—they’re like assembling a puzzle. Each piece builds on the last to reveal a bigger picture. \n\nCopy-paste Quests into the chatbot, create a template you like and title each journal entry with the name of the quest -  (e.g., # A Noble Crown or # Shining Brightly).",
          'aria-label': 'Markdown editor',
        }}

      />
    </div>
  );
}