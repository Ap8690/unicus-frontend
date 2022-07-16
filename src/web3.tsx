import Web3 from "web3";
import { RPC_URLS } from "./utils/constants";

const networkID = localStorage.getItem("networkId")? localStorage.getItem("networkId"): 1
console.log(networkID);

let web3 = new Web3(Web3.givenProvider);

export const setWeb3Provider=(provider)=>{
  web3 = new Web3(provider);
}

export default web3;
