import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Eye, Download, Search, ArrowLeft } from 'lucide-react';

import {
  Container,
  Header,
  Footer,
  Card,
  Table,
  Button,
  Input,
  useContracts,
} from '@lib';

export default function SignedContractsList() {
  const { contracts } = useContracts();           // assume signed stored here
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    // simulate load
    setTimeout(() => {
      setFiltered(contracts);
      setLoading(false);
    }, 600);
  }, [contracts]);

  useEffect(() => {
    const term = search.toLowerCase();
    setFiltered(
      contracts.filter(c =>
        c.contractName.toLowerCase().includes(term) ||
        c.clientName.toLowerCase().includes(term)   ||
        c.clientEmail.toLowerCase().includes(term)
      )
    );
  }, [search, contracts]);

  // define columns for Table component
  const columns = [
    { key: 'contractName', header: 'Contrato' },
    { key: 'clientName',   header: 'Cliente' },
    { key: 'clientEmail',  header: 'E‑mail'  },
    {
      key: 'signedDate', header: 'Data',
      render: val => new Date(val).toLocaleDateString(),
    },
    {
      key: 'actions', header: 'Ações',
      render: (_, row) => (
        <div className="flex space-x-2">
          <Button size="sm" variant="ghost" as={Link} to={`/signed/${row.id}`}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => {/* download logic */}}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      ),
      cellClass: 'px-6 py-4',
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <main className="flex-1 py-16">
        <Container>
          {/* Header + Back ------------------------------- */}
          <div className="mb-8 flex flex-col md:flex-row md:justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-indigo-700 mb-2">Contratos Assinados</h1>
              <p className="text-gray-600">Visualize e gerencie todos os contratos assinados.</p>
            </div>
            <Button as={Link} to="/dashboard" variant="secondary" className="mt-4 md:mt-0">
              <ArrowLeft className="mr-2 h-5 w-5" /> Voltar
            </Button>
          </div>

          {/* Search ------------------------------- */}
          <Card className="mb-6">
            <Input
              icon={<Search className="h-5 w-5 text-gray-400" />}
              placeholder="Buscar..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </Card>

          {/* Table or Loading/Empty States ------------------------------- */}
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-200 border-t-indigo-600 mb-4"></div>
              <p className="text-indigo-600 font-medium">Carregando...</p>
            </div>
          ) : filtered.length === 0 ? (
            <Card className="text-center">
              <FileText className="h-16 w-16 text-indigo-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">Nenhum resultado</h3>
              <p className="text-gray-500">Nenhum contrato assinado corresponde à busca.</p>
            </Card>
          ) : (
            <Card>
              <Table columns={columns} data={filtered} />
            </Card>
          )}

          {/* Stats ------------------------------- */}
          {!loading && contracts.length > 0 && (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <h3 className="text-lg font-medium text-gray-900">Total</h3>
                <p className="text-2xl font-bold text-indigo-600">{contracts.length}</p>
              </Card>
              <Card>
                <h3 className="text-lg font-medium text-gray-900">Últimos 7 dias</h3>
                <p className="text-2xl font-bold text-indigo-600">{contracts.filter(c =>
                  new Date(c.signedDate) >= new Date(Date.now() - 7*24*60*60*1000)
                ).length}</p>
              </Card>
              <Card>
                <h3 className="text-lg font-medium text-gray-900">Clientes Únicos</h3>
                <p className="text-2xl font-bold text-indigo-600">
                  {new Set(contracts.map(c => c.clientEmail)).size}
                </p>
              </Card>
            </div>
          )}
        </Container>
      </main>
      <Footer />
    </div>
  );
}
