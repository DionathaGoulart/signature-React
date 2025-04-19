import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SignedContractsList.css';

function SignedContractsList() {
  const [signedContracts, setSignedContracts] = useState([]);

  useEffect(() => {
    // Em uma aplicação real, buscaríamos do backend
    // Aqui vamos simular dados de contratos assinados
    const simulatedSignedContracts = [
      {
        id: '123',
        contractName: 'Contrato de Prestação de Serviços',
        clientName: 'João Silva',
        signedDate: new Date().toISOString(),
        clientEmail: 'joao@example.com'
      }
    ];
    
    setSignedContracts(simulatedSignedContracts);
  }, []);

  return (
    <div className="signed-contracts-list">
      <h2>Contratos Assinados</h2>
      
      {signedContracts.length === 0 ? (
        <p>Nenhum contrato foi assinado ainda.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nome do Contrato</th>
              <th>Cliente</th>
              <th>E-mail</th>
              <th>Data de Assinatura</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {signedContracts.map((contract) => (
              <tr key={contract.id}>
                <td>{contract.contractName}</td>
                <td>{contract.clientName}</td>
                <td>{contract.clientEmail}</td>
                <td>{new Date(contract.signedDate).toLocaleDateString()}</td>
                <td>
                  <button className="view-button">Ver PDF</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      <div className="back-container">
        <Link to="/admin" className="back-link">
          Voltar para o Painel
        </Link>
      </div>
    </div>
  );
}

export default SignedContractsList;