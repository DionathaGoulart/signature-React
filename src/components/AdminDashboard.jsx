import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard() {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    // Carregar contratos do localStorage
    const savedContracts = JSON.parse(localStorage.getItem('contracts') || '[]');
    setContracts(savedContracts);
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Painel do Administrador</h1>
      <div className="admin-actions">
        <Link to="/admin/create" className="action-button">
          Criar Novo Contrato
        </Link>
      </div>
      
      <div className="contracts-list">
        <h2>Contratos Criados</h2>
        {contracts.length === 0 ? (
          <p>Nenhum contrato criado ainda.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nome do Contrato</th>
                <th>Data de Criação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((contract) => (
                <tr key={contract.id}>
                  <td>{contract.name}</td>
                  <td>{new Date(contract.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/admin/generate-link/${contract.id}`} className="link-button">
                      Gerar Link para Cliente
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
      <div className="signed-contracts">
        <h2>Contratos Assinados</h2>
        {/* Aqui mostraríamos os contratos que foram assinados pelos clientes */}
        <p>Funcionalidade será implementada em breve.</p>
      </div>
      
      <Link to="/" className="back-link">
        Voltar para Home
      </Link>
    </div>
  );
}

export default AdminDashboard;