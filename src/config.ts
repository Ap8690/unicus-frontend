import Cookies from "js-cookie";

const env_uri: any = () => {
    console.log("Cookies.get(): ", Cookies.get("Chain_Environment"));
    if(Cookies.get("Chain_Environment") === 'prod') return true
    return false
};
console.log("env_uri: ", env_uri());

export const BASE_URL: string | undefined =
    process.env.REACT_APP_ENV.trim() === "local"
        ? "http://localhost:4000"
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

// export const chains:any = {
//     // Mainnet
//     'binance': '56',
//     'ethereum': '1',
//     'polygon': '137',
//     'tron': '8700',
//     'solana': '6700',
//     'near': '7700',
//     'avalanche': '43114',
//     'telos':'40',
//     // Testnet
//     'testnet-binance': '56',
//     'testnet-ethereum': '1',
//     'testnet-polygon': '137',
//     'testnet-tron': '8700',
//     'testnet-solana': '6700',
//     'testnet-near': '7700',
//     'testnet-avalanche': '43114',
//     'testnet-telos':'40',
//     'testnet-shardeum': '8080',

// }

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
env_uri === "local"
? "localhost"
: env_uri === "demo"
? "demo.unicus.one"
: "unicus.one"


export const nearNftAddress = "nft-near.lobovh18.testnet"

export const nearMarketAddress = "market-near.lobovh18.testnet"
    process.env.REACT_APP_ENV.trim() === "local"
        ? "localhost"
        : process.env.REACT_APP_ENV.trim() === "demo"
        ? "demo.unicus.one"
        : "unicus.one";
