// src/contexts/AuthContext.tsx - CORREÇÃO PARA MÚLTIPLAS INSTÂNCIAS
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, AuthError, Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabaseClient'

interface AuthContextType {
  user: User | null
  session: Session | null
  signIn: (email: string, password: string) => Promise<{ error?: AuthError }>
  signOut: () => Promise<void>
  loading: boolean
  initialized: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    console.log('🚀 AuthProvider inicializando...')
    
    // Função para lidar com mudanças de auth
    const handleAuthChange = async (event: string, session: Session | null) => {
      console.log('🔄 Auth event:', event, session?.user?.email || 'no user')
      
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
      
      if (event === 'SIGNED_IN') {
        console.log('✅ Usuário logado:', session?.user?.email)
      } else if (event === 'SIGNED_OUT') {
        console.log('👋 Usuário deslogado')
      }
    }

    // Verificar sessão inicial
    const initializeAuth = async () => {
      try {
        console.log('🔍 Verificando sessão inicial...')
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('❌ Erro ao obter sessão:', error)
        } else if (session) {
          console.log('✅ Sessão encontrada:', session.user.email)
          setSession(session)
          setUser(session.user)
        } else {
          console.log('ℹ️ Nenhuma sessão ativa')
        }
      } catch (error) {
        console.error('❌ Erro na inicialização:', error)
      } finally {
        setLoading(false)
        setInitialized(true)
        console.log('✅ AuthProvider inicializado')
      }
    }

    // Listener para mudanças de auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthChange)

    // Inicializar
    initializeAuth()

    // Cleanup
    return () => {
      console.log('🧹 Limpando subscription do auth')
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    console.log('🔐 Tentando login para:', email)
    setLoading(true)
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        console.error('❌ Erro no login:', error.message)
        return { error }
      }

      console.log('✅ Login realizado com sucesso')
      return { error: undefined }
    } catch (error) {
      console.error('❌ Erro inesperado no login:', error)
      return { error: error as AuthError }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    console.log('👋 Realizando logout...')
    setLoading(true)
    
    try {
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('❌ Erro no logout:', error)
        throw error
      }
      
      console.log('✅ Logout realizado com sucesso')
    } catch (error) {
      console.error('❌ Erro no logout:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Debug info
  useEffect(() => {
    if (initialized) {
      console.log('📊 Estado atual do Auth:', {
        user: user?.email || 'null',
        hasSession: !!session,
        loading,
        initialized
      })
    }
  }, [user, session, loading, initialized])

  const value: AuthContextType = {
    user,
    session,
    signIn,
    signOut,
    loading,
    initialized
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  
  return context
}