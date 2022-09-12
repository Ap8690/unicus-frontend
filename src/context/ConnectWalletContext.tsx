import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { WalletConnection } from "near-api-js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { toast } from "react-toastify";
import {
    connectNear,
    connToCoinbase,
    connToMetaMask,
    connToMew,
    connToSol,
    connToTron,
    connToWalletConnector,
    sign_solana_message,
} from "../utils/utils";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "../utils/constants";
import { cookieDomain, ethChain, nearChain,solonaChain , tronChain } from "../config";
import { walletLogin } from "../services/api/supplier";
import { ChainContext } from "./ChainContext";
import { WalletAdapterNetwork, WalletName } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";

export type ConnectWalletContextType = {
    loginWallet?: any;
    fullLoading: boolean;
    setFullLoading: (value: boolean) => void;
    chainConnected?: any;
    setChainConnected: (value: any) => void;
    walletModal?:boolean;
    setWalletModal?: (value: boolean) => void;
};
export const ConnectWalletContext =
    createContext<ConnectWalletContextType | null>(null);

export const WalletConnectionProvider = ({ children }) => {
    const navigate = useNavigate();
    const redirect = useParams();
    const { wallet, connect, select, publicKey } = useWallet();
    const { setVisible } = useWalletModal();
    const [fullLoading,setFullLoading] = useState(false)
    const [chainConnected,setChainConnected] = useState('')
    const [walletModal,setWalletModal] = useState<boolean>(false)
    const {chain,setChain} = useContext(ChainContext)
    const [solana,setSolana] = useState(false)
    const [solWallet, setSolWallet] = useState(wallet)
    const [solPublicKey,setSolPublicKey] = useState(publicKey)
    const network = WalletAdapterNetwork.Devnet;

    // const setSolAttributes = async() =>{
    //     const { wallet, connect, select, publicKey } = useWallet();
    //     setSolWallet(wallet)
    //     setSolPublicKey(publicKey)
    // }

    useEffect(()=>{
        console.log(solana,"chain")
        // if(solana === true){
            // logInSolana()
        // }
        const name:any = "Phantom"
        select(name)
    },[])

    const logInSolana =async () => {
        try {
            const sign = await sign_solana_message()
            // select(name)
            //@ts-ignore
            const address = publicKey.toBase58();
            const token : any = sign?.token;
            const message = sign?.message;
            const walletNetwork="Solana"
            const res = await walletLogin(publicKey.toBase58(),token,walletNetwork,message);
            toast.success("Login successful");
            Cookies.set(ACCESS_TOKEN, res.data.accessToken, {
                domain: cookieDomain,
                expires: 30,
            });
            Cookies.set("userInfo", JSON.stringify(res.data.user), {
                domain: cookieDomain,
                expires: 30,
            });

            localStorage.setItem("userInfo", JSON.stringify(res.data.user));
            localStorage.setItem("walletConnected",address)
        } catch (error) {
            console.log(error)
        }
        
    }

    // useEffect(()=>{

    // })

    //@ts-ignore
    const loginWallet = async (walletAddress: string) => {
        try {
            setFullLoading(true)
            let address: any, token: any,walletNetwork: any, message: any;
            switch (walletAddress) {
                case "meta": {
                    const data = await connToMetaMask();
                    address = data.account;
                    token = data.token;
                    message = data.message;
                    walletNetwork="Metamask"
                    // convert the chain to selected chain
                    setChain(ethChain)
                    break;
                }
                case "cb": {
                    const data = await connToCoinbase();
                    address = data.account;
                    token = data.token;
                    message = data.message;
                    walletNetwork="Metamask"
                    // convert the chain to selected chain
                    setChain(ethChain)
                    break;
                }
                case "wc": {
                    const data = await connToWalletConnector();
                    address = data.account;
                    token = data.token;
                    message = data.message;
                    walletNetwork="Metamask"
                    // convert the chain to selected chain
                    setChain(ethChain)
                    break;
                }
                case "mew": {
                    const data = await connToMew();
                    address = data.account;
                    token = data.token;
                    message = data.message;
                    walletNetwork="Metamask"
                    // convert the chain to selected chain
                    setChain(ethChain)
                    break;
                }
                case "tron": {
                    const data = await connToTron(); 
                    address = data.account;
                    token = data.token;
                    message = data.message;
                    walletNetwork="Tron"
                    setChain(tronChain)
                    break;
                }
                case "sol": {
                    const name:any = "Phantom"
                    select(name)
                    const data = await connToSol(
                        publicKey,
                        wallet,
                        connect,
                        setVisible
                    );
                    console.log("SOL Data",data)
                    address = data?.account;
                    token = data?.token;
                    message = data?.message;
                    walletNetwork="Solana"
                    setChain(solonaChain)
                    setSolana(true)
                    break;
                }
                case "near": {
                    const data = await connectNear();
                    walletNetwork="Near"
                    address = data.account
                    token = data.token;
                    message = data.message;
                    setChain(nearChain)
                    break;
                }
            }
            if (address) {
                const res = await walletLogin(address,token,walletNetwork,message);
                toast.success("Login successful");
                Cookies.set(ACCESS_TOKEN, res.data.accessToken, {
                    domain: cookieDomain,
                    expires: 30,
                });
                Cookies.set("userInfo", JSON.stringify(res.data.user), {
                    domain: cookieDomain,
                    expires: 30,
                });

                localStorage.setItem("userInfo", JSON.stringify(res.data.user));
                localStorage.setItem("walletConnected",address)
                let walletChain = null;
                if(walletAddress === "meta" || walletAddress === "cb" || walletAddress === 'wc' || walletAddress === 'mew') {
                    walletChain = "Metamask"
                }
                else if(walletAddress === "tron") {
                    walletChain = "Tron"
                }
                else if(walletAddress === "near") {
                    walletChain = "Near"
                }
                else if(walletAddress === "sol") {
                    walletChain = "Solana"
                }
                localStorage.setItem("walletChain",walletChain);
                setChainConnected(walletAddress)
                setFullLoading(false)
                setWalletModal(false)
                // if(redirect)
                //     navigate(`/${redirect["*"]}`, { replace: true });
                if (window.location.pathname.includes('connect-wallet'))
                    navigate(`/marketplace`)
            } else {
                if (walletAddress !== "near") {
                    toast.error("Wallet connection failed");
                }
            }
            
        } catch (e) {
            localStorage.setItem("error",e)
            toast.error(e?.message || e || "Something went wrong, Please try again");
            console.log("ERROR",e);
            setFullLoading(false)
        }
    };

    return (
        <ConnectWalletContext.Provider value={{ loginWallet,fullLoading,setFullLoading, chainConnected,setChainConnected,walletModal,setWalletModal }}>
            {children}
        </ConnectWalletContext.Provider>
    );
};

