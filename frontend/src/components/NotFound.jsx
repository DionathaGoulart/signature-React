import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="h-24 w-24 rounded-full bg-indigo-100 flex items-center justify-center">
              <Search className="h-10 w-10 text-indigo-600" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-3">Página não encontrada</h1>
          <p className="text-center text-gray-600 mb-8">
            A página que você está procurando não existe ou foi removida.
          </p>
          
          <div className="space-y-3">
            <Link 
              to="/" 
              className="flex items-center justify-center w-full px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
            >
              <Home className="mr-2 h-5 w-5" />
              Voltar para página inicial
            </Link>
            
            <Link 
              to="/admin" 
              className="flex items-center justify-center w-full px-6 py-3 bg-white text-indigo-600 border border-indigo-300 font-medium rounded-md hover:bg-indigo-50 transition-colors"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Ir para o painel administrativo
            </Link>
          </div>
        </div>
        
        <div className="bg-indigo-50 px-8 py-4 border-t border-indigo-100">
          <p className="text-sm text-center text-indigo-500">
            Se você acredita que isto é um erro, por favor entre em contato com o suporte.
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;