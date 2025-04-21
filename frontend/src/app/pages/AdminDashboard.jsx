import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight, Plus, CheckCircle, Trash2, AlertTriangle } from 'lucide-react';
import {
  Card,
  Table,
  Button,
  useContracts,
} from '@lib';

export default function AdminDashboard() {
  const { contracts, remove } = useContracts();
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [contractToDelete, setContractToDelete] = useState(null);

  const handleDeleteClick = (contract) => {
    setContractToDelete(contract);
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    if (!contractToDelete) return;
    
    setDeleteLoading(contractToDelete.id);
    
    try {
      // Simula um delay para mostrar o loading state
      await new Promise(resolve => setTimeout(resolve, 500));
      // Remove o contrato
      remove(contractToDelete.id);
    } catch (error) {
      console.error("Erro ao excluir contrato:", error);
    } finally {
      setDeleteLoading(null);
      setShowConfirmation(false);
      setContractToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    setContractToDelete(null);
  };

  /* Colunas da tabela ----------------------------------------------------- */
  const columns = [
    {
      key: 'name',
      header: 'Nome do Contrato',
      cellClass: 'px-6 py-4 font-medium text-gray-800',
    },
    {
      key: 'createdAt',
      header: 'Data de Criação',
      render: (val) => new Date(val).toLocaleDateString(),
      cellClass: 'px-6 py-4 text-gray-600',
    },
    {
      key: 'id',
      header: 'Ações',
      render: (id, row) => (
        <div className="flex justify-end gap-2">
          <Button
            as={Link}
            to={`/generate-link/${row.id}`}
            size="sm"
            className="bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Gerar Link
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
            onClick={() => handleDeleteClick(row)}
            disabled={deleteLoading === row.id}
          >
            {deleteLoading === row.id ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Excluindo...
              </span>
            ) : (
              <>
                <Trash2 className="mr-1 h-4 w-4" />
                Excluir
              </>
            )}
          </Button>
        </div>
      ),
      cellClass: 'px-6 py-4 text-right',
    },
  ];
  /* ---------------------------------------------------------------------- */

  return (
    <div className="space-y-10">
      {/* Título ------------------------------------------------------------ */}
      <section className="text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-700">
          Painel do Administrador
        </h1>
        <p className="text-gray-500 mt-2">
          Gerencie seus contratos e acompanhe o status das assinaturas.
        </p>
      </section>

      {/* Modal de confirmação de exclusão ---------------------------------- */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-md w-full p-6">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <AlertTriangle className="h-6 w-6" />
              <h3 className="text-lg font-semibold">Confirmar exclusão</h3>
            </div>
            
            <p className="mb-6 text-gray-700">
              Tem certeza que deseja excluir o contrato <strong>"{contractToDelete?.name}"</strong>? 
              Esta ação não pode ser desfeita.
            </p>
            
            <div className="flex justify-end gap-3">
              <Button 
                variant="secondary" 
                onClick={cancelDelete}
                disabled={deleteLoading}
              >
                Cancelar
              </Button>
              <Button 
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={confirmDelete}
                disabled={deleteLoading}
              >
                {deleteLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Excluindo...
                  </span>
                ) : (
                  <>
                    <Trash2 className="mr-1 h-4 w-4" />
                    Excluir
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Botão "Novo contrato" -------------------------------------------- */}
      <div className="flex justify-end">
        <Button as={Link} to="/create">
          <Plus className="mr-2 h-5 w-5" />
          Criar Novo Contrato
        </Button>
      </div>

      {/* Lista de contratos criados --------------------------------------- */}
      <Card>
        <h2 className="text-2xl font-semibold text-indigo-600 flex items-center gap-2 mb-6">
          <FileText className="h-6 w-6" />
          Contratos Criados
        </h2>
        {contracts.length === 0 ? (
          <div className="text-center py-12 space-y-4">
            <p className="text-gray-500">
              Nenhum contrato criado ainda.
            </p>
            <Button
              as={Link}
              to="/create"
              variant="secondary"
              className="border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
            >
              Criar seu primeiro contrato
            </Button>
          </div>
        ) : (
          <Table columns={columns} data={contracts} />
        )}
      </Card>

      {/* Placeholder de contratos assinados ------------------------------- */}
      <Card>
        <h2 className="text-2xl font-semibold text-indigo-600 flex items-center gap-2 mb-6">
          <CheckCircle className="h-6 w-6" />
          Contratos Assinados
        </h2>
        <div className="flex items-center justify-center py-10 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          Funcionalidade será implementada em breve
        </div>
      </Card>
    </div>
  );
}