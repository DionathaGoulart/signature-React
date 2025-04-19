import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ContractCreator.css';

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
      
      // Adiciona o campo ao template se não estiver lá
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

    // Verificar campos no template
    const templateFields = [...contractTemplate.matchAll(/{([^}]+)}/g)].map(match => match[1]);
    
    // Criar o objeto do contrato
    const newContract = {
      id: Date.now().toString(),
      name: contractName,
      template: contractTemplate,
      fields: templateFields,
      createdAt: new Date().toISOString()
    };

    // Salvar no localStorage
    const existingContracts = JSON.parse(localStorage.getItem('contracts') || '[]');
    localStorage.setItem('contracts', JSON.stringify([...existingContracts, newContract]));

    alert('Contrato criado com sucesso!');
    navigate('/admin');
  };

  return (
    <div className="contract-creator">
      <h1>Criar Novo Contrato</h1>
      
      <div className="form-group">
        <label>Nome do Contrato:</label>
        <input
          type="text"
          value={contractName}
          onChange={(e) => setContractName(e.target.value)}
          placeholder="Ex: Contrato de Prestação de Serviços"
        />
      </div>

      <div className="form-group">
        <label>Adicionar Campo:</label>
        <div className="field-input">
          <input
            type="text"
            value={currentField}
            onChange={(e) => setCurrentField(e.target.value)}
            placeholder="Ex: cliente"
            onKeyPress={(e) => e.key === 'Enter' && addField()}
          />
          <button onClick={addField}>Adicionar</button>
        </div>
        <small>Os campos serão inseridos no formato {"{campo}"}</small>
      </div>

      <div className="form-group">
        <label>Campos Adicionados:</label>
        <div className="fields-list">
          {fieldsList.length === 0 ? (
            <p>Nenhum campo adicionado</p>
          ) : (
            <ul>
              {fieldsList.map((field, index) => (
                <li key={index}>{field} ({`{${field}}`})</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="form-group">
        <label>Template do Contrato:</label>
        <textarea
          value={contractTemplate}
          onChange={(e) => setContractTemplate(e.target.value)}
          placeholder="Escreva o modelo do seu contrato aqui. Use {campo} para indicar os campos a serem preenchidos pelo cliente."
          rows={10}
        />
      </div>

      <div className="contract-preview">
        <h3>Prévia do Contrato:</h3>
        <div className="preview-content">
          {contractTemplate ? (
            <div dangerouslySetInnerHTML={{ __html: contractTemplate.replace(/{([^}]+)}/g, '<span class="highlight">{$1}</span>') }} />
          ) : (
            <p>A prévia aparecerá aqui quando você começar a escrever o template.</p>
          )}
        </div>
      </div>

      <div className="form-actions">
        <button onClick={saveContract} className="save-button">Salvar Contrato</button>
        <button onClick={() => navigate('/admin')} className="cancel-button">Cancelar</button>
      </div>
    </div>
  );
}

export default ContractCreator;