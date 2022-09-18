import Dialog from "@mui/material/Dialog";
// import "./ChainModal.scss";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Transition } from "../../Animation/Transition/Transition";
import Alert from '@mui/material/Alert';
import metamaskImg from "../../../assets/svgs/metamask.svg"
import coinbaseImg from "../../../assets/svgs/coinbase.svg"
import mewImg from "../../../assets/svgs/myetherwallet.svg"
import walletConnectImg from "../../../assets/svgs/walletconnect.svg"

const WALLET_LINKS = {
    metamask: {
        img: metamaskImg,
        url: "https://metamask.io/download/"
    },
    coinbase: {
        img: coinbaseImg,
        url: "https://www.coinbase.com/wallet"
    },
    mew: {
        img: mewImg,
        url: "https://www.myetherwallet.com/wallet/create"
    },
    walletConnect: {
        img: walletConnectImg,
        url: "https://explorer.walletconnect.com/?type=wallet"
    }
}

const InstallModal = ({ open, setOpen, wallet }) => {
    const handleClose = () => {
        setOpen(false);
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
                <div>Please install <span className="capitalize ">{wallet}</span></div>
                <button onClick={handleClose}>
                    <CloseRoundedIcon />
                </button>
            </div>
            <div className="w-auto m-4 flex flex-col gap-4 items-center">
                <img src={WALLET_LINKS[wallet].img} alt="install-wallet" className="w-16 h-16" />
                <a href={WALLET_LINKS[wallet].url} className="btn" target="_blank" rel="noopener noreferrer">
                    Install Now
                </a>
            </div>
        </Dialog>
    );
};

export default InstallModal;
