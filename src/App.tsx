import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// IMPORTAÇÕES
import PrivateRoute from "./components/PrivateRoute";
import AdminLoginPage from "./pages/AdminLoginPage";
import Index from "./pages/Index";
import ClientePage from "./pages/ClientePage";
import AdminPage from "./pages/AdminPage";

function App() {
  console.log('🚀 App iniciando...');

  return (
    <AuthProvider>
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
    </AuthProvider>
  );
};

export default App;