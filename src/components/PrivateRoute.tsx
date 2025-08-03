import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient'; // Verifique o caminho correto para o seu cliente Supabase
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div>Carregando...</div>; // Ou qualquer indicador de loading
  }

  return session ? children : <Navigate to="/login" />;
};

export default PrivateRoute;