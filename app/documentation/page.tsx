"use client"
import { useEffect, useState } from "react";
import {EditorView, basicSetup} from "codemirror"
import {html} from "@codemirror/lang-html"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export default function Home() {
    const [htmlContent, setHtmlContent] = useState("12");
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");
    
    const fetchHtmlContent = async () => {
      setLoading(true);
      try {
          const response = await fetch('https://yt2mapapi.blob.core.windows.net/html/test.html');
          console.log(response) 
          const text = await response.text();
          console.log(text)
          setHtmlContent(text);
      } catch (error) {
          console.error('Error fetching HTML content:', error);
      } finally {
          setLoading(false);
      }
  };
  useEffect(() => {
    fetchHtmlContent(); // Fetch content when the component mounts
  }, []);
   // Log htmlContent when it changes
   useEffect(() => {
    const view = new EditorView({
      parent: document.body,
      doc: htmlContent,
      extensions: [basicSetup, html(),EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          // Update the HTML content when the editor content changes
          setHtmlContent(update.state.doc.toString());
        }
      }),],
      
      
    });
    
    // Cleanup the editor on unmount
    return () => {
      view.destroy();
      
    }; // This will log the updated htmlContent
  }, [htmlContent]); // Runs every time htmlContent changes
    const handleSubmit = async () => {
      setLoading(true);
      <Loader2 className="animate-spin"/>
      console.log("submit");
        
      try {
        
        const response = await fetch('/api/yt-transcript-webhook', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url: inputValue,
            
          }),
        });
        
        if (response.ok) {
          console.log('Journal entry saved successfully');
          // Wait for 1 minute (60,000 ms) before calling fetchHtmlContent
          setLoading(true);
          console.log('Fetching HTML content after 1 minute...');
          setTimeout(() => {
            
            fetchHtmlContent();
            setLoading(false);
          }, 60000); // 1 minute in milliseconds
          
        } else {
          const error = await response.json();
          console.error('Failed to save journal entry:', error.message);
        }
      } catch (error) {
        console.error('Error saving journal entry:', error);
      }
    };
    
    
    return (
      <div>
        <Input placeholder="Enter Youtube Link" value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}/>
        <Button variant="outline" onClick={handleSubmit} disabled={loading}>
        {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Submit"}
        </Button>
        {/* Display the message only when loading */}
        {loading && (
          <p className="text-sm text-gray-500">
            Please take a deep breath and wait for 1-2 minutes.
          </p>
        )}
        <h2>Preview</h2>
        <iframe
          title="HTML Preview"
          style={{ width: "100%", height: "800px", border: "1px solid #ccc" }}
          srcDoc={htmlContent}
        ></iframe>
      </div>
    );
  
}
