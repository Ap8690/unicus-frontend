// Lib
import { useState } from "react";

// Components
import MarketPlaceTopCollectionsHeader from "./MarketPlaceTopCollectionsHeader";
import MarketPlaceTopCollectionsElements from "./MarketPlaceTopCollectionsElements";

const MarketPlaceTopCollections = ({ list }) => {
  const [day, setDay] = useState(7);
  // Hardcoded
  const days = [7, 3, 1];

  return (
    <div className="market-place-top-collections">
      <MarketPlaceTopCollectionsHeader day={day} setDay={setDay} days={days} />
      <MarketPlaceTopCollectionsElements list={list} />
    </div>
  );
};

export default MarketPlaceTopCollections;
