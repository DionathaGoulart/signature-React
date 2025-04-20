import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight } from 'lucide-react';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-6">
            <span className="block text-indigo-600">Sistema de Assinatura</span>
            <span className="block">de Contratos</span>
          </h1>
          <p className="max-w-xl mx-auto text-xl text-gray-500">
            Plataforma segura e eficiente para gestão e assinatura digital de documentos contratuais.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4">
              <FileText size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Criação de Contratos</h3>
            <p className="text-gray-500">Crie contratos personalizados com editor intuitivo e templates profissionais.</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Assinatura Digital</h3>
            <p className="text-gray-500">Assinaturas com validade jurídica, seguras e completas em poucos cliques.</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Gestão Centralizada</h3>
            <p className="text-gray-500">Acompanhe o status de cada contrato e mantenha seu histórico organizado.</p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-indigo-700 rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-12 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between">
            <div className="md:max-w-2xl">
              <h2 className="text-3xl font-bold text-white mb-4">
                Pronto para otimizar seus processos contratuais?
              </h2>
              <p className="text-indigo-100 text-lg mb-6 md:mb-0">
                Acesse o portal administrativo e comece a criar contratos digitais seguros e eficientes.
              </p>
            </div>
            <div>
              <Link 
                to="/admin" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 transition-colors duration-300"
              >
                Portal do Administrador
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
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

export default Home;