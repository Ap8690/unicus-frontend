import "./connectwallet.scss";

import React, { useState, useContext, useEffect } from "react";
import metamaskLogo from "../../assets/svgs/metamask.svg";
import tronLinkLogo from "../../assets/svgs/tron-link.svg";
import phantomLogo from "../../assets/svgs/phantomLogo.svg";
import nearLogo from "../../assets/svgs/nearLogo.svg";
import coinbaseLogo from "../../assets/svgs/coinbase.svg";
import mewLogo from "../../assets/svgs/myetherwallet.svg";
import walletconnectLogo from "../../assets/svgs/walletconnect.svg";
import { AiFillCloseCircle } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { WalletConnection } from "near-api-js";
import { walletLogin } from "../../services/api/supplier";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "../../utils/constants";
import { cookieDomain } from "../../config";
import { ConnectWalletContext } from "../../context/ConnectWalletContext";
import PageLoader from "../../components/Loading/PageLoader";
import ChainModal from "../../components/modals/WalletsModal/ChainModal"

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
        <div className="connect-wallet-page">
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
                    <Wallets loginWallet={loginWallet} />
                </div>
            )}
        </div>
    );
};

export const Wallets = ({ loginWallet }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [chainName, setChainName] = useState("")

    return (
        <div className="connect-wallet-page">
            <div className="connect-wrapper">
                <div className="using-wallets">
                    <div className="blue-head">Connect using Wallet</div>
                    <div className="wallet-text">
                        Connect with one of our available wallet providers or
                        create a new one{" "}
                    </div>
                    <button
                        className="connect-wallet-button"
                        onClick={() => setIsModalOpen(prevState => !prevState)}>
                        Connect Wallet
                    </button>
                    <ChainModal open={isModalOpen} setOpen={setIsModalOpen} setChainName={setChainName} />
                    {/* {isModalOpen ? (
                        <div className="chainSelectorModal">
                            <div className="closeModal">
                                <button className="closeModalButton" onClick={() => setIsModalOpen(prevState => !prevState)}>
                                    <AiFillCloseCircle />
                                </button>
                            </div>
                            <div className="chainSelection">
                                <div className="wallet-button-container">
                                    <button className="wallet-logo">
                                        <img src={metamaskLogo} alt="MetaMask" style={{ width: "2rem" }} />
                                        Metamask
                                    </button>
                                </div>
                                <div className="wallet-button-container">
                                    <button className="wallet-logo">
                                        <img src={tronLinkLogo} alt="TronLink" style={{ width: "2rem" }} />
                                        TronLink
                                    </button>
                                </div>
                                <div className="wallet-button-container">
                                    <button className="wallet-logo">
                                        <img src={nearLogo} alt="NearWallet" style={{ width: "1.9rem" }} />
                                        NearWallet
                                    </button>
                                </div>
                                <div className="wallet-button-container">
                                    <button className="wallet-logo">
                                        <img src={phantomLogo} alt="SolanaConnect" style={{ width: "2rem" }} />
                                        SolanaConnect
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : <button
                        className="connect-wallet-button"
                        onClick={() => setIsModalOpen(prevState => !prevState)}>
                        Connect Wallet
                    </button>
                    } */}
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
