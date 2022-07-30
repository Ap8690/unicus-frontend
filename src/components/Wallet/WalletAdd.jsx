import React, { useState } from "react";
import "./WalletAdd.css";
import wdHeaderImage from "../../images/event-details/ed-top.png";
import { updateWalletAddress } from "../../api/api-client.js";
// web3
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
// modal
import MessageModal from "../../Modals/Message Modal/MessageModal";
import FullLoading from "../../Loading/FullLoading";

// route to /user-wallet-details
const WalletAdd = (props) => {
    const [walletAddress, setWalletAddress] = useState({
        walletAdd: "",
    });
    const [showError, setShowError] = useState(false);
    const [messageModal, setMessageModal] = useState(false);
    const [messageModalDesc, setMessageModalDesc] = useState("");
    const [metaWalletAddress, setMetaWalletAddress] = useState(null);

    const [modalShow, setModalShow] = useState(false);

    const [metaWalletConnected, setMetaWalletConnected] = useState(false);
    const handle = (e) => {
        const newData = { ...walletAddress };
        newData[e.target.id] = e.target.value;
        setWalletAddress(newData);
    };

    const sendWalletInfo = async (walletDetail) => {
        const walletInfo = {
            publicAddress: walletDetail,
        };
        setModalShow(true);
        // //console.log(walletDetail);
        const res = await updateWalletAddress(walletInfo, props.isLogin);
        setMessageModal(true);
        if (res.status === 200) {
            // //console.log("wallet added successfully.");
            setMessageModal(true);
            setMessageModalDesc("wallet added successfully.");
        } else if (res.status === 400) {
            // //console.log(res);
            // //console.log("address already exists");
            setMessageModal(true);
            setMessageModalDesc("address already exists");
        } else {
            setMessageModal(true);
            setMessageModalDesc(res.data.msg);
        }
        setModalShow(false);
    };
    // onClick event --- update wallet address
    const onUpdateWalletAddress = async (event) => {
        event.preventDefault();
        // if(walletAddress.walletAdd !== walletAddress.cwalletAdd) {
        //     return window.alert("Wallet Address does not match.");
        // }
        await sendWalletInfo(walletAddress.walletAdd);
    };

    const web3React = useWeb3React();

    // //console.log(web3React);
    // //console.log(web3React.account);
    async function connect() {
        const walletconnect = new WalletConnectConnector({
            rpc: {
                1: "https://mainnet.infura.io/v3/de7757285d664cb6af8239c7fd98a7cc",
            },
            bridge: "https://bridge.walletconnect.org",
            qrcode: true,
            pollingInterval: 12000,
        });

        web3React.activate(walletconnect);
    }
    // web3React.activate(new InjectedConnector());
    var web3 = new Web3(Web3.givenProvider);
    const connectToMetamask = async () => {
        if (!window.ethereum) {
            return window.alert("Please install metamask");
        }
        setModalShow(true);
        try {
            // const accounts = await web3.eth.getAccounts()
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            // //console.log(accounts[0]);
            setMetaWalletAddress(accounts[0]);
            sessionStorage.setItem("METAMASK_WALLET", accounts[0]);
            setWalletAddress({
                walletAdd: accounts[0],
            });
            if (walletAddress) {
                setMetaWalletConnected(true);
            }
        } catch (err) {
            //console.log(err.response);
        }
        setModalShow(false);
    };

    if (window.ethereum) {
        window.ethereum.on("accountsChanged",async function (accounts) {
            //console.log(accounts[0]);
            const accountsNEW = await web3.eth.getAccounts();
            if (!accounts[0]) {
                //console.log("Disconnected");
                sessionStorage.removeItem("METAMASK_WALLET");
                sessionStorage.setItem("isMetamaskConnected",false);
                window.location.reload();
                return;
            }
            setMetaWalletAddress(accountsNEW[0]);
            sessionStorage.setItem("METAMASK_WALLET", accountsNEW[0]);
            setWalletAddress({
                walletAdd: accountsNEW[0],
            });
        });
    }

    return (
        <div className="">
            <MessageModal
                show={messageModal}
                setShow={setMessageModal}
                title={"Message"}
                message={messageModalDesc}
            />

            {/* <LoadingModal visibility={modalShow} title={modalTitle} /> */}
            {modalShow && <FullLoading />}
            <div
                className="wd-header-image d-none"
                style={{ background: `url(${wdHeaderImage})` }}
            ></div>
            <div className="wallet-address-confirm mt-0">
                <h2>Your Wallet Address Details</h2>
                <form
                    onSubmit={onUpdateWalletAddress}
                    className="wallet-address-items"
                >
                    <h3 className="!text-blue">Confirm your wallet address</h3>
                    <div className="wallet-address-items-input">
                        <label htmlFor="walletAdd">
                            Wallet Address
                            <span className="wallet-asterik">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your wallet address"
                            id="walletAdd"
                            name="walletAdd"
                            onChange={(e) => handle(e)}
                            value={walletAddress.walletAdd}
                        />
                    </div>
                    {/* <div className="wallet-address-items-input">
                        <label for="cwalletAdd">
                            ConfirmWallet Address
                            <span className="wallet-asterik">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="0xe67ad177d08B0183937Faf6F98226BA37435b4e2"
                            id="cwalletAdd"
                            name="cwalletAdd"
                            onChange={(e) => handle(e)}
                            value={walletAddress.cwalletAdd}
                        />
                        
                    </div> */}
                    {showError ? (
                        <p className="wallet-warning">
                            Wallet Address doesn't match...
                        </p>
                    ) : (
                        ""
                    )}

                    {metaWalletConnected && (
                        <button className="bg-BlueButton rounded-lg text-white px-4 py-3 w-full">
                            Add Wallet
                        </button>
                    )}
                    {/* <div className="scan-wallet-btn btn-hover" onClick={()=>connect()}>
                        <i className="fas fa-camera-retro"></i> Scan your address
                    </div> */}

                    {!metaWalletConnected && (
                        <button
                            className="bg-GreyButton rounded-lg text-blue px-4 py-3 w-full"
                            onClick={connectToMetamask}
                        >
                            Connect to Metamask Wallet
                        </button>
                    )}
                    
                </form>
            </div>
            {/* <WalletBack /> */}
        </div>
    );
};

export default WalletAdd;
