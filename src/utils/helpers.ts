import * as nearAPI from "near-api-js";
import BN from "bn.js";
import { nearChain, solonaChain } from "../config";


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

  /*const config = getConfig(process.env.NEAR_ENV || 'testnet');
  const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore()
  const near =  await nearAPI.connect({keyStore, ...nearConfig})
  const walletConnection = new nearAPI.WalletConnection(near)*/

  let currentUser;

  return { config, walletConnection };
}

export const sendMeta = async (walletConnection:any,nearConfig:any ) => {
  console.log("near", nearConfig);
  try{
  let functionCallResult = await walletConnection.account().functionCall({
    contractId: "nft-contract.boomboom.testnet",
    methodName: "new_default_meta",
    args: {
      owner_id: "nft-contract.boomboom.testnet",
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
}catch(e){
  console.log(e);
  
}
};

export const getDecimal=(chain)=>{
  if(chain.toString()== nearChain){
    return 10**24
  }else if(chain.toString() == solonaChain){
    return 1000000000
  }
    else{
    return 10**18
  }

}