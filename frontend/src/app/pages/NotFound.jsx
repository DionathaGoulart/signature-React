import React from 'react';
import { Link } from 'react-router-dom';
import { Home as HomeIcon, Search, ArrowLeft } from 'lucide-react';

import { Card, Button } from '@lib';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      {/* Cartão principal ------------------------------- */}
      <Card className="max-w-md w-full text-center space-y-8 overflow-hidden">
        {/* Ícone circular ------------------------------- */}
        <div className="flex justify-center">
          <div className="h-24 w-24 rounded-full bg-indigo-100 flex items-center justify-center">
            <Search className="h-10 w-10 text-indigo-600" />
          </div>
        </div>

        {/* Mensagem ------------------------------- */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-gray-900">
            Página não encontrada
          </h1>
          <p className="text-gray-600">
            O endereço acessado não existe ou foi removido.
          </p>
        </div>

        {/* Ações ------------------------------- */}
        <div className="space-y-3">
          <Button as={Link} to="/">
            <HomeIcon className="mr-2 h-5 w-5" />
            Voltar à página inicial
          </Button>

          <Button
            as={Link}
            to="/dashboard"
            variant="secondary"
            className="w-full"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Ir para o painel administrativo
          </Button>
        </div>
      </Card>

      {/* Rodapé estreito ------------------------------- */}
      <div className="absolute bottom-8 inset-x-0 px-4">
        <p className="text-sm text-center text-indigo-500">
          Se você acredita que isto é um erro, entre em contato com o suporte.
        </p>
      </div>
    </div>
  );
}
