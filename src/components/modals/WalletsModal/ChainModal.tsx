import Dialog from "@mui/material/Dialog"
import binanceLogo from "../../../assets/svgs/binanceLogo.svg"
import ethereumLogo from "../../../assets/svgs/ethereum.svg"
// import nearLogo from "../../../assets/svgs/near-protocol-near-logo.svg"
import ploygonLogo from "../../../assets/svgs/polygon-matic-logo.svg"
import solanaLogo from "../../../assets/svgs/solana-sol-logo.svg"
import tronLogo from "../../../assets/svgs/tron-trx-logo.svg"
import nearLogo from "../../../assets/svgs/nearLogo.svg"
import avalancheLogo from "../../../assets/svgs/avalanche.svg"
import {getChainId} from "../../../utils/utils"
import "./ChainModal.scss"
import { useContext } from "react"
import { ChainContext } from "../../../context/ChainContext"
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

const ChainCard = ({ chainName, chainLogo, handleChain }) => {
    return (
        <div onClick={() => handleChain(chainName)} className="py-6 rounded-2xl hover:border hover:border-white border border-black cursor-pointer flex justify-center items-center px-4 w-1/2 overflow-hidden sm:w-full lg:w-1/2">
            <button className="wallet-logo flex items-center justify-center flex-col">
                <img className="h-8" src={chainLogo} alt="MetaMask" />
                <span className='text-white font-medium text-[20px]'>{chainName}</span>
            </button>
        </div>
    )
}

const ChainModal = ({ open, setOpen, setWalletModal}) => {
    const {chain,setChain} = useContext(ChainContext)
    const handleClose = () => {
        setOpen(false)
    }
    const { setVisible } = useWalletModal();
    const handleChain = (chain:any) => {
        chain = getChainId(chain?.toLowerCase())
        setOpen(false)
        setWalletModal(true)
        setChain(chain)
        localStorage.setItem("CHAIN",chain)
    }
    // const handleSolana = (chain:any) => {
    //     // chain = getChainId(chain?.toLowerCase())
    //     setOpen(false)
    //     // setWalletModal(true)
    //     // setChain(chain)
    //     // localStorage.setItem("CHAIN",chain)
    //     // setVisible(true)
    // }
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
            {/* <div className="container"> */}
            <div className="flex flex-wrap  overflow-hidden m-4">
                <ChainCard handleChain={handleChain} chainName={"Ethereum"} chainLogo={ethereumLogo} />
                <ChainCard handleChain={handleChain} chainName={"Binance"} chainLogo={binanceLogo} />
                <ChainCard handleChain={handleChain} chainName={"Avalanche"} chainLogo={avalancheLogo} />
                <ChainCard handleChain={handleChain} chainName={"Polygon"} chainLogo={ploygonLogo} />
                <ChainCard handleChain={handleChain} chainName={"Near"} chainLogo={nearLogo} />
                <ChainCard handleChain={handleChain} chainName={"Solana"} chainLogo={solanaLogo} />
                <ChainCard handleChain={handleChain} chainName={"Tron"} chainLogo={tronLogo} />
            </div>
        </Dialog>
    )
}

export default ChainModal