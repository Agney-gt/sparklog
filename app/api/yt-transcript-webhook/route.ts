import { YoutubeTranscript } from 'youtube-transcript';
import { NextResponse } from 'next/server'


export async function POST(request: Request) {
    try {
        const body = await request.json()
        
        // Fetch the YouTube transcript
        const transcript = await YoutubeTranscript.fetchTranscript(body.url);
        // Combine the text fields
        const combinedText = transcript.map((field: { text: string }) => field.text).join(' ').replace(/&amp;#39;/g, "'").trim();

        console.log(combinedText)
        // Send the transcript to Taskade webhook
        const webhookUrl = 'https://www.taskade.com/webhooks/flow/01JG372HPVPPNNDG2ZS8PE9MRT';
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ transcript: combinedText }),
        });
        return NextResponse.json({ 
            success: true, 
            response,
            message: 'Sent to Taskade AI Agents successfully'
          })
        }
        catch (error) {
            console.error('Error processing request:', error)
            return NextResponse.json(
              { error: 'Internal server error' }, 
              { status: 500 }
            )
          }
        }
        
        