import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Function to split text into 160-character tweets
function splitTweet(text: string, maxLength = 160): { content: string }[] {
  const words = text.split(" ");
  const tweets: { content: string }[] = [];
  let currentTweet = "";

  for (const word of words) {
    if ((currentTweet + word).length > maxLength) {
      tweets.push({ content: currentTweet.trim() });
      currentTweet = word + " ";
    } else {
      currentTweet += word + " ";
    }
  }

  if (currentTweet) tweets.push({ content: currentTweet.trim() });
  return tweets;
}

export async function POST(request: Request) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  try {
    const { text, imageFile } = await request.json();

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json(
        { error: "Invalid input: text must be a non-empty string." },
        { status: 400 }
      );
    }

    // Check if the user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized: Please log in to post a thread." },
        { status: 401 }
      );
    }

    // Split the text into multiple tweets (160 characters each)
    const tweets = splitTweet(text);

    // Create a new thread
    const { data: threadData, error: threadError } = await supabase
      .from("threads")
      .insert({ user_id: user.id })
      .select()
      .single();

    if (threadError) {
      console.error("Database error:", threadError);
      throw new Error("Failed to create thread in the database.");
    }

    // Upload image (if provided) only for the first tweet
    let image_url: string | null = null;
    if (imageFile) {
      const { data: imageData, error: imageError } = await supabase.storage
        .from("tweet-images")
        .upload(`${user.id}/${threadData.id}/0.jpg`, imageFile);

      if (imageError) throw imageError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("tweet-images").getPublicUrl(imageData.path);

      image_url = publicUrl;
    }

    // Insert tweets into the database
    const tweetPromises = tweets.map((tweet, index) =>
      supabase.from("tweets").insert({
        thread_id: threadData.id,
        content: tweet.content,
        image_url: index === 0 ? image_url : null, // Image only for first tweet
        order_in_thread: index,
      })
    );

    await Promise.all(tweetPromises);

    return NextResponse.json({ success: true, threadId: threadData.id });
  } catch (error) {
    console.error("Error posting thread:", error);
    return NextResponse.json(
      { success: false, error: "Failed to post thread" },
      { status: 500 }
    );
  }
}
