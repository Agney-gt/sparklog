import React, { useEffect, useRef, useState } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { markdown } from '@codemirror/lang-markdown';
import { EditorState } from '@codemirror/state';

interface CodeMirrorEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const CodeMirrorEditor: React.FC<CodeMirrorEditorProps> = ({ value, onChange }) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<EditorView | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [previewHTML, setPreviewHTML] = useState<string>('');

  useEffect(() => {
    if (!editorRef.current || viewRef.current) return;

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
              setPreviewHTML(convertMarkdownToHTML(newValue));
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
  }, []);

  const extractImages = (text: string) => {
    const imageRegex = /!\[([^\]]+)\]\((data:image\/[a-zA-Z0-9]+;base64,[^\)]+)\)/g;
    const extractedImages: string[] = [];
    let match;
    while ((match = imageRegex.exec(text)) !== null) {
      extractedImages.push(match[2]);
    }
    setImages(extractedImages);
  };

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

              const currentText = viewRef.current?.state.doc.toString() || '';
              const newText = currentText + markdownImage;

              viewRef.current?.dispatch({
                changes: { from: currentText.length, insert: markdownImage },
              });

              onChange(newText);
              extractImages(newText);
              setPreviewHTML(convertMarkdownToHTML(newText));
            };
            reader.readAsDataURL(file);
          }
        }
      }
    }
  };

  useEffect(() => {
    extractImages(value);
    setPreviewHTML(convertMarkdownToHTML(value));
  }, [value]);

  const convertMarkdownToHTML = (markdownText: string) => {
    const html = markdownText
      // Headers
      .replace(/^###### (.*)$/gm, '<h6>$1</h6>')
      .replace(/^##### (.*)$/gm, '<h5>$1</h5>')
      .replace(/^#### (.*)$/gm, '<h4>$1</h4>')
      .replace(/^### (.*)$/gm, '<h3>$1</h3>')
      .replace(/^## (.*)$/gm, '<h2>$1</h2>')
      .replace(/^# (.*)$/gm, '<h1>$1</h1>')

      // Bold & Italics
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/~~(.*?)~~/g, '<del>$1</del>')

      // Code Blocks (Multiline)
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')

      // Blockquotes
      .replace(/^> (.*)$/gm, '<blockquote>$1</blockquote>')

      // Images
      .replace(/!\[([^\]]+)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')

      // Links
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')

      // Unordered Lists
      .replace(/^\s*[-*] (.*)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)(?!\n<li>)/g, '<ul>$1</ul>')
      
      // Horizontal Rules
      .replace(/^---$/gm, '<hr/>')

      // Checkboxes (Interactive)
      .replace(/\[ \]/g, '<input type="checkbox" class="task-checkbox" />')
      .replace(/\[x\]/gi, '<input type="checkbox" class="task-checkbox" checked />');

    return '<p>' + html.replace(/\n{2,}/g, '</p><p>') + '</p>';
  };

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
h1 { font-size: 2em; }
h2 { font-size: 1.5em; }
h3 { font-size: 1.17em; }
h4 { font-size: 1em; }
h5 { font-size: 0.83em; }
h6 { font-size: 0.67em; }
code { font-family: monospace; }
pre { font-family: monospace; padding: 10px; border: 1px solid #ccc; overflow: auto;}
a { color: blue; text-decoration: underline; }
del { text-decoration: line-through; }
blockquote { border-left: 5px solid #ccc; padding-left: 10px; margin: 10px 0; }
hr { border-top: 1px solid #ccc; margin: 10px 0; }
ul { list-style-type: disc; padding-left: 20px; }
ol { list-style-type: decimal; padding-left: 20px; }
li { margin-bottom: 5px; }
img { max-width: 100%; height: auto; }
p { margin-bottom: 1em; }
.task-checkbox { margin-right: 8px; cursor: pointer; }
`;

    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div className="flex flex-row space-x-4">
      <div
        ref={editorRef}
        className="border rounded-md p-2 w-1/2 h-96 overflow-auto"
        style={{ whiteSpace: 'pre-wrap' }}
        onPaste={handlePaste}
      />

      <div className="w-1/2 border rounded-md p-2 h-96 overflow-auto flex flex-col space-y-4">
        <div
          className="whitespace-pre-wrap text-gray-800"
          dangerouslySetInnerHTML={{ __html: previewHTML }}
        />

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
