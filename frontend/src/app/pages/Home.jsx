import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight } from 'lucide-react';
import { Container, Card, Button } from '@lib';

export default function Home() {
  const features = [
    {
      icon: <FileText size={24} />,
      title: 'Criação de Contratos',
      text: 'Crie contratos personalizados com editor intuitivo e templates profissionais.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
             strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
      title: 'Assinatura Digital',
      text: 'Assinaturas com validade jurídica, seguras e completas em poucos cliques.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
             strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108
                   c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0
                   c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0
                   00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0
                   0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0
                   c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25
                   6.108V8.25"/>
        </svg>
      ),
      title: 'Gestão Centralizada',
      text: 'Acompanhe o status de cada contrato e mantenha seu histórico organizado.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">

      <main className="flex-1">
        <Container className="py-16">
          {/* Hero ------------------------------- */}
          <section className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
              <span className="block text-indigo-600">Sistema de Assinatura</span>
              <span className="block">de Contratos</span>
            </h1>
            <p className="max-w-xl mx-auto text-xl text-gray-500">
              Plataforma segura e eficiente para gestão e assinatura digital de documentos contratuais.
            </p>
          </section>

          {/* Features ------------------------------- */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((f) => (
              <Card key={f.title} className="text-center">
                <div className="flex items-center justify-center h-12 w-12 mx-auto rounded-md bg-indigo-500 text-white mb-4">
                  {f.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500">{f.text}</p>
              </Card>
            ))}
          </section>

          {/* CTA ------------------------------- */}
          <section className="bg-indigo-700 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-12 md:p-12 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
              <div className="md:max-w-2xl mb-6 md:mb-0">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Pronto para otimizar seus processos contratuais?
                </h2>
                <p className="text-indigo-100 text-lg">
                  Acesse o portal administrativo e comece a criar contratos digitais seguros e eficientes.
                </p>
              </div>

              <Button as={Link}
                      to="/dashboard"
                      variant="secondary"
                      className="min-w-[220px]">
                Portal do Administrador
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </section>
        </Container>
      </main>

    </div>
  );
}
