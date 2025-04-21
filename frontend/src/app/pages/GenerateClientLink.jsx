import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Copy, ExternalLink, ArrowLeft } from 'lucide-react';

import {
  Container,
  Card,
  Button,
  Input,
  useContracts,
} from '@lib';

export default function GenerateClientLink() {
  const { id } = useParams();
  const { find } = useContracts();
  const [contract, setContract] = useState(null);
  const [clientLink, setClientLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const found = find(id);
    if (found) {
      setContract(found);
      setClientLink(`${window.location.origin}/contract/${id}`);
    }
    setLoading(false);
  }, [id, find]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(clientLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-indigo-600 text-xl font-semibold">Carregando...</div>
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Contrato não encontrado</h2>
          <p className="text-gray-600 mb-6">O contrato que você procura não existe ou foi removido.</p>
          <Button as={Link} to="/dashboard">
            <ArrowLeft className="mr-2 h-5 w-5" /> Voltar para o Painel
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="flex-1 py-16">
        <Container>
          <Card className="overflow-hidden">
            {/* Header ------------------------------- */}
            <div className="bg-indigo-600 px-6 py-4">
              <h1 className="text-2xl font-bold text-white">Link para Assinatura do Cliente</h1>
            </div>

            <div className="p-6 md:p-8 space-y-8">
              {/* Contract Info ------------------------------- */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-1">{contract.name}</h2>
                <p className="text-sm text-gray-500">
                  Criado em: {new Date(contract.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Link Section ------------------------------- */}
              <div className="space-y-4">
                <Input
                  label="Link para o Cliente"
                  value={clientLink}
                  readOnly
                />
                <div className="flex flex-wrap gap-3">
                  <Button onClick={copyToClipboard}>
                    <Copy className="mr-2 h-4 w-4" />
                    {copied ? 'Copiado!' : 'Copiar Link'}
                  </Button>
                  <Button
                    as="a"
                    href={clientLink}
                    target="_blank"
                    variant="secondary"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Visualizar Página
                  </Button>
                  <Button as={Link} to="/dashboard">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar ao Painel
                  </Button>
                </div>
                <div className="text-sm text-indigo-600 bg-indigo-100 p-4 rounded-md flex items-start">
                  <ExternalLink className="mr-2 h-5 w-5 flex-shrink-0" />
                  <p>
                    Compartilhe este link com o cliente para que ele possa visualizar e assinar o
                    contrato digitalmente. O link permanece válido até assinatura ou cancelamento.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </main>
    </div>
  );
}
