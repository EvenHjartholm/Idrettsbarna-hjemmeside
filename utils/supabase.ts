import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Mangler VITE_SUPABASE_URL eller VITE_SUPABASE_ANON_KEY miljøvariabler.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
