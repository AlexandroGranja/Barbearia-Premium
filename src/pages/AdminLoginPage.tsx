import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient'; // Verifique o caminho correto para o seu cliente Supabase
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Usa a função de login do Supabase
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        throw error;
      }

      // Se não houver erro, o login foi bem-sucedido
      navigate('/admin'); // Redireciona para o painel administrativo
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* ... (Todo o seu HTML e CSS in-line do arquivo original) */}
      <div className="logo">
        <h1>✂️ Barbearia Premium</h1>
        <p>Área Administrativa</p>
      </div>

      {error && <div className="error-message" style={{ display: 'block' }}>{error}</div>}

      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-login" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <div className="back-link">
        <a href="/">← Voltar para o site</a>
      </div>
    </div>
  );
};

export default AdminLoginPage;