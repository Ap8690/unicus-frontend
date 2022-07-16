import { chainPropTypes } from "@mui/utils";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Web3 from "web3";
import { tronChain, bscChain, ethChain, polygonChain } from "../config";
import { createNFTAbiB, createNFTAddressB } from "../Redux/Blockchain/Binance/createNFT";
import { ethereumCoinbase, getMetamaskProvider, metaMaskProvider, tronWeb, walletConnectorProvider, walletLink } from "../Redux/Blockchain/contracts";
import { createNFTAbiE, createNFTAddressE } from "../Redux/Blockchain/Ethereum/createNFT";
import { MEWethereum } from "../Redux/Blockchain/mewConfig";
import { createNFTAbiP, createNFTAddressP } from "../Redux/Blockchain/Polygon/createNFT";
import web3, { setWeb3Provider } from "../web3";
import { ACCESS_TOKEN, RPC_URLS } from "./constants";

export const connectWallet = async (network) => {
  try{
  let address;
  if (network.toString() === tronChain) {
    // tronLink.request({ method: "tron_requestAccounts" });
    address = tronWeb.defaultAddress.base58;
  } else {
    console.log(3);
    
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    address = accounts[0];
  }
  console.log("add", address);
  
  return address;
}catch(e){
  console.log(e);
}
};

export const AddNetworks = async (network: any) => {
  try {
    await metaMaskProvider.request({
      method: "wallet_switchEthereumChain",
      params: [
        {
          chainId:
            network === "ethereum"
              ? ethChain
              : network === "bnb"
              ? bscChain
              : network === "polygon"
              ? polygonChain
              : null,
        },
      ],
    });
  } catch (error: any) {
    if (error?.code === 4902) {
      try {
        // await metaMaskProvider.request({
        //   method: "wallet_addEthereumChain",
        //   params:
        //     network === "ethereum"
        //       ? ethereum
        //       : network === "bnb"
        //       ? bnb
        //       : network === "polygon"
        //       ? polygon
        //       : null,
        // });
      } catch (addError: any) {
        console.error(addError?.message);
      }
    }
  }
};

// export const checkAndAddNetwork = (data: any) => async (dispatch: any) => {
//   try {
//     await metaMaskProvider.request({
//       method: "wallet_switchEthereumChain",
//       params: [{ chainId: data[0]?.chainId }],
//     });
//   } catch (error: any) {
//     console.log(error);
//     if (error?.code === 4902) {
//       try {
//         await metaMaskProvider.request({
//           method: "wallet_addEthereumChain",
//           params: data,
//         });
//       } catch (addError: any) {
//         console.error(addError?.message);
//       }
//     }
//   }
// };

export const connToMetaMask = async () => {
  try {
  
    const metaMaskProvider:any = await getMetamaskProvider()
    const accounts = await metaMaskProvider.request({
      method: "eth_requestAccounts",
    });
    setWeb3Provider(metaMaskProvider);
    localStorage.setItem("walletType", "Metamask");
    return accounts[0]
  } catch (error: any) {
    console.log(error);
  }
};

export const connToCoinbase = async () => {
  try {
    // dispatch(checkAndAddNetwork())
    const accounts = await ethereumCoinbase.enable();
    // coinbaseWeb3.eth.defaultAccount = accounts[0]
    setWeb3Provider(ethereumCoinbase);
    localStorage.setItem("walletType", "Coinbase");
    return accounts[0];
  } catch (error: any) {
    console.error(error?.message);
  }
};

export const connToWalletConnector =
  async () => {
    try {
      const accounts = await walletConnectorProvider.enable();
      setWeb3Provider(walletConnectorProvider);
      localStorage.setItem("walletType", "WalletConnect");
      return accounts[0];
    } catch (error: any) {
      console.error(error?.message);
    }
  };

export const connToMew = async () => {
  try {
    const accounts = await MEWethereum.request({
      method: "eth_requestAccounts",
    });
    setWeb3Provider(MEWethereum);
    localStorage.setItem("walletType", "MEW");
    return accounts[0];
  } catch (error: any) {
    console.error(error?.message);
  }
};

export const disConnectWallet = ()=> {
  localStorage.removeItem("walletType");
  localStorage.removeItem("userAddress");
  
  Cookies.remove(ACCESS_TOKEN, {
    expires: 30,
  });
  // web3.currentProvider._handleDisconnect()
  walletConnectorProvider.disconnect();
  walletLink.disconnect();
};

export const getUserWallet = async (network) => {
  try{
  let accounts = [];
  if (network.toString() === tronChain) {
    //@ts-ignore
    const address = window.tronWeb.defaultAddress.base58;
    accounts.push(address);
  } else {
    accounts = await web3.eth.getAccounts();
  }
  return accounts;
}catch(e){
  console.log(e);
  
}
};
export const getNftContractAddress=(nft)=>{
  if(nft.contractAddress != undefined){
    return nft.contractAddress;
  }
  else{
    
    return getCreateNftContractAddress(nft.chain)
  }
}
export const getChainSymbol = (chain)=>{
  return chain.toString() === bscChain
    ? "Bsc"
    : chain.toString() === polygonChain
    ? "Matic"
    : chain.toString() === tronChain
    ? "TRX"
    : "Eth";
}
export const selectNetwork = (id: string) => {
  const type =
    id.toString() === bscChain
      ? "Binance"
      : id.toString() === ethChain
      ? "ETH"
      : id.toString() === tronChain
      ? "TRX"
      : "Matic";
  //@ts-ignore
  store.dispatch(AddNetworks(type));
  //@ts-ignore
  store.dispatch(getNetwork(id));
  toast(`Your are now on ${type} chain`, {
    className: "toast-custom",
  });
};

export const getCreateNftABI = (chain) => {
  switch (chain) {
    case ethChain:
      return createNFTAbiE;
    case bscChain:
      return createNFTAbiB;

    case polygonChain:
      return createNFTAbiP;

    default:
      return createNFTAbiE;
  }
};
export const getCreateNftContractAddress = (chain, contractType = "721") => {
  switch (chain) {
    case ethChain:
      return contractType == "721" ? createNFTAddressE : createNFTAddressE;    
case bscChain:
      return createNFTAddressB;
case polygonChain:
      return createNFTAddressP;

    default:
      return contractType == "721"
        ? 
          "0x424bb7731c056a52b45cbd613ef08c69c628735f"
        : "0x424bb7731c056a52b45CBD613Ef08c69c628735f";
  }
};

export const  getCreateNftContract =async (chain, contractType = "721") => {
  const web3 = new Web3(RPC_URLS[80001])
  console.log("chain", chain,await web3.eth.getAccounts());
  
  return new web3.eth.Contract(
    //@ts-ignore
    createNFTAbiP,
    createNFTAddressP
  ); 

};

export const getMarketPlace = (chain, contractType = "721") => {
  switch (chain) {
    case ethChain:
      return contractType == "721"
        ? //@ts-ignore
          new web3.eth.Contract(marketPlaceAbiE, marketPlaceAddressE)
        : //@ts-ignore
          new web3.eth.Contract(marketPlaceAbiE1155, marketPlaceAddressE1155);
    case bscChain:
      //@ts-ignore
      return new web3.eth.Contract(marketPlaceAbiB, marketPlaceAddressB);

    case polygonChain:
      //@ts-ignore
      return new web3.eth.Contract(marketPlaceAbiP, marketPlaceAddressP);

    default:
      return contractType == "721"
        ? //@ts-ignore
          new web3.eth.Contract(marketPlaceAbiE, marketPlaceAddressE)
        : //@ts-ignore
          new web3.eth.Contract(marketPlaceAbiE1155, marketPlaceAddressE1155);
  }
};

export const getAuction = (chain, contractType = "721") => {
  switch (chain) {
    case ethChain:
      return contractType == "721"
        ? //@ts-ignore
          new web3.eth.Contract(auctionAbiE, auctionAddressE)
        : //@ts-ignore
          new web3.eth.Contract(auctionAbiE1155, auctionAddressE1155);
    case bscChain:
      //@ts-ignore
      return new web3.eth.Contract(auctionAbiB, auctionAddressB);

    case polygonChain:
      //@ts-ignore
      return new web3.eth.Contract(auctionAbiP, auctionAddressP);

    default:
      return contractType == "721"
        ? //@ts-ignore
          new web3.eth.Contract(auctionAbiE, auctionAddressE)
        : //@ts-ignore
          new web3.eth.Contract(auctionAbiE1155, auctionAddressE1155);
  }
};

export interface WalletsPopupProps {
  show: boolean;
  handleClose: () => void;
}
export const METAMASK = "MetaMask";
export const TRONLINK = "TronLink";