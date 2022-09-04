export const BASE_URL =
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
export const bscChain = process.env.REACT_APP_ENV == "prod" ? "56" : "97";
export const ethChain = process.env.REACT_APP_ENV == "prod" ? "1" : "4";
export const ethChain1155 = process.env.REACT_APP_ENV == "prod" ? "1" : "4";
export const polygonChain = process.env.REACT_APP_ENV== 'prod'?"137":"80001"
export const tronChain =process.env.REACT_APP_ENV== 'prod'? "8700":"8766"
export const solonaChain=process.env.REACT_APP_ENV== 'prod'?"6700":"6766"
export const nearChain=process.env.REACT_APP_ENV== 'prod'?"7700":"7766"
export const avalancheChain = process.env.REACT_APP_ENV== 'prod'? "43114":"43113"

export const UNICUS_STORE =
    process.env.REACT_APP_ENV === "local"
        ? "localhost:3000"
        : process.env.REACT_APP_ENV === "development"
        ? "marketplace.test.unicus.one"
        : process.env.REACT_APP_ENV === "staging"
        ? "marketplace.qa.unicus.one"
        : process.env.REACT_APP_ENV === "demo"
        ? "marketplace.demo.unicus.one"
        : "marketplace.unicus.one";

export const cookieDomain =
    process.env.REACT_APP_ENV === "local"
        ? "localhost"
        : process.env.REACT_APP_ENV === "demo"
        ? "unicus-marketplace-demo.herokuapp.com"
        : "unicus.one";
