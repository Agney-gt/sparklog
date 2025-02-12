import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const cookieStore = cookies(); 
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  try {
    const { tweets } = await request.json();

    if (!Array.isArray(tweets) || tweets.length === 0) {
      return NextResponse.json({ error: "Invalid input: tweets must be a non-empty array." }, { status: 400 });
    }

    // Check if the user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized: Please log in to post a thread." }, { status: 401 });
    }

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

    // Upload images and insert tweets
    const tweetPromises = tweets.map(async (tweet: { content: string; imageFile?: File }, index: number) => {
      let image_url = null;

      if (tweet.imageFile) {
        const { data: imageData, error: imageError } = await supabase.storage
          .from("tweet-images")
          .upload(`${user.id}/${threadData.id}/${index}.jpg`, tweet.imageFile);

        if (imageError) throw imageError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("tweet-images").getPublicUrl(imageData.path);

        image_url = publicUrl;
      }

      return supabase.from("tweets").insert({
        thread_id: threadData.id,
        content: tweet.content,
        image_url,
        order_in_thread: index,
      });
    });

    await Promise.all(tweetPromises);

    return NextResponse.json({ success: true, threadId: threadData.id });
  } catch (error) {
    console.error("Error posting thread:", error);
    return NextResponse.json({ success: false, error: "Failed to post thread" }, { status: 500 });
  }
}
