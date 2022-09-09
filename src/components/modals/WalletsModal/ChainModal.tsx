import Dialog from "@mui/material/Dialog"
import binanceLogo from "../../../assets/svgs/binanceLogo.svg"
import ethereumLogo from "../../../assets/svgs/ethereum-eth-logo.svg"
import nearLogo from "../../../assets/svgs/near-protocol-near-logo.svg"
import ploygonLogo from "../../../assets/svgs/polygon-matic-logo.svg"
import solanaLogo from "../../../assets/svgs/solana-sol-logo.svg"
import tronLogo from "../../../assets/svgs/tron-trx-logo.svg"

const ChainCard = ({ chainName, chainLogo }) => {
    return (
        <div className="chain-name-container">
            <button className="wallet-logo">
                <img src={chainLogo} alt="MetaMask" style={{ width: "2rem" }} />
                {chainName}
            </button>
        </div>
    )
}

const ChainModal = ({ open, setOpen, setChainName }) => {
    const handleClose = () => {
        setOpen(false)
    }

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
            <div className="container">
                <ChainCard chainName={"Ethereum"} chainLogo={ethereumLogo} />
                <ChainCard chainName={"Binance"} chainLogo={binanceLogo} />
                <ChainCard chainName={"Near"} chainLogo={nearLogo} />
                <ChainCard chainName={"Ploygon"} chainLogo={ploygonLogo} />
                <ChainCard chainName={"Solana"} chainLogo={solanaLogo} />
                <ChainCard chainName={"Tron"} chainLogo={tronLogo} />
            </div>
        </Dialog>
    )
}

export default ChainModal