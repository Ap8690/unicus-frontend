import Dialog from "@mui/material/Dialog";
import binanceLogo from "../../../assets/svgs/binanceLogo.svg";
import ethereumLogo from "../../../assets/svgs/ethereum.svg";
// import nearLogo from "../../../assets/svgs/near-protocol-near-logo.svg"
import ploygonLogo from "../../../assets/svgs/polygon-matic-logo.svg";
import solanaLogo from "../../../assets/svgs/solana-sol-logo.svg";
import tronLogo from "../../../assets/svgs/tron-trx-logo.svg";
import nearLogo from "../../../assets/svgs/nearLogo.svg";
import avalancheLogo from "../../../assets/svgs/avalanche.svg";
import { getChainId } from "../../../utils/utils";
import "./ChainModal.scss";
import { useContext } from "react";
import { ChainContext } from "../../../context/ChainContext";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {Transition} from "../../Animation/Transition/Transition";
import Alert from '@mui/material/Alert';

const ChainCard = ({ chainName, chainLogo, handleChain }) => {
    return (
        <div
            onClick={() => handleChain(chainName)}
            className="box py-4 rounded-2xl hover:border hover:border-white border border-black cursor-pointer flex justify-center items-center overflow-hidden w-full"
        >
            <button className="wallet-logo flex items-center justify-center flex-col">
                <img className="h-8" src={chainLogo} alt="MetaMask" />
                <span className="text-white font-medium text-[20px]">
                    {chainName}
                </span>
            </button>
        </div>
    );
};
const alertBox = {
    backgroundColor: 'inherit',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}
 
const ChainModal = ({ open, setOpen, setWalletModal }) => {
    const { chain, setChain } = useContext(ChainContext);
    const handleClose = () => {
        setOpen(false);
    };
    const { setVisible } = useWalletModal();
    const handleChain = (chain: any) => {
        console.log("Chain Handle")
        setOpen(false);
        setWalletModal(true);
        setChain(chain?.toLowerCase());
        chain = getChainId(chain?.toLowerCase());
        localStorage.setItem("CHAIN", chain);
    };
    return (
        <Dialog
            onClose={handleClose}
            open={open}
            TransitionComponent={Transition}
            PaperProps={{
                sx: {
                    padding: 0,
                    background: "black",
                    width: "600px",
                    borderRadius: "16px",
                    filter: "drop-shadow(0 0 5px #333)",
                },
            }}
        >
            <div className="dialog-title">
                Select Chain
                <button onClick={handleClose}>
                    <CloseRoundedIcon />
                </button>
            </div>
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
                    chainName={"Near"}
                    chainLogo={nearLogo}
                />
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
                <Alert sx={alertBox} severity="info">You will be exploring assets on the chain you are selecting right now.</Alert>
        </Dialog>
    );
};

export default ChainModal;