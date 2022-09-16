import { useContext } from "react";
import { ChainContext } from "../../context/ChainContext";
import { capitalize } from "../../utils/helpers";
import Ethereum from "../../assets/blockchain-logo/ethereumLogo.svg";
import Binance from "../../assets/blockchain-logo/binanceLogo.svg";
import Polygon from "../../assets/blockchain-logo/polygonLogo.svg";
import Avalanche from "../../assets/blockchain-logo/avalancheLogo.svg";
import Tron from "../../assets/blockchain-logo/tronLogo.svg";
import Near from "../../assets/blockchain-logo/nearLogo.svg";
import Solana from "../../assets/blockchain-logo/solanaLogo.svg";
import Tooltip from "@mui/material/Tooltip";

const tooltipStyle = {
    tooltip: {
        sx: {
            color: "#ffff",
            backgroundColor: "rgba(255,255,255,0.2)",
            fontSize: "0.90em",
        },
    },
};

const ChainLogo = () => {
    const { chain } = useContext(ChainContext);
    const chainMessage = `You are on ${capitalize(chain)} Chain`;
    switch (chain?.toLowerCase()) {
        case "ethereum":
            return (
                <Tooltip componentsProps={tooltipStyle} title={chainMessage}>
                    <div className="flex items-center justify-center">
                        <img
                            className="cursor-pointer h-[24px] mr-2"
                            src={Ethereum}
                            alt="Binance"
                        />
                        <div className="font-medium capitalize">{chain}</div>
                    </div>
                </Tooltip>
            );
        case "binance":
            return (
                <Tooltip componentsProps={tooltipStyle} title={chainMessage}>
                    <div className="flex items-center justify-center">
                        <img
                            className="cursor-pointer h-[24px] mr-2"
                            src={Binance}
                            alt="Binance"
                        />
                        <div className="font-medium capitalize">{chain}</div>
                    </div>
                </Tooltip>
            );
        case "polygon":
            return (
                <Tooltip componentsProps={tooltipStyle} title={chainMessage}>
                    <div className="flex items-center justify-center">
                        <img
                            className="cursor-pointer h-[24px] mr-2"
                            src={Polygon}
                            alt="Polygon"
                        />
                        <div className="font-medium capitalize">{chain}</div>
                    </div>
                </Tooltip>
            );
        case "avalanche":
            return (
                <Tooltip componentsProps={tooltipStyle} title={chainMessage}>
                    <div className="flex items-center justify-center">
                        <img
                            className="cursor-pointer h-[24px] mr-2"
                            src={Avalanche}
                            alt="Avalanche"
                        />
                        <div className="font-medium capitalize">{chain}</div>
                    </div>
                </Tooltip>
            );
        case "tron":
            return (
                <Tooltip componentsProps={tooltipStyle} title={chainMessage}>
                    <div className="flex items-center justify-center">
                        <img
                            className="cursor-pointer h-[24px] mr-2"
                            src={Tron}
                            alt="Tron"
                        />
                        <div className="font-medium capitalize">{chain}</div>
                    </div>
                </Tooltip>
            );
        case "near":
            return (
                <Tooltip componentsProps={tooltipStyle} title={chainMessage}>
                    <div className="flex items-center justify-center">
                        <img
                            className="cursor-pointer h-[24px] mr-2"
                            src={Near}
                            alt="Near"
                        />
                        <div className="font-medium capitalize">{chain}</div>
                    </div>
                </Tooltip>
            );
        case "solana":
            return (
                <Tooltip componentsProps={tooltipStyle} title={chainMessage}>
                    <div className="flex items-center justify-center">
                        <img
                            className="cursor-pointer h-[24px] mr-2"
                            src={Solana}
                            alt="Solana"
                        />
                        <div className="font-medium capitalize">{chain}</div>
                    </div>
                </Tooltip>
            );
        default:
            return null;
    }
};

export default ChainLogo;
