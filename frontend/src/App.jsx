import React from 'react';
import { Header, Footer} from '@lib';
import { AppRoutes } from './app/routes';


export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <main className="flex-1">
      <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}
