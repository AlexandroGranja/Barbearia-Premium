import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";

// IMPORTAÇÕES
import PrivateRoute from "./components/PrivateRoute";
import AdminLoginPage from "./pages/AdminLogin";
import Index from "./pages/Index";
import ClientePage from "./pages/ClientePage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";

function DebugPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">🔧 Debug Mode</h1>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Variáveis de Ambiente:</h3>
            <p className="text-sm text-gray-600">
              VITE_SUPABASE_URL: {import.meta.env.VITE_SUPABASE_URL ? '✅ Configurada' : '❌ Não configurada'}
            </p>
            <p className="text-sm text-gray-600">
              VITE_SUPABASE_ANON_KEY: {import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ Configurada' : '❌ Não configurada'}
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold">Status da Aplicação:</h3>
            <p className="text-sm text-green-600">✅ React está funcionando</p>
            <p className="text-sm text-green-600">✅ Tailwind CSS está funcionando</p>
            <p className="text-sm text-green-600">✅ Componentes estão carregando</p>
          </div>
          
          <div className="mt-6 space-y-2">
            <a 
              href="/login" 
              className="block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-center"
            >
              🔐 Testar Login
            </a>
            <a 
              href="/admin" 
              className="block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-center"
            >
              🔒 Testar Admin (Protegido)
            </a>
            <a 
              href="/cliente" 
              className="block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-center"
            >
              👤 Página Cliente
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const App = () => {
  console.log('🚀 App iniciando...');

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/cliente" element={<ClientePage />} />
        <Route path="/debug" element={<DebugPage />} />
        <Route path="/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<PrivateRoute><AdminPage /></PrivateRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  );
};

export default App;
