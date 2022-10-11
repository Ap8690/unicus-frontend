import { createContext, useEffect, useState } from "react";
import { getChainName } from "../utils/utils";
import Cookies from "js-cookie";

export type ChainContextType = {
    chain: string | null;
    setChain: (value: string) => void;
    showChains?: boolean;
    setShowChains?: (value: boolean) => void;
    showCategory?: boolean;
    setShowCategory?: (value: boolean) => void;
    category?: string | null;
    setCategory?: (value: string) => void;
    chainEnvironment?: string | null;
    setChainEnvironment?: (value: string) => void;
};
export const ChainContext = createContext<ChainContextType | null>(null);

export const ChainProvider = ({ children }) => {
    const [chain, setChain] = useState("all");
    const [showChains, setShowChains] = useState(false);
    const [category, setCategory] = useState("");
    const [showCategory, setShowCategory] = useState(false);
    const [chainEnvironment, setChainEnvironment] = useState("mainnet");

    useEffect(() => {
        if (localStorage.getItem("walletChain")) {
            console.log("HERE",localStorage.getItem("walletChain"),getChainName(localStorage.getItem("walletChain")))
                setChain((localStorage.getItem("walletChain")));
        }
        console.log("chain id: ", chain);
    }, [localStorage.getItem("walletChain"),chain]);
    useEffect(() => {
        if (sessionStorage.getItem("CATEGORY")) {
            setCategory(sessionStorage.getItem("CATEGORY"));
        }
    }, [sessionStorage.getItem("CATEGORY")]);
    useEffect(() => {
        if (Cookies.get("Chain_Environment"))
            setChainEnvironment(Cookies.get("Chain_Environment"));
    }, [Cookies.get("Chain_Environment")]);

    useEffect(() => {
        console.log("NEW CHAIN ", chain);
    }, [chain]);
    return (
        <ChainContext.Provider
            value={{
                chain,
                setChain,
                showChains,
                setShowChains,
                showCategory,
                setShowCategory,
                category,
                setCategory,
                chainEnvironment,
                setChainEnvironment,
            }}
        >
            {children}
        </ChainContext.Provider>
    );
};
