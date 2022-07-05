import * as buffer from 'buffer';

import React from 'react';

import * as nearAPI from 'near-api-js';

import { keyStore } from './keyStore';

(window as any).Buffer = buffer.Buffer;

const { connect, WalletConnection } = nearAPI;

const config = {
  networkId: 'testnet',
  keyStore, // optional if not signing transactions
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org',
  explorerUrl: 'https://explorer.testnet.near.org',
  headers: {},
};

const useConnect = () => {
  const [wallet, setWallet] = React.useState<nearAPI.WalletConnection | undefined>();

  React.useEffect(() => {
    connect(config).then((near) => {
      const wallet = new WalletConnection(near, 'test_job');

      setWallet(wallet);
    });
  }, []);

  return { wallet };
};

export default useConnect;