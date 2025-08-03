// src/pages/AdminLogin.tsx
import React, { useState } from \'react\'
import { Navigate } from \'react-router-dom\'
import { useAuth } from \'../contexts/AuthContext\'

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState(\'admin@barbearia.com\')
  const [password, setPassword] = useState(\'123456789\')
  const [error, setError] = useState(\'\')
  const [loading, setLoading] = useState(false)
  const { user, signIn } = useAuth()

  // Se já estiver logado, redirecionar para admin
  if (user) {
    console.log(\'✅ Usuário já logado, redirecionando...\')
    return <Navigate to=\'/admin\' replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(\'\')

    console.log(\'🔐 Tentando fazer login...\')
    // Alterado para a nova rota de API
    const response = await fetch(\'/api/login\', {
      method: \'POST\',
      headers: {
        \'Content-Type\': \'application/json\',
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (result.success) {
      console.log(\'✅ Login bem-sucedido!\')
      // O signIn do AuthContext pode ser atualizado para usar o token retornado, se necessário
      // Por enquanto, vamos apenas redirecionar se o backend indicar sucesso
      window.location.href = \'/admin\'; // Redireciona para a área administrativa
    } else {
      setError(`Erro: ${result.message}`)
      console.error(\'❌ Erro no login:\', result.message)
    }
    
    setLoading(false)
  }

  return (
    <div className=\'min-h-screen flex items-center justify-center bg-gray-100 p-4\'>
      <div className=\'bg-white rounded-lg shadow-lg p-8 max-w-md w-full\'>
        <div className=\'text-center mb-6\'>
          <h1 className=\'text-2xl font-bold text-gray-900\'>
            Login Administrativo
          </h1>
          <p className=\'text-gray-600 mt-2\'>Barbearia Premium</p>
        </div>
        
        <form onSubmit={handleSubmit} className=\'space-y-4\'>
          <div>
            <label className=\'block text-sm font-medium text-gray-700 mb-1\'>
              Email
            </label>
            <input
              type=\'email\'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=\'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500\'
              required
            />
          </div>
          
          <div>
            <label className=\'block text-sm font-medium text-gray-700 mb-1\'>
              Senha
            </label>
            <input
              type=\'password\'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=\'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500\'
              required
            />
          </div>

          {error && (
            <div className=\'bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm\'>
              {error}
            </div>
          )}

          <button
            type=\'submit\'
            disabled={loading}
            className=\'w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed\'
          >
            {loading ? \'Entrando...\' : \'Entrar\'}
          </button>
        </form>

        <div className=\'mt-6 p-4 bg-gray-50 rounded-md text-sm\'>
          <h3 className=\'font-medium mb-2\'>Credenciais padrão:</h3>
          <p>Email: admin@barbearia.com</p>
          <p>Senha: 123456789</p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
