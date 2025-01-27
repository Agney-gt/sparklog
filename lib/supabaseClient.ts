import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://skpvagolynsnuryeelar.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || ''; // Ensure this is set in your .env file
if (!supabaseKey) {
  throw new Error('Supabase key is not defined. Please set SUPABASE_KEY in your .env file.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
