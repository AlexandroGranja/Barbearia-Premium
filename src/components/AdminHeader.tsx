import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User, Menu, X, Settings, Calendar, Users } from 'lucide-react';

export function AdminHeader() {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo e título */}
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg p-2 mr-3">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Barbearia Premium</h1>
              <p className="text-sm text-gray-600">Painel Administrativo</p>
            </div>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors">
              <Calendar className="w-4 h-4 mr-2" />
              Agendamentos
            </button>
            <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors">
              <Users className="w-4 h-4 mr-2" />
              Clientes
            </button>
            <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors">
              <Settings className="w-4 h-4 mr-2" />
              Configurações
            </button>
          </nav>

          {/* User menu */}
          <div className="flex items-center">
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
              >
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-full p-2 mr-2">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">{user?.nome}</p>
                  <p className="text-xs text-gray-500">{user?.role}</p>
                </div>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user?.email}</p>
                    <p className="text-xs text-gray-500">{user?.role}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden ml-2 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors"
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {showMobileMenu && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded-md transition-colors">
              <Calendar className="w-5 h-5 mr-3" />
              Agendamentos
            </button>
            <button className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded-md transition-colors">
              <Users className="w-5 h-5 mr-3" />
              Clientes
            </button>
            <button className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded-md transition-colors">
              <Settings className="w-5 h-5 mr-3" />
              Configurações
            </button>
          </div>
        </div>
      )}
    </header>
  );
}