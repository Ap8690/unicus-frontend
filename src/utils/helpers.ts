import * as nearAPI from "near-api-js";
import BN from "bn.js";
import {
    nearChain,
    solonaChain,
    ethChain,
    bscChain,
    tronChain,
    avalancheChain,
    polygonChain,
} from "../config";
import { ethers } from "ethers";

const { keyStores, connect, transactions, WalletConnection } = nearAPI;

export async function initContract() {
    console.log(
        { keyStores, connect, transactions, WalletConnection },
        "mearfkdjfj"
    );
    const config = {
        networkId: "testnet",
        keyStore: new keyStores.BrowserLocalStorageKeyStore(),
        nodeUrl: "https://rpc.testnet.near.org",
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        exploreUrl: "https://explorer.testnet.near.org",
        headers: {},
    };
    const keyStore = new keyStores.BrowserLocalStorageKeyStore();
    const near = await connect(config);
    const walletConnection = new WalletConnection(near, "unicus");

    return { config, walletConnection, keyStore, networkId: config.networkId };
}

export async function initNear(accessKey: any) {
    console.log(
        { keyStores, connect, transactions, WalletConnection },
        "mearfkdjfj"
    );
    const config = {
        networkId: "testnet",
        keyStore: new keyStores.BrowserLocalStorageKeyStore(),
        nodeUrl: "https://rpc.testnet.near.org",
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        exploreUrl: "https://explorer.testnet.near.org",
        headers: {},
    };
    // const keyStore = new keyStores.BrowserLocalStorageKeyStore();
    // const near = await connect(config);
    // @ts-ignore
    const accountId = window.near.getAccountId();
    const keyStore = new nearAPI.keyStores.InMemoryKeyStore();
    const keyPair = nearAPI.KeyPair.fromString(accessKey.secretKey);
    await keyStore.setKey('testnet', accountId, keyPair);
    const near = await nearAPI.connect(Object.assign({ deps: { keyStore } }, config));
    const walletConnection = new WalletConnection(near, "unicus");


    return { config, walletConnection, keyStore, networkId: config.networkId };
}

export const sendMeta = async (walletConnection: any, nearConfig: any) => {
    return await walletConnection.account().functionCall({
        contractId: "nft-contract.boomboom.testnet",
        methodName: "new_default_meta",
        args: {
            owner_id: "nft-contract.boomboom.testnet",
        },
        attachedDeposit: new BN(0),
        walletMeta: "",
        walletCallbackUrl: "",
    });
};

export const getDecimal = (chain: any) => {
    if (chain.toString() == nearChain) {
        return 10 ** 24;
    } else if (chain.toString() == solonaChain) {
        return 1000000000;
    } else if (chain.toString() == tronChain) {
        return 1000000;
    } else {
        return 10 ** 18;
    }
};

export function capitalize(s: string) {
    return s && s[0].toUpperCase() + s.slice(1);
}

const AbiCoder = ethers.utils.AbiCoder;
const ADDRESS_PREFIX_REGEX = /^(41)/;
const ADDRESS_PREFIX = "41";

//types:Parameter type list, if the function has multiple return values, the order of the types in the list should conform to the defined order
//output: Data before decoding
//ignoreMethodHash：Decode the function return value, fill falseMethodHash with false, if decode the data field in the gettransactionbyid result, fill ignoreMethodHash with true

export async function decodeParams(
    types: any,
    output: any,
    ignoreMethodHash: any
) {
    if (!output || typeof output === "boolean") {
        ignoreMethodHash = output;
        output = types;
    }

    if (ignoreMethodHash && output.replace(/^0x/, "").length % 64 === 8)
        output = "0x" + output.replace(/^0x/, "").substring(8);

    const abiCoder = new AbiCoder();

    if (output.replace(/^0x/, "").length % 64)
        throw new Error(
            "The encoded string is not valid. Its length must be a multiple of 64."
        );
    return abiCoder.decode(types, output).reduce((obj, arg, index) => {
        if (types[index] == "address")
            arg = ADDRESS_PREFIX + arg.substr(2).toLowerCase();
        obj.push(arg);
        return obj;
    }, []);
}

// check on nft page is wallet connected with the desired chain
export const isChainConnected = (pageChain: any) => {
    let chainName = null;
    if (pageChain === polygonChain) {
        chainName = "Polygon";
    } else if (pageChain === bscChain) {
        chainName = "Binance";
    } else if (pageChain === ethChain) {
        chainName = "Ethereum";
    } else if (pageChain === avalancheChain) {
        chainName = "Avalanche";
    } else if (pageChain === tronChain) {
        chainName = "Tron";
    } else if (pageChain === solonaChain) {
        chainName = "Solana";
    } else if (pageChain === nearChain) {
        chainName = "Near";
    }

    // pageChain will be Chain Id
    // Below will give chain name
    let connectedChain: any = localStorage.getItem("walletChain") || 0;
    return connectedChain === chainName;
};

export const getLocalStorage = (item: any) => {
    return localStorage.getItem(item) ? localStorage.getItem(item) : null;
};
export const getLocation = (path: string) => {
    return window.location.pathname.includes(path);
};

// iterate through the store object and return the enabled store
export const getEnabledStore = (storeData: any) => {
    let enabledObj: any = {};
    if (Object.keys(storeData).length !== 0) {
        if (storeData?.showEth && storeData?.showEth.enabled) {
            enabledObj = { ...enabledObj, showEth: true };
        }
        if (storeData?.showPoly && storeData?.showPoly.enabled) {
            enabledObj = { ...enabledObj, showPoly: true };
        }
        if (storeData?.showAva && storeData?.showAva.enabled) {
            enabledObj = { ...enabledObj, showAva: true };
        }
        if (storeData?.showBinanace && storeData?.showBinanace.enabled) {
            enabledObj = { ...enabledObj, showBinanace: true };
        }
        if (storeData?.showNear && storeData?.showNear.enabled) {
            enabledObj = { ...enabledObj, showNear: true };
        }
        if (storeData?.showSolana && storeData?.showSolana.enabled) {
            enabledObj = { ...enabledObj, showSolana: true };
        }
        if (storeData?.showTron && storeData?.showTron.enabled) {
            enabledObj = { ...enabledObj, showTron: true };
        }
    }
    if (enabledObj["showEth"]) {
        return "ethereum";
    }
    if (enabledObj["showPoly"]) {
        return "polygon";
    }
    if (enabledObj["showAva"]) {
        return "avalanche";
    }
    if (enabledObj["showBinance"]) {
        return "binance";
    }
    if (enabledObj["showNear"]) {
        return "near";
    }
    if (enabledObj["showSolana"]) {
        return "solana";
    }
    if (enabledObj["showTron"]) {
        return "tron";
    }
    return false;
};
