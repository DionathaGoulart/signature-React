import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Copy, ExternalLink, ArrowLeft } from 'lucide-react';

function GenerateClientLink() {
  const { id } = useParams();
  const [contract, setContract] = useState(null);
  const [clientLink, setClientLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulando um pequeno delay para dar sensação de carregamento
    setTimeout(() => {
      const contracts = JSON.parse(localStorage.getItem('contracts') || '[]');
      const foundContract = contracts.find(c => c.id === id);
      
      if (foundContract) {
        setContract(foundContract);
        const baseUrl = window.location.origin;
        setClientLink(`${baseUrl}/contract/${id}`);
      }
      
      setLoading(false);
    }, 500);
  }, [id]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(clientLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center">
        <div className="text-indigo-600 text-xl font-semibold">Carregando...</div>
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Contrato não encontrado</h2>
          <p className="text-gray-600 mb-6">O contrato que você está procurando não existe ou foi removido.</p>
          <Link 
            to="/admin" 
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Voltar para o Painel
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">
              Link para Assinatura do Cliente
            </h1>
          </div>

          <div className="p-6 md:p-8">
            {/* Contract Info */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{contract.name}</h2>
              <div className="flex items-center text-gray-500">
                <span className="text-sm">
                  Criado em: {new Date(contract.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Client Link Section */}
            <div className="bg-indigo-50 rounded-lg p-6 mb-8 border border-indigo-100">
              <h3 className="text-lg font-semibold text-indigo-700 mb-4">Link para o Cliente:</h3>
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <input
                  type="text"
                  value={clientLink}
                  readOnly
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-md text-sm font-mono bg-white"
                />
                <button
                  onClick={copyToClipboard}
                  className="bg-indigo-600 text-white px-4 py-3 rounded-md font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center min-w-max"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  {copied ? 'Copiado!' : 'Copiar Link'}
                </button>
              </div>
              <div className="text-sm text-indigo-600 bg-indigo-100 p-4 rounded-md flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>
                  Compartilhe este link com o cliente para que ele possa visualizar e assinar o contrato digitalmente. 
                  O link permanecerá válido até que o contrato seja assinado ou cancelado.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to={clientLink}
                target="_blank"
                className="bg-indigo-600 text-white px-5 py-3 rounded-md font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Visualizar página do cliente
              </Link>
              <Link
                to="/admin"
                className="bg-white text-indigo-600 px-5 py-3 rounded-md font-semibold hover:bg-indigo-50 border border-indigo-300 transition-colors flex items-center justify-center"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Voltar para o Painel
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center">
          <p className="text-sm text-indigo-400">
            © 2025 Sistema de Assinatura de Contratos. Todos os direitos reservados.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default GenerateClientLink;