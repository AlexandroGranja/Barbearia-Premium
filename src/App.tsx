import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// IMPORTAÇÕES QUE VOCÊ VAI ADICIONAR
import PrivateRoute from "./components/PrivateRoute"; // O novo componente
import AdminLoginPage from "./pages/AdminLoginPage"; // A página de login
import Index from "./pages/Index";
import ClientePage from "./pages/ClientePage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cliente" element={<ClientePage />} />
          
          {/* ROTA PARA A PÁGINA DE LOGIN */}
          <Route path="/login" element={<AdminLoginPage />} />

          {/* ROTA PROTEGIDA PARA O PAINEL ADMINISTRATIVO */}
          <Route path="/admin" element={<PrivateRoute><AdminPage /></PrivateRoute>} />

          {/* CATCH-ALL ROTA */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;