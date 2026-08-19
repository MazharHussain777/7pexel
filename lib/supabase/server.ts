// lib/supabase/server.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Check if credentials exist
const hasCredentials = !!(supabaseUrl && supabaseServiceKey);

export const supabaseServer = hasCredentials 
  ? createClient(supabaseUrl!, supabaseServiceKey!)
  : null;

export const isSupabaseAvailable = hasCredentials;