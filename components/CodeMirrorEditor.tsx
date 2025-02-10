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
              setPreviewHTML(convertMarkdownToHTML(newText));
            };
            reader.readAsDataURL(file);
          }
        }
      }
    }
  };

  useEffect(() => {
    setPreviewHTML(convertMarkdownToHTML(value));
  }, [value]);

  const convertMarkdownToHTML = (markdownText: string) => {
    const unsafeTags = /<(?:script|iframe|object|embed|form|style|meta|link)\b[^>]*>[\s\S]*?<\/(?:script|iframe|object|embed|form|style|meta|link)>/gi;
    const sanitizedText = markdownText.replace(unsafeTags, '');

    let html = sanitizedText
      .replace(/^(#{1,6})\s*(.+)$/gm, (match, hashes, content) => {
        const level = hashes.length;
        return `<h${level}>${content}</h${level}>`;
      })
      .replace(/^>\s*(.+)$/gm, '<blockquote>$1</blockquote>')
      .replace(/^\s*[-*]\s(.+)$/gm, '<li>$1</li>')
      .replace(/<\/li>\s*(?=<li>)/g, '') // Ensure proper list formatting
      .replace(/^---$/gm, '<hr/>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/~~(.*?)~~/g, '<del>$1</del>')
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      .replace(/`([^`\n]+)`/g, '<code>$1</code>')
      .replace(
        /!\[.*?\]\((data:image\/(?:png|jpe?g|gif|webp);base64,[A-Za-z0-9+/=]+)\)/g,
        '<img src="$1" alt="Embedded Image" />'
      )
      .replace(
        /!\[.*?\]\((https?:\/\/[^\s)]+)\)/g,
        '<img src="$1" alt="Image" />'
      )
      .replace(
        /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
      )
      .replace(/\[[ \t]?\]/g, '<input type="checkbox" class="task-checkbox" />')
      .replace(/\[[xX]\]/g, '<input type="checkbox" class="task-checkbox" checked />');

    return html.replace(/<li>/g, '<ul><li>').replace(/<\/li>(?!\s*<li>)/g, '</li></ul>');
  };

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      h1 { font-size: 2em; }
      h2 { font-size: 1.5em; }
      h3 { font-size: 1.17em; }
      code { font-family: monospace; }
      pre { font-family: monospace; padding: 10px; border: 1px solid #ccc; overflow: auto;}
      a { color: blue; text-decoration: underline; }
      del { text-decoration: line-through; }
      blockquote { border-left: 5px solid #ccc; padding-left: 10px; margin: 10px 0; }
      hr { border-top: 1px solid #ccc; margin: 10px 0; }
      ul { list-style-type: disc; padding-left: 20px; }
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

      <div className="w-1/2 border rounded-md p-2 h-96 overflow-auto">
        <div
          className="whitespace-pre-wrap text-gray-800"
          dangerouslySetInnerHTML={{ __html: previewHTML }}
        />
      </div>
    </div>
  );
};

export default CodeMirrorEditor;
