import React, { useEffect, useRef, useState } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { markdown } from '@codemirror/lang-markdown';
import { EditorState } from '@codemirror/state';
import ReactMarkdown from 'react-markdown';

interface CodeMirrorEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const CodeMirrorEditor: React.FC<CodeMirrorEditorProps> = ({ value, onChange }) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<EditorView | null>(null);
  const [images, setImages] = useState<string[]>([]); // Store extracted images

  useEffect(() => {
    if (!editorRef.current || viewRef.current) return; // Prevent re-initialization

    viewRef.current = new EditorView({
      state: EditorState.create({
        doc: value,
        extensions: [
          basicSetup,
          markdown(),
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              const newValue = update.state.doc.toString();
              onChange(newValue);
              extractImages(newValue);
            }
          }),
        ],
      }),
      parent: editorRef.current,
    });

    return () => {
      viewRef.current?.destroy();
      viewRef.current = null;
    };
  }, []); // Runs only on mount

  // Extract base64 images from Markdown text and prevent duplicate rendering
  const extractImages = (text: string) => {
    const imageRegex = /!\[.*?\]\((data:image\/.*?;base64,.*?)\)/g;
    const extractedImages: string[] = [];
    let match;
    while ((match = imageRegex.exec(text)) !== null) {
      extractedImages.push(match[1]); // Extract Base64 URL
    }
    setImages(extractedImages);
  };

  // Remove image Markdown before rendering text preview
  const cleanMarkdownText = value.replace(/!\[.*?\]\((data:image\/.*?;base64,.*?)\)/g, '');

  // Handle image paste
  const handlePaste = (event: React.ClipboardEvent) => {
    const items = event.clipboardData?.items;
    if (items) {
      for (const item of items) {
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const base64Image = e.target?.result as string;
              const markdownImage = `\n\n![Pasted Image](${base64Image})\n\n`;

              // Ensure CodeMirror editor updates with the new image
              const currentText = viewRef.current?.state.doc.toString() || '';
              const newText = currentText + markdownImage;

              viewRef.current?.dispatch({
                changes: { from: currentText.length, insert: markdownImage },
              });

              onChange(newText); // Update parent state
              extractImages(newText); // Update image preview
            };
            reader.readAsDataURL(file);
          }
        }
      }
    }
  };

  useEffect(() => {
    extractImages(value); // Extract images when data is loaded from DB
  }, [value]);

  return (
    <div className="flex flex-row space-x-4">
      {/* Editor Section */}
      <div
        ref={editorRef}
        className="border rounded-md p-2 w-1/2 h-96 overflow-auto"
        style={{ whiteSpace: 'pre-wrap' }}
        onPaste={handlePaste} // Attach paste event
      />

      {/* Preview Section (Markdown + Images) */}
      <div className="w-1/2 border rounded-md p-2 h-96 overflow-auto flex flex-col space-y-4">
        {/* Markdown Preview (without image links) */}
        <div className="whitespace-pre-wrap text-gray-800">
          <ReactMarkdown>{cleanMarkdownText}</ReactMarkdown>
        </div>

        {/* Image Preview (Displays only extracted images) */}
        <div className="flex flex-col space-y-2">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Embedded ${index}`}
              className="w-full h-auto border rounded-md object-contain"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodeMirrorEditor;
