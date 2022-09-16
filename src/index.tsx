import ReactDOM from "react-dom/client";
import { useMemo } from "react";
import "./index.scss";
import App from "./App";
import { ChainProvider } from "./context/ChainContext";
import { WalletConnectionProvider } from "./context/ConnectWalletContext";
import { StoreProvider } from "./context/StoreContext";
import { BrowserRouter } from "react-router-dom";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
    ConnectionProvider,
    useWallet,
    WalletProvider,
} from "@solana/wallet-adapter-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
const NewApp = () => {
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    //@ts-ignore
    const wallets = useMemo(
        () => [new PhantomWalletAdapter({ network })],
        [network]
    );
    return (
        <StoreProvider>
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets}>
                    <ChainProvider>
                        <WalletConnectionProvider>
                            <App />
                        </WalletConnectionProvider>
                    </ChainProvider>
                </WalletProvider>
            </ConnectionProvider>
        </StoreProvider>
    );
};

root.render(
    <BrowserRouter>
        <NewApp />
    </BrowserRouter>
);
