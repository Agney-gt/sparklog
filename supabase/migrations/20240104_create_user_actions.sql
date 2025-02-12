-- Create threads table
CREATE TABLE threads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create tweets table
CREATE TABLE tweets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  thread_id UUID REFERENCES threads(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  image_url TEXT,
  order_in_thread INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create an RLS policy to allow authenticated users to insert their own threads
CREATE POLICY "Users can insert their own threads" ON threads
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create an RLS policy to allow authenticated users to insert tweets into their own threads
CREATE POLICY "Users can insert tweets into their own threads" ON tweets
  FOR INSERT TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM threads
    WHERE threads.id = tweets.thread_id
    AND threads.user_id = auth.uid()
  ));

-- Enable RLS on both tables
ALTER TABLE threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE tweets ENABLE ROW LEVEL SECURITY;