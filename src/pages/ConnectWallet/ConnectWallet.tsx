import "./connectwallet.scss";

import React, { useState, useContext, useEffect } from "react";
import metamaskLogo from "../../assets/svgs/metamask.svg";
import tronLinkLogo from "../../assets/svgs/tron-link.svg";
import phantomLogo from "../../assets/svgs/phantomLogo.svg";
import nearLogo from "../../assets/svgs/nearLogo.svg";
import coinbaseLogo from "../../assets/svgs/coinbase.svg";
import mewLogo from "../../assets/svgs/myetherwallet.svg";
import walletconnectLogo from "../../assets/svgs/walletconnect.svg";
import { useNavigate, useParams } from "react-router-dom";
import { WalletConnection } from "near-api-js";
import { walletLogin } from "../../services/api/supplier";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "../../utils/constants";
import { cookieDomain } from "../../config";
import { ConnectWalletContext } from "../../context/ConnectWalletContext";
import PageLoader from "../../components/Loading/PageLoader";

type AuthType = Readonly<{
    wallet?: WalletConnection;
}>;

const ConnectWallet: React.FC<AuthType> = () => {
    const navigate = useNavigate();
    let redirect = useParams();
    const { loginWallet, fullLoading } = useContext(ConnectWalletContext);
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const nearAccountId = urlParams.get("account_id");
        const nearPublicKey = urlParams.get("public_key");
        if (nearAccountId !== null && nearPublicKey !== null) {
            // toast("Connection successful...");
            let token: string;
            walletLogin(nearAccountId, token).then((res) => {
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
                console.log(":redirect", redirect["*"]);

                navigate(`/${redirect["*"]}`, { replace: true });
                window.location.reload();
            });
        }
    }, []);

    return (
        <div className="connect-wallet-page my-8">
            {fullLoading ? (
                <PageLoader info={""} />
            ) : (
                <div className="connect-wrapper">
                    <div className="using-email">
                        <div className="blue-head">Connect using Email</div>
                        <button
                            className="large-btn-outline"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </button>
                        <button
                            className="large-btn-outline"
                            onClick={() => navigate("/register")}
                        >
                            Register
                        </button>
                    </div>
                    <Wallets loginWallet={loginWallet} chainName={"all"} />
                </div>
            )}
        </div>
    );
};

export const Wallets = ({ loginWallet, chainName }) => {
    return (
        <div className="connect-wallet-page">
            <div className="connect-wrapper">
                <div className="using-wallets">
                    <div className="blue-head">Connect using Wallet</div>
                    <div className="wallet-text">
                        Connect with one of our available wallet providers or
                        create a new one{" "}
                    </div>
                    <AllWallets scase={chainName} loginWallet={loginWallet} />
                    <div className="wallets"></div>
                </div>
            </div>
        </div>
    );
};

function AllWallets({ scase, loginWallet }) {
    console.log("scase: ", scase);
    return (
        <div className="wallets">
            {(() => {
                switch (scase) {
                    case "solana":
                        return (
                            <button onClick={() => loginWallet("sol")}>
                                SolanaConnect
                                <img src={phantomLogo} alt="Phantom" />
                            </button>
                        );
                    case "tron":
                        return (
                            <button onClick={() => loginWallet("tron")}>
                                TronLink
                                <img src={tronLinkLogo} alt="tronlink" />
                            </button>
                        );
                    case "near":
                        return (
                            <button onClick={() => loginWallet("near")}>
                                NearWallet
                                <img src={nearLogo} alt="Near" />
                            </button>
                        );
                    case "ethereum":
                        return (
                            <>
                                <button onClick={() => loginWallet("meta")}>
                                    Metamask
                                    <img src={metamaskLogo} alt="metamask" />
                                </button>

                                <button onClick={() => loginWallet("cb")}>
                                    Coinbase
                                    <img src={coinbaseLogo} alt="metamask" />
                                </button>
                                <button onClick={() => loginWallet("wc")}>
                                    WalletConnect
                                    <img
                                        src={walletconnectLogo}
                                        alt="metamask"
                                    />
                                </button>
                                <button onClick={() => loginWallet("near")}>
                                    MEW
                                    <img src={mewLogo} alt="metamask" />
                                </button>
                            </>
                        );
                    case "polygon":
                        return (
                            <>
                                <button onClick={() => loginWallet("meta")}>
                                    Metamask
                                    <img src={metamaskLogo} alt="metamask" />
                                </button>

                                <button onClick={() => loginWallet("cb")}>
                                    Coinbase
                                    <img src={coinbaseLogo} alt="metamask" />
                                </button>
                                <button onClick={() => loginWallet("wc")}>
                                    WalletConnect
                                    <img
                                        src={walletconnectLogo}
                                        alt="metamask"
                                    />
                                </button>
                                <button onClick={() => loginWallet("near")}>
                                    MEW
                                    <img src={mewLogo} alt="metamask" />
                                </button>
                            </>
                        );
                    case "binance":
                        return (
                            <>
                                <button onClick={() => loginWallet("meta")}>
                                    Metamask
                                    <img src={metamaskLogo} alt="metamask" />
                                </button>

                                <button onClick={() => loginWallet("cb")}>
                                    Coinbase
                                    <img src={coinbaseLogo} alt="metamask" />
                                </button>
                                <button onClick={() => loginWallet("wc")}>
                                    WalletConnect
                                    <img
                                        src={walletconnectLogo}
                                        alt="metamask"
                                    />
                                </button>
                                <button onClick={() => loginWallet("near")}>
                                    MEW
                                    <img src={mewLogo} alt="metamask" />
                                </button>
                            </>
                        );
                    default:
                        return (
                            <>
                                <button onClick={() => loginWallet("meta")}>
                                    Metamask
                                    <img src={metamaskLogo} alt="metamask" />
                                </button>

                                <button onClick={() => loginWallet("cb")}>
                                    Coinbase
                                    <img src={coinbaseLogo} alt="metamask" />
                                </button>
                                <button onClick={() => loginWallet("wc")}>
                                    WalletConnect
                                    <img
                                        src={walletconnectLogo}
                                        alt="metamask"
                                    />
                                </button>
                                <button onClick={() => loginWallet("near")}>
                                    MEW
                                    <img src={mewLogo} alt="metamask" />
                                </button>
                                <button onClick={() => loginWallet("sol")}>
                                    SolanaConnect
                                    <img src={phantomLogo} alt="Phantom" />
                                </button>
                                <button onClick={() => loginWallet("tron")}>
                                    TronLink
                                    <img src={tronLinkLogo} alt="tronlink" />
                                </button>
                                <button onClick={() => loginWallet("near")}>
                                    NearWallet
                                    <img src={nearLogo} alt="Near" />
                                </button>
                            </>
                        );
                }
            })()}
        </div>
    );
}

export default ConnectWallet;
