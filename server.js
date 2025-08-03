const express = require(\'express\');
const path = require(\'path\');
const { createClient } = require(\'@supabase/supabase-js\');
const bcrypt = require(\'bcryptjs\');
const jwt = require(\'jsonwebtoken\');
const session = require(\'express-session\');
const cookieParser = require(\'cookie-parser\');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Middleware para sessões
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || \'sua-chave-secreta-aqui\',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 horas
}));

// Middleware para verificar autenticação
function requireAuth(req, res, next) {
  const token = req.cookies[\'admin-token\'];
  
  if (!token) {
    return res.redirect(\'/login\'); // Redireciona para a rota de login do React
  }

  try {
    const decoded = jwt.verify(token, process.env.SESSION_SECRET || \'sua-chave-secreta-aqui\');
    req.admin = decoded;
    next();
  } catch (error) {
    res.clearCookie(\'admin-token\');
    res.redirect(\'/login\'); // Redireciona para a rota de login do React
  }
}

// Servir arquivos estáticos da pasta \'dist\' (build do Vite)
app.use(express.static(path.join(__dirname, \'dist\')));

// Rota para fazer login (API)
app.post(\'/api/login\', async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data: admin, error } = await supabase
      .from(\'admins\')
      .select(\'*\')
      .eq(\'email\', email)
      .single();

    if (error || !admin) {
      return res.status(401).json({ success: false, message: \'Credenciais inválidas\' });
    }

    const isValidPassword = await bcrypt.compare(password, admin.password_hash);
    
    if (!isValidPassword) {
      return res.status(401).json({ success: false, message: \'Credenciais inválidas\' });
    }

    const token = jwt.sign(
      { adminId: admin.id, email: admin.email },
      process.env.SESSION_SECRET || \'sua-chave-secreta-aqui\',
      { expiresIn: \'24h\' }
    );

    res.cookie(\'admin-token\', token, { 
      httpOnly: true, 
      maxAge: 24 * 60 * 60 * 1000 
    } );
    
    res.json({ success: true, message: \'Login realizado com sucesso\' });
  } catch (error) {
    console.error(\'Erro no login:\', error);
    res.status(500).json({ success: false, message: \'Erro interno do servidor\' });
  }
});

// Rota para logout (API)
app.post(\'/api/logout\', (req, res) => {
  res.clearCookie(\'admin-token\');
  res.json({ success: true, message: \'Logout realizado com sucesso\' });
});

// Rota para buscar dados do admin (API)
app.get(\'/api/admin/data\', requireAuth, async (req, res) => {
  try {
    // Aqui você pode buscar estatísticas, agendamentos, etc.
    res.json({ 
      success: true, 
      admin: { email: req.admin.email },
      stats: {
        totalClients: 0, // implementar conforme necessário
        todayRevenue: 0,
        todayServices: 0,
        avgTime: 0
      }
    });
  } catch (error) {
    console.error(\'Erro ao buscar dados:\', error);
    res.status(500).json({ success: false, message: \'Erro ao buscar dados\' });
  }
});

// Para todas as outras rotas, servir o index.html do React
app.get(\'*\', (req, res) => {
  res.sendFile(path.join(__dirname, \'dist\', \'index.html\'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📱 Site: http://localhost:${PORT}` );
  console.log(`👤 Admin: http://localhost:${PORT}/login` );
});
