import Dialog from "@mui/material/Dialog";
import binanceLogo from "../../../assets/blockchain-logo/binanceLogo.svg";
import ethereumLogo from "../../../assets/blockchain-logo/ethereumLogo.svg";
import ploygonLogo from "../../../assets/blockchain-logo/polygonLogo.svg";
import solanaLogo from "../../../assets/blockchain-logo/solanaLogo.svg";
import tronLogo from "../../../assets/blockchain-logo/tronLogo.svg";
import nearLogo from "../../../assets/blockchain-logo/nearLogo.svg";
import avalancheLogo from "../../../assets/blockchain-logo/avalancheLogo.svg";
import { getChainId } from "../../../utils/utils";
import "./ChainModal.scss";
import { useContext } from "react";
import { ChainContext } from "../../../context/ChainContext";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {Transition} from "../../Animation/Transition/Transition";
import Alert from '@mui/material/Alert';

 
const InstallModal = ({ open, setOpen, setWalletModal, setShowCategory }) => {
    const { chain, setChain } = useContext(ChainContext);
    const handleClose = () => {
        setOpen(false);
    };
    const { setVisible } = useWalletModal();
    const handleChain = (chain: any) => {
        console.log("Chain Handle")
        setOpen(false);
        setShowCategory(true);
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
            <div className="w-auto m-4">
               
            </div>
        </Dialog>
    );
};

export default InstallModal;
