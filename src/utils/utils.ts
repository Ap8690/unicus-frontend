import Cookies from "js-cookie";
import { toast } from "react-toastify";
import TronWeb from "tronweb";
import Web3 from "web3";
import {
    AnchorProvider,
    Program,
    web3 as sol_web3,
} from "@project-serum/anchor";
import {
    tronChain,
    bscChain,
    ethChain,
    polygonChain,
    nearChain,
    UNICUS_STORE,
    solonaChain,
    cookieDomain,
    avalancheChain,
} from "../config";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { IStore } from "../models/Store";
import { auctionAddressB } from "../Redux/Blockchain/Binance/auction";
import { createNFTAddressB } from "../Redux/Blockchain/Binance/createNFT";
import { marketPlaceAddressB } from "../Redux/Blockchain/Binance/marketPlace";
import {
    ethereumCoinbase,
    getMetamaskProvider,
    walletConnectorProvider,
    walletLink,
} from "../Redux/Blockchain/contracts";
import {
    auctionAbiE,
    auctionAddressE,
    auctionAddressE1155,
} from "../Redux/Blockchain/Ethereum/auction";
import {
    createNFTAbiE,
    createNFTAddressE,
    createNFTAddressE1155,
} from "../Redux/Blockchain/Ethereum/createNFT";
import {
    marketPlaceAbiE,
    marketPlaceAddressE,
    marketPlaceAddressE1155,
} from "../Redux/Blockchain/Ethereum/marketPlace";
import { MEWethereum } from "../Redux/Blockchain/mewConfig";
import { auctionAddressP } from "../Redux/Blockchain/Polygon/auction";
import { createNFTAddressP } from "../Redux/Blockchain/Polygon/createNFT";
import { marketPlaceAddressP } from "../Redux/Blockchain/Polygon/marketPlace";
import { addWalletAdd } from "../services/api/supplier";
import { ACCESS_TOKEN } from "./constants";
import { initContract, sendMeta } from "./helpers";
import * as nearAPI from "near-api-js";

import {
    createNFTAbiT,
    createNFTAddressT,
} from "../Redux/Blockchain/Tron/createNFT";
import {
    marketPlaceAbiT,
    marketPlaceAddressT,
} from "../Redux/Blockchain/Tron/marketplace";
import { auctionAbiT, auctionAddressT } from "../Redux/Blockchain/Tron/auction";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import BN from "bn.js";
import { createNFTAddressA } from "../Redux/Blockchain/Avalanche/createNFT";
import { marketPlaceAddressA } from "../Redux/Blockchain/Avalanche/marketPlace";
import { auctionAddressA } from "../Redux/Blockchain/Avalanche/auction";
import Web3Token from "web3-token";
import { WalletConnection } from "near-api-js";
const {
    utils: {
        format: { parseNearAmount },
    },
} = nearAPI;
// for SOLANA
const { SystemProgram, Keypair } = sol_web3;
const baseAccount = Keypair.generate();
//testnet
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = "https://api.shasta.trongrid.io";
const solidityNode = "https://api.shasta.trongrid.io";
const eventServer = "https://api.shasta.trongrid.io";
const privateKey = "";

export const userInfo: any =
    Cookies.get("userInfo") && Cookies.get("userInfo") !== undefined
        ? JSON.parse(Cookies.get("userInfo"))
        : "";

export const getUserInfo = () => {
    const userInfo: any = Cookies.get("userInfo")
        ? JSON.parse(Cookies.get("userInfo"))
        : "";
        console.log("userInfo: ", userInfo);
    return userInfo;
};

// returns chain name
export const getWalletChain = () => {
    return localStorage.getItem("walletChain");
};
export let nearWalletConnection: any;

export let web3 = new Web3(Web3.givenProvider);

//@ts-ignore
export let tronWeb = window.tronWeb
    ? //@ts-ignore
      window.tronWeb
    : new TronWeb({ fullNode, solidityNode, eventServer, privateKey });

interface requestAccountsResponse {
    code: Number; // 200：ok 4000：in queue, no need to repeat commit， 4001：user rejected
    message: String;
}

export const connectWallet = async (
    network: any,
    publicKey: any,
    wallet: any,
    connect: any,
    setVisible: any
) => {
    try {
        let address: any;
        if (network.toString() === nearChain) {
            if (getWalletChain() !== "Near") {
                return toast.error("Please login with NEAR Wallet!");
            }
            if (nearWalletConnection && nearWalletConnection.account()) {
                address = nearWalletConnection.account().accountId;
            } else {
                address = await connectNear();
            }
        } else if (network.toString() === tronChain) {
            //@ts-ignore
            const res: requestAccountsResponse = await tronLink.request({
                method: "tron_requestAccounts",
            });
            console.log("res: ", res);
            if (res?.code === 4001) {
                toast.error("Rejected the authorization!");
            }
            await tronWeb.trx.sign("This has to be signed!");
            console.log("this one has to be signed");
            address = await tronWeb.defaultAddress.base58;
            console.log("address: ", address);
        } else if (network.toString() === solonaChain) {
            address = await connToSol(publicKey, wallet, connect, setVisible);
        } else {
            //@ts-ignore
            await SwitchNetwork(network);
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            address = accounts[0];
        }
        if (!getUserInfo()) {
            toast.error("New Address. Please Login");
            window.location.href = "/login";
            return;
        }
        // if (
        //   userInfo?.wallets?.length === 0 ||
        //   !userInfo?.wallets?.some((el:any) => {
        //     return el?.toLowerCase() === address?.toLowerCase();
        //   })
        // ) {
        //   await addWalletAdd(address).then(async (res: any) => {
        //     Cookies.set("userInfo", JSON.stringify(res.data.user), {
        //       domain: cookieDomain,
        //       expires: 30,
        //     });
        //     localStorage.setItem("userInfo", JSON.stringify(res?.data?.user));
        //   });
        // }

        return address;
    } catch (e) {
        console.log(e);
        toast.error(e?.message);
    }
};
// const getChainData = (network: any) => {
//     switch (network) {
//         case bscChain:
//             return {
//                 chainId: Web3.utils.toHex(network),
//                 rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
//                 chainName: "BSC Testnet",
//                 nativeCurrency: {
//                     name: "TBNB",
//                     symbol: "TBNB", // 2-6 characters long
//                     decimals: 18,
//                 },
//                 blockExplorerUrls: ["https://testnet.bscscan.com/"],
//             };
//         default:
//             return "";
//     }
// };

const chainParams = {
    // polygon testnet
    "80001": [
        {
            chainId: "0x13881",
            rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
            chainName: "Polygon Testnet Mumbai",
            nativeCurrency: {
                name: "tMATIC",
                symbol: "tMATIC", // 2-6 characters long
                decimals: 18,
            },
            blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
        },
    ],
    //polygon mainnet
    "137": [
        {
            chainId: "0x89",
            rpcUrls: ["https://polygon-rpc.com/"],
            chainName: "Polygon Mainnet Mumbai",
            nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC", // 2-6 characters long
                decimals: 18,
            },
            blockExplorerUrls: ["https://polygonscan.com/"],
        },
    ],
    //binance testnet
    "97": [
        {
            chainId: "0x61",
            rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
            chainName: "BSC Testnet",
            nativeCurrency: {
                name: "TBNB",
                symbol: "TBNB", // 2-6 characters long
                decimals: 18,
            },
            blockExplorerUrls: ["https://testnet.bscscan.com/"],
        },
    ],
    //binance testnet
    "56": [
        {
            chainId: "0x38",
            rpcUrls: ["https://bsc-dataseed1.ninicoin.io"],
            chainName: "BSC Mainnet",
            nativeCurrency: {
                name: "BNB",
                symbol: "BNB", // 2-6 characters long
                decimals: 18,
            },
            blockExplorerUrls: ["https://bscscan.com/"],
        },
    ],
    // eth testnet
    "4": [
        {
            chainId: "0x4",
            rpcUrls: ["https://rinkeby.infura.io/v3/"],
            chainName: "Rinkeby Test Network",
            nativeCurrency: {
                name: "RinkebyETH",
                symbol: "RinkebyETH", // 2-6 characters long
                decimals: 18,
            },
            blockExplorerUrls: ["https://rinkeby.etherscan.io"],
        },
    ],
    // eth mainnet
    "1": [
        {
            chainId: "0x4",
            rpcUrls: ["https://mainnet.infura.io/v3/"],
            chainName: "Ethereum Mainnet",
            nativeCurrency: {
                name: "ETH",
                symbol: "ETH", // 2-6 characters long
                decimals: 18,
            },
            blockExplorerUrls: ["https://etherscan.io"],
        },
    ],
    // Avalanche testnet
    "43113": [
        {
            chainId: "0xA869",
            rpcUrls: ["https://api.avax-test.network/ext/C/rpc"],
            chainName: "Fuji (C-Chain)",
            nativeCurrency: {
                name: "AVAX",
                symbol: "AVAX", // 2-6 characters long
                decimals: 18,
            },
            blockExplorerUrls: ["https://testnet.snowtrace.io"],
        },
    ],
};
export const SwitchNetwork = async (network: any) => {
    try {
        const metaMaskProvider: any = await getMetamaskProvider();
        return await metaMaskProvider.request({
            method: "wallet_switchEthereumChain",
            params: [
                {
                    chainId: Web3.utils.toHex(network),
                },
            ],
        });
    } catch (error: any) {
        if (error?.code.toString() === "4902") {
            console.log(chainParams[network]);
            try {
                const metaMaskProvider: any = await getMetamaskProvider();
                await metaMaskProvider.request({
                    method: "wallet_addEthereumChain",
                    params: chainParams[network],
                });
                await SwitchNetwork(network);
            } catch (addError: any) {
                throw new Error(addError);
            }
        } else {
            throw new Error(error);
        }
    }
};

export const createSignature = async (address: string, message: any) => {
    return await web3.eth.sign(web3.eth.accounts.hashMessage(message), address);
};

export const connToMetaMask = async () => {
    const chain = localStorage.getItem("chainName");
    await SwitchNetwork(getChainId(chain));
    const message = new Date().getTime().toString();
    const metaMaskProvider: any = await getMetamaskProvider();
    await metaMaskProvider.request({
        method: "eth_requestAccounts",
    });
    const accounts = await web3.eth.getAccounts();
    web3 = new Web3(metaMaskProvider);
    const token = await createSignature(accounts[0], message);
    localStorage.setItem("walletType", "Metamask");
    return { account: accounts[0], token: token, message: message };
};

export const connToCoinbase = async () => {
    try {
        const message = new Date().getTime().toString();
        const accounts = await ethereumCoinbase.enable();
        web3 = new Web3(ethereumCoinbase);
        localStorage.setItem("walletType", "Coinbase");
        const token = await createSignature(accounts[0], message);
        return { account: accounts[0], token: token, message: message };
    } catch (error: any) {
        console.error(error?.message);
    }
};

export const connToWalletConnector = async () => {
    try {
        const message = new Date().getTime().toString();
        const accounts = await walletConnectorProvider.enable();
        console.log("accounts: ", accounts);
        web3 = new Web3(walletConnectorProvider);
        localStorage.setItem("walletType", "WalletConnect");
        const token = await createSignature(accounts[0], message);
        return { account: accounts[0], token: token, message: message };
    } catch (error: any) {
        console.error(error?.message);
    }
};

export const connToMew = async () => {
    try {
        const message = new Date().getTime().toString();
        const accounts = await MEWethereum.request({
            method: "eth_requestAccounts",
        });
        web3 = new Web3(MEWethereum);
        localStorage.setItem("walletType", "MEW");
        const token = await createSignature(accounts[0], message);
        return { account: accounts[0], token: token, message: message };
    } catch (error: any) {
        console.error(error?.message);
    }
};

export const connToTron = async () => {
    let i = 0;
    const timestamp = new Date().getTime();
    //@ts-ignore
    if (!window?.tronWeb) {
        throw new Error("Please install TronLink Wallet");
    }
    //@ts-ignore
    const res: requestAccountsResponse = await tronLink.request({
        method: "tron_requestAccounts",
    });
    if (res?.code === 4001) {
        toast.error("Rejected the authorization!");
    }
    //@ts-ignore
    tronWeb = window.tronWeb;
    const hex = tronWeb.toHex(timestamp);
    const signHex = await tronWeb.trx.sign(hex);
    return {
        account: tronWeb.defaultAddress.base58,
        token: signHex,
        message: hex,
    };
};

// export async function createNearSignature(
//     walletConnection : any,
//     keyStore: any,
//     networkId: any
// ) {
//     nearWalletConnection = walletConnection;
//     console.log(walletConnection.isSignedIn(), "is");
//     localStorage.setItem("walletChain", "Near");
//     let accountId = await walletConnection.account().accountId;
//     console.log(accountId,"accountId")
//     const timestamp = new Date().getTime().toString().toString();
//     const msg = Buffer.from(timestamp);

//     const signer = new nearAPI.InMemorySigner(keyStore);
//     console.log("signer: ", signer);
//     const sign = await signer.signMessage(msg, accountId, networkId);
//     console.log("sign: ", sign);
//     const publicKey = await signer.getPublicKey(accountId, networkId);
//     console.log("publicKey: ", publicKey);
//     return {
//         account: accountId,
//         message: timestamp,
//         token: {
//             publicKey: publicKey,
//             signature: sign.signature,
//         },
//     };
// }

// export const connectNear = async () => {
//     const { config, walletConnection, keyStore, networkId } =
//         await initContract();
//     if (!walletConnection.isSignedIn()) {
//         await walletConnection.requestSignIn({
//             contractId: "nft.subauction.testnet",
//             // methodNames: ["Unicus One"],
//             // successUrl : `http://localhost:3000/explore/Near?near-login=success`,
//             // failureUrl : 'http://localhost:3000/connect-wallet'
//         });
//         await sendMeta(walletConnection, config);
//     }
//     else{
//       return await createNearSignature(walletConnection,keyStore,networkId);
//     }
// };


export async function createNearSignature(
    keyStore: any,
    networkId: any,
    accountId: any
) {
    const timestamp = new Date().getTime().toString().toString();
    const msg = Buffer.from(timestamp);

    const signer = new nearAPI.InMemorySigner(keyStore);
    console.log("signer: ", signer);
    const sign = await signer.signMessage(msg, accountId, networkId);
    console.log("sign: ", sign);
    const publicKey = await signer.getPublicKey(accountId, networkId);
    console.log("publicKey: ", publicKey);
    return {
        signature: sign.signature,
        message: timestamp,
        publicKey: publicKey,
    };
}

export const connectNear = async () => {
    const { config, walletConnection, keyStore, networkId } =
        await initContract();
    let accountId: any;
    if (!walletConnection.isSignedIn()) {
        // await walletConnection.requestSignIn(
        //     {
        //         contractId: "nft.subauction.testnet",
        //     }
        // );
        await sendMeta(walletConnection, config);
    }
    nearWalletConnection = walletConnection;
    console.log(walletConnection.isSignedIn(),"is")
    localStorage.setItem("walletChain", "Near");
    accountId = walletConnection.account().accountId;
    const data = await createNearSignature(keyStore, networkId, accountId);
    // let p = new nearAPI
    // const pk = await PublicKey.from(data.publicKey).data;
    return {
        account: accountId,
        message: data.message,
        token: {
            publicKey: data.publicKey,
            signature: data.signature,
        },
    };
};

export const sign_solana_message = async () => {
    const message_for_backend = new Date().getTime().toString();
    console.log("message_for_backend: ", message_for_backend);
    // @ts-ignore
    const { signature, publicKey } = await window?.solana.signMessage(
        new TextEncoder().encode(message_for_backend),
        "utf8"
    );
    return {
        message: message_for_backend,
        token: {
            signature,
            publicKey,
        },
    };
};

// const getProvider = () => {
//   if ('phantom' in window) {
//     // @ts-ignore
//     const provider = window.phantom?.solana;

//     if (provider?.isPhantom) {
//       return provider;
//     }
//   }

//   window.open('https://phantom.app/', '_blank');
// };

// export const connToSol = async (publicKey: any, getSolWallet: any, connect: any, setVisible: any) => {
//   // @ts-ignore
//     const provider = getProvider();
//     const resp = await provider.connect();
//     console.log("resp: ", resp);
//       if (resp.publicKey) {
//         const address = resp.publicKey.toBase58()
//         console.log("address: ", address);
//         const sm = await sign_solana_message()
//         return {
//           account: address,
//           message: sm.message,
//           token: sm.token
//         };
//       } else {
//         throw new Error("Connection refused");
//       }
// };
export async function getProvider(wallet: any) {
    /* create the provider and return it to the caller */
    /* network set to local network for now */
    const network = "http://localhost:3000";
    const opts: any = {
        preflightCommitment: "processed",
    };
    const con = new Connection(network, opts.preflightCommitment);
    const ne = new PhantomWalletAdapter("devnet");
    const provider = new AnchorProvider(con, ne, opts.preflightCommitment);
    return provider;
}

export const connToSol = async (
    publicKey: any,
    wallet: any,
    connect: any,
    setVisible: any
) => {
    // const { solana } = window;
    // let connection = new Connection(clusterApiUrl('testnet'));
    // console.log("connection: ", connection);
    // @ts-ignore
    if (!solana || !solana?.isPhantom) {
        throw new Error("Please install Phantom Wallet");
    }
    const provider: any = await getProvider(wallet);
    console.log("provider: ", provider);

    if (provider?.publicKey) {
        console.log("IN public key");
        const sm = await sign_solana_message();
        return {
            account: provider?.publicKey.toBase58(),
            message: sm.message,
            token: sm.token,
        };
    }
    // console.log("wallet: ", wallet);
    // if (!wallet) {
    //     setVisible(true)
    // } else {
    await connect();
    if (wallet.adapter.publicKey) {
        const address = await wallet.adapter.publicKey.toBase58();
        console.log("address: ", address);
        const sm = await sign_solana_message();
        return {
            account: address,
            message: sm.message,
            token: sm.token,
        };
        // } else {
        //     throw new Error("Connection refused")
        // }
    }
};
export const disConnectWallet = async () => {

    Cookies.remove(ACCESS_TOKEN, { domain: cookieDomain, expires: 30 });
    console.log("cookieDomain: ", cookieDomain);
    Cookies.remove("userInfo", { domain: cookieDomain, expires: 30 });
    // walletConnectorProvider.disconnect();
    walletLink.disconnect();
    if(localStorage.getItem("chainName") === 'near') {
        const { walletConnection } = await initContract();
    if (walletConnection.isSignedIn()) {
        walletConnection.signOut();
    }
    }
    localStorage.clear();

};

export const getUserWallet = async (network: any) => {
    try {
        let accounts = [];
        if (network.toString() === tronChain) {
            //@ts-ignore
            const address = window.tronWeb.defaultAddress.base58;
            accounts.push(address);
        } else {
            accounts = await web3.eth.getAccounts();
        }
        return accounts;
    } catch (e) {
        console.log(e);
    }
};

export const getNftContractAddress = (nft: any) => {
    if (nft) {
        if (nft.contractAddress !== undefined) {
            return nft.contractAddress;
        } else {
            return getCreateNftContractAddress(nft.chain, "721");
        }
    }
};
export const getChainSymbol = (chain: any) => {
    if (chain) {
        return chain.toString() === bscChain
            ? "BSC"
            : chain.toString() === polygonChain
            ? "MATIC"
            : chain.toString() === tronChain
            ? "TRX"
            : chain.toString() === avalancheChain
            ? "AVAX"
            : chain.toString() === nearChain
            ? "NEAR"
            : chain.toString() === solonaChain
            ? "SOL"
            : "ETH";
    }
};

// Returns CHAIN ID
export const getChainId = (chain: any) => {
    console.log("getChainId: ", chain);
    switch (chain?.toString().toLowerCase()) {
        case "ethereum":
            return ethChain;
        case "binance":
            return bscChain;
        case "polygon":
            return polygonChain;
        case "avalanche":
            return avalancheChain;
        case "near":
            return nearChain;
        case "tron":
            return tronChain;
        case "solana":
            return solonaChain;
        case "all":
            return 0;
        default:
            return null;
    }
};

// Returns CHAIN Name
export const getChainName = (chain: any) => {
    switch (chain?.toString().toLowerCase()) {
        case ethChain:
            return "ethereum";
        case bscChain:
            return "binance";
        case polygonChain:
            return "polygon";
        case avalancheChain:
            return "avalanche";
        case nearChain:
            return "near";
        case tronChain:
            return "tron";
        case solonaChain:
            return "solana";
        default:
            return chain;
    }
};

// Return Chain Name Using wallet name
export const ChainIdUsingWalletName = (chainName: any) => {
    switch (chainName.toLowerCase()) {
        case "ethereum":
            return ethChain;
        case "binance":
            return bscChain;
        case "polygon":
            return polygonChain;
        case "avalanche":
            return avalancheChain;
        case "near":
            return nearChain;
        case "tron":
            return tronChain;
        case "solana":
            return solonaChain;
        case "all":
            return 0;
        default:
            return null;
    }
};
export const selectNetwork = (chain: string) => {
    const type =
        chain.toString() === bscChain
            ? "Binance"
            : chain.toString() === ethChain
            ? "ETH"
            : chain.toString() === tronChain
            ? "TRX"
            : chain.toString() === avalancheChain
            ? "Avalanche"
            : "Matic";
    SwitchNetwork(chain);
    toast(`Your are now on ${type} chain`, {
        className: "toast-custom",
    });
};

export const getCreateNftABI = () => {
    return createNFTAbiE;
};
export const getMarketplaceABI = () => {
    return marketPlaceAbiE;
};

export const getAuctionABI = () => {
    return auctionAbiE;
};
export const getCreateNftContractAddress = (chain: any, contractType: any) => {
    if (chain) {
        switch (chain.toString()) {
            case ethChain:
                return contractType === "1155"
                    ? createNFTAddressE1155
                    : createNFTAddressE;
            case bscChain:
                return createNFTAddressB;
            case polygonChain:
                return createNFTAddressP;
            case avalancheChain:
                return createNFTAddressA;
            case tronChain:
                return createNFTAddressT;
            case nearChain:
                return "nft.subauction.testnet";
            case solonaChain:
                return;
            default:
                return contractType === "721"
                    ? createNFTAddressE
                    : createNFTAddressE1155;
        }
    }
};

export const getMarketPlaceContractAddress = (
    chain: any,
    contractType = "721"
) => {
    switch (chain.toString()) {
        case ethChain:
            return contractType === "1155"
                ? marketPlaceAddressE1155
                : marketPlaceAddressE;
        case bscChain:
            return marketPlaceAddressB;
        case polygonChain:
            return marketPlaceAddressP;
        case tronChain:
            return marketPlaceAddressT;
        case avalancheChain:
            return marketPlaceAddressA;
        default:
            return contractType === "721"
                ? "0x424bb7731c056a52b45cbd613ef08c69c628735f"
                : "0x424bb7731c056a52b45CBD613Ef08c69c628735f";
    }
};
export const getAuctionContractAddress = (
    chain: { toString: () => any },
    contractType = "721"
) => {
    switch (chain.toString()) {
        case ethChain:
            return contractType === "1155"
                ? auctionAddressE1155
                : auctionAddressE;
        case bscChain:
            return auctionAddressB;
        case polygonChain:
            return auctionAddressP;
        case tronChain:
            return auctionAddressT;
        case avalancheChain:
            return auctionAddressA;

        default:
            return contractType === "1155"
                ? auctionAddressE1155
                : auctionAddressE;
    }
};

export const getCreateNftContract = (chain: any, contractType = "721") => {
    if (chain.toString() === tronChain) {
        return tronWeb.contract(createNFTAbiT, createNFTAddressT);
    } else {
        return new web3.eth.Contract(
            //@ts-ignore
            getCreateNftABI(),
            getCreateNftContractAddress(chain, contractType)
        );
    }
};

export const getMarketPlace = (chain: any, contractType = "721") => {
    if (chain.toString() === tronChain) {
        return tronWeb.contract(marketPlaceAbiT, marketPlaceAddressT);
    } else {
        return new web3.eth.Contract(
            //@ts-ignore
            getMarketplaceABI(),
            getMarketPlaceContractAddress(chain, contractType)
        );
    }
};

export const getAuctionContract = (chain: any, contractType = "721") => {
    if (chain.toString() === tronChain) {
        return tronWeb.contract(auctionAbiT, auctionAddressT);
    } else {
        return new web3.eth.Contract(
            //@ts-ignore
            getAuctionABI(),
            getAuctionContractAddress(chain, contractType)
        );
    }
};

//Near MarketPlace
export const offerPrice = async (token_id: string, assetBid: any) => {
    try {
        await nearWalletConnection.account().functionCall({
            contractId: "market_auct.subauction.testnet",
            methodName: "offer",
            args: {
                nft_contract_id: "nft.subauction.testnet",
                token_id,
            },
            attachedDeposit: parseNearAmount(assetBid.toString()),
            gas: new BN("200000000000000"),
        });
    } catch (e) {
        console.log(e);
    }
};

export const approveNFTForSale = async (token_id: string, assetPrice: any) => {
    let sale_conditions = {
        sale_conditions: parseNearAmount(assetPrice.toString()), // set asset price in ui
    };
    await nearWalletConnection.account().functionCall({
        contractId: "nft.subauction.testnet",
        methodName: "nft_approve",
        args: {
            token_id: token_id,
            account_id: "market_auct.subauction.testnet",
            msg: JSON.stringify(sale_conditions),
        },
        attachedDeposit: new BN(parseNearAmount("0.01")),
    });
};

export const removeSale = async (token_id: any) => {
    await nearWalletConnection.account().functionCall({
        contractId: "market_auct.subauction.testnet",
        methodName: "remove_sale",
        args: {
            nft_contract_id: "nft.subauction.testnet",
            token_id,
        },
        attachedDeposit: parseNearAmount("1"),
        gas: "200000000000000",
    });
};

//Near Auctions
export const approveNFTForAuction = async (
    token_id: any,
    assetPrice: number,
    startTime: number,
    endTime: number
) => {
    let sale_conditions = {
        sale_conditions: parseNearAmount(assetPrice.toString()), // set asset price in ui
    };
    await nearWalletConnection.account().functionCall({
        contractId: "nft.subauction.testnet",
        methodName: "approve_nft_auction",
        args: {
            auction_token: token_id,
            account_id: "market_auct.subauction.testnet",
            start_time: startTime, // Time in seconds (as type u64)
            end_time: endTime, // Time in seconds (as type u64)
            msg: JSON.stringify(sale_conditions),
        },
        attachedDeposit: parseNearAmount("0.01"),
    });
};
export const offerBid = async (token_id: any, assetBid: any) => {
    await nearWalletConnection.account().functionCall({
        contractId: "market_auct.subauction.testnet",
        methodName: "offer_bid",
        args: {
            nft_contract_id: "nft.subauction.testnet",
            token_id,
        },
        attachedDeposit: parseNearAmount(assetBid.toString()),
        gas: "200000000000000",
    });
};
//removes auction and refunds if there is any existing bid
export const removeAuction = async (token_id: any) => {
    await nearWalletConnection.account().functionCall({
        contractId: "market_auct.subauction.testnet",
        methodName: "remove_auction",
        args: {
            nft_contract_id: "nft.subauction.testnet",
            token_id,
        },
        attachedDeposit: "1",
        gas: "200000000000000",
    });
};

//remove the auction and resolve purchase
export const processPurchase = async (token_id: any) => {
    await nearWalletConnection.account().functionCall({
        contractId: "market_auct.subauction.testnet",
        methodName: "process_auction_purchase",
        args: {
            nft_contract_id: "nft.subauction.testnet",
            token_id,
        },
        attachedDeposit: 0,
        gas: "200000000000000",
    });
};

const getMinimumStorage = async () => {
    let minimum_balance = await nearWalletConnection
        .account()
        .viewFunction(
            "market_auct.subauction.testnet",
            "storage_minimum_balance"
        );
    return minimum_balance;
};

export const sendStorageDeposit = async () => {
    const minimum = await getMinimumStorage();
    const res = await nearWalletConnection.account().functionCall({
        contractId: "market_auct.subauction.testnet",
        methodName: "storage_deposit",
        args: {},

        attachedDeposit: minimum,
    });
    return res;
};

export const getStoreName = () => {
    const store = JSON.parse(localStorage.getItem("store")) as IStore;
    if (store && store.general.storeName !== "") {
        return store.general.storeName;
    } else {
        return "Unicus";
    }
};

export const isMainStore = () => {
    return window.location.host === UNICUS_STORE;
    // return false
};
export interface WalletsPopupProps {
    show: boolean;
    handleClose: () => void;
}
export const METAMASK = "MetaMask";
export const TRONLINK = "TronLink";

export function getRPCErrorMessage(err: any) {
    var errorMessageToShow: any;
    if (
        err?.message?.split('"')[0]?.slice(0, 20) === "execution reverted: " ||
        err?.message?.split('"')[0]?.slice(0, 24) === "Internal JSON-RPC error."
    ) {
        var open = err.stack.indexOf("{");
        var close = err.stack.lastIndexOf("}");
        var j_s = err.stack.substring(open, close + 1);
        var j = JSON.parse(j_s);
        console.log(j, "j");
        errorMessageToShow = j?.message
            ? j?.message
            : j?.originalError?.message;
    }
    toast.error(
        errorMessageToShow
            ? errorMessageToShow
            : err.message
            ? err.message
            : err
    );
}
