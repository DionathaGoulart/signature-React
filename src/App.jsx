import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import ContractCreator from './components/ContractCreator';
import ClientContract from './components/ClientContract';
import GenerateClientLink from './components/GenerateClientLink';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/create" element={<ContractCreator />} />
          <Route path="/admin/generate-link/:id" element={<GenerateClientLink />} />
          <Route path="/contract/:id" element={<ClientContract />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="home-container">
      <h1>Sistema de Assinatura de Contratos</h1>
      <div className="portal-links">
        <Link to="/admin" className="portal-button">
          Acessar Portal do Administrador
        </Link>
      </div>
    </div>
  );
}

export default App;