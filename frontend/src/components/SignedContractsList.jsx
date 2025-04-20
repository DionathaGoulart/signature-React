import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowLeft, Eye, Download, Search } from 'lucide-react';

function SignedContractsList() {
  const [signedContracts, setSignedContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulando carregamento de dados
    setTimeout(() => {
      const simulatedSignedContracts = [
        {
          id: '123',
          contractName: 'Contrato de Prestação de Serviços',
          clientName: 'João Silva',
          signedDate: new Date().toISOString(),
          clientEmail: 'joao@example.com'
        },
        {
          id: '124',
          contractName: 'Acordo de Confidencialidade',
          clientName: 'Maria Oliveira',
          signedDate: new Date(Date.now() - 86400000).toISOString(), // Ontem
          clientEmail: 'maria@example.com'
        },
        {
          id: '125',
          contractName: 'Contrato de Compra e Venda',
          clientName: 'Carlos Santos',
          signedDate: new Date(Date.now() - 172800000).toISOString(), // 2 dias atrás
          clientEmail: 'carlos@example.com'
        }
      ];
      setSignedContracts(simulatedSignedContracts);
      setLoading(false);
    }, 600);
  }, []);

  const filteredContracts = signedContracts.filter(contract => {
    const searchLower = searchTerm.toLowerCase();
    return (
      contract.contractName.toLowerCase().includes(searchLower) ||
      contract.clientName.toLowerCase().includes(searchLower) ||
      contract.clientEmail.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-indigo-700 mb-2">Contratos Assinados</h1>
            <p className="text-gray-600">Visualize e gerencie todos os contratos que foram assinados pelos clientes</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Link 
              to="/admin" 
              className="inline-flex items-center px-4 py-2 border border-indigo-300 text-indigo-600 bg-white rounded-md font-medium hover:bg-indigo-50 transition-colors"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Voltar para o Painel
            </Link>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar por nome do contrato, cliente ou email..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-200 border-t-indigo-600 mb-4"></div>
              <p className="text-indigo-600 font-medium">Carregando contratos...</p>
            </div>
          ) : signedContracts.length === 0 ? (
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-500 mb-4">
                <FileText size={28} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Nenhum contrato assinado</h3>
              <p className="text-gray-500">
                Quando seus clientes assinarem contratos, eles aparecerão aqui.
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-indigo-50">
                      <th className="text-left px-6 py-3 text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                        Nome do Contrato
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                        Cliente
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                        E-mail
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                        Data de Assinatura
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredContracts.map((contract) => (
                      <tr key={contract.id} className="hover:bg-indigo-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                          {contract.contractName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {contract.clientName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {contract.clientEmail}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {new Date(contract.signedDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                          <button className="inline-flex items-center px-3 py-1.5 bg-indigo-600 text-white rounded text-sm font-medium hover:bg-indigo-700 transition-colors">
                            <Eye className="mr-1 h-4 w-4" />
                            Visualizar
                          </button>
                          <button className="inline-flex items-center px-3 py-1.5 bg-white text-indigo-600 border border-indigo-300 rounded text-sm font-medium hover:bg-indigo-50 transition-colors">
                            <Download className="mr-1 h-4 w-4" />
                            PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredContracts.length === 0 && (
                <div className="p-8 text-center border-t border-gray-200">
                  <p className="text-gray-600">Nenhum resultado encontrado para "{searchTerm}"</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Stats Section */}
        {!loading && signedContracts.length > 0 && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 4.03 9 9 9 4.03 9 9z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Total de Contratos</h3>
                  <p className="text-2xl font-bold text-indigo-600">{signedContracts.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Últimos 7 dias</h3>
                  <p className="text-2xl font-bold text-indigo-600">{signedContracts.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Clientes Únicos</h3>
                  <p className="text-2xl font-bold text-indigo-600">{new Set(signedContracts.map(c => c.clientEmail)).size}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-indigo-400">
          <p>© 2025 Sistema de Assinatura de Contratos. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
}

export default SignedContractsList;