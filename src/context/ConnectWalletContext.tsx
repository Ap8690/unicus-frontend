import { createContext, useState } from "react";
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
} from "../utils/utils";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "../utils/constants";
import { cookieDomain } from "../config";
import { walletLogin } from "../services/api/supplier";

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
    const { wallet, connect, publicKey } = useWallet();
    const { setVisible } = useWalletModal();
    const [fullLoading,setFullLoading] = useState(false)
    const [chainConnected,setChainConnected] = useState('')
    const [walletModal,setWalletModal] = useState<boolean>(false)
    const getSolWallet = () => {
        return wallet;
    };
    //@ts-ignore
    const loginWallet = async (walletAddress: string) => {
        // toast("Connecting to wallet...");
        try {
            setFullLoading(true)
            let address: any, token: any;
            switch (walletAddress) {
                case "meta": {
                    const data = await connToMetaMask();
                    address = data.account;
                    token = data.token;
                    break;
                }
                case "cb": {
                    const data = await connToCoinbase();
                    address = data.account;
                    token = data.token;
                    break;
                }
                case "wc": {
                    const data = await connToWalletConnector();
                    address = data.account;
                    token = data.token;
                    break;
                }
                case "mew": {
                    const data = await connToMew();
                    address = data.account;
                    token = data.token;
                    break;
                }
                case "tron": {
                    address = await connToTron();
                    console.log(address,"address")
                    break;
                }
                case "sol": {
                    address = await connToSol(
                        publicKey,
                        getSolWallet,
                        connect,
                        setVisible
                    );
                    break;
                }
                case "near": {
                    address = await connectNear();
                    console.log(address,"address")
                    break;
                }
            }
            if (address) {
                const res = await walletLogin(address,token);
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
                if (window.location.pathname === '/connect-wallet/marketplace' || window.location.pathname === '/connect-wallet')
                    navigate(`/marketplace`)
                // window.location.reload();
            } else {
                if (walletAddress !== "near") {
                    toast.error("Wallet connection failed");
                }
            }
            
        } catch (e) {
            toast.error(e.message);
            console.log(e);
            setFullLoading(false)
        }
    };

    return (
        <ConnectWalletContext.Provider value={{ loginWallet,fullLoading,setFullLoading, chainConnected,setChainConnected,walletModal,setWalletModal }}>
            {children}
        </ConnectWalletContext.Provider>
    );
};
