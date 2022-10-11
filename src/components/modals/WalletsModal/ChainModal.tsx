import Dialog from "@mui/material/Dialog";
import binanceLogo from "../../../assets/blockchain-logo/binanceLogo.svg";
import ethereumLogo from "../../../assets/blockchain-logo/ethereumLogo.svg";
import ploygonLogo from "../../../assets/blockchain-logo/polygonLogo.svg";
import solanaLogo from "../../../assets/blockchain-logo/solanaLogo.svg";
import shardumLogo from "../../../assets/blockchain-logo/shardumLogo.jpeg";
import telosLogo from "../../../assets/blockchain-logo/telosLogo.png";
import tronLogo from "../../../assets/blockchain-logo/tronLogo.svg";
import nearLogo from "../../../assets/blockchain-logo/nearLogo.svg";
import avalancheLogo from "../../../assets/blockchain-logo/avalancheLogo.svg";
import { getChainId } from "../../../utils/utils";
import "./ChainModal.scss";
import React, { useState, useContext, useEffect } from "react";
import { ChainContext } from "../../../context/ChainContext";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Transition } from "../../Animation/Transition/Transition";
import Alert from "@mui/material/Alert";
import { background } from "../modalBackground";
import Cookies from 'js-cookie';
import UnstyledTabs from "../../../components/TabList/Tablist";
const ChainCard = ({ chainName, chainLogo, handleChain }) => {
    return (
        <div
            onClick={() => handleChain(chainName)}
            className="box py-4 rounded-2xl hover:border hover:border-white border border-[#1D1F25] bg-[#1D1F25] cursor-pointer flex justify-center items-center overflow-hidden w-full"
        >
            <button className="wallet-logo flex items-center justify-center flex-col">
                <img className="h-8 mb-1" src={chainLogo} alt="MetaMask" />
                <span className="text-white font-medium text-[20px]">
                    {chainName}
                </span>
            </button>
        </div>
    );
};

const Mainnet = ({ handleChain }) => {
    return (
        <div className="grid overflow-hidden grid-cols-3 grid-rows-2 gap-3 w-auto m-4">
            <ChainCard
                handleChain={handleChain}
                chainName={"Ethereum"}
                chainLogo={ethereumLogo}
            />
            <ChainCard
                handleChain={handleChain}
                chainName={"Binance"}
                chainLogo={binanceLogo}
            />
            
            <ChainCard
                handleChain={handleChain}
                chainName={"Polygon"}
                chainLogo={ploygonLogo}
            />
            
        </div>
    );
};
const Testnet = ({ handleChain }: any) => {
    return (
        <div className="grid overflow-hidden grid-cols-3 grid-rows-2 gap-3 w-auto m-4">
            <ChainCard
                handleChain={handleChain}
                chainName={"Ethereum"}
                chainLogo={ethereumLogo}
            />
            <ChainCard
                handleChain={handleChain}
                chainName={"Binance"}
                chainLogo={binanceLogo}
            />
            <ChainCard
                handleChain={handleChain}
                chainName={"Avalanche"}
                chainLogo={avalancheLogo}
            />
            <ChainCard
                handleChain={handleChain}
                chainName={"Polygon"}
                chainLogo={ploygonLogo}
            />
            <ChainCard
                handleChain={handleChain}
                chainName={"Shardeum"}
                chainLogo={shardumLogo}
            />
            <ChainCard
                handleChain={handleChain}
                chainName={"Telos"}
                chainLogo={telosLogo}
            />
            {/* <ChainCard
                handleChain={handleChain}
                chainName={"Near"}
                chainLogo={nearLogo}
            /> */}
            <ChainCard
                handleChain={handleChain}
                chainName={"Solana"}
                chainLogo={solanaLogo}
            />
            <ChainCard
                handleChain={handleChain}
                chainName={"Tron"}
                chainLogo={tronLogo}
            />
        </div>
    );
};

const alertBox = {
    backgroundColor: "inherit",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

const ChainModal = ({ open, setOpen, setWalletModal, setShowCategory }) => {
    const { chain, setChain,chainEnvironment, setChainEnvironment } = useContext(ChainContext);
    const handleClose = () => {
        setOpen(false);
    };
    const { setVisible } = useWalletModal();
    const handleChain = (chain: any) => {
        setOpen(false);
        setShowCategory(true);
        chain = getChainId(chain?.toLowerCase());
        localStorage.setItem("CHAIN", chain);
    };
    const handleTabChange = (event: React.SyntheticEvent, newValue: any) => {
        Cookies.set('Chain_Environment',newValue)
        setChainEnvironment(newValue);
    };
    useEffect(() => {
        if(!Cookies.get('Chain_Environment')) Cookies.set('Chain_Environment','mainnet')
    },[])
    return (
        <Dialog
            onClose={handleClose}
            open={open}
            TransitionComponent={Transition}
            PaperProps={background}
        >
            <div className=" min-h-[404px]">
                <div className="dialog-title">
                    Select Chain
                    <button onClick={handleClose}>
                        <CloseRoundedIcon />
                    </button>
                </div>
                <UnstyledTabs
                    tab1={"Mainnet"}
                    tab2={"Testnet"}
                    handleTabChange={handleTabChange}
                    tabValue={chainEnvironment}
                    tab1data={<Mainnet handleChain={handleChain} />}
                    tab2data={<Testnet handleChain={handleChain} />}
                />

                <Alert sx={alertBox} severity="info">
                    You will be exploring assets on the {chainEnvironment} chain you are selecting
                    right now.
                </Alert>
            </div>
        </Dialog>
    );
};

export default ChainModal;
