// Libs
import { useEffect, useState } from "react";

// Some utils
import getTime from "./getTime";

// Images
import verified from "../../../assets/svgs/verified.svg";
import useExplorer from "../useExplorer";

const getTimeString = (days, hours, minutes) => {
  return `${days}d ${hours}h ${minutes}m`;
};

// Element for the list
const Element = ({ element, currentType }) => {
  // Need to keep updating time string as per clock
  // so need to use setInterval
  // const { days, hours, minutes } = getTime(new Date().getTime(), element.date);
  // const [timeString, setTimeString] = useState(
  //   getTimeString(days, hours, minutes)
  // );
  // useEffect(() => {
  //   // Check every second
  //   setInterval(() => {
  //     const { days, hours, minutes } = element.auctionTimer.getTime();
  //     setTimeString(getTimeString(days, hours, minutes));
  //   }, 1000);
  // }, []);
  return (
    <div className="market-place-auction-element">
      <div className="nft-image-size">
        <img src={element.cloudinaryUrl} alt={element.name} /></div>
      <h2 className="name">{element.name}</h2>
      <p className="seller-name">
        {element.sellerInfo}{" "}
        {element.ifVerified ? <img src={verified} alt="Verified" /> : null}
      </p>
      <div className="info">
        <span className="type">{currentType}</span>
        {/* {currentType == "live" && <span className="time">Ends in {element.auctionStartOn}</span>}
        {currentType == "upcoming" && <span className="time">Starts in {element.auctionStartOn}</span>} */}
      </div>
    </div>
  );
};

const MarketPlaceAuctionsElements = ({ list, currentScroll,currentType }) => {
  const holderRef = useExplorer(currentScroll);
  return (
    <div className="market-place-auctions-elements" ref={holderRef}>
      {list.map((element:any, i:number) => (
        <Element element={element} key={`mpae${i}${element.tokenId}`} currentType={currentType} />
      ))}
    </div>
  );
};

export default MarketPlaceAuctionsElements;
