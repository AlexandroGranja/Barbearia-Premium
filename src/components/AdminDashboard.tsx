import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, Users, DollarSign, Clock, TrendingUp, Scissors, LogOut, User, Menu, X, Settings } from 'lucide-react';

export function AdminDashboard() {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const stats = [
    {
      title: 'Agendamentos Hoje',
      value: '12',
      change: '+2 desde ontem',
      changeType: 'positive',
      icon: Calendar,
      color: 'bg-blue-500',
    },
    {
      title: 'Clientes Ativos',
      value: '348',
      change: '+18 este mês',
      changeType: 'positive',
      icon: Users,
      color: 'bg-green-500',
    },
    {
      title: 'Faturamento Hoje',
      value: 'R$ 890,00',
      change: '+12% vs ontem',
      changeType: 'positive',
      icon: DollarSign,
      color: 'bg-amber-500',
    },
    {
      title: 'Tempo Médio',
      value: '45min',
      change: '-5min vs média',
      changeType: 'positive',
      icon: Clock,
      color: 'bg-purple-500',
    },
  ];

  const recentAppointments = [
    { id: 1, client: 'João Silva', service: 'Corte + Barba', time: '09:00', status: 'confirmado' },
    { id: 2, client: 'Pedro Santos', service: 'Corte Tradicional', time: '10:30', status: 'em-andamento' },
    { id: 3, client: 'Carlos Lima', service: 'Barba', time: '11:00', status: 'agendado' },
    { id: 4, client: 'Rafael Costa', service: 'Corte + Barba', time: '14:00', status: 'agendado' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmado': return 'bg-green-100 text-green-800';
      case 'em-andamento': return 'bg-blue-100 text-blue-800';
      case 'agendado': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmado': return 'Confirmado';
      case 'em-andamento': return 'Em Andamento';
      case 'agendado': return 'Agendado';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bem-vindo ao Painel Administrativo
          </h1>
          <p className="text-gray-600">
            Aqui você pode gerenciar todos os aspectos da sua barbearia
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} rounded-lg p-3`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm font-medium text-gray-600 mb-2">{stat.title}</p>
                <p className="text-xs text-green-600">{stat.change}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Appointments */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Agendamentos de Hoje</h2>
                <button className="text-amber-600 hover:text-amber-700 font-medium text-sm transition-colors">
                  Ver todos
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-full p-2">
                        <Scissors className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{appointment.client}</p>
                        <p className="text-sm text-gray-600">{appointment.service}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{appointment.time}</p>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                        {getStatusText(appointment.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Ações Rápidas</h2>
            </div>
            <div className="p-6 space-y-4">
              <button className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all">
                <Calendar className="w-5 h-5 mr-2" />
                Novo Agendamento
              </button>
              <button className="w-full flex items-center justify-center px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <Users className="w-5 h-5 mr-2" />
                Cadastrar Cliente
              </button>
              <button className="w-full flex items-center justify-center px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                <DollarSign className="w-5 h-5 mr-2" />
                Registrar Pagamento
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}