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
const Element = ({ element }) => {
  // Need to keep updating time string as per clock
  // so need to use setInterval
  const { days, hours, minutes } = getTime(new Date().getTime(), element.date);
  const [timeString, setTimeString] = useState(
    getTimeString(days, hours, minutes)
  );
  useEffect(() => {
    // Check every second
    setInterval(() => {
      const { days, hours, minutes } = getTime(new Date(), element.date);
      setTimeString(getTimeString(days, hours, minutes));
    }, 1000);
  }, []);
  return (
    <div className="market-place-auction-element">
      <img src={element.image} alt={element.name} />
      <h2 className="name">{element.name}</h2>
      <p className="seller-name">
        {element.sellerName}{" "}
        {element.ifVerified ? <img src={verified} alt="Verified" /> : null}
      </p>
      <div className="info">
        <span className="type">{element.type}</span>
        <span className="time">{timeString}</span>
      </div>
    </div>
  );
};

const MarketPlaceAuctionsElements = ({ list, currentScroll }) => {
  const holderRef = useExplorer(currentScroll);
  return (
    <div className="market-place-auctions-elements" ref={holderRef}>
      {list.map((element, i) => (
        <Element element={element} key={`mpae${i}${element.date}`} />
      ))}
    </div>
  );
};

export default MarketPlaceAuctionsElements;
