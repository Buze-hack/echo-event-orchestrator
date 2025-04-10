
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Replace with your Supabase project URL and anon key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey
);
