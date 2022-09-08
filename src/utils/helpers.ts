import * as nearAPI from "near-api-js"
import BN from "bn.js"
import { nearChain, solonaChain,ethChain, bscChain,tronChain,avalancheChain, polygonChain } from "../config"
import {ethers} from 'ethers'
import {getChainId} from "../utils/utils"


const { keyStores, connect, transactions, WalletConnection } = nearAPI;

export async function initContract() {
  const config = {
    networkId: "testnet",
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    exploreUrl: "https://explorer.testnet.near.org",
    headers: {},
  };
  const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();
  const near = await nearAPI.connect(config);
  const walletConnection = new nearAPI.WalletConnection(near, "unicus");

  return { config, walletConnection,keyStore, networkId: config.networkId };
}

export const sendMeta = async (walletConnection:any,nearConfig:any ) => {
  return await walletConnection.account().functionCall({
    contractId: "nft-contract.boomboom.testnet",
    methodName: "new_default_meta",
    args: {
      owner_id: "nft-contract.boomboom.testnet",
    },
    attachedDeposit: new BN(0),
    walletMeta: "",
    walletCallbackUrl: "",
  });
};

export const getDecimal=(chain: any)=>{
  if(chain.toString()== nearChain){
    return 10**24
  }else if(chain.toString() == solonaChain){
    return 1000000000
  }
  else if(chain.toString() == tronChain){
    return 1000000
  }
    else{
    return 10**18
  }

}

export function capitalize(s: string)
{
    return s && s[0].toUpperCase() + s.slice(1);
}


const AbiCoder = ethers.utils.AbiCoder;
const ADDRESS_PREFIX_REGEX = /^(41)/;
const ADDRESS_PREFIX = "41";

//types:Parameter type list, if the function has multiple return values, the order of the types in the list should conform to the defined order
//output: Data before decoding
//ignoreMethodHash：Decode the function return value, fill falseMethodHash with false, if decode the data field in the gettransactionbyid result, fill ignoreMethodHash with true

export async function decodeParams(types:any, output:any, ignoreMethodHash:any) {

    console.log(types,"types")
    if (!output || typeof output === 'boolean') {
        ignoreMethodHash = output;
        output = types;
    }

    if (ignoreMethodHash && output.replace(/^0x/, '').length % 64 === 8)
        output = '0x' + output.replace(/^0x/, '').substring(8);

    const abiCoder = new AbiCoder();

    if (output.replace(/^0x/, '').length % 64)
        throw new Error('The encoded string is not valid. Its length must be a multiple of 64.');
    return abiCoder.decode(types, output).reduce((obj, arg, index) => {
        if (types[index] == 'address')
            arg = ADDRESS_PREFIX + arg.substr(2).toLowerCase();
        obj.push(arg);
        return obj;
    }, []);
}
 
// check on nft page is wallet connected with the desired chain
export const isChainConnected = (pageChain:any) => {
  let chainName = null
  if(pageChain === polygonChain || pageChain === bscChain || pageChain === ethChain || pageChain === avalancheChain) {
    chainName = "Metamask"
  }
  else if(pageChain === tronChain) {
    chainName = "Tron"
  }
  else if(pageChain === solonaChain) {
    chainName = "Solana"
  }
  else if(pageChain === nearChain) {
    chainName = "Near"
  }

  // pageChain will be Chain Id
  // Below will give chain name 
  let connectedChain: any = localStorage.getItem("walletChain") || 0
  
  return connectedChain === chainName
}