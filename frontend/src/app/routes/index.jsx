import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@lib';

// Páginas
import Home                  from '../pages/Home';
import AdminDashboard        from '../pages/AdminDashboard';
import ContractCreator       from '../pages/ContractCreator';
import GenerateClientLink    from '../pages/GenerateClientLink';
import ClientContract        from '../pages/ClientContract';
import SignedContractsList   from '../pages/SignedContractsList';
import NotFound              from '../pages/NotFound';

export function AppRoutes() {
  return (
    <Container className="py-8">
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Admin */}
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/create"    element={<ContractCreator />} />
        <Route path="/generate-link/:id" element={<GenerateClientLink />} />

        {/* Cliente via link */}
        <Route path="/contract/:id" element={<ClientContract />} />

        {/* Lista de contratos assinados */}
        <Route path="/signed-contracts" element={<SignedContractsList />} />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Container>
  );
}
