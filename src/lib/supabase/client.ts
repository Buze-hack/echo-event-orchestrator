
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Get Supabase URL and anon key from environment variables
// Note: We're supporting both naming conventions (with or without APP in the middle)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_APP_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_APP_SUPABASE_ANON_KEY;

// Check if environment variables are properly set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase credentials are missing! Make sure to set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables.');
}

// Provide fallback values for development to prevent app from crashing
const finalSupabaseUrl = supabaseUrl || 'https://placeholder-supabase-url.supabase.co';
const finalSupabaseAnonKey = supabaseAnonKey || 'placeholder-anon-key';

export const supabase = createClient<Database>(
  finalSupabaseUrl,
  finalSupabaseAnonKey
);
