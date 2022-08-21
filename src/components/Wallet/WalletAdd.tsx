import React, { useState } from "react";
import "./WalletAdd.css";
// web3
import Web3 from "web3";
// modal
import { addWalletAdd } from "../../services/api/supplier";
import FullLoading from "../modals/Loading/FullLoading";

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
        
        setModalShow(true);
        // //console.log(walletDetail);
        const res = await addWalletAdd(walletDetail);
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


    
    // web3React.activate(new InjectedConnector());
    

    return (
        <div className="">
           

            {/* <LoadingModal visibility={modalShow} title={modalTitle} /> */}
            {modalShow && <FullLoading />}
            <div
                className="wd-header-image d-none"
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

                    
                </form>
            </div>
            {/* <WalletBack /> */}
        </div>
    );
};

export default WalletAdd;
