import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import * as nearAPI from 'near-api-js';
import 'regenerator-runtime';
import { UserProvider } from './context/UserContext';
import { TransactionProvider } from './context/Web3Context';
// redux integration
import {Provider} from 'react-redux'
import {store} from './Redux/Store'

const { keyStores, connect, transactions, WalletConnection } = nearAPI;

async function initContract() {
  const config = {
        networkId: 'testnet',
        keyStore: new keyStores.BrowserLocalStorageKeyStore(),
        nodeUrl: 'https://rpc.testnet.near.org',
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org',
        exploreUrl: 'https://explorer.testnet.near.org',
        headers: {},     
  };
  const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();
  const near = await nearAPI.connect(config);
  const walletConnection = new nearAPI.WalletConnection(near, "unicus");

  /*const config = getConfig(process.env.NEAR_ENV || 'testnet');
  const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore()
  const near =  await nearAPI.connect({keyStore, ...nearConfig})
  const walletConnection = new nearAPI.WalletConnection(near)*/
  

  let currentUser;

  if (walletConnection.getAccountId()) {
      currentUser = walletConnection.getAccountId();
        
  }

  return { currentUser, config, walletConnection}
}

const root = ReactDOM.createRoot(document.getElementById('root'));
initContract().then(({ currentUser, config, walletConnection})=> {
  root.render(
  <React.StrictMode>
    <Provider store={store}>
    <UserProvider>
      <TransactionProvider>
        <App currentUser={currentUser} nearConfig={config} walletConnection={walletConnection} />
      </TransactionProvider>
    </UserProvider>
    </Provider>
  </React.StrictMode>
);
})


