import Dialog from "@mui/material/Dialog";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import "../PlaceBid/PlaceBid";
import "./ChainModal.scss"
import { Wallets } from "../../../pages/ConnectWallet/ConnectWallet";
import { useContext } from "react";
import { ConnectWalletContext } from "../../../context/ConnectWalletContext";
import {getChainName} from "../../../utils/utils"
import Loader from "../../Loading/Loader"
import {Transition} from "../../Animation/Transition/Transition";
import {background} from "../modalBackground"

const WalletsModal = ({ open, setOpen,chainName }): JSX.Element => {
    const handleClose = () => {
        
        setOpen(false);
    };
    const {loginWallet,fullLoading} = useContext(ConnectWalletContext)
    return (
        <Dialog
            onClose={handleClose}
            open={open}
            TransitionComponent={Transition}
            PaperProps={background}
        >
            <div className="dialog-title">
                Select Chain
                <button onClick={handleClose}>
                    <CloseRoundedIcon />
                </button>
            </div>
            <div className="place-bid-dialog">
                {fullLoading ? <Loader/> : <Wallets loginWallet={loginWallet} chainName={getChainName(chainName)}/>}
            </div>
        </Dialog>
    );
};

export default WalletsModal;
