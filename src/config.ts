import Cookies from "js-cookie";
import binanceLogo from "./assets/blockchain-logo/binanceLogo.svg";
import ethereumLogo from "./assets/blockchain-logo/ethereumLogo.svg";
import ploygonLogo from "./assets/blockchain-logo/polygonLogo.svg";
import solanaLogo from "./assets/blockchain-logo/solanaLogo.svg";
import shardumLogo from "./assets/blockchain-logo/shardumLogo.jpeg";
import telosLogo from "./assets/blockchain-logo/telosLogo.png";
import tronLogo from "./assets/blockchain-logo/tronLogo.svg";
import nearLogo from "./assets/blockchain-logo/nearLogo.svg";
import avalancheLogo from "./assets/blockchain-logo/avalancheLogo.svg";

export const env_uri: any = () => {
    if(Cookies.get("Chain_Environment") === 'mainnet') return true
    return false
};

export const BASE_URL: string | undefined =
    process.env.REACT_APP_ENV.trim() === "local"
        ? "https://unicus-storefront-backend.herokuapp.com"
        : process.env.REACT_APP_ENV.trim() === "development"
        ? "https://unicus-storefront-backend-test.herokuapp.com"
        : process.env.REACT_APP_ENV.trim() === "staging"
        ? "https://unicus-storefront-backend-qa.herokuapp.com"
        : process.env.REACT_APP_ENV.trim() === "demo"
        ? "https://unicus-storefront-backend-demo.herokuapp.com"
        : "https://unicus-storefront-backend.herokuapp.com";
export const bscChain: any = () => env_uri() ? "56" : "97";
export const ethChain: any = () => env_uri() ? "1" : "4";
export const ethChain1155: any =
    () => env_uri() ? "1" : "4";
export const polygonChain: any =
    () => env_uri() ? "137" : "80001";
export const tronChain: any =
    () => env_uri() ? "8700" : "8766";
export const solonaChain: any =
    () => env_uri() ? "6700" : "6766";
export const nearChain: any =
    () => env_uri() ? "7700" : "7766";
export const avalancheChain: any =
    () => env_uri() ? "43114" : "43113";
export const shardeumChain: any =
    () => env_uri() ? "8080" : "8080";
export const telosChain: any =
    () => env_uri() ? "40" : "41";
 
export const chains:any = {
    // Mainnet
    '56': {
        chainId:'56',
        contracts : {
            mintContract: "0x2f376c69feEC2a4cbb17a001EdB862573898E95a",
            marketContract: "0x3Ea3A1a99601eCc2F2F88cF814Ef18ff958B9f63",
            auctionContract: "0xa4C5e68C3EAd90EE2E410F8c433fd2acc2074bC0"
        },
        chainSymbol :"BSC",
        chainName: "binance",
        chainLogo: binanceLogo,
        chainType: "mainnet"
    },
    '1': {
        chainId:'1',
        contracts : {
            mintContract: "0x112f5D47b0f0810CFc07FA6Bf97306583f74D9aE",
            marketContract: "0xc84CCe52ACD5a887fb9C2cD9579F012E9B523058",
            auctionContract: "0x8b073AF7a15511d803d7C0C03361d9b3016aE155"
        },
        chainSymbol :"ETH",
        chainName: "ethereum",
        chainLogo: ethereumLogo,
        chainType: "mainnet"
    },
    '137': {
        chainId:'137',
        contracts : {
            mintContract: "0x1549EabD2a47762413ee1A11e667E67A5825ff44",
            marketContract: "0xf21C3d3f1bA95c0EfFd4C9D957BFd5ddd8b40cAD",
            auctionContract: "0x0F900C4c5CDAf1cBd5Dd9947080051485b7bbE64"
        },
        chainSymbol :"MATIC",
        chainName: "polygon",
        chainLogo: ploygonLogo,
        chainType: "mainnet"
    },
    '97': {
        chainId:'97',
        contracts : {
            mintContract: "0x451853f88ec565F04F40d74DBbC45C9C8Ff32793",
            marketContract: "0x58eC046978bA7205ba4C2846Fde4ca91cE361f9A",
            auctionContract: "0xA78511E45b160763E2875e8459137efE0897812e"
        },
        chainSymbol :"BSC",
        chainName: "binance",
        chainLogo: binanceLogo,
        chainType: "testnet"
    },
    '4': {
        chainId:'4',
        contracts : {
            mintContract: "0x9529eB4956EC7a33C12980a62c4D8135f7Ca1887",
            marketContract: "0x27c57e3041d881e810743A2038aDBE5555016Cf6",
            auctionContract: "0xc90Ae164BCdD963352374DFD22d209Ca0C368444"
        },
        chainSymbol :"ETH",
        chainName: "ethereum",
        chainLogo: ethereumLogo,
        chainType: "testnet"
    },
    '80001': {
        chainId:'80001',
        contracts : {
            mintContract: "0x9fd3F105c9ce43FcF8B337Bf2EaF4fD30fFe49C5",
            marketContract: "0x0f4C92F0C4d8eb8650a73a1c02116570227268e8",
            auctionContract: "0xA360d3C2Fc489E3047C177d7278a61963cE32831"
        },
        chainSymbol :"MATIC",
        chainName: "polygon",
        chainLogo: ploygonLogo,
        chainType: "testnet"
    },
    '43113': {
        chainId:'43113',
        contracts : {
            mintContract: "0x64C87bB950aA9CD0E0Ae1e5124E761cbCa527b57",
            marketContract: "0xBACEbEa9d0FcC456C174C9113fec7DF9212f4DA8",
            auctionContract: "0x2dF9071BF084863B6dAa536f4Fb304DB0FbA7fe2"
        },
        chainSymbol :"AVAX",
        chainName: "avalanche",
        chainLogo: avalancheLogo,
        chainType: "testnet"
    },
    '43114': {
        chainId:'43114',
        contracts : {
            mintContract: "0x64C87bB950aA9CD0E0Ae1e5124E761cbCa527b57",
            marketContract: "0xBACEbEa9d0FcC456C174C9113fec7DF9212f4DA8",
            auctionContract: "0x2dF9071BF084863B6dAa536f4Fb304DB0FbA7fe2"
        },
        chainSymbol :"AVAX",
        chainName: "avalanche",
        chainLogo: avalancheLogo,
        chainType: "mainnet"
    },
    '41':{
        chainId:'41',
        contracts : {
            mintContract: "0xD5b5780eEdcCD3e60742d739d6d114Eaf77b74Fe",
            marketContract: "0x62033A72d19461E9Ff3543a82c48b9A2B1b5409b",
            auctionContract: "0x8b7EFF67e323Af67C0bDEE49881e87C1E433bD6D"
        },
        chainSymbol :"TLOS",
        chainName: "telos",
        chainLogo: telosLogo,
        chainType: "testnet"
    },
    '40':{
        chainId:'40',
        contracts : {
            mintContract: "0xD5b5780eEdcCD3e60742d739d6d114Eaf77b74Fe",
            marketContract: "0x62033A72d19461E9Ff3543a82c48b9A2B1b5409b",
            auctionContract: "0x8b7EFF67e323Af67C0bDEE49881e87C1E433bD6D"
        },
        chainSymbol :"TLOS",
        chainName: "telos",
        chainLogo: telosLogo,
        chainType: "mainnet"
    },
    '8080': {
        chainId:'56',
        contracts : {
            mintContract: "0xD5b5780eEdcCD3e60742d739d6d114Eaf77b74Fe",
            marketContract: "0x8b7EFF67e323Af67C0bDEE49881e87C1E433bD6D",
            auctionContract: "0x62033A72d19461E9Ff3543a82c48b9A2B1b5409b"
        },
        chainSymbol :"SHM",
        chainName: "shardeum",
        chainLogo: shardumLogo,
        chainType: "testnet"
    },
    '8700': {
        chainId:'8700',
        contracts : {
            mintContract: "0xD5b5780eEdcCD3e60742d739d6d114Eaf77b74Fe",
            marketContract: "0x8b7EFF67e323Af67C0bDEE49881e87C1E433bD6D",
            auctionContract: "0x62033A72d19461E9Ff3543a82c48b9A2B1b5409b"
        },
        chainSymbol :"TRX",
        chainName: "tron",
        chainLogo: tronLogo,
        chainType: "mainnet"
    },
    '8766': {
        chainId:'8766',
        contracts : {
            mintContract: "0xD5b5780eEdcCD3e60742d739d6d114Eaf77b74Fe",
            marketContract: "0x8b7EFF67e323Af67C0bDEE49881e87C1E433bD6D",
            auctionContract: "0x62033A72d19461E9Ff3543a82c48b9A2B1b5409b"
        },
        chainSymbol :"TRX",
        chainName: "tron",
        chainLogo: tronLogo,
        chainType: "testnet"
    },
    '6700': {
        chainId:'6700',
        contracts : {
            mintContract: "0xD5b5780eEdcCD3e60742d739d6d114Eaf77b74Fe",
            marketContract: "0x8b7EFF67e323Af67C0bDEE49881e87C1E433bD6D",
            auctionContract: "0x62033A72d19461E9Ff3543a82c48b9A2B1b5409b"
        },
        chainSymbol :"SOL",
        chainName: "solana",
        chainLogo: solanaLogo,
        chainType: "mainnet"
    },
    '6766': {
        chainId:'6766',
        contracts : {
            mintContract: "0xD5b5780eEdcCD3e60742d739d6d114Eaf77b74Fe",
            marketContract: "0x8b7EFF67e323Af67C0bDEE49881e87C1E433bD6D",
            auctionContract: "0x62033A72d19461E9Ff3543a82c48b9A2B1b5409b"
        },
        chainSymbol :"SOL",
        chainName: "solana",
        chainLogo: solanaLogo,
        chainType: "testnet"
    },
    '7700': {
        chainId:'7700',
        contracts : {
            mintContract: "0xD5b5780eEdcCD3e60742d739d6d114Eaf77b74Fe",
            marketContract: "0x8b7EFF67e323Af67C0bDEE49881e87C1E433bD6D",
            auctionContract: "0x62033A72d19461E9Ff3543a82c48b9A2B1b5409b"
        },
        chainSymbol :"NEAR",
        chainName: "near",
        chainLogo: nearLogo,
        chainType: "mainnet"
    },
    "7766": {
        chainId:'7766',
        contracts : {
            mintContract: "0xD5b5780eEdcCD3e60742d739d6d114Eaf77b74Fe",
            marketContract: "0x8b7EFF67e323Af67C0bDEE49881e87C1E433bD6D",
            auctionContract: "0x62033A72d19461E9Ff3543a82c48b9A2B1b5409b"
        },
        chainSymbol :"NEAR",
        chainName: "near",
        chainLogo: nearLogo,
        chainType: "testnet"
    },
    "all": {
        chainId:'0',
        contracts : {
            mintContract: "0x",
            marketContract: "0x",
            auctionContract: "0x"
        },
        chainSymbol :"",
        chainName: "all"
    },

}

export const UNICUS_STORE: string | undefined =
    process.env.REACT_APP_ENV.trim() === "local"
        ? "localhost:3000"
        : process.env.REACT_APP_ENV.trim() === "development"
        ? "marketplace.test.unicus.one"
        : process.env.REACT_APP_ENV.trim() === "staging"
        ? "marketplace.qa.unicus.one"
        : process.env.REACT_APP_ENV.trim() === "demo"
        ? "marketplace.demo.unicus.one"
        : // ? "unicus-marketplace-demo.herokuapp.com"
          "marketplace.unicus.one";

export const cookieDomain: string | undefined =
process.env.REACT_APP_ENV.trim() === "local"
? "localhost"
: process.env.REACT_APP_ENV.trim() === "demo"
? "demo.unicus.one"
: "unicus.one"


export const nearNftAddress = "nft-near.lobovh18.testnet"

export const nearMarketAddress = "market-near.lobovh18.testnet"
   
