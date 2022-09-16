import { useContext } from "react";
import { ChainContext } from "../../context/ChainContext";
import {capitalize} from "../../utils/helpers";
import Ethereum from "../../assets/blockchain-logo/ethereumLogo.svg";
import Binance from "../../assets/blockchain-logo/binanceLogo.svg";
import Polygon from "../../assets/blockchain-logo/polygonLogo.svg";
import Avalanche from "../../assets/blockchain-logo/avalancheLogo.svg";
import Tron from "../../assets/blockchain-logo/tronLogo.svg";
import Near from "../../assets/blockchain-logo/nearLogo.svg";
import Solana from "../../assets/blockchain-logo/solanaLogo.svg";
import Tooltip from '@mui/material/Tooltip';

const ChainLogo = () => {
    const { chain } = useContext(ChainContext);
    const chainMessage = `You are on ${capitalize(chain)} Chain`
    switch (chain?.toLowerCase()) {
        case "ethereum":
            return <Tooltip title={chainMessage}><img className="cursor-pointer h-[30px] ml-4" src={Ethereum} alt="Ethereum" /></Tooltip>;
        case "binance":
            return <Tooltip title={chainMessage}><img className="cursor-pointer h-[30px] ml-4" src={Binance} alt="Binance" /></Tooltip>;
        case "polygon":
            return <Tooltip title={chainMessage}><img className="cursor-pointer h-[30px] ml-4" src={Polygon} alt="Polygon" /></Tooltip>;
        case "avalanche":
            return <Tooltip title={chainMessage}><img className="cursor-pointer h-[30px] ml-4" src={Avalanche} alt="Avalanche" /></Tooltip>;
        case "tron":
            return <Tooltip title={chainMessage}><img className="cursor-pointer h-[30px] ml-4" src={Tron} alt="Tron" /></Tooltip>;
        case "near":
            return <Tooltip title={chainMessage}><img className="cursor-pointer h-[30px] ml-4" src={Near} alt="Near" /></Tooltip>;
        case "solana":
            return <Tooltip title={chainMessage}><img className="cursor-pointer h-[30px] ml-4" src={Solana} alt="Solana" /></Tooltip>;
        default:
            return null;
    }
};

export default ChainLogo;
