// src/contexts/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase/supabaseClient'; // Importe a instância única do Supabase

interface User {
  id: string;
  email: string;
  role: string;
  nome: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.role === 'Administrador';

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setLoading(false);
      if (session) {
        // Mapeie os dados do usuário do Supabase para a sua interface `User`
        const userData: User = {
          id: session.user.id,
          email: session.user.email,
          role: session.user.user_metadata.role || 'Usuário', // Exemplo: Pegando o role do metadata
          nome: session.user.user_metadata.nome || 'Usuário' // Exemplo
        };
        setUser(userData);
      } else {
        setUser(null);
      }
    });

    // Limpe a subscription quando o componente for desmontado
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        console.error('Erro no login:', error.message);
        return false;
      }
      
      // Se o login foi bem-sucedido, o `onAuthStateChange` cuidará de atualizar o estado do usuário
      return true;
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    console.log('Usuário deslogado');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}