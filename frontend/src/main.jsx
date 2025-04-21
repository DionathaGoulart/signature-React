import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ContractsProvider } from '@lib';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ContractsProvider>
        <App />
      </ContractsProvider>
    </BrowserRouter>
  </React.StrictMode>
);