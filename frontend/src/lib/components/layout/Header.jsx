import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from './Container';

export const Header = () => (
  <header className="bg-white shadow">
    <Container className="py-4 flex items-center justify-between">
      <Link to="/" className="text-lg font-bold text-indigo-600">
        Sistema de Assinatura
      </Link>
      <nav className="space-x-6 hidden sm:block">
        <Link to="/dashboard" className="text-sm text-gray-600 hover:text-indigo-600">
          Dashboard
        </Link>
        <Link to="/dashboard/templates" className="text-sm text-gray-600 hover:text-indigo-600">
          Templates
        </Link>
      </nav>
    </Container>
  </header>
);