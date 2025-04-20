import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import ContractCreator from './components/ContractCreator';
import ClientContract from './components/ClientContract';
import GenerateClientLink from './components/GenerateClientLink';
import Home from './components/Home';
import NotFound from './components/NotFound';
import './index.css';

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
          {/* Rota de fallback para páginas não encontradas */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;