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
      />
    </div>
  );
}