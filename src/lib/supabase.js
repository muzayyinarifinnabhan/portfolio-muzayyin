import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Supabase env variables tidak ditemukan. Pastikan file .env sudah dibuat.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const isSupabaseReady = !!(supabaseUrl && supabaseAnonKey);
