import React, { useState } from "react";
import "./WalletAdd.css";
// modal
import { addWalletAdd } from "../../services/api/supplier";
import PageLoader from "../../components/Loading/PageLoader";
import toast from 'react-hot-toast';

const WalletAdd = () => {
    const [walletAddress, setWalletAddress] = useState({
        walletAdd: "",
    });
    const [modalShow, setModalShow] = useState(false);
    const handle = (e: any) => {
        const newData = { ...walletAddress };
        newData[e.target.id] = e.target.value;
        setWalletAddress(newData);
    };

    const sendWalletInfo = async (walletDetail: string) => {
        try {
            setModalShow(true);
            const res = await addWalletAdd(walletDetail);
            toast.success("Wallet added successfully!");
            setModalShow(false);
        } catch (err) {
            toast.error(err?.response.data.err || "Wallet added failed!");
            setModalShow(false);
            //console.log("err: ", err);
        }
    };
    const onUpdateWalletAddress = async (event: any) => {
        event.preventDefault();
        await sendWalletInfo(walletAddress.walletAdd);
    };

    return (
        <div className="">
            {modalShow && <PageLoader />}
            <div className="wallet-address-confirm mt-0">
                <form
                    onSubmit={onUpdateWalletAddress}
                    className="wallet-address-items"
                >
                    <h3 className="mb-4">Confirm your wallet address</h3>
                    <div className="input-box  w-1/2">
                        <label htmlFor="walletAdd" className="title">
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
                    <button
                        className="btn mt-4 w-1/2"
                        onClick={onUpdateWalletAddress}
                    >
                        Add Wallet
                    </button>
                </form>
            </div>
        </div>
    );
};

export default WalletAdd;
