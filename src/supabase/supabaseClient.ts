import { createClient } from '@supabase/supabase-js'

// Certifique-se de que estas variáveis estão no seu arquivo .env
// No Railway, elas já estão configuradas
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)