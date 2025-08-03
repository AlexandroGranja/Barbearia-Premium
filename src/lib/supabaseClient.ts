// src/lib/supabaseClient.ts - CORREÇÃO PARA MÚLTIPLAS INSTÂNCIAS
import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Verificar se as variáveis existem
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Singleton pattern para evitar múltiplas instâncias
let supabaseInstance: SupabaseClient | null = null

const getSupabaseClient = (): SupabaseClient => {
  if (!supabaseInstance) {
    console.log('Criando nova instância do Supabase...')
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: 'pkce' // Usar PKCE flow
      },
      global: {
        headers: {
          'x-client-info': 'barbearia-premium'
        }
      }
    })
  } else {
    console.log('Reutilizando instância existente do Supabase')
  }
  return supabaseInstance
}

// Export da instância única
export const supabase = getSupabaseClient()

// Função para debug
export const debugSupabase = () => {
  console.log('Supabase URL:', supabaseUrl)
  console.log('Supabase Key exists:', !!supabaseAnonKey)
  console.log('Instance exists:', !!supabaseInstance)
}