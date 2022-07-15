const CONTRACT_NAME = process.env.CONTRACT_NAME || 'nft-contract.boomboom.testnet';
const MARKET_CONTRACT_NAME = process.env.MARKET_CONTRACT_NAME || 'market_contract.boomboom.testnet';



export const mintNFTB = "0x451853f88ec565F04F40d74DBbC45C9C8Ff32793"
export const mintNFTP = "0x9fd3F105c9ce43FcF8B337Bf2EaF4fD30fFe49C5"
export const mintNFTE = "0x9529eB4956EC7a33C12980a62c4D8135f7Ca1887"

// mainnet
// export const bscChain = "56"
// export const ethChain = "1"
// export const polygonChain = "137"
export const tronChain = "8766"

// export const bscChainHex = "0x38"
// export const ethChainHex = "0x1"
// export const polygonChainHex = "0x89"
// export const backendUrl = "https://nft-backend.unicus.one"
// export const backendUrl = "https://unicus-storefront-backend-qa.herokuapp.com";
export const backendUrl =
  process.env.REACT_APP_ENV === "local"
    ? "http://localhost:4000"
    : process.env.REACT_APP_ENV === "development"
    ? "https://unicus-storefront-backend-test.herokuapp.com"
    : process.env.REACT_APP_ENV === "staging"
    ? "https://unicus-storefront-backend-qa.herokuapp.com"
    : process.env.REACT_APP_ENV === "demo"
    ? "https://unicus-storefront-backend-demo.herokuapp.com"
    : "https://unicus-storefront-backend.herokuapp.com";
// testnet
export const bscChain = "97"
export const ethChain = "4"
export const polygonChain = "80001"

export const bscChainHex = "0x61"
export const ethChainHex = "0x4"
export const polygonChainHex = "0x13881"

export function getConfig(env) {
  switch(env) {
    case 'production':
    case 'mainnet':
      return {
        networkId: 'mainnet',
        nodeUrl: 'https://rpc.mainnet.near.org',
        contractName: CONTRACT_NAME,
        marketContractName: MARKET_CONTRACT_NAME,
        walletUrl: 'https://wallet.near.org',
        helperUrl: 'https://helper.mainnet.near.org'
      };
    case 'development':
    case 'testnet':
      return {
        networkId: 'testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        contractName: CONTRACT_NAME,
        marketContractName: MARKET_CONTRACT_NAME,
        GAS: "200000000000000",
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org',
      };
    case 'betanet':
      return {
        networkId: 'betanet',
        nodeUrl: 'https://rpc.betanet.near.org',
        contractName: CONTRACT_NAME,
        marketContactName: MARKET_CONTRACT_NAME,
        walletUrl: 'https://wallet.betanet.near.org',
        helperUrl: 'https://helper.betanet.near.org'
      };
    case 'local':
      return {
        networkId: 'local',
        nodeUrl: 'http://localhost:3030',
        keyPath: `${process.env.HOME}/.near/validator_key.json`,
        walletUrl: 'http://localhost:4000/wallet',
        contractName: CONTRACT_NAME,
        marketContactName: MARKET_CONTRACT_NAME,
      };
    case 'test':
    case 'ci':
      return {
        networkId: 'shared-test',
        nodeUrl: 'https://rpc.ci-testnet.near.org',
        contractName: CONTRACT_NAME,
        marketContactName: MARKET_CONTRACT_NAME,
        masterAccount: 'test.near'
      };
    case 'ci-betanet':
      return {
        networkId: 'shared-test-staging',
        nodeUrl: 'https://rpc.ci-betanet.near.org',
        contractName: CONTRACT_NAME,
        marketContactName: MARKET_CONTRACT_NAME,
        masterAccount: 'test.near'
      };
    default:
      throw Error(`Unconfigured environment '${env}'. Can be configured in src/config.js.`);
  }
}




