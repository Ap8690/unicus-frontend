import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
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
    getChainName,
} from "../utils/utils";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "../utils/constants";
import {
    cookieDomain,
    ethChain,
    nearChain,
    solonaChain,
    tronChain,
} from "../config";
import { walletLogin } from "../services/api/supplier";
import { ChainContext } from "./ChainContext";

export type ConnectWalletContextType = {
    loginWallet?: any;
    fullLoading: boolean;
    setFullLoading: (value: boolean) => void;
    chainConnected?: any;
    setChainConnected: (value: any) => void;
    walletModal?: boolean;
    setWalletModal?: (value: boolean) => void;
};
export const ConnectWalletContext =
    createContext<ConnectWalletContextType | null>(null);

export const WalletConnectionProvider = ({ children }) => {
    const navigate = useNavigate();
    const redirect = useParams();
    const { wallet, connect, select, publicKey } = useWallet();
    const { setVisible } = useWalletModal();
    const [fullLoading, setFullLoading] = useState(false);
    const [chainConnected, setChainConnected] = useState("");
    const [walletModal, setWalletModal] = useState<boolean>(false);
    const { setShowChains, setChain } = useContext(ChainContext);

    useEffect(() => {
        const name: any = "Phantom";
        select(name);
    }, []);

    const loginWallet = async (walletAddress: string) => {
        try {
            setFullLoading(true);
            let address: any, token: any, walletNetwork: any, message: any;
            switch (walletAddress) {
                case "meta": {
                    const data = await connToMetaMask();
                    address = data.account;
                    token = data.token;
                    message = data.message;
                    walletNetwork = "Metamask";
                    // convert the chain to selected chain
                    break;
                }
                case "cb": {
                    const data = await connToCoinbase();
                    address = data.account;
                    token = data.token;
                    message = data.message;
                    walletNetwork = "Metamask";
                    // convert the chain to selected chain
                    break;
                }
                case "wc": {
                    const data = await connToWalletConnector();
                    address = data.account;
                    token = data.token;
                    message = data.message;
                    walletNetwork = "Metamask";
                    break;
                }
                case "mew": {
                    const data = await connToMew();
                    address = data.account;
                    token = data.token;
                    message = data.message;
                    walletNetwork = "Metamask";
                    // convert the chain to selected chain
                    break;
                }
                case "tron": {
                    const data = await connToTron();
                    address = data.account;
                    token = data.token;
                    message = data.message;
                    walletNetwork = "Tron";
                    // setChain(tronChain)
                    break;
                }
                case "sol": {
                    const name: any = "Phantom";
                    select(name);
                    const data = await connToSol(
                        publicKey,
                        wallet,
                        connect,
                        setVisible
                    );

                    address = data?.account;
                    token = data?.token;
                    message = data?.message;
                    walletNetwork = "Solana";
                    // setChain(solonaChain)
                    break;
                }
                case "near": {
                    const data = await connectNear();
                    walletNetwork = "Near";
                    address = data.account;
                    token = data.token;
                    message = data.message;
                    // setChain(nearChain)
                    break;
                }
            }
            if (address) {
                const res = await walletLogin(
                    address,
                    token,
                    walletNetwork,
                    message
                );
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
                localStorage.setItem("walletConnected", address);
                let walletChain = null;
                if (
                    walletAddress === "meta" ||
                    walletAddress === "cb" ||
                    walletAddress === "wc" ||
                    walletAddress === "mew"
                ) {
                    walletChain = localStorage.getItem("chainName");
                } else if (walletAddress === "tron") {
                    walletChain = "Tron";
                } else if (walletAddress === "near") {
                    walletChain = "Near";
                } else if (walletAddress === "sol") {
                    walletChain = "Solana";
                }
                // Wallet name is stored
                localStorage.setItem("walletChain", getChainName(localStorage.getItem("CHAIN")));
                // Address of wallet
                setChainConnected(walletAddress);
                setFullLoading(false);
                setWalletModal(false);
                setShowChains(false);
                setChain(getChainName(localStorage.getItem("CHAIN")));
                console.log("getChainName(localStorage.getItem): ", getChainName(localStorage.getItem("CHAIN")));
                if (sessionStorage.getItem("redirect_after_login")) {
                    return navigate(
                        sessionStorage.getItem("redirect_after_login")
                    );
                }
                navigate("/explore");
            } else {
                if (walletAddress !== "near") {
                    toast.error("Wallet connection failed");
                }
            }
        } catch (e) {
            localStorage.setItem("error", e);
            toast.error(
                e?.message || e || "Something went wrong, Please try again"
            );
            console.log("ERROR", e);
            setFullLoading(false);
        }
    };

    return (
        <ConnectWalletContext.Provider
            value={{
                loginWallet,
                fullLoading,
                setFullLoading,
                chainConnected,
                setChainConnected,
                walletModal,
                setWalletModal,
            }}
        >
            {children}
        </ConnectWalletContext.Provider>
    );
};
