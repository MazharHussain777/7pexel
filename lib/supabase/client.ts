// lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if credentials exist
const hasCredentials = !!(supabaseUrl && supabaseAnonKey);

export const supabase = hasCredentials 
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

export const isSupabaseAvailable = hasCredentials;