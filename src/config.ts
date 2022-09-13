// const env_uri = process.env.REACT_APP_ENV !== 'local' ? process.env.REACT_APP_ENV : "local"
const env_uri: string | undefined  = (process.env.REACT_APP_ENV).trim()

export const BASE_URL: string | undefined = 
    env_uri === "local"
        ? "http://localhost:4000"
        : env_uri === "development"
        ? "https://unicus-storefront-backend-test.herokuapp.com"
        : env_uri === "staging"
        ? "https://unicus-storefront-backend-qa.herokuapp.com"
        : env_uri === "demo"
        ? "https://unicus-storefront-backend-demo.herokuapp.com"
        : "https://unicus-storefront-backend.herokuapp.com"
// testnet
export const bscChain: string | undefined = env_uri === "prod" ? "56" : "97"
export const ethChain: string | undefined = env_uri === "prod" ? "1" : "4"
export const ethChain1155: string | undefined = env_uri === "prod" ? "1" : "4"
export const polygonChain: string | undefined =
    env_uri === "prod" ? "137" : "80001"
export const tronChain: string | undefined = env_uri === "prod" ? "8700" : "8766"
export const solonaChain: string | undefined =
    env_uri === "prod" ? "6700" : "6766"
export const nearChain: string | undefined = env_uri === "prod" ? "7700" : "7766"
export const avalancheChain: string | undefined =
    env_uri === "prod" ? "43114" : "43113"

export const UNICUS_STORE: string | undefined =
    env_uri === "local"
        ? "localhost:3000"
        : env_uri === "development"
        ? "marketplace.test.unicus.one"
        : env_uri === "staging"
        ? "marketplace.qa.unicus.one"
        : env_uri === "demo"
        ? "marketplace.demo.unicus.one"
        // ? "unicus-marketplace-demo.herokuapp.com"
        : "marketplace.unicus.one"

export const cookieDomain: string | undefined =
    env_uri === "local"
        ? "localhost"
        : env_uri === "demo"
        ? "demo.unicus.one"
        : "unicus.one"
