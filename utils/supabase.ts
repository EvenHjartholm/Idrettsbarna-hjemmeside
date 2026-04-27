import { createClient } from '@supabase/supabase-js';

// Env-variabler brukes i dev. Hardkodet fallback for GitHub Pages produksjon
// (anon-nøkkel er offentlig og trygt å inkludere i klientkode)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL 
    || 'https://lvcjbqmlmbmvxtskecvy.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY 
    || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2Y2picW1sbWJtdnh0c2tlY3Z5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxOTA4MzAsImV4cCI6MjA4MDc2NjgzMH0.w2w-sblBGtYIUTQ6p6scWrm1PUaXv5tC57oNTW434eQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
