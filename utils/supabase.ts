import { createClient } from '@supabase/supabase-js';

// Env-variabler brukes i dev. Hardkodet fallback for GitHub Pages produksjon
// (anon-nøkkel er offentlig og trygt å inkludere i klientkode)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL 
    || 'https://lvcjbqmlmbmvxtskecvy.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY 
    || 'sb_publishable_A5uMq5V9krwJ8qObE_KLng_paOa2RHo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
