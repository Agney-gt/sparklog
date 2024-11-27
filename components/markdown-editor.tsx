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
          placeholder: "Reflect and create an amazing markdown journal entry with the Chatbot! 🚀 Try a Quest by simply copying and pasting it into the Chatbot. Begin your journal entry with the quest title as a header, such as # A Noble Crown or # Shining Brightly. Quests will be marked complete after three days of journaling.",
          'aria-label': 'Markdown editor',
        }}

      />
    </div>
  );
}