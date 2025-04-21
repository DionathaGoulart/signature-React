import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FileText, PlusCircle, Save, ArrowLeft, Eye } from 'lucide-react';
import {
  Container,
  Card,
  Input,
  TextArea,
  Button,
  useContracts,
} from '@lib';

export default function ContractCreator() {
  const [contractName, setContractName] = useState('');
  const [contractTemplate, setContractTemplate] = useState('');
  const [fieldsList, setFieldsList] = useState([]);
  const [currentField, setCurrentField] = useState('');
  const navigate = useNavigate();
  const { create } = useContracts();

  const addField = () => {
    const field = currentField.trim();
    if (!field) return;
    if (!fieldsList.includes(field)) {
      setFieldsList([...fieldsList, field]);
    }
    setCurrentField('');
    const tag = `{${field}}`;
    if (!contractTemplate.includes(tag)) {
      setContractTemplate(prev => prev + (prev === '' ? '' : ' ') + tag);
    }
  };

  const save = () => {
    if (!contractName.trim() || !contractTemplate.trim()) {
      alert('Por favor, preencha o nome e o template do contrato.');
      return;
    }
    const templateFields = Array.from(
      contractTemplate.matchAll(/\{([^}]+)\}/g),
      match => match[1]
    );
    const newContract = {
      id: Date.now().toString(),
      name: contractName,
      template: contractTemplate,
      fields: templateFields,
      createdAt: new Date().toISOString(),
    };
    create(newContract);
    alert('Contrato criado com sucesso!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="flex-1 py-16">
        <Container>
          <Card>
            <div className="text-center mb-6">
              <h1 className="text-3xl font-extrabold text-gray-900">Criar Novo Contrato</h1>
              <p className="text-gray-500">Crie um template personalizado com campos dinâmicos</p>
            </div>

            <Input
              label="Nome do Contrato"
              value={contractName}
              onChange={e => setContractName(e.target.value)}
              placeholder="Ex: Contrato de Prestação de Serviços"
            />

            <div className="flex gap-3 items-end mb-4">
              <Input
                label="Adicionar Campo"
                value={currentField}
                onChange={e => setCurrentField(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && addField()}
                placeholder="Ex: cliente"
              />
              <Button onClick={addField}>
                <PlusCircle className="mr-2 h-5 w-5" />
                Adicionar
              </Button>
            </div>

            {fieldsList.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-2 flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-indigo-600" />
                  Campos Adicionados:
                </h3>
                <ul className="pl-5 list-disc text-gray-700">
                  {fieldsList.map((f, i) => (
                    <li key={i}>
                      <code className="bg-indigo-100 px-1 rounded font-mono">{`{${f}}`}</code>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <TextArea
              label="Template do Contrato"
              value={contractTemplate}
              onChange={e => setContractTemplate(e.target.value)}
              rows={8}
            />

            <div className="mb-8">
              <h3 className="text-lg font-medium text-indigo-700 mb-2 flex items-center">
                <Eye className="mr-2 h-5 w-5" />
                Prévia:
              </h3>
              <div className="whitespace-pre-wrap font-mono bg-gray-50 p-4 rounded text-gray-700 border border-gray-200">
                {contractTemplate ? contractTemplate.replace(/\{([^}]+)\}/g, '{$1}') : 'A prévia aparecerá aqui.'}
              </div>
            </div>

            <div className="flex justify-between">
              <Button as={Link} to="/dashboard" variant="secondary">
                <ArrowLeft className="mr-2 h-5 w-5" /> Cancelar
              </Button>
              <Button onClick={save}>
                <Save className="mr-2 h-5 w-5" /> Salvar Contrato
              </Button>
            </div>
          </Card>
        </Container>
      </main>
    </div>
  );
}
