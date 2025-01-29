import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'; // Import cookies from next/headers

export async function GET() {
  try {
    const cookieStore = await cookies(); // Await the cookies function
    const authToken = cookieStore.get('sb-skpvagolynsnuryeelar-auth-token'); // Get the auth token

    if (!authToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Handle the callback logic here, such as exchanging code for session if needed
    return NextResponse.json({ message: 'Auth callback successful' });
  } catch (error) {
    console.error('Error handling auth callback:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

