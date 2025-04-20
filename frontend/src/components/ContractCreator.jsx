import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FileText, PlusCircle, Save, ArrowLeft, Eye } from 'lucide-react';

function ContractCreator() {
  const [contractName, setContractName] = useState('');
  const [contractTemplate, setContractTemplate] = useState('');
  const [fieldsList, setFieldsList] = useState([]);
  const [currentField, setCurrentField] = useState('');
  const navigate = useNavigate();

  const addField = () => {
    if (currentField.trim()) {
      const fieldTag = `{${currentField.trim()}}`;
      setFieldsList([...fieldsList, currentField.trim()]);
      setCurrentField('');

      if (!contractTemplate.includes(fieldTag)) {
        setContractTemplate(contractTemplate + ' ' + fieldTag);
      }
    }
  };

  const saveContract = () => {
    if (!contractName.trim() || !contractTemplate.trim()) {
      alert('Por favor, preencha o nome e o template do contrato.');
      return;
    }

    const templateFields = [...contractTemplate.matchAll(/{([^}]+)}/g)].map(match => match[1]);

    const newContract = {
      id: Date.now().toString(),
      name: contractName,
      template: contractTemplate,
      fields: templateFields,
      createdAt: new Date().toISOString()
    };

    const existingContracts = JSON.parse(localStorage.getItem('contracts') || '[]');
    localStorage.setItem('contracts', JSON.stringify([...existingContracts, newContract]));

    alert('Contrato criado com sucesso!');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-2">
              <span className="text-indigo-600">Criar Novo Contrato</span>
            </h1>
            <p className="text-gray-500">Crie um template personalizado com campos dinâmicos</p>
          </div>

          <div className="mb-6">
            <label className="block font-medium text-gray-700 mb-2">Nome do Contrato:</label>
            <input
              type="text"
              value={contractName}
              onChange={(e) => setContractName(e.target.value)}
              placeholder="Ex: Contrato de Prestação de Serviços"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-6">
            <label className="block font-medium text-gray-700 mb-2">Adicionar Campo:</label>
            <div className="flex gap-3">
              <input
                type="text"
                value={currentField}
                onChange={(e) => setCurrentField(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addField()}
                placeholder="Ex: cliente"
                className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                onClick={addField}
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300"
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Adicionar
              </button>
            </div>
            <small className="text-sm text-gray-500 mt-2 block">Os campos serão inseridos no formato <code className="bg-indigo-50 px-1 rounded font-mono">{'{campo}'}</code></small>
          </div>

          <div className="mb-6">
            <div className="flex items-center text-lg font-medium text-gray-700 mb-2">
              <FileText className="h-5 w-5 text-indigo-600 mr-2" />
              <span>Campos Adicionados:</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-y-auto max-h-40">
              {fieldsList.length === 0 ? (
                <p className="text-gray-500">Nenhum campo adicionado</p>
              ) : (
                <ul className="pl-5 list-disc space-y-1">
                  {fieldsList.map((field, index) => (
                    <li key={index} className="text-gray-700">
                      {field} (<code className="bg-indigo-100 px-1 rounded font-mono">{`{${field}}`}</code>)
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label className="block font-medium text-gray-700 mb-2">Template do Contrato:</label>
            <textarea
              value={contractTemplate}
              onChange={(e) => setContractTemplate(e.target.value)}
              placeholder="Escreva o modelo do seu contrato aqui. Use {campo} para indicar os campos a serem preenchidos pelo cliente."
              rows={10}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base font-mono focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100 mb-8">
            <div className="flex items-center text-lg font-medium text-indigo-700 mb-3">
              <Eye className="h-5 w-5 mr-2" />
              <h3>Prévia do Contrato:</h3>
            </div>
            <div className="whitespace-pre-wrap font-mono leading-relaxed text-gray-700">
              {contractTemplate ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: contractTemplate.replace(
                      /{([^}]+)}/g,
                      '<span class="bg-indigo-100 px-1 rounded">{$1}</span>'
                    )
                  }}
                />
              ) : (
                <p className="text-gray-500">A prévia aparecerá aqui quando você começar a escrever o template.</p>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center mt-8">
            <Link
              to="/admin"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Voltar
            </Link>
            
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/admin')}
                className="inline-flex items-center px-5 py-2 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-300"
              >
                Cancelar
              </button>
              <button
                onClick={saveContract}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300"
              >
                <Save className="mr-2 h-5 w-5" />
                Salvar Contrato
              </button>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-indigo-700 rounded-2xl shadow-xl overflow-hidden mt-10">
          <div className="px-6 py-12 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between">
            <div className="md:max-w-2xl">
              <h2 className="text-2xl font-bold text-white mb-4">
                Precisa de ajuda para criar contratos?
              </h2>
              <p className="text-indigo-100 text-lg mb-6 md:mb-0">
                Explore nossa biblioteca de templates prontos e economize tempo na criação de documentos.
              </p>
            </div>
            <div>
              <Link 
                to="/admin/templates" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 transition-colors duration-300"
              >
                Ver Templates
                <PlusCircle className="ml-2 h-5 w-5" />
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

export default ContractCreator;