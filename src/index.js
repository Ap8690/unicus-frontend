import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App.tsx';
import { UserProvider } from './context/UserContext';
import { TransactionProvider } from './context/Web3Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <TransactionProvider>
        <App />
      </TransactionProvider>
    </UserProvider>
  </React.StrictMode>
);

