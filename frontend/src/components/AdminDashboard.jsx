import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight, Plus, CheckCircle, ArrowLeft } from 'lucide-react';

function AdminDashboard() {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    const savedContracts = JSON.parse(localStorage.getItem('contracts') || '[]');
    setContracts(savedContracts);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-6">
            <span className="block text-indigo-600">Painel do Administrador</span>
          </h1>
          <p className="max-w-xl mx-auto text-xl text-gray-500">
            Gerencie seus contratos e acompanhe o status de todas as assinaturas.
          </p>
        </div>
        
        {/* Action Button */}
        <div className="flex justify-end mb-8">
          <Link
            to="/admin/create"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300"
          >
            <Plus className="mr-2 h-5 w-5" />
            Criar Novo Contrato
          </Link>
        </div>
        
        {/* Contracts Created */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-8 mb-10">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-6 flex items-center gap-2">
            <FileText className="h-6 w-6" />
            Contratos Criados
          </h2>
          
          {contracts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-gray-500 mb-4">Nenhum contrato criado ainda.</p>
              <Link 
                to="/admin/create"
                className="inline-flex items-center px-6 py-3 border border-indigo-600 text-indigo-600 font-medium rounded-md hover:bg-indigo-600 hover:text-white transition-colors"
              >
                Criar seu primeiro contrato
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                    <th className="px-6 py-4 font-medium">Nome do Contrato</th>
                    <th className="px-6 py-4 font-medium">Data de Criação</th>
                    <th className="px-6 py-4 font-medium text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {contracts.map((contract) => (
                    <tr key={contract.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-800">{contract.name}</td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(contract.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          to={`/admin/generate-link/${contract.id}`}
                          className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          Gerar Link
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        {/* Signed Contracts */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-8 mb-10">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-6 flex items-center gap-2">
            <CheckCircle className="h-6 w-6" />
            Contratos Assinados
          </h2>
          <div className="flex items-center justify-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p>Funcionalidade será implementada em breve</p>
          </div>
        </div>
        
        {/* CTA - Similar to Home */}
        <div className="bg-indigo-700 rounded-2xl shadow-xl overflow-hidden mb-10">
          <div className="px-6 py-12 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between">
            <div className="md:max-w-2xl">
              <h2 className="text-3xl font-bold text-white mb-4">
                Precisa de mais templates de contrato?
              </h2>
              <p className="text-indigo-100 text-lg mb-6 md:mb-0">
                Explore nossa biblioteca de modelos prontos para uso em diversos cenários contratuais.
              </p>
            </div>
            <div>
              <Link 
                to="/admin/templates" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 transition-colors duration-300"
              >
                Ver Templates
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Back to Home */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Voltar para Home
          </Link>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-white mt-24">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2025 Sistema de Assinatura de Contratos. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                Termos
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                Privacidade
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                Contato
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AdminDashboard;