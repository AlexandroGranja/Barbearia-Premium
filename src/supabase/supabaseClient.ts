import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let supabase: SupabaseClient;

// Verificamos se já existe uma instância para evitar criar uma nova.
// A verificação `typeof window !== 'undefined'` garante que isso rode apenas no lado do cliente.
if (typeof window !== 'undefined' && !supabase) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export { supabase };