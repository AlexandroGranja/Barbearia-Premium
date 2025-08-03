// src/App.tsx - Versão de debug para identificar o problema
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importações existentes (comentadas temporariamente para debug)
// import { AuthProvider } from "./contexts/AuthContext";
// import PrivateRoute from "./components/PrivateRoute";
// import AdminLoginPage from "./pages/AdminLogin";

import Index from "./pages/Index";
import ClientePage from "./pages/ClientePage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Componente de Debug para verificar se o problema é nas variáveis
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
          
          <div className="mt-6">
            <a 
              href="/cliente" 
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
            >
              Testar Página Cliente
            </a>
            <a 
              href="/" 
              className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Página Inicial
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cliente" element={<ClientePage />} />
          <Route path="/debug" element={<DebugPage />} />
          
          {/* Rota temporária sem autenticação para testar */}
          <Route path="/admin" element={<AdminPage />} />
          
          {/* CATCH-ALL ROTA */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;