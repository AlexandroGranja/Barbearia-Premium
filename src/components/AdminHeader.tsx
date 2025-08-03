import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Button } from "@/components/ui/button"
import { Scissors, LogOut, User } from 'lucide-react'

export const AdminHeader: React.FC = () => {
  const { user, signOut } = useAuth()

  const handleLogout = async () => {
    if (confirm('Tem certeza que deseja sair?')) {
      await signOut()
    }
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-yellow-400 rounded-full flex items-center justify-center">
              <Scissors className="h-5 w-5 text-gray-900" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Barbearia Premium
              </h1>
              <p className="text-sm text-gray-600">Painel Administrativo</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <User className="h-4 w-4" />
              <span>{user?.email}</span>
            </div>
            <Button
              onClick={handleLogout}
              variant="destructive"
              size="sm"
              className="flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Sair</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}