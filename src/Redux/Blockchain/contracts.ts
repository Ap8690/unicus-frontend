import Web3 from 'web3'
import WalletLink from 'walletlink'
import detectEthereumProvider from '@metamask/detect-provider'
import WalletConnectProvider from '@walletconnect/web3-provider'
import {MEWethereum} from './mewConfig'
import { sequence } from "0xsequence";
import TronWeb from 'tronweb'


// svgs
import CC_LOGO from '../../Assets/CC_Logo.svg'

import {marketPlaceAbiE, marketPlaceAddressE} from './Ethereum/marketPlace'
import {createNFTAbiE, createNFTAddressE} from './Ethereum/createNFT'
import {auctionAbiE, auctionAddressE} from './Ethereum/auction'
import {marketPlaceAbiB, marketPlaceAddressB} from './Binance/marketPlace'
import {createNFTAbiB, createNFTAddressB} from './Binance/createNFT'
import {auctionAbiB, auctionAddressB} from './Binance/auction'
import {marketPlaceAbiP, marketPlaceAddressP} from './Polygon/marketPlace'
import {createNFTAbiP, createNFTAddressP} from './Polygon/createNFT'
import {auctionAbiP, auctionAddressP} from './Polygon/auction'
import {PROVIDER} from '../constants'
import { avalancheChain, bscChain, ethChain, polygonChain, tronChain } from '../../config'
import { auctionAbiT, auctionAddressT } from './Tron/auction'
import { createNFTAddressT, createNFTAbiT } from './Tron/createNFT'
import { marketPlaceAddressT, marketPlaceAbiT } from './Tron/marketPlace'
import { toast } from 'react-toastify'
import { marketPlaceAddressA } from './avalanche/marketPlace'
import { createNFTAddressA } from './avalanche/createNFT'
import { auctionAddressA } from './avalanche/auction'

export const RPC_URLS = {
  1: 'https://mainnet.infura.io/v3/7834b610dbc84b509297a8789ca345e0',
  4: 'https://rinkeby.infura.io/v3/7834b610dbc84b509297a8789ca345e0',
  137: 'https://polygon-mainnet.infura.io/v3/7834b610dbc84b509297a8789ca345e0',
  80001: 'https://polygon-mumbai.infura.io/v3/7834b610dbc84b509297a8789ca345e0',
  97: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  56: 'https://bsc-dataseed.binance.org/',
}
//mainnet
// const fullNode = "https://api.trongrid.io";
// const solidityNode = "https://api.trongrid.io";
// const eventServer = "https://api.trongrid.io";
// const privateKey ="";

//testnet
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://shasta.api.trongrid.io");
const solidityNode = new HttpProvider("https://shasta.api.trongrid.io");
const eventServer = new HttpProvider("https://shasta.api.trongrid.io");
const privateKey = "01";
//@ts-ignore
export const tronWeb =  window.tronWeb? window.tronWeb: new TronWeb({fullNode,solidityNode, privateKey})
// tronWeb.setHeader({"TRON-PRO-API-KEY": '48275ede-4e7d-4958-b87d-2ad86499fca3'});
// coinbase
export const walletLink = new WalletLink({
  appName: 'Unicus',
  appLogoUrl: CC_LOGO,
  darkMode: false,
})

export const ethereumCoinbase = walletLink.makeWeb3Provider(RPC_URLS[Number(polygonChain)], Number(polygonChain))

const POLLING_INTERVAL = 12000

// walletconnect
export const walletConnectorProvider: any = new WalletConnectProvider({
  rpc: {137 : RPC_URLS[Number(polygonChain)]},
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
})

// ######################333

export let metaMaskProvider: any
// export let walletConnectorProvider: any

export const getMetamaskProvider = () => async (dispatch: any) => {
  try {
    metaMaskProvider = await detectEthereumProvider()
    dispatch({
      type: PROVIDER,
      payload: metaMaskProvider,
    })
  } catch (error: any) {
    console.log(error?.message)
  }
}

// sequence
 export const sequenceProvider = new sequence.Wallet();


const getContracts = (walletType: string, networkID: string) => {
   let marketPlace: any,
     createNFT: any,
     auction: any,
     marketAddress: string,
     createAddress: string,
     auctionAddress: string;
  let web3: any = new Web3(RPC_URLS[bscChain])
  
  switch (walletType) {
    case 'MetaMask':
      if (metaMaskProvider) {
        web3 = new Web3(metaMaskProvider)
      }
      break
    case 'Coinbase':
      web3 = new Web3(ethereumCoinbase)
      break
    case 'WalletConnector':
      web3 = new Web3(walletConnectorProvider)
      break
    case 'MEW':
      web3 = new Web3(MEWethereum)
      break
    // case 'Sequence':
    //   web3 = new Web3(sequenceProvider.getProvider(). as provider)
    //   break
    
    default:
      web3 = new Web3(RPC_URLS[networkID])
      break
  }
  console.log(typeof networkID,typeof avalancheChain, 'chains')

  switch (networkID) {
    case ethChain:
      marketAddress = marketPlaceAddressE
      createAddress = createNFTAddressE
      auctionAddress = auctionAddressE
      marketPlace = new web3.eth.Contract(marketPlaceAbiE, marketPlaceAddressE)
      createNFT = new web3.eth.Contract(createNFTAbiE, createNFTAddressE)
      auction = new web3.eth.Contract(auctionAbiE, auctionAddressE)
      break
    case bscChain:
      marketAddress = marketPlaceAddressB
      createAddress = createNFTAddressB
      auctionAddress = auctionAddressB
      marketPlace = new web3.eth.Contract(marketPlaceAbiB, marketPlaceAddressB)
      createNFT = new web3.eth.Contract(createNFTAbiB, createNFTAddressB)
      auction = new web3.eth.Contract(auctionAbiB, auctionAddressB)
      break
    case polygonChain:
      marketAddress = marketPlaceAddressP
      createAddress = createNFTAddressP
      auctionAddress = auctionAddressP;
      marketPlace = new web3.eth.Contract(marketPlaceAbiP, marketPlaceAddressP)
      createNFT = new web3.eth.Contract(createNFTAbiP, createNFTAddressP)
      auction = new web3.eth.Contract(auctionAbiP, auctionAddressP)
      break 
    case avalancheChain:
      console.log(marketPlaceAddressA,'marketplace a')
      marketAddress = marketPlaceAddressA
      createAddress = createNFTAddressA
      auctionAddress = auctionAddressA;
      marketPlace = new web3.eth.Contract(marketPlaceAbiP, marketPlaceAddressA)
      createNFT = new web3.eth.Contract(createNFTAbiP, createNFTAddressA)
      auction = new web3.eth.Contract(auctionAbiP, auctionAddressA)
      break 
    case tronChain:
      try{
      marketAddress = marketPlaceAddressT;
      createAddress = createNFTAddressT;
      auctionAddress = auctionAddressT;
      marketPlace = tronWeb.contract(marketPlaceAbiT, marketPlaceAddressT);
      createNFT = tronWeb.contract(createNFTAbiT, createNFTAddressT);
      auction = tronWeb.contract(auctionAbiT, auctionAddressT);
      }
      catch(err){
        console.log(err);
      }
      break

    // default:
    //   marketAddress = marketPlaceAddressB
    //   createAddress = createNFTAddressB
    //   auctionAddress = auctionAddressB;
    //   marketPlace = new web3.eth.Contract(marketPlaceAbiB, marketPlaceAddressB)
    //   createNFT = new web3.eth.Contract(createNFTAbiB, createNFTAddressB)
    //   auction = new web3.eth.Contract(auctionAbiB, auctionAddressB)
    //   break
  }

  

  return {
    web3,
    marketPlace,
    createNFT,
    auction,
    marketAddress,
    createAddress,
    auctionAddress,
  }
}

export async function setNotification(tx: string) {
  console.log("notify started", tx);
  
  toast(
    `Transaction sent successfully! Waiting for confirmation. Click here to view on Tronscan`,
    {
      toastId: tx,
      type: "warning",
      autoClose: 30000,
      closeOnClick: false,
      closeButton: true,
      onClick: (event) => {
        const _url: string = "https://tronscan.org/#/transaction/";
        window.open(_url + tx, "_blank");
      },
    }
  );
  return await awaitTx(tx)
    .then((res: any) => {
      console.log("tx-res", res);

      if (res.receipt.result === "SUCCESS") {
        toast.dismiss(tx);
        toast("Transaction confirmed successfully", {
          type: "success",
        });
        return res;
      } else {
        toast.dismiss(tx);
        toast("Error sending transaction " + (res.receipt.result || ""), {
          type: "error",
        });
        return false;
      }
    })
    .catch((err) => {
      console.log("trx-err", err);
      
      toast.dismiss(tx);
      toast.error(err);
      return false;
    });
}

export const awaitTx = (tx: any) => {
  return new Promise((resolve, reject) => {
      let i = 0;
      (function check() {
        //@ts-ignore
        tronWeb.trx.getTransactionInfo(tx).then((res: any) => {
          res && "id" in res
            ? resolve(res)
            : i++ < 300
            ? setTimeout(check, 10 * 1000)
            : reject();
        }, reject);
      })();
  });
};

export default getContracts
