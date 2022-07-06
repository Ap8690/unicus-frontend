import './connectwallet.scss'

import React, { useState, useContext } from 'react'
import { Web3Context } from '../../context/Web3Context'
import useConnect from './useConnect';
import { WalletMultiButton, useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

import metamaskLogo from '../../assets/svgs/metamask.svg'
import phantomLogo from '../../assets/svgs/phantomLogo.svg'
import nearLogo from '../../assets/svgs/nearLogo.svg'
import coinbaseLogo from '../../assets/svgs/coinbase.svg'
import mewLogo from '../../assets/svgs/myetherwallet.svg'
import walletconnectLogo from '../../assets/svgs/walletconnect.svg'
import { useNavigate } from 'react-router-dom'

import { WalletConnection } from 'near-api-js';

/*type Event = "connect" | "disconnect";

interface Phantom {
  on: (event: Event, callback: () => void) => void;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}*/


type AuthType = Readonly<{
  wallet?: WalletConnection;
}>;




const ConnectWallet: React.FC<AuthType> = () => {
  const { wallet } = useConnect();
  

  const connectNear = () => wallet?.requestSignIn();

  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const { setVisible } = useWalletModal();
    

    //@ts-ignore
  const { connectMetamask } = useContext(Web3Context);
 /* const [phantom, setPhantom] = useState<Phantom | null>(null);*/

 /* const connectHandler = () => {
    
    if ("solana" in window) {
      setPhantom(window["solana"]);
      phantom?.connect();
    } else {
        alert!("Phantom wallet not found, Get Phantom wallet");
    }
    
  };*/

  const navigate = useNavigate()

  
  //if (wallet?.isSignedIn()) return null;


  

  return (
      <div className='connect-wallet-page'>
          <div className="connect-wrapper">
            <div className="using-email">
                <div className="blue-head">Connect using Email</div>
                <button className="large-btn-outline" onClick={() => navigate('/login')}>
                    Login
                </button>
                <button className="large-btn-outline" onClick={() => navigate('/register')}>
                    Register
                </button>
            </div>
            <div className="using-wallets">
                <div className="blue-head">Connect using Wallet</div>
                <div className='wallet-text'>Connect with one of our available wallet providers or create a new one  </div>
                <div className='wallets'>
                    <button onClick={connectMetamask}>
                        Metamask
                        <img src={metamaskLogo} alt="metamask" />
                    </button>
                    <button onClick={() => setVisible(true)}>
                        SolanaConnect
                        <img src={phantomLogo} alt="Phantom" />
                    </button>
                    <button onClick={connectNear}>
                        NearWallet
                        <img src={nearLogo} alt="Near" />
                    </button>
                    <button>
                        Coinbase
                        <img src={coinbaseLogo} alt="metamask" />
                    </button>
                    <button>
                        WalletConnect
                        <img src={walletconnectLogo} alt="metamask" />
                    </button>
                    <button>
                        MEW
                        <img src={mewLogo} alt="metamask" />
                    </button>
                </div>
            </div>
          </div>
      </div>
  )    
}

export default ConnectWallet