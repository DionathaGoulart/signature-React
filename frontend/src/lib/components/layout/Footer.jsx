import React from 'react';
import { Container } from './Container';

export const Footer = () => (
  <footer className="bg-white mt-24">
    <Container className="py-12">
      <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-500 text-sm">© 2025 Sistema de Assinatura de Contratos.</p>
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
    </Container>
  </footer>
);