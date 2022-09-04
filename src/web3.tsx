import Web3 from "web3";

const networkID = localStorage.getItem("networkId") ? localStorage.getItem("networkId"): 1

let web3 = new Web3(Web3.givenProvider);

export const setWeb3Provider=(provider:any)=>{
  web3 = new Web3(provider);
}

export default web3;
