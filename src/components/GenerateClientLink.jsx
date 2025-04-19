import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './GenerateClientLink.css';

function GenerateClientLink() {
  const { id } = useParams();
  const [contract, setContract] = useState(null);
  const [clientLink, setClientLink] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Buscar o contrato do localStorage
    const contracts = JSON.parse(localStorage.getItem('contracts') || '[]');
    const foundContract = contracts.find(c => c.id === id);
    
    if (foundContract) {
      setContract(foundContract);
      // Gerar o link do cliente (em uma aplicação real, isso seria um link absoluto)
      const baseUrl = window.location.origin;
      setClientLink(`${baseUrl}/contract/${id}`);
    }
  }, [id]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(clientLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!contract) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="generate-link">
      <h1>Link para o Cliente</h1>
      
      <div className="contract-details">
        <h2>{contract.name}</h2>
        <p>Criado em: {new Date(contract.createdAt).toLocaleDateString()}</p>
      </div>
      
      <div className="link-container">
        <h3>Link para o Cliente:</h3>
        <div className="client-link">
          <input type="text" value={clientLink} readOnly />
          <button onClick={copyToClipboard}>
            {copied ? 'Copiado!' : 'Copiar'}
          </button>
        </div>
        <p>Compartilhe este link com o cliente para que ele possa assinar o contrato.</p>
      </div>
      
      <div className="action-buttons">
        <Link to={clientLink} target="_blank" className="preview-button">
          Visualizar página do cliente
        </Link>
        <Link to="/admin" className="back-button">
          Voltar para o Painel
        </Link>
      </div>
    </div>
  );
}

export default GenerateClientLink;