import './connectwallet.scss'

import React, { useState, useContext } from 'react'
import { Web3Context } from '../../context/Web3Context'
import { UserContext } from '../../context/UserContext'
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

import { WalletConnection } from 'near-api-js'

const BN = require('bn.js');




/*type Event = "connect" | "disconnect";

interface Phantom {
  on: (event: Event, callback: () => void) => void;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}*/


/*type AuthType = Readonly<{
  wallet?: WalletConnection;
}>;

type Props = Readonly<{
  nearConfig: any,
  walletConnection: any,
}>;*/


//: React.FC<Props>
function ConnectWallet(props: any): JSX.Element {
  const { connection } = useConnection();
   const { wallet, connect, connecting, publicKey } = useWallet();
  const { setVisible } = useWalletModal();

  const { isLogin, setIsLogin } = useContext(UserContext);


  const handleWalletClick = () => {
    try {
      if (!wallet) {
        setVisible(true);
      } else {
        connect();
      }
    } catch (error) {
      console.log("Error connecting wallet:", error);
    }
  };


  const connectNear = () => {
    

    if(!props.near.walletConnection.isSignedIn()) {

      props.near.walletConnection.requestSignIn(
      {
        contractId: "nft-contract.unicus.testnet",
      },
      "UNICUS", // title. Optional, by the way
      "", // successUrl. Optional, by the way
      "" // failureUrl. Optional, by the way
    );
    } else {
      console.log("wallet is already connected");
    }
    sendMeta();
    setIsLogin(true);
  };

  const sendMeta = async () => {
    let functionCallResult = await props.near.walletConnection.account().functionCall({
      contractId: "nft-contract.unicus.testnet",
      methodName: "new_default_meta",
      args: {
        owner_id: "nft-contract.unicus.testnet",
      },
      attachedDeposit: new BN(0),
      walletMeta: "",
      walletCallbackUrl: "",
    });

    if (functionCallResult) {
      console.log("new meta data created: ");
    } else {
      console.log("meta data not created");
    }
  };

 

  
    

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
                    <button onClick={handleWalletClick}>  
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