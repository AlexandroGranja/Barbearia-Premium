@@ .. @@
+import React from 'react';
+import { useAuth } from '../contexts/AuthContext';
+import { Navigate } from 'react-router-dom';
+
+interface PrivateRouteProps {
+  children: React.ReactNode;
+}
+
+export default function PrivateRoute({ children }: PrivateRouteProps) {
+  const { user, loading } = useAuth();
+
+  if (loading) {
+    return (
+      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
+        <div className="bg-white p-8 rounded-lg shadow-md">
+          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500 mx-auto"></div>
+          <p className="text-center mt-4 text-gray-600">Verificando autenticação...</p>
+        </div>
+      </div>
+    );
+  }
+
+  if (!user) {
+    return <Navigate to="/login" replace />;
+  }
+
+  if (user.role !== 'Administrador') {
+    return (
+      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
+        <div className="bg-white p-8 rounded-lg shadow-md text-center">
+          <h2 className="text-xl font-bold text-red-600 mb-2">Acesso Negado</h2>
+          <p className="text-gray-600">Você não tem permissões de administrador.</p>
+        </div>
+      </div>
+    );
+  }
+
+  return <>{children}</>;
+}