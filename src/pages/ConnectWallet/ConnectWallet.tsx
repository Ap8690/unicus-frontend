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
import ChainModal from "../../components/modals/WalletsModal/ChainModal";
import WalletsModal from "../../components/modals/WalletsModal/WalletsModal";
import { ChainContext } from "../../context/ChainContext";

type AuthType = Readonly<{
    wallet?: WalletConnection;
}>;

const ConnectWallet: React.FC<AuthType> = () => {
    const { chain } = useContext(ChainContext);
    const navigate = useNavigate();
    let redirect = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [walletModal, setWalletModal] = useState(false);
    const { fullLoading } = useContext(ConnectWalletContext);
    useEffect(() => {
        const message = "";
        const urlParams = new URLSearchParams(window.location.search);
        const nearAccountId = urlParams.get("account_id");
        const nearPublicKey = urlParams.get("public_key");
        if (nearAccountId !== null && nearPublicKey !== null) {
            let token: string;
            walletLogin(nearAccountId, token, "Near", message).then((res) => {
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
                navigate(`/${redirect["*"]}`, { replace: true });
            });
        }
    }, []);
    
    return (
        <div className="connect-wallet-page my-8">
            {fullLoading ? (
                <PageLoader info={""} />
            ) : (
                <div className="connect-wrapper h-[90vh] flex justify-center items-center flex-col">
                    {/* <div className="using-email">
                        <div className="blue-head">Connect using Email</div>
                        <button
                            className="large-btn-outline"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </button>
                    </div> */}
                    <div className="using-wallets my-4">
                        <div className="blue-head">Connect using Wallet</div>
                        <div className="wallet-text mb-[20px]">
                            Connect with one of our available wallet providers
                            or create a new one{" "}
                        </div>
                        <button
                            className="large-btn-outline"
                            onClick={() =>
                                setIsModalOpen((prevState) => !prevState)
                            }
                        >
                            Connect Wallet
                        </button>
                    </div>

                    <ChainModal
                        open={isModalOpen}
                        setOpen={setIsModalOpen}
                        setWalletModal={setWalletModal}
                    />
                    <WalletsModal
                        open={walletModal}
                        setOpen={setWalletModal}
                        chainName={chain?.toLowerCase()}
                    />
                </div>
            )}
        </div>
    );
};

type WalletProps = {
    loginWallet?: any;
    chainName?: any;
};
export const Wallets = ({ loginWallet, chainName }: WalletProps) => {
    return (
        <div className="connect-wallet-page">
            <div className="connect-wrapper">
                <div className="using-wallets m-8">
                    <div className="blue-head">Connect using Wallet</div>
                    <div className="wallet-text">
                        Connect with one of our available wallet providers or
                        create a new one{" "}
                    </div>

                    <AllWallets scase={chainName} loginWallet={loginWallet} />
                    {/* <div className="wallets"></div> */}
                </div>
            </div>
        </div>
    );
};

function AllWallets({ scase, loginWallet }) {
    localStorage.setItem("chainName",scase)
    return (
        <div className="wallets">
            {(() => {
                switch (scase) {
                    case "solana":
                        return (
                            <button onClick={() => {
                                // setVisible(true)
                                loginWallet("sol")
                                }}>
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
                                <button onClick={() => loginWallet("mew")}>
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
                                <button onClick={() => loginWallet("mew")}>
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
                                <button onClick={() => loginWallet("mew")}>
                                    MEW
                                    <img src={mewLogo} alt="metamask" />
                                </button>
                            </>
                        );

                    case "avalanche":
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
                                <button onClick={() => loginWallet("mew")}>
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
                                <button onClick={() => loginWallet("mew")}>
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
