import { YoutubeTranscript } from 'youtube-transcript';
import { NextResponse } from 'next/server'


export async function POST(request: Request) {
    try {
        
      // Get request data
        const body = await request.json()

        // Send the transcript to Taskade webhook
        const webhookUrl = 'https://www.taskade.com/webhooks/flow/01JG372HPVPPNNDG2ZS8PE9MRT';
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ transcript: body.url }),
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
              { error: `${error}` }, 
              { status: 500 }
            )
          }
        }
        
        