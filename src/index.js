import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App.tsx';
import { UserProvider } from './context/UserContext';
import { TransactionProvider } from './context/Web3Context';
// redux integration
import {Provider} from 'react-redux'
import {store} from './Redux/Store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <UserProvider>
      <TransactionProvider>
        <App />
      </TransactionProvider>
    </UserProvider>
    </Provider>
  </React.StrictMode>
);

