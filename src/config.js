export const mintNFTB = "0x451853f88ec565F04F40d74DBbC45C9C8Ff32793"
export const mintNFTP = "0x9fd3F105c9ce43FcF8B337Bf2EaF4fD30fFe49C5"
export const mintNFTE = "0x9529eB4956EC7a33C12980a62c4D8135f7Ca1887"

// mainnet
export const bscChain = "56"
export const ethChain = "1"
export const polygonChain = "137"

export const bscChainHex = "0x38"
export const ethChainHex = "0x1"
export const polygonChainHex = "0x89"
// export const backendUrl = "https://nft-backend.unicus.one"
// export const backendUrl = "https://unicus-storefront-backend.herokuapp.com";
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
// export const bscChain = "97"
// export const ethChain = "4"
// export const polygonChain = "80001"

// export const bscChainHex = "0x61"
// export const ethChainHex = "0x4"
// export const polygonChainHex = "0x13881"
// export const backendUrl = "https://unicusbackend.herokuapp.com"
// export const backendUrl = "https://unicus-storefront-backend.herokuapp.com";

