import { NextResponse } from 'next/server'
let currentIndex = 0; // This will reset when the server restarts. For persistence, use a database or state management.
  

export async function GET(request: Request) {
    const htmlUrls = [
        'https://yt2mapapi.blob.core.windows.net/html/test.html',
        'https://yt2mapapi.blob.core.windows.net/html/test2.html',
        'https://yt2mapapi.blob.core.windows.net/html/test3.html',
        // Add more URLs as needed
      ];
    
    try {
        
        const response = await fetch(htmlUrls[currentIndex], { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`Failed to fetch content: ${response.status}`);
        }
        const htmlContent = await response.text();
        currentIndex++;
        return NextResponse.json({ htmlContent });
      } catch (error) {
        console.error('Error fetching HTML:', error);
        return NextResponse.json({ error: 'Failed to fetch content.' });
        }
    }    
        // pages/api/fetch-html.js


