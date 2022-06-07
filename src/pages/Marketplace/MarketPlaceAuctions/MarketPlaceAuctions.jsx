// Libs
import { useEffect, useState } from "react";

// Components
import MarketPlaceAuctionsElements from "./MarketPlaceAuctionsElements";
import MarketPlaceAuctionsNavigator from "./MarketPlaceAuctionsNavigator";
import BottomNavigationMarker from "../BottomNavigationMarker";

const MarketPlaceAuctions = ({ list }) => {
  // Take list and filter as per the requirement
  const [currentType, setCurrentType] = useState("live");
  const [currentScroll, setCurrentScroll] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const [displayList, setDisplayList] = useState(list);

  // Some hardcoded data
  const types = ["Live", "Upcoming", "Ended"];
  const length = width > 768 ? Math.ceil(list.length / 3) : list.length;

  // Filter out list on the basis of elements
  useEffect(() => {
    const temp = list.filter(
      (element) => element.type.toLowerCase() === currentType
    );
    setDisplayList(temp);
  }, [currentType]);
  return (
    <div className="market-place-auctions">
      <MarketPlaceAuctionsNavigator
        currentScroll={currentScroll}
        setCurrentScroll={setCurrentScroll}
        types={types}
        length={length}
        currentType={currentType}
        setCurrentType={setCurrentType}
      />
      <MarketPlaceAuctionsElements list={displayList} currentScroll={currentScroll} />
      <BottomNavigationMarker currentPage={currentScroll} length={length} />
    </div>
  );
};

export default MarketPlaceAuctions;
