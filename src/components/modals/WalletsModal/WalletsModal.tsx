import Dialog from "@mui/material/Dialog";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import "../PlaceBid/PlaceBid";
import { Wallets } from "../../../pages/ConnectWallet/ConnectWallet";
import { useContext } from "react";
import { ConnectWalletContext } from "../../../context/ConnectWalletContext";
import {getChainName} from "../../../utils/utils"
import Loader from "../../Loading/Loader"

const WalletsModal = ({ open, setOpen,chainName }): JSX.Element => {
    const handleClose = () => {
        setOpen(false);
    };
    const {loginWallet,fullLoading} = useContext(ConnectWalletContext)
    return (
        <Dialog
            onClose={handleClose}
            open={open}
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
            <div className="place-bid-dialog !max-h-[none]">
                <CloseRoundedIcon className="absolute top-4 right-4 text-white cursor-pointer" onClick={handleClose} />
                {fullLoading ? <Loader/> :<Wallets loginWallet={loginWallet} chainName={getChainName(chainName)}/>}
            </div>
        </Dialog>
    );
};

export default WalletsModal;
