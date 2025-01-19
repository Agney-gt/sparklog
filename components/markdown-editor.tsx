'use client'
import React, { useState, useEffect, } from "react";
import MDEditor from '@uiw/react-md-editor';
interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  
}

export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const [loading, setLoading] = useState(false);
  
  

  // Image upload to server
const imageUploadHandler = async (
  image: File
): Promise<{ alt: string; url: string } | null> => {
  if (image && image.size === 0) return null;
  const formData = new FormData();
  formData.append("image", image);
  //formData.append("what else you want", "your value");
  const response = await fetch('/api/user/images', {
        method: 'POST',
        body: formData
      })
  return  (await response.json()) as { alt: string, url: string }
};

const handlePaste = async (event: React.ClipboardEvent<HTMLDivElement>) => {
  // Access the clipboard data using event.clipboardData
  const clipboardData = event.clipboardData;
  
 // only if clipboard payload is file
  if (clipboardData.files.length === 1) {
    const myfile = clipboardData.files[0] as File;
    setLoading(true);
   // you could perform some test: image size, type mime ....
    const url = await imageUploadHandler(myfile);
    event.preventDefault();
    if (url) {
     // change clipboard payload,
     // document execCommand is obsolete, you could replace with navigator.clipboard API but some browser
    // accept write() method only if the connexion is secure (https)...
      document.execCommand(
        "insertText",
        false,
        `![${url.alt}](${url.url})\n`
      );
    } else {
      document.execCommand(
        "insertText",
        false,
        "ERROR Image has not been stored on server"
      );
    }
    setLoading(false);
  }
};
useEffect(() => {
  ; // Fetch content when the component mounts
}, []);

  return (
    <div className="container">
      <MDEditor
        value={value}
        onPaste={handlePaste}
        enableScroll
        height={400}
        textareaProps={{
          placeholder: "Coding, Markdown, and Journaling have one thing in common—they’re like assembling a puzzle. Each piece builds on the last to reveal a bigger picture. \n\nCopy-paste Quests into the chatbot, create a template you like and title each journal entry with the name of the quest -  (e.g., # A Noble Crown or # Shining Brightly).",
          'aria-label': 'Markdown editor',
        }}
        

      />
      {loading && <div className="spinner">Loading...</div>}
    </div>
  );
}